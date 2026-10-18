// لوحة الطلبات لصاحب المتجر: قراءة الطلبات وتغيير حالتها وإرسال رسالة تجريبية. محمية بمفتاح سري من إعدادات Cloudflare.
import { J, ipHash, safeEqual } from '../../_lib/util.js';
import { buildText, notifyOwner } from '../../_lib/notify.js';

const STATUSES = ['new', 'confirmed', 'done', 'cancelled'];

async function guard(request, env) {
  if (!env.DB) return J({ ok: false, error: 'server' }, 503);
  if (!env.ADMIN_KEY || env.ADMIN_KEY.length < 16) return J({ ok: false, error: 'admin_disabled' }, 503);
  const ih = await ipHash(request, env), now = Date.now();
  const f = await env.DB.prepare('SELECT COUNT(*) AS n FROM admin_fail WHERE ip_hash = ? AND ts > ?').bind(ih, now - 900000).first();
  if (f && f.n >= 10) return J({ ok: false, error: 'locked' }, 429, { 'retry-after': '900' });
  const m = /^Bearer (.+)$/.exec(request.headers.get('authorization') || '');
  if (!m || !(await safeEqual(m[1], env.ADMIN_KEY))) {
    await env.DB.prepare('INSERT INTO admin_fail (ip_hash, ts) VALUES (?, ?)').bind(ih, now).run();
    await env.DB.prepare('DELETE FROM admin_fail WHERE ts < ?').bind(now - 86400000).run();
    return J({ ok: false, error: 'unauthorized' }, 401);
  }
  return null;
}

export async function onRequestGet({ request, env }) {
  try {
    const bad = await guard(request, env); if (bad) return bad;
    const { results } = await env.DB.prepare('SELECT ref, created_at, name, phone, city, address, notes, items, subtotal, discount, free_shipping, total, coupon, lang, status, notified, notify_info FROM orders ORDER BY id DESC LIMIT 200').all();
    const orders = results.map(r => { let items = []; try { items = JSON.parse(r.items); } catch (e) { } return { ...r, items }; });
    return J({ ok: true, orders });
  } catch (e) { return J({ ok: false, error: 'server' }, 500); }
}

export async function onRequestPost({ request, env }) {
  try {
    const bad = await guard(request, env); if (bad) return bad;
    let b; try { b = await request.json(); } catch (e) { return J({ ok: false, error: 'invalid' }, 400); }
    if (b && b.action === 'test') {
      const o = { ref: 'TEST', at: Date.now(), name: 'رسالة تجريبية', phone: String(env.OWNER_PHONE || ''), city: '-', address: '-', notes: '', items: [{ name: 'تأكد أن الإشعارات تصلك', v: '', qty: 1, price: 0 }], sub: 0, d: 0, free: false, total: 0, coupon: '' };
      const r = await notifyOwner(env, o, '✅ رسالة تجريبية من متجر مدار. إذا وصلتك فالإشعارات تعمل.\n\n' + buildText(o));
      return J({ ok: true, ...r });
    }
    if (!b || typeof b.ref !== 'string' || !STATUSES.includes(b.status)) return J({ ok: false, error: 'invalid' }, 400);
    await env.DB.prepare('UPDATE orders SET status = ? WHERE ref = ?').bind(b.status, b.ref.slice(0, 32)).run();
    return J({ ok: true });
  } catch (e) { return J({ ok: false, error: 'server' }, 500); }
}

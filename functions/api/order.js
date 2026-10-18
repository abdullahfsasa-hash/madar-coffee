// POST /api/order: يستقبل الطلب، يتحقق منه، يعيد حساب الأسعار من قائمة الخادم، يحفظه، ثم يرسل إشعارًا لصاحب المتجر.
import { CATALOG, COUPON, FREE_FROM } from '../_lib/catalog.js';
import { J, clean, dig, ipHash } from '../_lib/util.js';
import { buildText, notifyOwner } from '../_lib/notify.js';

const MAX_BODY = 12000;
const RATE_IP = 5;      // أقصى عدد طلبات لكل زائر خلال 10 دقائق
const RATE_ALL = 150;   // أقصى عدد طلبات للمتجر كله خلال ساعة، لصد الإغراق

const pubOrder = r => ({ ok: true, ref: r.ref, at: r.created_at, sub: r.subtotal, d: r.discount, free: !!r.free_shipping, total: r.total });

export async function onRequestPost(context) {
  const { request, env } = context;
  try {
    if (!env.DB) return J({ ok: false, error: 'server' }, 503);

    // السماح فقط لطلبات تأتي من نفس الموقع (يمنع المواقع الأخرى من إرسال طلبات باسم زوارك).
    const origin = request.headers.get('origin');
    if (origin) { let ok = false; try { ok = new URL(origin).host === new URL(request.url).host; } catch (e) { } if (!ok) return J({ ok: false, error: 'origin' }, 403); }
    if (!(request.headers.get('content-type') || '').includes('application/json')) return J({ ok: false, error: 'invalid' }, 415);

    const raw = await request.text();
    if (raw.length > MAX_BODY) return J({ ok: false, error: 'invalid' }, 413);
    let b; try { b = JSON.parse(raw); } catch (e) { return J({ ok: false, error: 'invalid' }, 400); }
    if (!b || typeof b !== 'object' || !b.c || typeof b.c !== 'object' || !Array.isArray(b.items)) return J({ ok: false, error: 'invalid' }, 400);

    // بيانات العميل
    const name = clean(b.c.name, 80), phone = dig(clean(b.c.phone, 20)), city = clean(b.c.city, 60), address = clean(b.c.addr, 200), notes = clean(b.c.notes, 500, true);
    if (name.length < 3 || city.length < 2 || address.length < 4 || !/^\+?\d{9,15}$/.test(phone.replace(/[\s-]/g, ''))) return J({ ok: false, error: 'invalid' }, 400);
    const cid = String(b.cid || '');
    if (!/^[A-Za-z0-9_-]{8,64}$/.test(cid)) return J({ ok: false, error: 'invalid' }, 400);
    const lang = b.lang === 'en' ? 'en' : 'ar';

    // المنتجات: نقبل رقم المنتج والخيار والكمية فقط، والاسم والسعر يأتيان من الخادم.
    if (b.items.length < 1 || b.items.length > 30) return J({ ok: false, error: 'invalid' }, 400);
    const items = [];
    for (const it of b.items) {
      const p = it && typeof it.id === 'string' && Object.prototype.hasOwnProperty.call(CATALOG, it.id) ? CATALOG[it.id] : null;
      const qty = Math.floor(Number(it && it.qty));
      if (!p || !(qty >= 1 && qty <= 20)) return J({ ok: false, error: 'invalid' }, 400);
      let v = '';
      if (p.variants) { v = String(it.v || ''); if (!p.variants.includes(v)) return J({ ok: false, error: 'invalid' }, 400); }
      items.push({ id: it.id, name: p.name, v, qty, price: p.price });
    }
    const sub = items.reduce((a, i) => a + i.price * i.qty, 0);
    const coupon = String(b.coupon || '').trim().toUpperCase() === COUPON.code ? COUPON.code : '';
    const d = coupon ? Math.round(sub * COUPON.pct / 100) : 0;
    const net = sub - d, free = net >= FREE_FROM && sub > 0 ? 1 : 0, total = net;
    const count = items.reduce((a, i) => a + i.qty, 0);

    // فخ للروبوتات: حقل مخفي لا يملؤه إلا برنامج آلي. نردّ بنجاح شكلي دون حفظ.
    if (b.website) return J({ ok: true, ref: 'MD-000000-0000', at: Date.now(), sub, d, free: !!free, total });

    const now = Date.now();
    const ih = await ipHash(request, env);

    // إعادة إرسال نفس الطلب (ضغط مزدوج أو انقطاع شبكة) لا ينشئ طلبًا ثانيًا.
    const prev = await env.DB.prepare('SELECT ref, created_at, subtotal, discount, free_shipping, total FROM orders WHERE cid = ?').bind(cid).first();
    if (prev) return J(pubOrder(prev));

    const rl = await env.DB.prepare('SELECT (SELECT COUNT(*) FROM orders WHERE ip_hash = ? AND created_at > ?) AS a, (SELECT COUNT(*) FROM orders WHERE created_at > ?) AS b').bind(ih, now - 600000, now - 3600000).first();
    if (rl && rl.a >= RATE_IP) return J({ ok: false, error: 'rate' }, 429, { 'retry-after': '600' });
    if (rl && rl.b >= RATE_ALL) return J({ ok: false, error: 'busy' }, 503, { 'retry-after': '600' });

    // رقم الطلب بتوقيت الرياض
    const day = new Date(now + 3 * 3600000).toISOString().slice(2, 10).replace(/-/g, '');
    let ref = '', saved = false;
    for (let t = 0; t < 6 && !saved; t++) {
      const rnd = crypto.getRandomValues(new Uint8Array(3)); ref = 'MD-' + day + '-' + [...rnd].map(x => x.toString(36).toUpperCase()).join('').replace(/[^A-Z0-9]/g, '0').padEnd(4, '0').slice(0, 4);
      try {
        await env.DB.prepare('INSERT INTO orders (ref,cid,created_at,name,phone,city,address,notes,items,subtotal,discount,free_shipping,total,coupon,lang,ip_hash) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
          .bind(ref, cid, now, name, phone, city, address, notes, JSON.stringify(items), sub, d, free, total, coupon, lang, ih).run();
        saved = true;
      } catch (e) {
        const msg = String(e && e.message || e);
        if (!/UNIQUE/i.test(msg)) throw e;
        if (/cid/i.test(msg)) { const again = await env.DB.prepare('SELECT ref, created_at, subtotal, discount, free_shipping, total FROM orders WHERE cid = ?').bind(cid).first(); if (again) return J(pubOrder(again)); }
      }
    }
    if (!saved) return J({ ok: false, error: 'server' }, 500);

    // الإشعار يجري في الخلفية: العميل لا ينتظره، ونتيجته تُسجَّل للمراجعة في لوحة الطلبات.
    const order = { ref, at: now, name, phone, city, address, notes, items, sub, d, free: !!free, total, coupon, count };
    const job = (async () => {
      const r = await notifyOwner(env, order, buildText(order));
      const info = r.configured ? (r.ok ? 'sent: ' + r.sent.join(',') : 'failed: ' + r.failed.join('; ')) : 'no channel configured';
      await env.DB.prepare('UPDATE orders SET notified = ?, notify_info = ? WHERE ref = ?').bind(r.ok ? 1 : 0, (r.ok && r.failed.length ? info + ' | ' + r.failed.join('; ') : info).slice(0, 300), ref).run();
    })().catch(() => { });
    if (context.waitUntil) context.waitUntil(job); else await job;

    return J({ ok: true, ref, at: now, sub, d, free: !!free, total });
  } catch (e) {
    return J({ ok: false, error: 'server' }, 500);
  }
}

export const onRequest = ({ request }) => request.method === 'POST' ? undefined : J({ ok: false, error: 'method' }, 405, { allow: 'POST' });

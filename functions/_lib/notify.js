// إشعار صاحب المتجر بالطلب الجديد. كل قناة تعمل فقط إذا ضُبطت أسرارها في إعدادات Cloudflare.
import { intlPhone } from './util.js';

const fmt = n => Number(n).toLocaleString('en-US');

export function buildText(o) {
  let when = '';
  try { when = new Date(o.at).toLocaleString('ar-SA-u-ca-gregory-nu-latn', { timeZone: 'Asia/Riyadh', dateStyle: 'medium', timeStyle: 'short' }); } catch (e) { when = new Date(o.at).toISOString(); }
  const L = o.items.map((i, n) => `${n + 1}. ${i.name}${i.v ? ' (' + i.v + ')' : ''}\n    ${i.qty} × ${fmt(i.price)} = ${fmt(i.price * i.qty)} ريال`);
  const reply = intlPhone(o.phone);
  return [
    '🛒 طلب جديد من متجر مدار', `رقم الطلب: ${o.ref}`, `التاريخ: ${when}`, '',
    '👤 بيانات العميل', `الاسم: ${o.name}`, `الجوال: ${o.phone}`, `المدينة: ${o.city}`, `العنوان: ${o.address}`,
    ...(o.notes ? [`ملاحظات: ${o.notes}`] : []), '',
    '☕ المنتجات', ...L, '',
    '💰 الملخص', `المجموع الفرعي: ${fmt(o.sub)} ريال`,
    ...(o.d ? [`الخصم (${o.coupon}): -${fmt(o.d)} ريال`] : []),
    `التوصيل: ${o.free ? 'مجاني' : 'يُحدد عند التأكيد'}`, `الإجمالي: ${fmt(o.total)} ريال`, '',
    `💬 للرد على العميل: https://wa.me/${reply}`
  ].join('\n');
}

const post = async (url, init) => {
  const r = await fetch(url, { ...init, signal: AbortSignal.timeout(8000) });
  if (!r.ok) throw new Error('HTTP ' + r.status);
};

// واتساب الرسمي (Meta Cloud API). يدعم قالبًا معتمدًا (يعمل في أي وقت) أو نصًا حرًا (يعمل خلال 24 ساعة من آخر رسالة منك للرقم).
async function metaWhatsApp(env, o, text) {
  const base = env.META_BASE || 'https://graph.facebook.com';
  const to = intlPhone(env.OWNER_PHONE);
  const body = env.WA_TEMPLATE
    ? {
        messaging_product: 'whatsapp', to, type: 'template',
        template: {
          name: env.WA_TEMPLATE, language: { code: env.WA_LANG || 'ar' },
          components: [{ type: 'body', parameters: [
            o.ref, o.name, o.phone, `${fmt(o.total)}`,
            o.items.map(i => `${i.name}${i.v ? ' (' + i.v + ')' : ''} × ${i.qty}`).join(' | ') + ` | ${o.city} - ${o.address}`
          ].map(t => ({ type: 'text', text: String(t).replace(/[\n\t\r]+/g, ' ').replace(/ {4,}/g, '   ').slice(0, 900) })) }]
        }
      }
    : { messaging_product: 'whatsapp', to, type: 'text', text: { body: text.slice(0, 3800), preview_url: false } };
  await post(`${base}/v21.0/${encodeURIComponent(env.WA_PHONE_ID)}/messages`, {
    method: 'POST', headers: { 'content-type': 'application/json', authorization: 'Bearer ' + env.WA_TOKEN }, body: JSON.stringify(body)
  });
}

async function telegram(env, text) {
  const base = env.TG_BASE || 'https://api.telegram.org';
  await post(`${base}/bot${env.TG_TOKEN}/sendMessage`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TG_CHAT, text: text.slice(0, 3800), disable_web_page_preview: true })
  });
}

async function callmebot(env, text) {
  const base = env.CMB_BASE || 'https://api.callmebot.com';
  const q = new URLSearchParams({ phone: '+' + intlPhone(env.OWNER_PHONE), text: text.slice(0, 1500), apikey: env.CALLMEBOT_KEY });
  await post(`${base}/whatsapp.php?${q}`, { method: 'GET' });
}

// يرجع { ok, sent:[...], failed:[...] } ولا يرمي أبدًا، حتى لا يفشل الطلب بسبب خلل في الإشعار.
export async function notifyOwner(env, o, text) {
  const jobs = [];
  if (env.WA_TOKEN && env.WA_PHONE_ID && env.OWNER_PHONE) jobs.push(['whatsapp', () => metaWhatsApp(env, o, text)]);
  if (env.CALLMEBOT_KEY && env.OWNER_PHONE) jobs.push(['callmebot', () => callmebot(env, text)]);
  if (env.TG_TOKEN && env.TG_CHAT) jobs.push(['telegram', () => telegram(env, text)]);
  const sent = [], failed = [];
  await Promise.all(jobs.map(async ([name, fn]) => {
    try { await fn(); sent.push(name); } catch (e) { failed.push(name + ': ' + String(e && e.message || e).slice(0, 60)); }
  }));
  return { ok: sent.length > 0, sent, failed, configured: jobs.length };
}

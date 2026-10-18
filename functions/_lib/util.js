// أدوات مشتركة للخادم. لا أسرار هنا.
export const J = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff', ...extra }
  });

// ينظّف النص من محارف التحكم ومحارف اتجاه النص المخفية، ويقصّه للحد المسموح.
export const clean = (s, n, keepNl) =>
  String(s == null ? '' : s)
    .replace(keepNl ? /[\u0000-\u0009\u000B-\u001F\u007F‪-‮⁦-⁩]/g : /[\u0000-\u001F\u007F‪-‮⁦-⁩]/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
    .slice(0, n);

// يحوّل الأرقام العربية والفارسية إلى لاتينية.
export const dig = s =>
  String(s).replace(/[٠-٩]/g, c => c.charCodeAt(0) - 0x660).replace(/[۰-۹]/g, c => c.charCodeAt(0) - 0x6f0);

// رقم دولي بأرقام فقط (يفترض السعودية للأرقام المحلية) لاستخدامه في روابط واتساب.
export const intlPhone = p => {
  let d = dig(p).replace(/[^\d+]/g, '');
  if (d.startsWith('+')) return d.slice(1);
  if (d.startsWith('00')) return d.slice(2);
  if (/^05\d{8}$/.test(d)) return '966' + d.slice(1);
  if (/^5\d{8}$/.test(d)) return '966' + d;
  return d;
};

const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const sha = async s => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));

// بصمة مجهولة لعنوان الزائر. نخزّن البصمة فقط وليس العنوان، وتُستخدم لتحديد عدد الطلبات.
export const ipHash = async (request, env) =>
  (await sha((env.IP_SALT || 'madar') + '|' + (request.headers.get('CF-Connecting-IP') || 'unknown'))).slice(0, 32);

// مقارنة بزمن ثابت لتقليل تسريب المعلومات عن المفتاح.
export const safeEqual = async (a, b) => {
  const [x, y] = await Promise.all([sha('a|' + a), sha('a|' + b)]);
  let r = 0;
  for (let i = 0; i < x.length; i++) r |= x.charCodeAt(i) ^ y.charCodeAt(i);
  return r === 0;
};

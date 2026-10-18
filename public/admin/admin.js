(function () {
  'use strict';
  const app = document.getElementById('app');
  let KEY = ''; try { KEY = sessionStorage.getItem('madar.admin') || ''; } catch (e) { }
  let orders = [], filter = 'new';
  const ST = { new: 'جديد', confirmed: 'تم التأكيد', done: 'تم التسليم', cancelled: 'ملغي' };

  // كل النصوص القادمة من العملاء تُعرض عبر textContent فقط، فلا يمكن لأي نص أن يُنفَّذ كشيفرة.
  const el = (tag, props, ...kids) => {
    const n = document.createElement(tag);
    if (props) for (const k in props) { if (k === 'class') n.className = props[k]; else if (k === 'text') n.textContent = props[k]; else if (k.startsWith('on')) n.addEventListener(k.slice(2), props[k]); else n.setAttribute(k, props[k]); }
    kids.flat().forEach(c => { if (c != null) n.append(c.nodeType ? c : document.createTextNode(String(c))); });
    return n;
  };
  const intl = p => { let d = String(p).replace(/[٠-٩]/g, c => c.charCodeAt(0) - 0x660).replace(/[^\d+]/g, ''); if (d.startsWith('+')) return d.slice(1); if (d.startsWith('00')) return d.slice(2); if (/^05\d{8}$/.test(d)) return '966' + d.slice(1); if (/^5\d{8}$/.test(d)) return '966' + d; return d; };
  const num = n => Number(n).toLocaleString('en-US');
  const when = t => new Date(t).toLocaleString('ar-SA-u-ca-gregory-nu-latn', { timeZone: 'Asia/Riyadh', dateStyle: 'medium', timeStyle: 'short' });

  async function api(method, body) {
    const r = await fetch('/api/admin/orders', { method, headers: { Authorization: 'Bearer ' + KEY, ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined, cache: 'no-store', credentials: 'omit' });
    let j = null; try { j = await r.json(); } catch (e) { }
    return { status: r.status, j };
  }

  function login(msg) {
    const input = el('input', { type: 'password', autocomplete: 'current-password', placeholder: 'مفتاح الإدارة', 'aria-label': 'مفتاح الإدارة' });
    const err = el('div', { class: 'err', text: msg || '' });
    const go = async () => {
      KEY = input.value.trim(); if (!KEY) return;
      const { status, j } = await api('GET');
      if (status === 200 && j && j.ok) { try { sessionStorage.setItem('madar.admin', KEY); } catch (e) { } orders = j.orders; show(); }
      else { KEY = ''; err.textContent = status === 401 ? 'المفتاح غير صحيح.' : status === 429 ? 'محاولات كثيرة. انتظر 15 دقيقة.' : status === 503 ? 'لوحة الإدارة غير مفعّلة بعد. أضف ADMIN_KEY في إعدادات Cloudflare.' : 'تعذر الاتصال بالخادم.'; }
    };
    input.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    app.replaceChildren(el('div', { class: 'login' }, el('h1', { text: 'لوحة طلبات مدار', style: 'margin:0;font-size:20px' }), input, err, el('button', { class: 'btn', type: 'button', text: 'دخول', onclick: go })));
    input.focus();
  }

  function card(o) {
    const sel = el('select', { 'aria-label': 'حالة الطلب' }, Object.keys(ST).map(k => el('option', { value: k, text: ST[k], ...(k === o.status ? { selected: '' } : {}) })));
    sel.addEventListener('change', async () => { sel.disabled = true; const { j } = await api('POST', { ref: o.ref, status: sel.value }); sel.disabled = false; if (j && j.ok) o.status = sel.value; else sel.value = o.status; });
    const hi = encodeURIComponent('مرحبًا ' + o.name + '، وصلنا طلبك رقم ' + o.ref + ' من متجر مدار. نؤكد لك الطلب ونرتب موعد التوصيل.');
    return el('article', { class: 'o' },
      el('div', { class: 'o__top' },
        el('span', { class: 'o__ref', text: o.ref }), el('span', { class: 'o__t', text: when(o.created_at) }),
        el('span', { class: 'pill ' + (o.notified ? 'pill--ok' : 'pill--bad'), text: o.notified ? 'وصلك إشعار' : 'لم يصلك إشعار', title: o.notify_info || '' }), sel),
      el('dl', null,
        el('dt', { text: 'الاسم' }), el('dd', { text: o.name }),
        el('dt', { text: 'الجوال' }), el('dd', null, el('a', { href: 'https://wa.me/' + intl(o.phone) + '?text=' + hi, target: '_blank', rel: 'noopener noreferrer', dir: 'ltr', text: o.phone }), ' (مراسلة العميل على واتساب)'),
        el('dt', { text: 'المدينة' }), el('dd', { text: o.city }),
        el('dt', { text: 'العنوان' }), el('dd', { text: o.address }),
        ...(o.notes ? [el('dt', { text: 'ملاحظات' }), el('dd', { text: o.notes })] : [])),
      el('ul', null, o.items.map(i => el('li', { text: `${i.name}${i.v ? ' (' + i.v + ')' : ''} × ${i.qty} = ${num(i.price * i.qty)} ريال` }))),
      el('div', { class: 'sum' }, el('span', { text: 'المجموع الفرعي: ' + num(o.subtotal) + ' ريال' }), ...(o.discount ? [el('span', { text: 'الخصم: -' + num(o.discount) + ' ريال' })] : []),
        el('span', { text: 'التوصيل: ' + (o.free_shipping ? 'مجاني' : 'يُحدد عند التأكيد') }), el('span', { text: 'الإجمالي: ' + num(o.total) + ' ريال' })));
  }

  function show() {
    const list = orders.filter(o => filter === 'all' || o.status === filter);
    const tabs = el('div', { class: 'tabs' }, [['new', 'جديدة'], ['confirmed', 'مؤكدة'], ['done', 'مسلّمة'], ['cancelled', 'ملغية'], ['all', 'الكل']].map(([k, t]) =>
      el('button', { class: 'tab', type: 'button', 'aria-pressed': String(filter === k), text: `${t} (${k === 'all' ? orders.length : orders.filter(o => o.status === k).length})`, onclick: () => { filter = k; show(); } })));
    const info = el('div', { class: 'info', hidden: '' });
    const test = el('button', { class: 'btn btn--ghost', type: 'button', text: 'إرسال رسالة تجريبية', onclick: async () => {
      test.disabled = true; const { j } = await api('POST', { action: 'test' }); test.disabled = false; info.hidden = false;
      info.textContent = !j || !j.ok ? 'تعذر الإرسال.' : !j.configured ? 'لم تُفعَّل أي قناة إشعار بعد (واتساب أو تيليجرام).' : j.ok && j.sent.length ? 'أُرسلت الرسالة عبر: ' + j.sent.join('، ') + (j.failed.length ? ' | فشل: ' + j.failed.join('، ') : '') : 'فشل الإرسال: ' + j.failed.join('، ');
    } });
    const refresh = el('button', { class: 'btn btn--ghost', type: 'button', text: 'تحديث', onclick: async () => { const { status, j } = await api('GET'); if (status === 200 && j.ok) { orders = j.orders; show(); } else login('انتهت الجلسة.'); } });
    const out = el('button', { class: 'btn btn--ghost', type: 'button', text: 'خروج', onclick: () => { try { sessionStorage.removeItem('madar.admin'); } catch (e) { } KEY = ''; login(); } });
    app.replaceChildren(el('header', null, el('h1', { text: 'طلبات مدار' }), test, refresh, out),
      el('main', null, info, tabs, ...(list.length ? list.map(card) : [el('div', { class: 'empty', text: 'لا توجد طلبات هنا.' })])));
  }

  (async () => { if (KEY) { const { status, j } = await api('GET'); if (status === 200 && j && j.ok) { orders = j.orders; return show(); } KEY = ''; } login(); })();
})();

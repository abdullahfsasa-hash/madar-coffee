(function(){
'use strict';
/* ===================== الإعدادات ===================== */
const CONFIG = {
  api: '/api/order',        // مسار استقبال الطلبات على الخادم. إن لم يتوفر يعود الموقع لإرسال الطلب عبر واتساب.
  whatsapp: '966551890800', // رقم واتساب المتجر بصيغة دولية بدون + . كل طلب جديد يصل إليه كرسالة كاملة.
  freeFrom: 200,         // حد التوصيل المجاني بالريال
  code: 'MADAR10',       // كود الخصم
  pct: 10                // نسبة الخصم
};

/* ===================== الأقسام ===================== */
const CATS = {
  beans:   { label: 'محاصيل البن',   en: 'COFFEE BEANS',   title: 'محاصيل البن',   text: 'من مختلف أنحاء العالم .. محاصيل مختارة بعناية لمن يبحث عن تجربة قهوة استثنائية.', tile: 'oro-blanco', pos: '50% 62%' },
  cups:    { label: 'الأكواب',       en: 'CUPS & MUGS',    title: 'الأكواب',       text: 'أكواب وفناجين من السيراميك والبورسلان تكمل طقس قهوتك، وتصلح هدية أنيقة.', tile: 'volc-latte', pos: '50% 45%' },
  gear:    { label: 'معدات القهوة',  en: 'BREWING GEAR',   title: 'معدات القهوة',  text: 'كل ما تحتاجه لتحضير القهوة المقطّرة في البيت أو في السفر.', tile: 'v60-set', pos: '60% 78%' },
  filters: { label: 'فلاتر القهوة',  en: 'COFFEE FILTERS', title: 'فلاتر القهوة',  text: 'فلاتر ورقية بمقاسات مختلفة تمنحك كوبًا صافيًا ونظيف النكهة.', tile: 'tile-filters', pos: '50% 100%' },
  matcha:  { label: 'الماتشا',       en: 'MATCHA',         title: 'الماتشا',       text: 'ماتشا للاستخدام في الطقوس والمشروبات الباردة والساخنة.', tile: 'matcha', pos: '50% 50%' }
};
const NAV = ['home', 'beans', 'cups', 'gear', 'filters', 'blog'];

/* ===================== المنتجات =====================
   ph:true  = السعر مؤقت ويحتاج تأكيدك. الأسعار الحقيقية جاءت من محادثتك وإعلاناتك. */
const P = [
  { id: 'v60-set', cat: 'gear', name: 'طقم V60 للسفر', en: 'V60 Travel Set', brand: 'مدار',
    sub: 'قمع V60 • إبريق سكب • مطحنة يدوية', price: 160, old: 230,
    img: 'v60-set', gallery: ['v60-set'], tags: [],
    short: 'كل ما تحتاجه لقهوة مقطّرة بجودة المقاهي في حقيبة أنيقة واحدة: قمع V60 وسيرفر وإبريق سكب ومطحنة يدوية.',
    desc: 'طقم السفر من مدار لمن لا يتنازل عن قهوته أينما كان، في البيت أو المكتب أو الرحلات. يجمع قمع V60 الأسود الذي يُبرز نكهات البن بوضوح، وسيرفرًا زجاجيًا ترى فيه لون قهوتك، وإبريقًا بعنق رفيع يمنحك تحكمًا دقيقًا في السكب، ومطحنة يدوية تطحن البن قبل التحضير مباشرة، مع ملعقة قياس وأوراق فلتر. وتأتي القطع مرتبة في حقيبة بسحّاب تحميها وتسهّل حملها.',
    details: ['حقيبة سفر بسحّاب تحمي القطع وتسهّل حملها', 'قمع V60 أسود وسيرفر زجاجي', 'إبريق سكب بعنق رفيع للتحكم الدقيق بالتدفق', 'مطحنة يدوية لطحن البن قبل التحضير', 'ملعقة قياس وأوراق فلتر مرفقة'],
    specs: [['النوع', 'طقم تحضير مقطّرة'], ['القمع', 'V60 أسود'], ['السيرفر', 'زجاج'], ['المطحنة', 'يدوية'], ['الحقيبة', 'جلد صناعي مبطّن']] },

  { id: 'cup-blue', cat: 'cups', name: 'كوب سيراميك أزرق مع صحن مموّج', en: 'Ceramic Blue', brand: 'مدار',
    sub: '210 مل • مع صحن مموّج', price: 25, old: 60,
    img: 'cup-blue-1', gallery: ['cup-blue-1', 'cup-blue-marble', 'cup-blue-size'], tags: ['saucer'],
    short: 'كوب سيراميك أزرق بسعة 210 مل مع صحن مموّج مطابق، أنيق للكابتشينو والفلات وايت.',
    desc: 'كوب سيراميك بحافة زرقاء متدرّجة وتزجيج لامع، يأتي مع صحن مموّج مطابق يكمل المشهد على طاولتك. سعته 210 مل، وهي مناسبة للكابتشينو والفلات وايت واللاتيه الصغير، وحجمه مريح في اليد. يصلح للاستخدام اليومي ولتقديم الضيافة، ويُهدى بسهولة.',
    details: ['سعة 210 مل', 'يأتي مع صحن مموّج مطابق', 'تزجيج لامع بحافة زرقاء متدرّجة', 'مناسب للكابتشينو والفلات وايت', 'خيار أنيق للإهداء'],
    specs: [['السعة', '210 مل'], ['المادة', 'سيراميك'], ['الكوب', '12.5 × 10 × 6 سم'], ['الصحن', '18 × 16 × 2 سم']] },

  { id: 'oro-blanco', cat: 'beans', name: 'بلانكو', en: 'Blanco', brand: 'Oro Coffee Roasters', roaster: 'محمصة أورو، الرياض',
    sub: 'كراميل • سكر بني • لوز', price: 90, ph: true, origin: 'co', originName: 'كولومبيا', originEn: 'COLOMBIA',
    img: 'oro-blanco', gallery: ['oro-blanco'], tags: ['co'],
    short: 'بن كولومبي مغسول من محمصة أورو في الرياض، بنكهات الكراميل والسكر البني واللوز وقوام ناعم ونظيف.',
    desc: 'بلانكو بن مختص من كولومبيا بمعالجة مغسولة، مزروع على ارتفاع 1600 إلى 2000 م ومحمّص في الرياض على يد محمصة أورو. يتميّز بنكهات الكراميل والسكر البني واللوز، وبقوام ناعم وغني ونظيف يجعله مريحًا للشرب. يناسب القهوة المقطّرة مثل V60، ويأتي في كيس 250 جم.',
    details: ['قهوة مختصة محمّصة في الرياض', 'نكهات: كراميل، سكر بني، لوز', 'القوام: ناعم، غني، نظيف', 'مغسولة من كولومبيا، 1600–2000 م', 'كيس 250 جم'],
    specs: [['الأصل', 'كولومبيا'], ['المعالجة', 'مغسولة'], ['الارتفاع', '1600 – 2000 م'], ['الوزن', '250 جم']],
    card: [['المعالجة', 'مغسولة'], ['الارتفاع', '1600–2000 م'], ['الوزن', '250 جم']] },

  { id: 'bk-excelso', cat: 'beans', name: 'اكسيلسو', en: 'Excelso', brand: 'Black Knight', roaster: 'بلاك نايت',
    sub: 'حمضيات • سكر بني • لوز', price: 78, ph: true, origin: 'co', originName: 'كولومبيا', originEn: 'COLOMBIA',
    img: 'bk-excelso', gallery: ['bk-excelso'], tags: ['co'],
    short: 'بن كولومبي مغسول من بلاك نايت بحموضة متوسطة 4/10، ونكهات الحمضيات والسكر البني واللوز.',
    desc: 'اكسيلسو بن كولومبي مغسول من بلاك نايت، يجمع حموضة متوسطة (4 من 10) تضيف إشراقة خفيفة مع نكهات الحمضيات والسكر البني واللوز. قوامه ناعم وغني ونظيف، وهو خيار متوازن لمن يحب قهوة مقطّرة نظيفة بلمسة حيوية. الكيس 250 جم.',
    details: ['نكهات: حمضيات، سكر بني، لوز', 'القوام: ناعم، غني، نظيف', 'الحموضة: 4 من 10', 'مغسولة من كولومبيا', 'كيس 250 جم'],
    specs: [['الأصل', 'كولومبيا'], ['المعالجة', 'مغسولة'], ['الحموضة', '4/10'], ['الوزن', '250 جم']],
    card: [['المعالجة', 'مغسولة'], ['الحموضة', '4/10'], ['الوزن', '250 جم']] },

  { id: 'bk-silver', cat: 'beans', name: 'سيلفر', en: 'Silver', brand: 'Black Knight', roaster: 'بلاك نايت',
    sub: 'موز • كراميل • شوكولاتة', price: 82, ph: true, origin: 'sv', originName: 'السلفادور', originEn: 'EL SALVADOR',
    img: 'bk-silver', gallery: ['bk-silver'], tags: ['sv'],
    short: 'بن سلفادوري بمعالجة الهني، جسم ممتلئ ونكهات الموز والكراميل والشوكولاتة.',
    desc: 'سيلفر بن من السلفادور من منطقة تشالاتينانغو، صنف بوربون بمعالجة الهني التي يُترك فيها جزء من لب الثمرة أثناء التجفيف فتزيد الحلاوة والجسم. تظهر فيه نكهات الموز والكراميل والشوكولاتة مع لمسة مكسرات وشوكولاتة داكنة، وحموضة معتدلة 4 من 10. مناسب لمحبي القهوة الحلوة ذات الجسم الممتلئ. كيس 250 جم.',
    details: ['المنطقة: تشالاتينانغو، السلفادور', 'الصنف: بوربون', 'المعالجة: هني', 'نكهات: موز، كراميل، شوكولاتة، مكسرات، شوكولاتة داكنة', 'الجسم: ممتلئ', 'الحموضة: 4 من 10'],
    specs: [['الأصل', 'السلفادور'], ['المعالجة', 'هني'], ['المنطقة', 'تشالاتينانغو'], ['الصنف', 'بوربون'], ['الارتفاع', '1200 – 1800 م'], ['الحموضة', '4/10'], ['الوزن', '250 جم']],
    card: [['المعالجة', 'هني'], ['الحموضة', '4/10'], ['الوزن', '250 جم']] },

  { id: 'bk-adham', cat: 'beans', name: 'أدهم', en: 'Adham', brand: 'Black Knight', roaster: 'بلاك نايت',
    sub: 'بندق • كراميل • شوكولاتة بالحليب', price: 68, ph: true, origin: 'blend', originName: 'مزيج', originEn: 'BLEND',
    img: 'bk-adham', gallery: ['bk-adham'], tags: ['blend'],
    short: 'مزيج متوازن بحموضة منخفضة (3.7/10)، بنكهات البندق والكراميل وشوكولاتة الحليب.',
    desc: 'أدهم مزيج من بلاك نايت صُمم ليكون مريحًا ومألوفًا: حموضة منخفضة (3.7 من 10) ونكهات البندق والكراميل وشوكولاتة الحليب. يناسب القهوة المقطّرة كما يناسب تحضيرها مع الحليب. كيس 250 جم.',
    details: ['نكهات: بندق، كراميل، شوكولاتة بالحليب', 'حموضة منخفضة 3.7 من 10', 'مزيج متوازن', 'كيس 250 جم'],
    specs: [['النوع', 'مزيج'], ['الحموضة', '3.7/10'], ['الوزن', '250 جم']],
    card: [['النوع', 'مزيج'], ['الحموضة', '3.7/10'], ['الوزن', '250 جم']] },

  { id: 'sout-mananasi', cat: 'beans', name: 'ماناناسي', en: 'Mananasi', brand: 'Sout Coffee Roasters', roaster: 'محمصة صوت',
    sub: 'مانجو • مشمش • باشن فروت', price: 70, ph: true, origin: 'ug', originName: 'أوغندا', originEn: 'UGANDA',
    img: 'sout-mananasi', gallery: ['sout-mananasi'], tags: ['ug'],
    short: 'بن أوغندي مجفف من ارتفاع 2200 م، بنكهات المانجو والمشمش والباشن فروت وخاتمة شوكولاتة داكنة.',
    desc: 'ماناناسي من محمصة صوت: بن أوغندي بمعالجة مجففة تُجفف فيها الثمرة كاملة فتظهر نكهات فاكهية عالية. مزروع على ارتفاع 2200 م، ويقدّم المانجو والمشمش والباشن فروت وتنتهي رشفته بشوكولاتة داكنة. خيار منعش لمحبي القهوة الفاكهية والتجارب الجديدة. كيس 125 جم.',
    details: ['نكهات: مانجو، مشمش، باشن فروت، شوكولاتة داكنة', 'مجففة (Natural) من أوغندا', 'زراعة على ارتفاع 2200 م', 'كيس 125 جم'],
    specs: [['الأصل', 'أوغندا'], ['المعالجة', 'مجففة'], ['الارتفاع', '2200 م'], ['الوزن', '125 جم']],
    card: [['المعالجة', 'مجففة'], ['الارتفاع', '2200 م'], ['الوزن', '125 جم']] },

  { id: 'bk-ronaldo', cat: 'beans', name: 'أظرف رونالدو', en: 'Ronaldo Drip Bags', brand: 'Black Knight', roaster: 'بلاك نايت',
    sub: '5 أظرف • كولومبيا أنيروبيك', price: 36, old: 40, origin: 'co', originName: 'كولومبيا', originEn: 'COLOMBIA',
    img: 'bk-ronaldo', gallery: ['bk-ronaldo'], tags: ['co', 'drip'],
    short: '5 أظرف قهوة مقطّرة جاهزة من كولومبيا، علّق الظرف على الكوب واسكب الماء الساخن.',
    desc: 'أظرف رونالدو من بلاك نايت قهوة مقطّرة جاهزة بدون أدوات: علّق الظرف على حافة الكوب، اسكب الماء الساخن، وانتظر لتحصل على قهوة مختصة في دقائق. بن كولومبي بمعالجة أنيروبيك، وكل ظرف يكفي كوبًا واحدًا. مثالي للمكتب والسفر وكهدية صغيرة.',
    details: ['علبة تحتوي 5 أظرف', 'كولومبيا بمعالجة أنيروبيك', 'تحضير سريع بدون مطحنة أو قمع', 'ظرف لكل كوب'],
    specs: [['الأصل', 'كولومبيا'], ['المعالجة', 'أنيروبيك'], ['العدد', '5 أظرف'], ['الطريقة', 'مقطّرة جاهزة']],
    card: [['النوع', 'أظرف مقطّرة'], ['العدد', '5 أظرف'], ['الأصل', 'كولومبيا']] },

  { id: 'volcanic', cat: 'cups', name: 'كوب سيراميك حجري بركاني', en: 'Volcanic Ceramic Cup', brand: 'مدار',
    sub: '170 مل • ألوان متعددة', price: 21, old: 30,
    img: 'volc-latte', gallery: ['volc-latte', 'volc-hands', 'volc-grid'], tags: ['mug'],
    variants: [
      { k: 'أزرق ليلي', c: '#1b2c5e', img: 'volc-6' },
      { k: 'أزرق وأحمر ناري', c: '#27508f', img: 'volc-3' },
      { k: 'وردي', c: '#b86a93', img: 'volc-5' },
      { k: 'أخضر ليموني', c: '#a7b04a' },
      { k: 'أخضر داكن', c: '#2f6b57' },
      { k: 'تركوازي', c: '#4fb3b0' },
      { k: 'أحمر', c: '#b5322a' },
      { k: 'رمادي فضي', c: '#aab0b8' }
    ], vlabel: 'اللون', vfb: 'volc-grid',
    short: 'كوب سيراميك حجري بتزجيج بركاني متدرّج، سعة 170 مل، بألوان متعددة لا يتشابه فيها كوبان.',
    desc: 'كوب من السيراميك الحجري بتزجيج بركاني متدرّج الألوان، فيبدو كل كوب قطعة فريدة. صغير الحجم وبدون مقبض فيستقر في كفك دافئًا، وسعته 170 مل مناسبة للإسبريسو والقهوة المقطّرة والشاي. اختر لونك المفضل من ثمانية ألوان.',
    details: ['سعة 170 مل', 'تزجيج بركاني متدرّج، لا يتشابه كوبان', 'بدون مقبض ومريح في اليد', '8 ألوان للاختيار'],
    specs: [['السعة', '170 مل'], ['العرض', '7.5 سم'], ['الارتفاع', '6.5 سم'], ['المادة', 'سيراميك حجري']] },

  { id: 'mug-arabic', cat: 'cups', name: 'كوب قهوة بعبارة عربية', en: 'Arabic Verse Mug', brand: 'مدار',
    sub: '265 مل • بورسلان ناعم', price: 39, ph: true,
    img: 'mug-arabic', gallery: ['mug-arabic'], tags: ['mug'],
    short: 'كوب بورسلان أنيق بعبارة عربية شهيرة على الجانب، مثالي لبار القهوة وللإهداء.',
    desc: 'كوب قهوة أنيق مناسب لبار القهوة الخاص بك ومناسب للإهداء. من مادة البورسلان بملمس ناعم مع حفر جانبي، وتوجد عليه عبارة عربية شهيرة: «ستشرقُ في صباحك ألف شمسٍ، تضيءُ ولا يَحينُ لها غروبُ». سعته 265 مل، مناسبة لمشروبات الكابتشينو والقهوة المقطّرة، ويأتي الكوب بعبارته.',
    details: ['عبارة عربية شهيرة على الجانب', 'من مادة البورسلان بملمس ناعم مع حفر جانبي', 'سعة 265 مل', 'مناسب للكابتشينو والقهوة المقطّرة', 'مناسب للإهداء'],
    specs: [['السعة', '265 مل'], ['المادة', 'بورسلان'], ['العرض', '7.6 سم'], ['الارتفاع', '9.4 سم']] },

  { id: 'cup-speckled', cat: 'cups', name: 'فنجان سيراميك مرقّط مع صحن', en: 'Speckled Cup & Saucer', brand: 'مدار',
    sub: 'تزجيج مرقّط • صحن مطابق', price: 45, ph: true,
    img: 'cup-teal', gallery: ['cup-teal', 'cup-turq'], tags: ['saucer'],
    variants: [
      { k: 'أخضر مزرق', c: '#1f6a73', img: 'cup-teal' },
      { k: 'فيروزي', c: '#69bfd0', img: 'cup-turq' }
    ], vlabel: 'اللون',
    short: 'فنجان سيراميك بتزجيج مرقّط وحافة برونزية دافئة، يأتي مع صحن مطابق.',
    desc: 'فنجان سيراميك بتزجيج مرقّط بحافة بنية برونزية دافئة، يأتي مع صحن مطابق. تصميمه الحِرفي يضيف لمسة جميلة لطاولة الضيافة ولبار القهوة، ويتوفر بلونين: أخضر مزرق وفيروزي.',
    details: ['تزجيج مرقّط بحافة برونزية', 'يأتي مع صحن مطابق', 'لونان: أخضر مزرق وفيروزي'],
    specs: [['المادة', 'سيراميك'], ['المرفقات', 'صحن مطابق'], ['التزجيج', 'مرقّط']] },

  { id: 'matcha', cat: 'matcha', name: 'ماتشا سيريمونيال', en: 'Ceremony Matcha', brand: 'Merlinbird',
    sub: '30 جم • علبة معدنية', price: 72, old: 80,
    img: 'matcha', gallery: ['matcha', 'ad-matcha'], tags: [],
    short: 'ماتشا سيريمونيال من Merlinbird في علبة معدنية 30 جم، تُحضَّر ساخنة أو كلاتيه مثلج.',
    desc: 'ماتشا سيريمونيال من Merlinbird في علبة معدنية تحفظ النكهة، بوزن 30 جرامًا. تُخفق مع الماء الساخن بالطريقة التقليدية، أو تُمزج مع الحليب والثلج للاتيه الماتشا البارد.',
    details: ['وزن 30 جم', 'علبة معدنية تحفظ النكهة', 'تُخفق بالماء الساخن أو تُمزج في اللاتيه', 'ماتشا سيريمونيال'],
    specs: [['النوع', 'ماتشا سيريمونيال'], ['العلامة', 'Merlinbird'], ['الوزن', '30 جم']] },

  { id: 'timemore-ice', cat: 'filters', name: 'فلاتر كولد برو تايمور', en: 'Timemore Ice Dripper Filters', brand: 'Timemore',
    sub: 'لمحضّرة الكولد برو', price: 25, old: 35,
    img: 'timemore-2', gallery: ['timemore-2', 'timemore-1'], tags: ['round'],
    short: 'فلاتر ورقية دائرية لمحضّرة الكولد برو Timemore Ice Dripper، لكوب صافٍ ونظيف.',
    desc: 'فلاتر ورقية دائرية من Timemore مصممة لمحضّرة الكولد برو بالتنقيط (Ice Dripper)، تحجب الرواسب وتعطي مشروبًا باردًا صافيًا ونظيف النكهة. تأتي في كيس محكم.',
    details: ['فلاتر ورقية دائرية', 'مخصصة لمحضّرة Timemore Ice Dripper', 'تعطي كوبًا صافيًا ونظيف النكهة'],
    specs: [['العلامة', 'Timemore'], ['الشكل', 'دائري'], ['الاستخدام', 'كولد برو بالتنقيط']] },

  { id: 'kalita-185', cat: 'filters', name: 'فلاتر كاليتا ويف 185', en: 'Kalita 185 Wave Filter', brand: 'Kalita', ph: true,
    sub: 'فلاتر ورقية بتموّج مميّز', price: 22,
    img: 'kalita', gallery: ['kalita'], tags: ['wave'],
    short: 'فلاتر ورقية بتصميم ويف المموّج من Kalita، مقاس 185، لاستخلاص متوازن.',
    desc: 'فلاتر Kalita Wave مقاس 185 بتصميم مموّج وقاعدة مسطحة، توزع الماء على البن بتساوٍ فتمنح استخلاصًا متوازنًا وكوبًا حلوًا وثابتًا.',
    details: ['مقاس 185', 'تصميم ويف مموّج بقاعدة مسطحة', 'استخلاص متوازن'],
    specs: [['العلامة', 'Kalita'], ['المقاس', '185'], ['الشكل', 'ويف مموّج']] },

  { id: 'albanco', cat: 'filters', name: 'فلاتر ورقية مخروطية', en: 'Al Banco Filter Paper', brand: 'Al Banco', ph: true,
    sub: 'فلاتر مخروطية بيضاء', price: 18,
    img: 'albanco', gallery: ['albanco'], tags: ['cone'],
    short: 'فلاتر ورقية بيضاء بشكل مخروطي من Al Banco، ترشيح نظيف لقهوة مقطّرة صافية.',
    desc: 'فلاتر ورقية بيضاء بشكل مخروطي من Al Banco تأتي في علبة أنيقة، تعطي ترشيحًا نظيفًا وتحافظ على صفاء الكوب. مناسبة للقهوة المقطّرة.',
    details: ['فلاتر ورقية بيضاء', 'شكل مخروطي', 'ترشيح نظيف'],
    specs: [['العلامة', 'Al Banco'], ['الشكل', 'مخروطي'], ['اللون', 'أبيض']] }
];

const PILLS = {
  beans: [['all', 'جميع المحاصيل'], ['co', 'كولومبيا'], ['sv', 'السلفادور'], ['ug', 'أوغندا'], ['blend', 'مزيج'], ['drip', 'أظرف مقطّرة']],
  cups: [['all', 'الكل'], ['mug', 'أكواب'], ['saucer', 'فناجين مع صحن']],
  filters: [['all', 'الكل'], ['round', 'دائرية'], ['wave', 'ويف'], ['cone', 'مخروطية']]
};

const FEATURED = ['v60-set', 'cup-blue', 'oro-blanco', 'bk-silver'];
const OFFERS = [
  { id: 'v60-set', img: 'ad-v60', alt: 'عرض الانطلاق: طقم V60 بسعر 160 ريال بدل 230' },
  { id: 'matcha', img: 'ad-matcha', alt: 'عرض الماتشا: 72 ريال بدل 80' },
  { id: 'cup-blue', img: 'ad-cup', alt: 'عرض الانطلاق: كوب سيراميك أزرق بسعر 25 ريال بدل 60' }
];

/* ===================== المدونة ===================== */
const POSTS = [
  { id: 'v60-guide', title: 'قهوة V60 في البيت: ست خطوات تضبط كوبك', min: 3, img: 'v60-set', related: ['v60-set', 'albanco', 'oro-blanco'],
    excerpt: 'نسبة الماء والبن، ودرجة الطحن، ومتى تتوقف عن السكب. دليل مختصر لكوب صافٍ ومتوازن.',
    lead: 'قمع V60 يعطيك كوبًا صافيًا تظهر فيه نكهات البن بوضوح، وتحضيره أسهل مما يبدو. هذه الطريقة تناسب أغلب أنواع البن المحمّص تحميصًا خفيفًا أو متوسطًا.',
    body: [
      { h: 'الخطوات' },
      { ol: [
        '<b>زن المقادير.</b> استخدم 15 جرامًا من البن لكل 240 جرامًا من الماء، أي نسبة قريبة من 1:16. الميزان أدق من الملعقة.',
        '<b>اطحن البن</b> بدرجة متوسطة إلى ناعمة، قريبة من ملح البحر.',
        '<b>اشطف الفلتر</b> بماء ساخن لإزالة طعم الورق وتسخين القمع والكوب، ثم تخلّص من ماء الشطف.',
        '<b>انقع البن.</b> اسكب 30 جرامًا من الماء بدرجة 92 إلى 96 مئوية على البن، وانتظر 30 إلى 45 ثانية حتى ينتفخ ويتنفّس.',
        '<b>أكمل السكب</b> على دفعات بحركة دائرية هادئة، وابتعد عن حواف الفلتر.',
        '<b>راقب الوقت.</b> ينتهي الترشيح عادة بين دقيقتين ونصف وثلاث دقائق.'
      ] },
      { tip: 'إذا انتهى الترشيح أسرع من ذلك فاطحن أنعم قليلًا، وإذا تأخر فاطحن أخشن.' },
      { h: 'ما الذي تحتاجه؟' },
      { p: 'قمع V60 وسيرفر زجاجي وإبريق ذو عنق رفيع للتحكم في السكب، ومطحنة، وفلاتر ورقية، وميزان. طقم V60 للسفر من مدار يجمع أغلب هذه القطع في حقيبة واحدة.' }
    ] },
  { id: 'read-the-bag', title: 'كيف تقرأ كيس البن: الأصل والمعالجة والحموضة', min: 4, img: 'oro-blanco', related: ['bk-excelso', 'bk-silver', 'sout-mananasi'],
    excerpt: 'ما الذي تقوله الأرقام والكلمات على الكيس، وكيف تختار منها ما يناسب ذوقك.',
    lead: 'الكيس الجيد يخبرك بالكثير قبل أن تفتحه. هذه أهم المعلومات المكتوبة عليه وكيف تقرؤها.',
    body: [
      { h: 'الأصل والارتفاع' },
      { p: 'البلد والمنطقة (مثل السلفادور، تشالاتينانغو) يحددان المناخ والتربة وبالتالي طابع النكهة. وغالبًا كلما ارتفعت المزرعة، نضجت الثمرة ببطء وتركّزت حموضتها وحلاوتها. تجد الارتفاع مكتوبًا بالأمتار، مثل 1600 إلى 2000 م.' },
      { h: 'المعالجة' },
      { ul: [
        '<b>مغسولة (Washed):</b> كوب نظيف وحموضة واضحة، مثل كولومبيا اكسيلسو وبلانكو.',
        '<b>هني (Honey):</b> يُترك جزء من لب الثمرة أثناء التجفيف فتزيد الحلاوة والجسم، مثل سيلفر من السلفادور.',
        '<b>مجففة (Natural):</b> تُجفف الثمرة كاملة فتظهر نكهات فاكهية عالية كالمانجو والمشمش، مثل ماناناسي من أوغندا.'
      ] },
      { h: 'الحموضة والنكهات' },
      { p: 'تكتب بعض المحامص مقياس الحموضة من 10، مثل 4/10 على كيس اكسيلسو. كلما انخفض الرقم كان الكوب أقرب إلى الاستدارة والحلاوة. أما النكهات المكتوبة، مثل كراميل ولوز، فهي وصف لما قد تتذوقه وليست نكهات مضافة.' },
      { tip: 'ابدأ بنكهة تحبها: شوكولاتة ومكسرات تعني كوبًا هادئًا، وفواكه استوائية تعني كوبًا منعشًا ومفاجئًا.' }
    ] },
  { id: 'choose-cup', title: 'اختيار الكوب المناسب لقهوتك', min: 3, img: 'volc-latte', related: ['cup-blue', 'volcanic', 'mug-arabic'],
    excerpt: 'السعة والمادة والشكل، وكيف يغيّر الكوب تجربة الرشفة الأولى.',
    lead: 'الكوب جزء من طعم القهوة. حجمه يحدد مشروبك، وخامته تحدد كم تبقى القهوة ساخنة، وشكل حافته يغيّر وصول النكهة إلى لسانك.',
    body: [
      { h: 'السعة أولًا' },
      { ul: [
        'الإسبريسو: من 60 إلى 90 مل، ويناسبه كوب صغير مثل الكوب البركاني (170 مل) لمن يحب المقطّرة والشاي.',
        'الكابتشينو والفلات وايت: من 150 إلى 210 مل، ويناسبه الكوب الأزرق مع صحن (210 مل).',
        'اللاتيه والقهوة المقطّرة: من 250 مل فأكثر، ويناسبه كوب 265 مل.'
      ] },
      { h: 'المادة' },
      { p: 'البورسلان كثيف وأملس ويحافظ على حرارة المشروب، ولا يحمل نكهات من استخدام سابق. السيراميك الحجري أثخن وتتنوع تزجيجاته، ويعطي ملمسًا مميزًا في اليد.' },
      { h: 'الإهداء' },
      { p: 'كوب بعبارة عربية منقوشة أو كوب بتزجيج بركاني فريد يصنع هدية شخصية، وتناسب الجميع من محبي القهوة.' }
    ] }
];

/* ===================== اللغة الإنجليزية: بيانات المحتوى ===================== */
const EN = {
  CATS: {
    beans:   { label: 'Coffee Beans',   title: 'Coffee Beans',   text: 'Carefully selected beans from around the world, for anyone chasing an exceptional cup.' },
    cups:    { label: 'Cups & Mugs',    title: 'Cups & Mugs',    text: 'Ceramic and porcelain cups that complete your coffee ritual and make elegant gifts.' },
    gear:    { label: 'Brewing Gear',   title: 'Brewing Gear',   text: 'Everything you need to brew pour-over coffee at home or on the road.' },
    filters: { label: 'Coffee Filters', title: 'Coffee Filters', text: 'Paper filters in different sizes for a clear, clean-tasting cup.' },
    matcha:  { label: 'Matcha',         title: 'Matcha',         text: 'Matcha for rituals and for hot or iced drinks.' }
  },
  PILLS: {
    beans: [['all', 'All beans'], ['co', 'Colombia'], ['sv', 'El Salvador'], ['ug', 'Uganda'], ['blend', 'Blend'], ['drip', 'Drip bags']],
    cups: [['all', 'All'], ['mug', 'Mugs'], ['saucer', 'Cups with saucer']],
    filters: [['all', 'All'], ['round', 'Round'], ['wave', 'Wave'], ['cone', 'Cone']]
  },
  OFFERS: [
    'Launch offer: V60 set for 160 SAR instead of 230',
    'Matcha offer: 72 SAR instead of 80',
    'Launch offer: blue ceramic cup for 25 SAR instead of 60'
  ],
  P: {
    'v60-set': { name: 'V60 Travel Set', brand: 'Madar', sub: 'V60 dripper • Gooseneck kettle • Hand grinder',
      short: 'Everything you need for café-quality pour-over in one elegant travel case: V60 dripper, server, gooseneck kettle and a hand grinder.',
      desc: 'The Madar travel set is for anyone who refuses to compromise on coffee, at home, at the office or on the road. It brings together a black V60 dripper that lets the beans’ flavours shine, a glass server so you can see your coffee, a thin-spout kettle for precise pouring, and a hand grinder that grinds right before brewing, plus a measuring scoop and paper filters. Everything sits neatly in a zip case that protects the pieces and makes them easy to carry.',
      details: ['Zip travel case that protects and carries every piece', 'Black V60 dripper and glass server', 'Thin-spout kettle for precise flow control', 'Hand grinder to grind just before brewing', 'Measuring scoop and paper filters included'],
      specs: [['Type', 'Pour-over brewing set'], ['Dripper', 'Black V60'], ['Server', 'Glass'], ['Grinder', 'Manual'], ['Case', 'Padded faux leather']] },

    'cup-blue': { name: 'Ceramic Blue Cup with Wavy Saucer', brand: 'Madar', sub: '210 ml • With wavy saucer',
      short: 'A 210 ml blue ceramic cup with a matching wavy saucer, perfect for cappuccino and flat white.',
      desc: 'A ceramic cup with a graduated blue rim and glossy glaze, paired with a matching wavy saucer that completes the picture on your table. At 210 ml it suits cappuccino, flat white and a small latte, and it sits comfortably in the hand. Great for daily use and for serving guests, and easy to give as a gift.',
      details: ['210 ml capacity', 'Comes with a matching wavy saucer', 'Glossy glaze with a graduated blue rim', 'Suits cappuccino and flat white', 'An elegant gift idea'],
      specs: [['Capacity', '210 ml'], ['Material', 'Ceramic'], ['Cup', '12.5 × 10 × 6 cm'], ['Saucer', '18 × 16 × 2 cm']] },

    'oro-blanco': { name: 'Blanco', brand: 'Oro Coffee Roasters', roaster: 'Oro Roastery, Riyadh', sub: 'Caramel • Brown sugar • Almond', originName: 'Colombia',
      short: 'Washed Colombian coffee roasted in Riyadh by Oro, with caramel, brown sugar and almond notes and a smooth, clean body.',
      desc: 'Blanco is a specialty Colombian coffee with a washed process, grown at 1,600 to 2,000 m and roasted in Riyadh by Oro Coffee Roasters. It shows notes of caramel, brown sugar and almond, with a smooth, rich and clean body that makes it easy to drink. A great fit for pour-over methods such as V60, in a 250 g bag.',
      details: ['Specialty coffee roasted in Riyadh', 'Notes: caramel, brown sugar, almond', 'Body: smooth, rich, clean', 'Washed Colombian, 1,600–2,000 m', '250 g bag'],
      specs: [['Origin', 'Colombia'], ['Process', 'Washed'], ['Altitude', '1,600 – 2,000 m'], ['Weight', '250 g']],
      card: [['Process', 'Washed'], ['Altitude', '1,600–2,000 m'], ['Weight', '250 g']] },

    'bk-excelso': { name: 'Excelso', brand: 'Black Knight', roaster: 'Black Knight', sub: 'Citrus • Brown sugar • Almond', originName: 'Colombia',
      short: 'Washed Colombian coffee from Black Knight with medium acidity (4/10) and notes of citrus, brown sugar and almond.',
      desc: 'Excelso is a washed Colombian coffee from Black Knight. Its medium acidity (4 out of 10) adds a gentle brightness to notes of citrus, brown sugar and almond. The body is smooth, rich and clean, a balanced choice for anyone who likes a clean pour-over with a lively touch. 250 g bag.',
      details: ['Notes: citrus, brown sugar, almond', 'Body: smooth, rich, clean', 'Acidity: 4 out of 10', 'Washed Colombian', '250 g bag'],
      specs: [['Origin', 'Colombia'], ['Process', 'Washed'], ['Acidity', '4/10'], ['Weight', '250 g']],
      card: [['Process', 'Washed'], ['Acidity', '4/10'], ['Weight', '250 g']] },

    'bk-silver': { name: 'Silver', brand: 'Black Knight', roaster: 'Black Knight', sub: 'Banana • Caramel • Chocolate', originName: 'El Salvador',
      short: 'Honey-processed Salvadoran coffee with a full body and notes of banana, caramel and chocolate.',
      desc: 'Silver comes from the Chalatenango region of El Salvador: Bourbon variety, honey processed, meaning part of the cherry pulp is left on during drying, which adds sweetness and body. You will taste banana, caramel and chocolate with a touch of nuts and dark chocolate, and a moderate acidity of 4 out of 10. A good match for fans of sweet coffee with a full body. 250 g bag.',
      details: ['Region: Chalatenango, El Salvador', 'Variety: Bourbon', 'Process: Honey', 'Notes: banana, caramel, chocolate, nuts, dark chocolate', 'Body: full', 'Acidity: 4 out of 10'],
      specs: [['Origin', 'El Salvador'], ['Process', 'Honey'], ['Region', 'Chalatenango'], ['Variety', 'Bourbon'], ['Altitude', '1,200 – 1,800 m'], ['Acidity', '4/10'], ['Weight', '250 g']],
      card: [['Process', 'Honey'], ['Acidity', '4/10'], ['Weight', '250 g']] },

    'bk-adham': { name: 'Adham', brand: 'Black Knight', roaster: 'Black Knight', sub: 'Hazelnut • Caramel • Milk chocolate', originName: 'Blend',
      short: 'A balanced blend with low acidity (3.7/10) and notes of hazelnut, caramel and milk chocolate.',
      desc: 'Adham is a Black Knight blend made to be comfortable and familiar: low acidity (3.7 out of 10) with notes of hazelnut, caramel and milk chocolate. It works as a pour-over and just as well with milk. 250 g bag.',
      details: ['Notes: hazelnut, caramel, milk chocolate', 'Low acidity, 3.7 out of 10', 'A balanced blend', '250 g bag'],
      specs: [['Type', 'Blend'], ['Acidity', '3.7/10'], ['Weight', '250 g']],
      card: [['Type', 'Blend'], ['Acidity', '3.7/10'], ['Weight', '250 g']] },

    'sout-mananasi': { name: 'Mananasi', brand: 'Sout Coffee Roasters', roaster: 'Sout Coffee Roasters', sub: 'Mango • Apricot • Passion fruit', originName: 'Uganda',
      short: 'Natural-process Ugandan coffee grown at 2,200 m, with mango, apricot and passion fruit and a dark chocolate finish.',
      desc: 'Mananasi from Sout Coffee Roasters is a Ugandan coffee with a natural process: the whole cherry is dried, which brings out bright fruity flavours. Grown at 2,200 m, it offers mango, apricot and passion fruit, and the sip ends on dark chocolate. A refreshing pick for fans of fruity coffee and new experiences. 125 g bag.',
      details: ['Notes: mango, apricot, passion fruit, dark chocolate', 'Natural process, from Uganda', 'Grown at 2,200 m', '125 g bag'],
      specs: [['Origin', 'Uganda'], ['Process', 'Natural'], ['Altitude', '2,200 m'], ['Weight', '125 g']],
      card: [['Process', 'Natural'], ['Altitude', '2,200 m'], ['Weight', '125 g']] },

    'bk-ronaldo': { name: 'Ronaldo Drip Bags', brand: 'Black Knight', roaster: 'Black Knight', sub: '5 bags • Colombia Anaerobic', originName: 'Colombia',
      short: '5 ready-to-brew drip bags from Colombia: hang a bag on your cup, pour hot water and enjoy.',
      desc: 'Ronaldo drip bags from Black Knight are ready-to-brew pour-over coffee with no equipment: hang the bag on the rim of your cup, pour hot water and wait a few minutes for specialty coffee. A Colombian coffee with an anaerobic process, one bag per cup. Perfect for the office, for travel, or as a small gift.',
      details: ['Box of 5 drip bags', 'Colombian anaerobic process', 'Quick brew, no grinder or dripper needed', 'One bag per cup'],
      specs: [['Origin', 'Colombia'], ['Process', 'Anaerobic'], ['Count', '5 bags'], ['Method', 'Ready-to-brew drip']],
      card: [['Type', 'Drip bags'], ['Count', '5 bags'], ['Origin', 'Colombia']] },

    'volcanic': { name: 'Volcanic Stoneware Cup', brand: 'Madar', sub: '170 ml • Multiple colours', vlabel: 'Colour',
      variantNames: ['Midnight blue', 'Blue & fiery red', 'Pink', 'Lime green', 'Dark green', 'Turquoise', 'Red', 'Silver grey'],
      short: 'A stoneware cup with a graduated volcanic glaze, 170 ml, in several colours, no two exactly alike.',
      desc: 'A stoneware cup with a graduated volcanic glaze, so every cup is one of a kind. It is small and handle-free, resting warm in your palm, and its 170 ml suits espresso, pour-over and tea. Pick your favourite from eight colours.',
      details: ['170 ml capacity', 'Graduated volcanic glaze, no two alike', 'Handle-free and comfortable in the hand', '8 colours to choose from'],
      specs: [['Capacity', '170 ml'], ['Width', '7.5 cm'], ['Height', '6.5 cm'], ['Material', 'Stoneware']] },

    'mug-arabic': { name: 'Arabic Verse Mug', brand: 'Madar', sub: '265 ml • Smooth porcelain',
      short: 'An elegant porcelain mug with a famous Arabic verse on its side, perfect for your coffee bar and as a gift.',
      desc: 'An elegant coffee mug that suits your coffee bar and makes a thoughtful gift. Made of porcelain with a smooth feel and side engraving, it carries a famous Arabic line: “You will shine in your morning with a thousand suns, glowing, and for them there is no setting.” Its 265 ml suits cappuccino and pour-over drinks, and the mug comes with its inscription.',
      details: ['A famous Arabic line on the side', 'Smooth porcelain with side engraving', '265 ml capacity', 'Suits cappuccino and pour-over coffee', 'A thoughtful gift'],
      specs: [['Capacity', '265 ml'], ['Material', 'Porcelain'], ['Width', '7.6 cm'], ['Height', '9.4 cm']] },

    'cup-speckled': { name: 'Speckled Ceramic Cup & Saucer', brand: 'Madar', sub: 'Speckled glaze • Matching saucer', vlabel: 'Colour',
      variantNames: ['Teal', 'Turquoise'],
      short: 'A speckled-glaze ceramic cup with a warm bronze rim, with a matching saucer.',
      desc: 'A ceramic cup with a speckled glaze and a warm bronze-brown rim, paired with a matching saucer. Its handcrafted look adds a lovely touch to a hospitality table or coffee bar, and it comes in two colours: teal and turquoise.',
      details: ['Speckled glaze with a bronze rim', 'Comes with a matching saucer', 'Two colours: teal and turquoise'],
      specs: [['Material', 'Ceramic'], ['Includes', 'Matching saucer'], ['Glaze', 'Speckled']] },

    'matcha': { name: 'Ceremony Matcha', brand: 'Merlinbird', sub: '30 g • Metal tin',
      short: 'Ceremony matcha from Merlinbird in a 30 g metal tin, brewed hot or as an iced latte.',
      desc: 'Ceremony matcha from Merlinbird in a metal tin that keeps the flavour, 30 g. Whisk it with hot water the traditional way, or blend it with milk and ice for a cold matcha latte.',
      details: ['30 g', 'Metal tin that keeps the flavour', 'Whisk with hot water or blend into a latte', 'Ceremony matcha'],
      specs: [['Type', 'Ceremony matcha'], ['Brand', 'Merlinbird'], ['Weight', '30 g']] },

    'timemore-ice': { name: 'Timemore Ice Dripper Filters', brand: 'Timemore', sub: 'For the cold brew dripper',
      short: 'Round paper filters for the Timemore Ice Dripper cold brew maker, for a clear, clean cup.',
      desc: 'Round paper filters from Timemore made for the Ice Dripper cold brew maker. They hold back sediment and give a clear, clean-tasting cold coffee. Packed in a sealed bag.',
      details: ['Round paper filters', 'Made for the Timemore Ice Dripper', 'A clear, clean-tasting cup'],
      specs: [['Brand', 'Timemore'], ['Shape', 'Round'], ['Use', 'Drip cold brew']] },

    'kalita-185': { name: 'Kalita Wave 185 Filters', brand: 'Kalita', sub: 'Paper filters with a distinctive wave',
      short: 'Kalita wave-design paper filters, size 185, for a balanced extraction.',
      desc: 'Kalita Wave filters in size 185, with a wavy design and flat base that spread the water evenly over the coffee for a balanced extraction and a sweet, consistent cup.',
      details: ['Size 185', 'Wavy design with a flat base', 'Balanced extraction'],
      specs: [['Brand', 'Kalita'], ['Size', '185'], ['Shape', 'Wave']] },

    'albanco': { name: 'Cone Paper Filters', brand: 'Al Banco', sub: 'White cone filters',
      short: 'White cone-shaped paper filters from Al Banco, for a clean pour-over cup.',
      desc: 'White cone-shaped paper filters from Al Banco in an elegant box. They give a clean filtration and keep the cup clear. Suited to pour-over coffee.',
      details: ['White paper filters', 'Cone shape', 'Clean filtration'],
      specs: [['Brand', 'Al Banco'], ['Shape', 'Cone'], ['Colour', 'White']] }
  },
  POSTS: {
    'v60-guide': {
      title: 'V60 at home: six steps to dial in your cup',
      excerpt: 'Water-to-coffee ratio, grind size and when to stop pouring. A short guide to a clean, balanced cup.',
      lead: 'A V60 gives you a clean cup where the coffee’s flavours come through clearly, and it is easier than it looks. This method suits most light to medium roasted beans.',
      body: [
        { h: 'The steps' },
        { ol: [
          '<b>Weigh your ingredients.</b> Use 15 g of coffee for every 240 g of water, a ratio close to 1:16. A scale is more accurate than a spoon.',
          '<b>Grind the coffee</b> medium to fine, close to sea salt.',
          '<b>Rinse the filter</b> with hot water to remove the paper taste and warm the dripper and cup, then discard the rinse water.',
          '<b>Bloom the coffee.</b> Pour 30 g of water at 92 to 96 °C over the grounds and wait 30 to 45 seconds until it swells and releases gas.',
          '<b>Continue pouring</b> in stages with a calm circular motion, staying away from the filter walls.',
          '<b>Watch the time.</b> Brewing usually finishes between two and a half and three minutes.'
        ] },
        { tip: 'If it finishes faster than that, grind a little finer; if it takes longer, grind coarser.' },
        { h: 'What do you need?' },
        { p: 'A V60 dripper, a glass server, a thin-spout kettle for pouring control, a grinder, paper filters and a scale. The Madar V60 Travel Set brings most of these pieces together in one case.' }
      ] },
    'read-the-bag': {
      title: 'How to read a coffee bag: origin, process and acidity',
      excerpt: 'What the numbers and words on the bag tell you, and how to choose what suits your taste.',
      lead: 'A good bag tells you a lot before you open it. Here is the key information printed on it and how to read it.',
      body: [
        { h: 'Origin and altitude' },
        { p: 'The country and region (such as El Salvador, Chalatenango) shape the climate and soil, and therefore the character of the flavour. Generally, the higher the farm, the more slowly the cherry ripens and the more concentrated its acidity and sweetness. Altitude is printed in metres, such as 1,600 to 2,000 m.' },
        { h: 'Process' },
        { ul: [
          '<b>Washed:</b> a clean cup with clear acidity, like Colombia Excelso and Blanco.',
          '<b>Honey:</b> part of the cherry pulp is left on during drying, adding sweetness and body, like Silver from El Salvador.',
          '<b>Natural:</b> the whole cherry is dried, bringing out high fruity notes such as mango and apricot, like Mananasi from Uganda.'
        ] },
        { h: 'Acidity and flavours' },
        { p: 'Some roasters print an acidity scale out of 10, such as 4/10 on the Excelso bag. The lower the number, the rounder and sweeter the cup. Flavours such as caramel and almond describe what you may taste; they are not added flavourings.' },
        { tip: 'Start with a flavour you love: chocolate and nuts mean a calm cup, tropical fruit means a refreshing, surprising one.' }
      ] },
    'choose-cup': {
      title: 'Choosing the right cup for your coffee',
      excerpt: 'Capacity, material and shape, and how a cup changes your first sip.',
      lead: 'The cup is part of how coffee tastes. Its size decides your drink, its material decides how long the coffee stays hot, and the shape of its rim changes how flavour reaches your tongue.',
      body: [
        { h: 'Capacity first' },
        { ul: [
          'Espresso: 60 to 90 ml, suited to a small cup such as the Volcanic cup (170 ml) for pour-over and tea lovers.',
          'Cappuccino and flat white: 150 to 210 ml, suited to the Blue cup with saucer (210 ml).',
          'Latte and pour-over: 250 ml and up, suited to the 265 ml mug.'
        ] },
        { h: 'Material' },
        { p: 'Porcelain is dense and smooth and keeps your drink warm, and it does not carry flavours from past use. Stoneware is thicker with a variety of glazes, and gives a distinctive feel in the hand.' },
        { h: 'Gifting' },
        { p: 'A mug with an engraved Arabic line, or a cup with a one-of-a-kind volcanic glaze, makes a personal gift that every coffee lover will enjoy.' }
      ] }
  }
};

/* ===================== اللغات: المحرك والقاموس ===================== */
const clone = o => JSON.parse(JSON.stringify(o));
// لقطة من النسخة العربية الأصلية
const AR0 = clone({ P, CATS, PILLS, POSTS, OFFERS });
AR0.P.forEach(p => { if (p.variants) p.variants.forEach(v => { v.n = v.k; }); });
let LANG = 'ar';
try { const s = localStorage.getItem('madar.lang'); if (s === 'en' || s === 'ar') LANG = s; } catch (e) { }
const isEn = () => LANG === 'en';

// فهرس بحث ثنائي اللغة (عربي + إنجليزي) لكل منتج
const HAY = {};
AR0.P.forEach(a => {
  const e = EN.P[a.id] || {};
  HAY[a.id] = [a.name, a.en, a.brand, a.roaster, a.sub, a.desc, a.originName, AR0.CATS[a.cat].label, e.name, e.brand, e.roaster, e.sub, e.desc, e.originName, EN.CATS[a.cat].label].filter(Boolean).join(' ');
});

function applyData() {
  P.forEach(p => {
    const a = clone(AR0.P.find(x => x.id === p.id));
    Object.keys(p).forEach(k => delete p[k]);
    Object.assign(p, a);
    if (isEn()) {
      const e = clone(EN.P[p.id] || {});
      const vn = e.variantNames; delete e.variantNames;
      Object.assign(p, e);
      if (p.variants && vn) p.variants.forEach((v, i) => { v.n = vn[i] || v.k; });
    }
  });
  Object.keys(CATS).forEach(k => { Object.assign(CATS[k], AR0.CATS[k]); if (isEn() && EN.CATS[k]) Object.assign(CATS[k], EN.CATS[k]); });
  Object.keys(PILLS).forEach(k => { PILLS[k].length = 0; PILLS[k].push(...clone(isEn() && EN.PILLS[k] ? EN.PILLS[k] : AR0.PILLS[k])); });
  POSTS.forEach((a, i) => {
    const base = clone(AR0.POSTS[i]);
    Object.keys(a).forEach(k => delete a[k]);
    Object.assign(a, base);
    if (isEn() && EN.POSTS[a.id]) Object.assign(a, clone(EN.POSTS[a.id]));
  });
  OFFERS.forEach((o, i) => { o.alt = isEn() && EN.OFFERS[i] ? EN.OFFERS[i] : AR0.OFFERS[i].alt; });
}
function applyDir() {
  try {
    const d = document.documentElement;
    d.lang = isEn() ? 'en' : 'ar'; d.dir = isEn() ? 'ltr' : 'rtl';
    $$('.langsw button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.l === LANG)));
  } catch (e) { }
}
const vdisp = (p, k) => { const v = p && p.variants && p.variants.find(x => x.k === k); return v ? (v.n || v.k) : k; };

/* ----- القاموس: النص العربي ← الإنجليزي (المفتاح بمسافات موحّدة) ----- */
const DICT = {
  // الهيكل الثابت
  'انتقل إلى المحتوى': 'Skip to content',
  'كل احتياجات قهوتك في مكان واحد': 'All your coffee, in one place',
  'خصم الإطلاق': 'Launch offer',
  'استخدم كود': 'Use code',
  'نسخ كود الخصم MADAR10': 'Copy discount code MADAR10',
  'فتح القائمة': 'Open menu',
  'التصفح الرئيسي': 'Main navigation',
  'مدار، الرئيسية': 'Madar, home',
  'بحث': 'Search',
  'حسابي والمفضلة': 'My account and wishlist',
  'السلة': 'Cart',
  'من أول حبة بن إلى آخر رشفة ... مدار يجمع تفاصيل قهوتك.': 'From the first bean to the last sip ... Madar brings together every detail of your coffee.',
  'مدار': 'Madar',
  'قهوتك على مدار الساعة. محاصيل بن مختارة، وأكواب، ومعدات تحضير، في مكان واحد.': 'Your coffee, around the clock. Selected coffee beans, cups and brewing gear, all in one place.',
  'تسوّق': 'Shop',
  'المدونة': 'Journal',
  'كل المنتجات': 'All products',
  'المفضلة وطلباتي': 'Wishlist and my orders',
  'خدمة العملاء': 'Customer care',
  'اسأل مساعد مدار': 'Ask the Madar assistant',
  '© 2026 مدار. جميع الحقوق محفوظة.': '© 2026 Madar. All rights reserved.',
  'قهوتك على مدار الساعة': 'Your coffee, around the clock',
  'سلتك': 'Your cart',
  'إغلاق': 'Close',
  'القائمة': 'Menu',
  'حسابي': 'My account',
  'ابحث في المتجر': 'Search the store',
  'ابحث عن بن، كوب، فلاتر…': 'Search beans, cups, filters…',
  'إغلاق البحث': 'Close search',
  'مساعد مدار': 'Madar assistant',
  'أسئلة سريعة عن المتجر': 'Quick questions about the store',
  'عرض الصورة': 'Image preview',
  'الرئيسية': 'Home',
  'المتجر': 'Shop',
  'مسار التنقل': 'Breadcrumb',
  // السلة
  'سلتك فارغة': 'Your cart is empty',
  'اختر من محاصيل البن والأكواب والمعدات، وستجدها هنا.': 'Pick from our beans, cups and gear and they will appear here.',
  'ابدأ التسوق': 'Start shopping',
  'الخيار': 'Option',
  'الكمية': 'Quantity',
  'إنقاص': 'Decrease',
  'زيادة': 'Increase',
  'إزالة': 'Remove',
  'كود الخصم': 'Discount code',
  'تطبيق': 'Apply',
  'المجموع الفرعي': 'Subtotal',
  'التوصيل': 'Delivery',
  'مجاني': 'Free',
  'يُحدد عند التأكيد': 'Calculated at confirmation',
  'الإجمالي': 'Total',
  'إتمام الطلب': 'Checkout',
  'متابعة التسوق': 'Continue shopping',
  'مبروك!': 'Congratulations!',
  'توصيل طلبك مجاني.': 'Your delivery is free.',
  'أضف': 'Add',
  'ريال للحصول على توصيل مجاني.': 'SAR more for free delivery.',
  'ريال': 'SAR',
  'أدخل كود الخصم أولًا.': 'Enter a discount code first.',
  'الكود غير صحيح. تأكد من كتابته كما وصلك.': 'That code is not valid. Check it is typed exactly as you received it.',
  // الرئيسية
  'كل ما تحتاجه لقهوة مثالية': 'Everything you need for the perfect coffee',
  'نجمع لك أفضل محاصيل البن المختارة بعناية، مع الأكواب ومعدات التحضير وكل مستلزمات القهوة في مكان واحد.': 'We bring you the best carefully selected beans, with cups, brewing gear and every coffee essential in one place.',
  'تسوق الآن': 'Shop now',
  'وعاء حبوب بن وقمع V60 وفنجان قهوة على طاولة حجرية': 'A bowl of coffee beans, a V60 dripper and a coffee cup on a stone table',
  'محاصيل البن، الأكواب، المعدات والفلاتر، كل ما تحتاجه لقهوتك في مكان واحد.': 'Beans, cups, gear and filters, everything your coffee needs in one place.',
  'اكتشف قهوتك القادمة': 'Discover your next coffee',
  'محاصيل متنوعة، أدوات تحضير، وأكواب تكمل طقوس قهوتك.': 'A variety of beans, brewing tools and cups to complete your coffee ritual.',
  'ابدأ رحلتك مع مدار': 'Start your journey with Madar',
  'اختيارات مدار': 'Madar picks',
  'عرض جميع المنتجات': 'View all products',
  'عروض الانطلاق': 'Launch offers',
  'كل العروض': 'All offers',
  'نسخ الكود': 'Copy code',
  'نسخ': 'Copy',
  'محاصيل مختارة بعناية': 'Carefully selected beans',
  'بن مختص من محامص سعودية وأصول متنوعة.': 'Specialty coffee from Saudi roasters and a variety of origins.',
  'أكواب تكمل الطقس': 'Cups that complete the ritual',
  'سيراميك وبورسلان بتصاميم لا تتكرر.': 'Ceramic and porcelain in designs that never repeat.',
  'توصيل مجاني': 'Free delivery',
  'جاهزة للإهداء': 'Gift-ready',
  'أكواب وأدوات تصلح هدية لمحبي القهوة.': 'Cups and tools that make a gift for coffee lovers.',
  'من مدونة مدار': 'From the Madar journal',
  'كل المقالات': 'All articles',
  'دليل القهوة': 'Coffee guide',
  'كود الإطلاق': 'Launch code',
  // المتجر
  'الكل': 'All',
  'ترتيب حسب': 'Sort by',
  'المميّز': 'Featured',
  'الأقل سعرًا': 'Price: low to high',
  'الأعلى سعرًا': 'Price: high to low',
  'الأكثر خصمًا': 'Biggest discount',
  'تصفية المنتجات': 'Filter products',
  'المزيد قريبًا': 'More coming soon',
  'نضيف إلى هذا القسم باستمرار.': 'We keep adding to this section.',
  'تصفح كل المنتجات': 'Browse all products',
  'اختر الخيارات': 'Choose options',
  'أضف إلى السلة': 'Add to cart',
  'إزالة من المفضلة': 'Remove from wishlist',
  'إضافة إلى المفضلة': 'Add to wishlist',
  // صفحة المنتج
  'تكبير الصورة': 'Enlarge image',
  'اشترِ الآن': 'Buy now',
  'مناسب للإهداء': 'A great gift',
  'منتج مختار بعناية من مدار': 'Carefully selected by Madar',
  'نكهات القهوة': 'Tasting notes',
  'عن المنتج': 'About this product',
  'المواصفات': 'Specifications',
  'التوصيل والكود': 'Delivery and code',
  'قد يعجبك أيضًا': 'You may also like',
  'منتجات ذات صلة': 'Related products',
  // المدونة
  'مدونة مدار': 'The Madar Journal',
  'أدلة قصيرة عن التحضير والبن والأكواب، لتستمتع بقهوتك أكثر.': 'Short guides on brewing, beans and cups, to help you enjoy your coffee more.',
  // الدفع
  'أدخل بيانات التوصيل وسنجهّز طلبك.': 'Enter your delivery details and we will prepare your order.',
  'الاسم الكامل': 'Full name',
  'رقم الجوال': 'Mobile number',
  'المدينة': 'City',
  'الحي والعنوان': 'District and address',
  'ملاحظات للطلب (اختياري)': 'Order notes (optional)',
  'تأكيد الطلب ·': 'Confirm order ·',
  'ملخص الطلب': 'Order summary',
  'أضف منتجات أولًا لإتمام الطلب.': 'Add products first to check out.',
  'اكتب اسمك الكامل.': 'Please enter your full name.',
  'اكتب رقم جوال صحيح، مثل 05XXXXXXXX.': 'Please enter a valid mobile number, such as 05XXXXXXXX.',
  'اكتب اسم المدينة.': 'Please enter your city.',
  'اكتب الحي والعنوان بشكل أوضح.': 'Please enter your district and address in more detail.',
  'إجمالي طلبك': 'Your order total',
  'هذه نسخة تجريبية من المتجر. الطلب محفوظ في جهازك فقط ولم يُرسل إلى المتجر بعد.': 'This is a demo version of the store. The order is saved on your device only and has not been sent to the store yet.',
  'أرسل الطلب عبر واتساب ليؤكده فريق مدار معك.': 'Send the order via WhatsApp so the Madar team can confirm it with you.',
  'إرسال الطلب عبر واتساب': 'Send order via WhatsApp',
  'نسخ ملخص الطلب': 'Copy order summary',
  'العودة للرئيسية': 'Back to home',
  // الحساب والبحث والمساعد
  'المفضلة': 'Wishlist',
  'لم تضف منتجات للمفضلة بعد. اضغط على القلب في أي منتج لحفظه هنا.': 'No wishlist items yet. Tap the heart on any product to save it here.',
  'طلباتي على هذا الجهاز': 'My orders on this device',
  'لا توجد طلبات بعد.': 'No orders yet.',
  'بن': 'Beans', 'كوب': 'Cup', 'فلاتر': 'Filters', 'ماتشا': 'Matcha', 'كولومبيا': 'Colombia',
  'أهلًا بك في مدار. اختر سؤالًا وأجيبك مباشرة.': 'Welcome to Madar. Pick a question and I will answer right away.',
  'تمت الإضافة إلى السلة': 'Added to cart',
  'عرض السلة': 'View cart',
  'تم نسخ الكود': 'Code copied',
  'تم نسخ ملخص الطلب': 'Order summary copied',
  'مدار للقهوة': 'Madar Coffee',
  'تم تجهيز طلبك': 'Your order is ready',
  'جارٍ إرسال طلبك…': 'Sending your order…',
  'وصلنا طلبك وحُفظ لدينا. سنتواصل معك على واتساب لتأكيده والاتفاق على التوصيل قريبًا.': 'We have received and saved your order. We will message you on WhatsApp shortly to confirm it and arrange delivery.',
  'تعذر إرسال طلبك تلقائيًا. اضغط الزر أدناه لإرساله عبر واتساب. لا يكتمل الطلب إلا بعد إرسال الرسالة.': 'We could not send your order automatically. Press the button below to send it via WhatsApp. Your order is only complete once you send the message.',
  'وصلتنا طلبات كثيرة منك. حاول بعد دقائق.': 'Too many orders from your connection. Please try again in a few minutes.',
  'تعذر قبول بيانات الطلب. راجع الحقول وحاول مرة أخرى.': 'We could not accept the order details. Please check the fields and try again.',
  'سيُفتح واتساب ومعه رسالة طلبك جاهزة. إن لم يُفتح، اضغط الزر أدناه. لا يكتمل الطلب إلا بعد إرسال الرسالة.': 'WhatsApp will open with your order message ready. If it does not, press the button below. Your order is only complete once you send the message.',
  'تفاصيل المنتج': 'Product details',
  'اللغة': 'Language'
};
const RULES = [
  [/^سلتك \((\d+)\)$/, 'Your cart ($1)'],
  [/^(\d+) منتج(?:ات)?(?: · (.+))?$/, null],
  [/^قراءة (\d+) دقائق$/, '$1 min read'],
  [/^وفّر (\d+)%$/, 'Save $1%'],
  [/^الكمية (\d+)$/, 'Qty $1'],
  [/^الصورة (\d+)$/, 'Image $1'],
  [/^خصم الكود \((\d+)%\)$/, 'Code discount ($1%)'],
  [/^خصم الإطلاق (\d+)% على طلبك$/, 'Launch discount: $1% off your order'],
  [/^خصم (\d+)% على طلبك$/, '$1% off your order'],
  [/^لخصم (\d+)% على طلبك$/, 'for $1% off your order'],
  [/^تم تطبيق الكود (\S+)، خصم (\d+)% على طلبك\.$/, 'Code $1 applied: $2% off your order.'],
  [/^تم تطبيق الكود (\S+)$/, 'Code $1 applied'],
  [/^تم نسخ الكود: (.+)$/, 'Code copied: $1'],
  [/^تم نسخ ملخص الطلب: ([\s\S]+)$/, 'Order summary copied'],
  [/^توصيل مجاني للطلبات فوق (\d+) ريال$/, 'Free delivery on orders over $1 SAR'],
  [/^توصيل مجاني فوق (\d+) ريال$/, 'Free delivery over $1 SAR'],
  [/^أضف الكود في السلة قبل إتمام الطلب\. التوصيل مجاني للطلبات فوق (\d+) ريال\.$/, 'Add the code in your cart before checkout. Delivery is free on orders over $1 SAR.'],
  [/^لجميع الطلبات التي تتجاوز (\d+) ريال\.$/, 'On all orders over $1 SAR.'],
  [/^كود الإطلاق (\S+)$/, 'Launch code $1'],
  [/^التوصيل مجاني للطلبات التي تتجاوز (\d+) ريال، وتُحدد رسوم الطلبات الأقل عند تأكيد الطلب\. أدخل الكود (\S+) في السلة للحصول على خصم (\d+)%\.$/, 'Delivery is free on orders over $1 SAR; fees for smaller orders are shown when you confirm. Enter code $2 in your cart for $3% off.'],
  [/^اختر الخيارات: (.+)$/, 'Choose options: $1'],
  [/^اختر (.+) أولًا\.$/, 'Please choose a $1 first.'],
  [/^اختر (.+)$/, 'Choose $1'],
  [/^أضف (.+) إلى السلة$/, 'Add $1 to cart'],
  [/^شكرًا (.+)، تم تجهيز طلبك$/, 'Thank you, $1. Your order is ready.'],
  [/^شكرًا (.+)، وصلنا طلبك$/, 'Thank you, $1. We received your order.'],
  [/^لعدد (\d+) منتج\.$/, 'for $1 item.'],
  [/^لعدد (\d+) منتجات\.$/, 'for $1 items.'],
  [/^لا توجد نتائج لـ «([\s\S]*)»\. جرّب كلمة أخرى\.$/, 'No results for “$1”. Try another word.'],
  [/^([−-]?\s*[\d,]+(?:\.\d+)?) ريال$/, '$1 SAR'],
  [/^المفضلة \((\d+)\)$/, 'Wishlist ($1)']
];
const ARB = /[؀-ۿ]/;
function trStr(s) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s);
  const core = m[2].replace(/\s+/g, ' ');
  if (!core || !ARB.test(core)) return s;
  let out = DICT[core];
  if (out === undefined) {
    for (const [re, rep] of RULES) {
      const r = re.exec(core);
      if (!r) continue;
      if (rep === null) { // «N منتج/منتجات · تاريخ»
        const n = +r[1]; out = n + (n === 1 ? ' item' : ' items') + (r[2] ? ' · ' + r[2] : ''); break;
      }
      out = core.replace(re, rep); break;
    }
  }
  return out === undefined ? s : m[1] + out + m[3];
}
const ATTRS = ['aria-label', 'placeholder', 'alt', 'title'];
const skipNode = n => { const el = n.nodeType === 1 ? n : n.parentElement; return !el || /^(SCRIPT|STYLE)$/.test(el.tagName) || !!el.closest('[data-notr]'); };
function trText(n) {
  if (!isEn() || !ARB.test(n.nodeValue) || skipNode(n)) return;
  const t = trStr(n.nodeValue);
  if (t !== n.nodeValue) { if (n.__ar === undefined) n.__ar = n.nodeValue; n.nodeValue = t; }
}
function trEl(el) {
  if (!isEn() || skipNode(el)) return;
  for (const a of ATTRS) {
    const v = el.getAttribute && el.getAttribute(a);
    if (v && ARB.test(v)) {
      const t = trStr(v);
      if (t !== v) { (el.__arA = el.__arA || {})[a] = el.__arA[a] === undefined ? v : el.__arA[a]; el.setAttribute(a, t); }
    }
  }
}
function trTree(root) {
  if (!root) return;
  if (root.nodeType === 3) { trText(root); return; }
  if (root.nodeType !== 1 || skipNode(root)) return;
  trEl(root);
  const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) { if (n.nodeType === 3) trText(n); else trEl(n); }
}
function restoreAr(root) {
  const w = document.createTreeWalker(root || document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  let n; while ((n = w.nextNode())) {
    if (n.nodeType === 3) { if (n.__ar !== undefined) { n.nodeValue = n.__ar; delete n.__ar; } }
    else if (n.__arA) { for (const a in n.__arA) n.setAttribute(a, n.__arA[a]); delete n.__arA; }
  }
}
let trObs;
function startObserver() {
  if (trObs) return;
  trObs = new MutationObserver(recs => {
    if (!isEn()) return;
    for (const r of recs) {
      if (r.type === 'childList') r.addedNodes.forEach(trTree);
      else if (r.type === 'characterData') trText(r.target);
      else if (r.type === 'attributes') trEl(r.target);
    }
  });
  trObs.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
}

/* ===================== أدوات ===================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => Number(n).toLocaleString('en-US');
const IMG = n => `img/${n}.webp`;
const IMGS = n => `img/${n}-s.webp`;
const byId = id => P.find(p => p.id === id);
const WA = /^\d{8,15}$/.test(String(CONFIG.whatsapp || '')) ? String(CONFIG.whatsapp) : '';
const clean = (s, n, nl) => String(s == null ? '' : s).replace(nl ? /[\u0000-\u0009\u000B-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g : /[\u0000-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g, ' ').replace(/[ \t]{2,}/g, ' ').trim().slice(0, n);
const newCid = () => { try { return crypto.randomUUID().replace(/-/g, ''); } catch (e) { return (Math.random().toString(36).slice(2) + Date.now().toString(36) + Math.random().toString(36).slice(2)).slice(0, 32); } };
const waUrl = o => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(orderText(o));
const disc = p => p.old ? Math.round((p.old - p.price) / p.old * 100) : 0;
const norm = s => String(s).toLowerCase().replace(/[ً-ٟـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
};
const tt = s => (isEn() ? trStr(s) : s);

const ICON = {
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20c.9-3.8 4-6 7.5-6s6.6 2.2 7.5 6"/>',
  bag: '<path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  heartf: '<path fill="currentColor" d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  arrowL: '<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  chat: '<path d="M5 6h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-7l-4 3.5V16H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"/>',
  truck: '<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/>',
  bean: '<ellipse cx="12" cy="12" rx="5.5" ry="8" transform="rotate(35 12 12)"/><path d="M8.5 6.5c3 1.5 4 3 3 5.5s0 4 3.5 5.5"/>',
  cup: '<path d="M5 9h11v4a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H15.5"/><path d="M8 4c0 1 .8 1.4.8 2.4M12 4c0 1 .8 1.4.8 2.4"/>',
  gift: '<rect x="4" y="9" width="16" height="11" rx="1"/><path d="M12 9v11M4 13h16"/><path d="M12 9c-2.5 0-4-1-4-2.5S9.5 4 12 9c2.5-5 4-3.5 4-2.5S14.5 9 12 9z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  wa: '<path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5z"/><path d="M9.2 8.6c.2 3 2.4 5.5 5.6 6.4l1.2-1.4-2-1-.9.8c-.9-.4-1.8-1.3-2.2-2.2l.8-.9-.9-1.9z"/>',
  copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M5 15V6a1 1 0 0 1 1-1h9"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  zoom: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2M11 8.5v5M8.5 11h5"/>',
  spark: '<path fill="currentColor" stroke="none" d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10z"/>'
};
const ico = (n, s = 20, cls = '') => `<svg class="ico ${n === 'arrowL' ? 'ico-dir ' : ''}${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICON[n]}</svg>`;
const FLAG = {
  co: '<svg viewBox="0 0 30 30" preserveAspectRatio="none"><rect width="30" height="15" fill="#F2C318"/><rect y="15" width="30" height="7.5" fill="#1F3F99"/><rect y="22.5" width="30" height="7.5" fill="#C42030"/></svg>',
  sv: '<svg viewBox="0 0 30 30" preserveAspectRatio="none"><rect width="30" height="30" fill="#fff"/><rect width="30" height="10" fill="#1F4FA3"/><rect y="20" width="30" height="10" fill="#1F4FA3"/><circle cx="15" cy="15" r="3" fill="#2F7D4F"/></svg>',
  ug: '<svg viewBox="0 0 30 30" preserveAspectRatio="none"><rect width="30" height="5" fill="#111"/><rect y="5" width="30" height="5" fill="#F2C318"/><rect y="10" width="30" height="5" fill="#C42030"/><rect y="15" width="30" height="5" fill="#111"/><rect y="20" width="30" height="5" fill="#F2C318"/><rect y="25" width="30" height="5" fill="#C42030"/><circle cx="15" cy="15" r="5.2" fill="#fff"/><circle cx="15" cy="15" r="2.4" fill="#444"/></svg>',
  blend: '<svg viewBox="0 0 30 30"><circle cx="12" cy="15" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="15" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>'
};

/* ===================== الحالة ===================== */
const arr = k => { const x = store.get(k, []); return Array.isArray(x) ? x : []; };
const S = {
  tok: 'home', r: { v: 'home' }, open: null, opener: null, last: null, qdraft: '', cpnDraft: '', cpnMsg: '',
  shop: { cat: null, pill: 'all', sort: 'featured' }, pdp: null,
  cart: arr('madar.cart').filter(i => i && byId(i.id)).map(i => { const p = byId(i.id); const v = p.variants && p.variants.some(x => x.k === i.v) ? i.v : (p.variants ? p.variants[0].k : ''); return { id: i.id, v, qty: Math.max(1, Math.min(20, Math.floor(+i.qty) || 1)) }; }),
  wish: arr('madar.wish').filter(id => typeof id === 'string' && byId(id)),
  coupon: (c => typeof c === 'string' ? c.slice(0, 40) : '')(store.get('madar.coupon', '')),
  orders: arr('madar.orders').filter(o => o && o.ref).map(o => ({ ref: clean(o.ref, 24), at: +o.at || 0, count: +o.count || 0, total: +o.total || 0 }))
};
store.set('madar.orders', S.orders);
const saveCart = () => { store.set('madar.cart', S.cart); store.set('madar.coupon', S.coupon); };
saveCart(); store.set('madar.wish', S.wish);

/* ===================== السلة ===================== */
const ckey = i => i.id + '|' + (i.v || '');
const couponOk = () => !!S.coupon && S.coupon.trim().toUpperCase() === CONFIG.code;
function totals() {
  const lines = S.cart.map(i => ({ ...i, p: byId(i.id), key: ckey(i) })).filter(l => l.p);
  const count = lines.reduce((a, l) => a + l.qty, 0);
  const sub = lines.reduce((a, l) => a + l.p.price * l.qty, 0);
  const d = couponOk() ? Math.round(sub * CONFIG.pct / 100) : 0;
  const net = sub - d;
  return { lines, count, sub, d, net, free: net >= CONFIG.freeFrom && sub > 0, left: Math.max(0, CONFIG.freeFrom - net), total: net };
}
function cartAdd(id, v, qty = 1, quiet) {
  const k = id + '|' + (v || '');
  const ex = S.cart.find(i => ckey(i) === k);
  if (ex) ex.qty = Math.min(20, ex.qty + qty); else S.cart.push({ id, v: v || '', qty });
  saveCart(); updateBadge();
  if (S.open === 'cart') renderCart();
  if (!quiet) toast('تمت الإضافة إلى السلة', { label: 'عرض السلة', fn: () => openPanel('cart') });
}
function cartQty(k, d) {
  const i = S.cart.find(x => ckey(x) === k); if (!i) return;
  i.qty += d; if (i.qty <= 0) S.cart = S.cart.filter(x => x !== i); if (i.qty > 20) i.qty = 20;
  saveCart(); updateBadge(); renderCart(); if (S.r.v === 'checkout') render(true);
}
function cartRemove(k) { S.cart = S.cart.filter(x => ckey(x) !== k); saveCart(); updateBadge(); renderCart(); if (S.r.v === 'checkout') render(true); }
function updateBadge() { $('#cc').textContent = totals().count; }
const lineName = l => l.p.name + (l.v ? ` (${l.v})` : '');

function shipBar(t) {
  if (!t.count) return '';
  const pct = Math.min(100, Math.round(t.net / CONFIG.freeFrom * 100));
  return `<div class="ship"><p>${t.free ? '<b>مبروك!</b> توصيل طلبك مجاني.' : `أضف <b class="num">${fmt(t.left)}</b> ريال للحصول على توصيل مجاني.`}</p><div class="bar-p" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i style="width:${pct}%"></i></div></div>`;
}
function renderCart() {
  const t = totals();
  $('#cartT').textContent = t.count ? `سلتك (${t.count})` : 'سلتك';
  const b = $('#cartB'), f = $('#cartF');
  if (!t.count) {
    b.innerHTML = `<div class="empty">${ico('bag', 44)}<b style="font:500 18px var(--font-display)">سلتك فارغة</b><p>اختر من محاصيل البن والأكواب والمعدات، وستجدها هنا.</p><a class="btn" href="#shop" data-nav>ابدأ التسوق</a></div>`;
    f.hidden = true; return;
  }
  f.hidden = false;
  b.innerHTML = shipBar(t) + t.lines.map(l => `
    <div class="li">
      <a href="#p-${l.id}" data-nav><img src="${IMGS(l.p.img)}" alt="${esc(l.p.name)}" width="78" height="78"></a>
      <div>
        <div class="li__n">${esc(l.p.name)}</div>
        ${l.v ? `<div class="li__v">${esc(l.p.vlabel || 'الخيار')}: ${esc(vdisp(l.p, l.v))}</div>` : ''}
        <div class="li__r">
          <div class="qty" role="group" aria-label="الكمية">
            <button type="button" data-act="cq" data-k="${esc(l.key)}" data-d="-1" aria-label="إنقاص">${ico('minus', 16)}</button>
            <output class="num">${l.qty}</output>
            <button type="button" data-act="cq" data-k="${esc(l.key)}" data-d="1" aria-label="زيادة">${ico('plus', 16)}</button>
          </div>
          <b class="num" style="font:600 15px var(--font-display)">${fmt(l.p.price * l.qty)} ريال</b>
        </div>
        <button class="rm" type="button" data-act="crm" data-k="${esc(l.key)}">إزالة</button>
      </div>
    </div>`).join('');
  f.innerHTML = `
    <form class="cpn" id="cpnForm" novalidate>
      <label class="sr" for="cpnIn">كود الخصم</label>
      <input class="inp" id="cpnIn" placeholder="كود الخصم" value="${esc(S.cpnDraft || (couponOk() ? S.coupon : ''))}" autocomplete="off" dir="ltr" data-end>
      <button class="btn btn--line btn--sm" type="submit">تطبيق</button>
    </form>
    <div class="msg ${S.cpnMsg.startsWith('!') ? 'msg--err' : 'msg--ok'}" id="cpnMsg">${esc(S.cpnMsg.replace(/^!/, '')) || (couponOk() ? `تم تطبيق الكود ${esc(CONFIG.code)}` : '')}</div>
    <div class="sum num">
      <div><span>المجموع الفرعي</span><span>${fmt(t.sub)} ريال</span></div>
      ${t.d ? `<div class="disc"><span>خصم الكود (${CONFIG.pct}%)</span><span>− ${fmt(t.d)} ريال</span></div>` : ''}
      <div><span>التوصيل</span><span>${t.free ? 'مجاني' : 'يُحدد عند التأكيد'}</span></div>
      <div class="tot"><span>الإجمالي</span><span>${fmt(t.total)} ريال</span></div>
    </div>
    <a class="btn btn--full" href="#checkout" data-nav>إتمام الطلب ${ico('arrowL', 18)}</a>
    <button class="btn btn--line btn--full" type="button" data-act="close">متابعة التسوق</button>`;
}
function applyCoupon(code) {
  code = (code || '').trim();
  S.cpnDraft = code;
  if (!code) { S.cpnMsg = '!أدخل كود الخصم أولًا.'; }
  else if (code.toUpperCase() === CONFIG.code) { S.coupon = CONFIG.code; S.cpnMsg = `تم تطبيق الكود ${CONFIG.code}، خصم ${CONFIG.pct}% على طلبك.`; S.cpnDraft = ''; }
  else { S.coupon = ''; S.cpnMsg = '!الكود غير صحيح. تأكد من كتابته كما وصلك.'; }
  saveCart(); renderCart(); if (S.r.v === 'checkout') render(true);
}

/* ===================== البطاقات ===================== */
function priceHTML(p) {
  return `<div class="price num"><b>${fmt(p.price)}</b><small>ريال</small>${p.old ? `<s>${fmt(p.old)}</s>` : ''}</div>`;
}
function wishBtn(id) {
  const w = S.wish.includes(id);
  return `<button class="wish" type="button" data-act="wish" data-id="${id}" aria-pressed="${w}" aria-label="${w ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}">${ico(w ? 'heartf' : 'heart', 18)}</button>`;
}
function card(p, full) {
  const sale = disc(p), href = `#p-${p.id}`;
  const img = `<a class="pc__img" href="${href}" data-nav tabindex="-1" aria-hidden="true"><img src="${IMGS(p.img)}" alt="" width="560" height="560" loading="lazy" decoding="async">${sale ? `<span class="pc__badge pc__badge--sale">وفّر ${sale}%</span>` : ''}</a>`;
  const opts = !!p.variants;
  const addBtn = opts
    ? `<a class="add" href="${href}" data-nav aria-label="اختر الخيارات: ${esc(p.name)}">${ico('bag', 19)}</a>`
    : `<button class="add" type="button" data-act="add" data-id="${p.id}" aria-label="أضف ${esc(p.name)} إلى السلة">${ico('bag', 19)}</button>`;
  if (full && p.origin) {
    const sp = (p.card || []).map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('');
    return `<article class="pc pc--full">${img}${wishBtn(p.id)}
      <div class="pc__body">
        <div class="origin"><span class="flag">${FLAG[p.origin] || ''}</span><div><b>${p.originName}</b><small>${p.originEn}</small></div></div>
        <h3 class="pc__name"><a href="${href}" data-nav>${esc(p.name)}</a> <span style="font:400 13px var(--font-body);color:var(--muted)">${esc(p.brand)}</span></h3>
        <p class="pc__sub">${esc(p.sub)}</p>
        <div class="specs3">${sp}</div>
        ${priceHTML(p)}
        ${opts ? `<a class="btn btn--full" href="${href}" data-nav>اختر الخيارات</a>` : `<button class="btn btn--full" type="button" data-act="add" data-id="${p.id}">أضف إلى السلة ${ico('bag', 18)}</button>`}
      </div></article>`;
  }
  return `<article class="pc">${img}${wishBtn(p.id)}
    <div class="pc__body">
      <span class="pc__brand">${esc(p.brand)}</span>
      <h3 class="pc__name"><a href="${href}" data-nav>${esc(p.name)}</a></h3>
      <p class="pc__sub">${esc(p.sub)}</p>
      <div class="pc__foot">${priceHTML(p)}${addBtn}</div>
    </div></article>`;
}

/* ===================== الصفحات ===================== */
function heroHome() {
  return `<section class="hero hero--home" aria-label="مدار">
    <div class="hero__media" role="img" aria-label="وعاء حبوب بن وقمع V60 وفنجان قهوة على طاولة حجرية"></div>
    <div class="wrap hero__in"><div class="hero__text">
      <div class="eyebrow">Your coffee, all in one place</div>
      <h1>كل ما تحتاجه لقهوة مثالية</h1>
      <p>نجمع لك أفضل محاصيل البن المختارة بعناية، مع الأكواب ومعدات التحضير وكل مستلزمات القهوة في مكان واحد.</p>
      <a class="btn" href="#shop" data-nav>تسوق الآن ${ico('arrowL', 18)}</a>
    </div></div></section>`;
}
function heroPage(c) {
  const m = c ? CATS[c] : { en: 'ALL PRODUCTS', title: 'كل المنتجات', text: 'محاصيل البن، الأكواب، المعدات والفلاتر، كل ما تحتاجه لقهوتك في مكان واحد.' };
  const split = { cups: ['volc-latte', '50% 42%'], gear: ['v60-set', '50% 80%'] }[c];
  const bgimg = c === 'beans' ? 'hero-beans' : 'hero-home';
  const media = split
    ? `<div class="hero__media"></div><img class="hero__img" src="${IMG(split[0])}" alt="" style="object-position:${split[1]}">`
    : `<div class="hero__media" style="--himg:url(img/${bgimg}.webp);--hx:left;--mx:${c === 'beans' ? '0px' : '-120px'}"></div>`;
  return `<section class="hero hero--page ${split ? 'hero--split' : ''}" aria-label="${m.title}">${media}
    <div class="wrap hero__in"><div class="hero__text">
      <div class="eyebrow">${m.en}</div><h1>${m.title}</h1><p>${m.text}</p>
    </div></div></section>`;
}
function vHome() {
  const tiles = ['beans', 'cups', 'gear', 'filters'].map(k => {
    const c = CATS[k];
    return `<a class="tile ${c.mult ? 'tile--mult' : ''}" href="#shop-${k}" data-nav><img src="${IMG(c.tile)}" alt="" loading="lazy" decoding="async" style="object-position:${c.pos}"><span class="tile__t"><b>${c.label}</b><span class="tile__go">${ico('arrowL', 14)}</span></span></a>`;
  }).join('');
  return `${heroHome()}
  <section class="sec sec--tight"><div class="wrap">
    <div class="tiles-head"><h2>اكتشف قهوتك القادمة</h2><p>محاصيل متنوعة، أدوات تحضير، وأكواب تكمل طقوس قهوتك.</p></div>
    <div class="tiles">${tiles}</div>
    <div class="only-m" style="margin-top:20px"><a class="btn btn--full" href="#shop" data-nav>ابدأ رحلتك مع مدار</a></div>
  </div></section>
  <section class="sec" style="padding-top:34px"><div class="wrap">
    <div class="sec-head"><h2 class="sec-title">اختيارات مدار</h2><a class="sec-link" href="#shop" data-nav><span>عرض جميع المنتجات</span><span class="circ">${ico('arrowL', 14)}</span></a></div>
    <div class="grid">${FEATURED.map(id => card(byId(id))).join('')}</div>
  </div></section>
  <section class="sec" style="padding-top:20px"><div class="wrap">
    <div class="sec-head"><h2 class="sec-title">عروض الانطلاق</h2><a class="sec-link" href="#shop" data-nav><span>كل العروض</span><span class="circ">${ico('arrowL', 14)}</span></a></div>
    <div class="offers">${OFFERS.map(o => `<a class="offer" href="#p-${o.id}" data-nav><img src="${IMG(o.img)}" alt="${esc(o.alt)}" width="1000" height="1000" loading="lazy" decoding="async"></a>`).join('')}</div>
  </div></section>
  <section class="sec" style="padding-top:10px"><div class="wrap">
    <div class="coupon">
      <div><h3>خصم الإطلاق ${CONFIG.pct}% على طلبك</h3><p>أضف الكود في السلة قبل إتمام الطلب. التوصيل مجاني للطلبات فوق ${CONFIG.freeFrom} ريال.</p></div>
      <div class="coupon__code"><b dir="ltr">${CONFIG.code}</b><button type="button" data-act="copy-code">${ico('copy', 16)} نسخ الكود</button></div>
    </div>
  </div></section>
  <section class="sec sec--tight"><div class="wrap"><div class="values">
    <div class="val"><span class="vi">${ico('bean', 22)}</span><div><b>محاصيل مختارة بعناية</b><span>بن مختص من محامص سعودية وأصول متنوعة.</span></div></div>
    <div class="val"><span class="vi">${ico('cup', 22)}</span><div><b>أكواب تكمل الطقس</b><span>سيراميك وبورسلان بتصاميم لا تتكرر.</span></div></div>
    <div class="val"><span class="vi">${ico('truck', 22)}</span><div><b>توصيل مجاني</b><span>لجميع الطلبات التي تتجاوز ${CONFIG.freeFrom} ريال.</span></div></div>
    <div class="val"><span class="vi">${ico('gift', 22)}</span><div><b>جاهزة للإهداء</b><span>أكواب وأدوات تصلح هدية لمحبي القهوة.</span></div></div>
  </div></div></section>
  <section class="sec" style="padding-top:34px"><div class="wrap">
    <div class="sec-head"><h2 class="sec-title">من مدونة مدار</h2><a class="sec-link" href="#blog" data-nav><span>كل المقالات</span><span class="circ">${ico('arrowL', 14)}</span></a></div>
    <div class="posts">${POSTS.map(postCard).join('')}</div>
  </div></section>`;
}
function postCard(a) {
  return `<a class="post" href="#post-${a.id}" data-nav><div class="post__img"><img src="${IMGS(a.img)}" alt="" loading="lazy" decoding="async" width="560" height="560"></div>
    <div class="post__meta"><span>دليل القهوة</span><span>•</span><span>قراءة ${a.min} دقائق</span></div><h3>${a.title}</h3><p>${a.excerpt}</p></a>`;
}

/* ----- المتجر ----- */
function pillsFor() {
  const c = S.shop.cat;
  if (!c) return [['all', 'الكل'], ...Object.keys(CATS).map(k => [k, CATS[k].label])];
  return PILLS[c] || [];
}
function shopList() {
  let a = P.filter(p => !S.shop.cat || p.cat === S.shop.cat);
  const pl = S.shop.pill;
  if (pl !== 'all') a = S.shop.cat ? a.filter(p => p.tags.includes(pl)) : a.filter(p => p.cat === pl);
  const s = S.shop.sort;
  if (s === 'price-asc') a = [...a].sort((x, y) => x.price - y.price);
  if (s === 'price-desc') a = [...a].sort((x, y) => y.price - x.price);
  if (s === 'discount') a = [...a].sort((x, y) => disc(y) - disc(x));
  return a;
}
function shopBody() {
  const pills = pillsFor(), a = shopList(), full = S.shop.cat === 'beans';
  const soon = S.shop.cat && S.shop.pill === 'all' && a.length < 4
    ? `<div class="soon">${ico('bean', 34)}<b>المزيد قريبًا</b><span>نضيف إلى هذا القسم باستمرار.</span><a class="btn btn--line btn--sm" href="#shop" data-nav>تصفح كل المنتجات</a></div>` : '';
  return `<div class="toolbar">
      <div class="pills" role="group" aria-label="تصفية المنتجات">${pills.map(([k, l]) => `<button class="pill" type="button" data-act="pill" data-k="${k}" aria-pressed="${S.shop.pill === k}">${l}</button>`).join('')}</div>
      ${a.length > 1 ? `<label class="sort"><span>ترتيب حسب</span><select class="sel" id="sort"><option value="featured"${S.shop.sort === 'featured' ? ' selected' : ''}>المميّز</option><option value="price-asc"${S.shop.sort === 'price-asc' ? ' selected' : ''}>الأقل سعرًا</option><option value="price-desc"${S.shop.sort === 'price-desc' ? ' selected' : ''}>الأعلى سعرًا</option><option value="discount"${S.shop.sort === 'discount' ? ' selected' : ''}>الأكثر خصمًا</option></select></label>` : ''}
    </div>
    <p class="count num">${a.length} ${a.length === 1 ? 'منتج' : 'منتجات'}</p>
    <div class="grid" style="padding-bottom:70px">${a.map(p => card(p, full)).join('')}${soon}</div>`;
}
function vShop() {
  const c = S.shop.cat;
  return `${heroPage(c)}<div class="wrap">
    <nav class="crumbs" aria-label="مسار التنقل"><a href="#home" data-nav>الرئيسية</a><span>/</span>${c ? `<a href="#shop" data-nav>المتجر</a><span>/</span><span aria-current="page">${CATS[c].label}</span>` : '<span aria-current="page">المتجر</span>'}</nav>
    <div id="shopBody">${shopBody()}</div></div>`;
}

/* ----- صفحة المنتج ----- */
function vPdp() {
  const p = byId(S.r.id), cat = CATS[p.cat], sale = disc(p);
  const thumbs = p.gallery.length > 1
    ? `<div class="gal__thumbs">${p.gallery.map((g, i) => `<button type="button" data-act="pimg" data-i="${i}" aria-current="${i === 0}" aria-label="الصورة ${i + 1}"><img src="${IMGS(g)}" alt="" width="72" height="72"></button>`).join('')}</div>` : '';
  const variants = p.variants ? `<div class="opt" id="vopt"><div class="opt__l">${p.vlabel}: <b id="vname">اختر ${p.vlabel}</b></div><div class="sw" role="group" aria-label="${p.vlabel}">${p.variants.map((v, i) => `<button type="button" data-act="pvar" data-i="${i}" aria-pressed="false" aria-label="${esc(v.n || v.k)}" title="${esc(v.n || v.k)}" style="background:${v.c}"></button>`).join('')}</div><div class="msg msg--err" id="vmsg"></div></div>` : '';
  const rel = [...P.filter(x => x.cat === p.cat && x.id !== p.id), ...P.filter(x => x.cat !== p.cat && x.id !== p.id)].slice(0, 4);
  const notes = (p.cat === 'beans' && !(p.tags || []).includes('drip') && p.sub) ? `<ul class="notes" aria-label="نكهات القهوة">${p.sub.split('•').map(s => `<li>${esc(s.trim())}</li>`).join('')}</ul>` : '';
  const whoLine = [p.brand, p.roaster && p.roaster !== p.brand ? p.roaster : ''].filter(Boolean).join(' · ');
  return `<div class="wrap">
    <nav class="crumbs" aria-label="مسار التنقل"><a href="#home" data-nav>الرئيسية</a><span>/</span><a href="#shop-${p.cat}" data-nav>${cat.label}</a><span>/</span><span aria-current="page">${esc(p.name)}</span></nav>
    <div class="pdp">
      <div class="gal">
        <button class="gal__main" type="button" data-act="lb" aria-label="تكبير الصورة"><img id="gmain" src="${IMG(p.gallery[0])}" alt="${esc(p.name)}" width="1000" height="1000"><span class="zoom">${ico('zoom', 20)}</span></button>
        ${thumbs}
      </div>
      <div class="info">
        <div class="eyebrow">${cat.en}</div>
        <h1>${esc(p.name)}</h1>
        <p class="sub">${esc(whoLine)}</p>
        <div class="priceline num"><b>${fmt(p.price)} ريال</b>${p.old ? `<s>${fmt(p.old)} ريال</s><span class="off">وفّر ${sale}%</span>` : ''}</div>
        <p class="desc">${esc(p.short || p.desc)}</p>${notes}
        ${variants}
        <div class="buy">
          <div class="qty" role="group" aria-label="الكمية"><button type="button" data-act="pq" data-d="-1" aria-label="إنقاص">${ico('minus', 18)}</button><output id="pqty" class="num">1</output><button type="button" data-act="pq" data-d="1" aria-label="زيادة">${ico('plus', 18)}</button></div>
          <button class="btn" type="button" data-act="padd">أضف إلى السلة ${ico('bag', 18)}</button>
          <button class="btn btn--line" type="button" data-act="pbuy">اشترِ الآن</button>
          ${wishBtn(p.id).replace('class="wish"', 'class="wish" style="position:static;width:50px;height:50px;border:1px solid var(--line);background:transparent;color:var(--ink)"')}
        </div>
        <ul class="perks">
          <li>${ico('truck', 20)}<span>توصيل مجاني للطلبات فوق ${CONFIG.freeFrom} ريال</span></li>
          <li>${ico('spark', 18)}<span>استخدم كود <b dir="ltr">${CONFIG.code}</b> لخصم ${CONFIG.pct}% على طلبك</span></li>
          ${p.cat === 'cups' ? `<li>${ico('gift', 20)}<span>مناسب للإهداء</span></li>` : `<li>${ico('check', 20)}<span>منتج مختار بعناية من مدار</span></li>`}
        </ul>
        <div class="acc">
          <details open><summary>عن المنتج ${ico('chev', 18)}</summary><div class="in"><p class="about">${esc(p.desc)}</p></div></details>
          <details open><summary>تفاصيل المنتج ${ico('chev', 18)}</summary><div class="in"><ul class="article" style="max-width:none">${(p.details || []).map(d => `<li style="font-size:15px;line-height:1.9;color:var(--ink-2)">${esc(d)}</li>`).join('')}</ul></div></details>
          <details><summary>المواصفات ${ico('chev', 18)}</summary><div class="in"><table class="tbl"><tbody>${p.specs.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join('')}</tbody></table></div></details>
          <details><summary>التوصيل والكود ${ico('chev', 18)}</summary><div class="in">التوصيل مجاني للطلبات التي تتجاوز ${CONFIG.freeFrom} ريال، وتُحدد رسوم الطلبات الأقل عند تأكيد الطلب. أدخل الكود ${CONFIG.code} في السلة للحصول على خصم ${CONFIG.pct}%.</div></details>
        </div>
      </div>
    </div>
  </div>
  <section class="sec" style="padding-top:10px"><div class="wrap">
    <div class="sec-head"><h2 class="sec-title">قد يعجبك أيضًا</h2></div>
    <div class="grid">${rel.map(x => card(x)).join('')}</div></div></section>
  <div class="stickybuy"><div class="price num"><b>${fmt(p.price)}</b><small>ريال</small>${p.old ? `<s>${fmt(p.old)}</s>` : ''}</div><button class="btn" type="button" data-act="padd">أضف إلى السلة</button></div>`;
}
function curImg() { const p = byId(S.pdp.id); return S.pdp.vimg || p.gallery[S.pdp.gi]; }
function pdpSync() {
  const st = S.pdp; if (!st) return; const p = byId(st.id);
  const g = $('#gmain'); if (g) g.src = IMG(curImg());
  $$('.gal__thumbs button').forEach((b, i) => b.setAttribute('aria-current', String(!st.vimg && i === st.gi)));
  $$('#vopt .sw button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === st.vi)));
  const vn = $('#vname'); if (vn) vn.textContent = st.vi >= 0 ? (p.variants[st.vi].n || p.variants[st.vi].k) : `اختر ${p.vlabel}`;
  const q = $('#pqty'); if (q) q.textContent = st.qty;
  const m = $('#vmsg'); if (m) m.textContent = '';
}
function pdpAdd(buy) {
  const st = S.pdp, p = byId(st.id);
  if (p.variants && st.vi < 0) {
    $('#vmsg').textContent = `اختر ${p.vlabel} أولًا.`;
    $('#vopt').scrollIntoView({ block: 'center', behavior: 'smooth' }); return;
  }
  cartAdd(p.id, p.variants ? p.variants[st.vi].k : '', st.qty, buy);
  if (buy) go('checkout');
}

/* ----- المدونة ----- */
function vBlog() {
  return `<div class="wrap"><nav class="crumbs" aria-label="مسار التنقل"><a href="#home" data-nav>الرئيسية</a><span>/</span><span aria-current="page">المدونة</span></nav>
    <div style="padding-block:26px 34px"><div class="eyebrow" style="margin-bottom:12px">THE JOURNAL</div><h1 style="font-size:clamp(30px,4vw,46px)">مدونة مدار</h1><p style="color:var(--ink-2);max-width:56ch;margin-top:8px">أدلة قصيرة عن التحضير والبن والأكواب، لتستمتع بقهوتك أكثر.</p></div>
    <div class="posts" style="padding-bottom:70px">${POSTS.map(postCard).join('')}</div></div>`;
}
function vPost() {
  const a = POSTS.find(x => x.id === S.r.id);
  const body = a.body.map(b => {
    if (b.h) return `<h2>${b.h}</h2>`;
    if (b.p) return `<p>${b.p}</p>`;
    if (b.ol) return `<ol>${b.ol.map(i => `<li><span>${i}</span></li>`).join('')}</ol>`;
    if (b.ul) return `<ul>${b.ul.map(i => `<li>${i}</li>`).join('')}</ul>`;
    if (b.tip) return `<div class="tip">${b.tip}</div>`;
    return '';
  }).join('');
  return `<div class="wrap"><nav class="crumbs" aria-label="مسار التنقل"><a href="#home" data-nav>الرئيسية</a><span>/</span><a href="#blog" data-nav>المدونة</a><span>/</span><span aria-current="page">${a.title}</span></nav>
    <article class="article" style="padding-block:26px 40px">
      <div class="post__meta"><span>دليل القهوة</span><span>•</span><span>قراءة ${a.min} دقائق</span></div>
      <h1>${a.title}</h1><p class="lead">${a.lead}</p>
      <div class="article__img"><img src="${IMG(a.img)}" alt="" width="1000" height="1000"></div>${body}
    </article></div>
    <section class="sec" style="padding-top:10px"><div class="wrap"><div class="sec-head"><h2 class="sec-title">منتجات ذات صلة</h2></div>
    <div class="grid grid--3">${a.related.map(id => card(byId(id))).join('')}</div></div></section>`;
}

/* ----- الدفع ----- */
function orderText(o) {
  let when = '';
  try { when = new Date(o.at).toLocaleString('ar-SA-u-ca-gregory-nu-latn', { dateStyle: 'medium', timeStyle: 'short' }); } catch (e) { when = new Date(o.at).toISOString().slice(0, 16).replace('T', ' '); }
  const L = o.items.map((i, n) => `${n + 1}. ${i.name}${i.v ? ' (' + i.v + ')' : ''}\n    ${i.qty} × ${fmt(i.price)} = ${fmt(i.price * i.qty)} ريال`);
  return ['🛒 طلب جديد من متجر مدار', `رقم الطلب: ${o.ref}`, `التاريخ: ${when}`, '',
    '👤 بيانات العميل', `الاسم: ${o.c.name}`, `الجوال: ${o.c.phone}`, `المدينة: ${o.c.city}`, `العنوان: ${o.c.addr}`, o.c.notes ? `ملاحظات: ${o.c.notes}` : null, '',
    '☕ المنتجات', ...L, '',
    '💰 الملخص', `المجموع الفرعي: ${fmt(o.sub)} ريال`, o.d ? `خصم الكود ${CONFIG.code} (${CONFIG.pct}%): -${fmt(o.d)} ريال` : null, `التوصيل: ${o.free ? 'مجاني' : 'يُحدد عند التأكيد'}`, `الإجمالي: ${fmt(o.total)} ريال`
  ].filter(x => x !== null).join('\n');
}
function summaryHTML(t) {
  return `<div class="sum num">
    <div><span>المجموع الفرعي</span><span>${fmt(t.sub)} ريال</span></div>
    ${t.d ? `<div class="disc"><span>خصم الكود (${CONFIG.pct}%)</span><span>− ${fmt(t.d)} ريال</span></div>` : ''}
    <div><span>التوصيل</span><span>${t.free ? 'مجاني' : 'يُحدد عند التأكيد'}</span></div>
    <div class="tot"><span>الإجمالي</span><span>${fmt(t.total)} ريال</span></div></div>`;
}
function vCheckout() {
  const t = totals();
  if (!t.count) return `<div class="wrap"><div class="empty" style="padding-block:90px">${ico('bag', 48)}<b style="font:500 20px var(--font-display)">سلتك فارغة</b><p>أضف منتجات أولًا لإتمام الطلب.</p><a class="btn" href="#shop" data-nav>ابدأ التسوق</a></div></div>`;
  const fld = (id, label, extra = '', full = false, tag = 'input') => `<div class="fld ${full ? 'full' : ''}"><label for="${id}">${label}</label>${tag === 'textarea' ? `<textarea class="inp" id="${id}" ${extra}></textarea>` : `<input class="inp" id="${id}" ${extra}>`}<div class="err" id="${id}-e"></div></div>`;
  return `<div class="wrap">
    <nav class="crumbs" aria-label="مسار التنقل"><a href="#home" data-nav>الرئيسية</a><span>/</span><span aria-current="page">إتمام الطلب</span></nav>
    <div class="co">
      <form id="coForm" novalidate>
        <h1>إتمام الطلب</h1><p class="lead">أدخل بيانات التوصيل وسنجهّز طلبك.</p>
        <div class="fields">
          ${fld('f-name', 'الاسم الكامل', 'autocomplete="name" maxlength="80" required', true)}
          ${fld('f-phone', 'رقم الجوال', 'type="tel" inputmode="tel" autocomplete="tel" maxlength="20" dir="ltr" data-end placeholder="05XXXXXXXX" required')}
          ${fld('f-city', 'المدينة', 'autocomplete="address-level2" maxlength="60" required')}
          ${fld('f-addr', 'الحي والعنوان', 'autocomplete="street-address" maxlength="200" required', true)}
          ${fld('f-notes', 'ملاحظات للطلب (اختياري)', 'rows="3" maxlength="500"', true, 'textarea')}
        </div>
        <button class="btn btn--full" type="submit" style="margin-top:22px;height:54px">تأكيد الطلب · <span class="num">${fmt(t.total)}</span> ريال</button>
      </form>
      <aside class="box" aria-label="ملخص الطلب">
        <h2>ملخص الطلب</h2>
        ${shipBar(t)}
        ${t.lines.map(l => `<div class="li" style="grid-template-columns:64px 1fr"><img src="${IMGS(l.p.img)}" alt="" width="64" height="64" style="width:64px;height:64px"><div><div class="li__n" style="font-size:14.5px">${esc(l.p.name)}</div>${l.v ? `<div class="li__v">${esc(vdisp(l.p, l.v))}</div>` : ''}<div class="li__r"><span class="li__v num">الكمية ${l.qty}</span><b class="num" style="font:600 14.5px var(--font-display)">${fmt(l.p.price * l.qty)} ريال</b></div></div></div>`).join('')}
        <form class="cpn" id="cpnForm" style="margin-block:16px 4px" novalidate><label class="sr" for="cpnIn">كود الخصم</label><input class="inp" id="cpnIn" placeholder="كود الخصم" value="${esc(S.cpnDraft || (couponOk() ? S.coupon : ''))}" dir="ltr" data-end autocomplete="off"><button class="btn btn--line btn--sm" type="submit">تطبيق</button></form>
        <div class="msg ${S.cpnMsg.startsWith('!') ? 'msg--err' : 'msg--ok'}" id="cpnMsg">${esc(S.cpnMsg.replace(/^!/, '')) || (couponOk() ? `تم تطبيق الكود ${CONFIG.code}` : '')}</div>
        <div style="margin-top:10px">${summaryHTML(t)}</div>
      </aside>
    </div></div>`;
}
function vDone() {
  const o = S.last;
  if (!o) return `<div class="wrap"><div class="empty" style="padding-block:90px"><a class="btn" href="#home" data-nav>العودة للرئيسية</a></div></div>`;
  const saved = !!o.saved;
  const action = saved ? ''
    : WA
      ? `<a class="btn btn--wa" href="${waUrl(o)}" target="_blank" rel="noopener noreferrer">${ico('wa', 20)} إرسال الطلب عبر واتساب</a><button class="btn btn--line" type="button" data-act="copy-order">${ico('copy', 18)} نسخ ملخص الطلب</button>`
      : `<button class="btn" type="button" data-act="copy-order">${ico('copy', 18)} نسخ ملخص الطلب</button>`;
  const note = saved ? 'وصلنا طلبك وحُفظ لدينا. سنتواصل معك على واتساب لتأكيده والاتفاق على التوصيل قريبًا.'
    : WA ? 'تعذر إرسال طلبك تلقائيًا. اضغط الزر أدناه لإرساله عبر واتساب. لا يكتمل الطلب إلا بعد إرسال الرسالة.'
    : 'هذه نسخة تجريبية من المتجر. الطلب محفوظ في جهازك فقط ولم يُرسل إلى المتجر بعد.';
  return `<div class="wrap"><div class="done">
    <span class="ok">${ico('check', 34)}</span>
    <h1>شكرًا ${esc(o.c.name.split(' ')[0])}، ${saved ? 'وصلنا طلبك' : 'تم تجهيز طلبك'}</h1>
    <div class="ref" dir="ltr">${esc(o.ref)}</div>
    <p style="color:var(--ink-2)">إجمالي طلبك <b class="num">${fmt(o.total)} ريال</b> لعدد ${o.count} ${o.count === 1 ? 'منتج' : 'منتجات'}.</p>
    <p class="note">${note}</p>
    <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center">${action}<a class="btn${saved ? '' : ' btn--line'}" href="#shop" data-nav>متابعة التسوق</a></div>
  </div></div>`;
}

/* ===================== العرض والتوجيه ===================== */
const view = $('#view');
function parse(tok) {
  tok = (tok || '').replace(/^#/, '');
  if (!tok || tok === 'home') return { v: 'home' };
  if (tok === 'shop') return { v: 'shop', cat: null };
  if (tok.startsWith('shop-')) { const c = tok.slice(5); return CATS[c] ? { v: 'shop', cat: c } : { v: 'shop', cat: null }; }
  if (tok.startsWith('p-')) { const p = byId(tok.slice(2)); return p ? { v: 'pdp', id: p.id } : { v: 'home' }; }
  if (tok === 'blog') return { v: 'blog' };
  if (tok.startsWith('post-')) { const a = POSTS.find(x => x.id === tok.slice(5)); return a ? { v: 'post', id: a.id } : { v: 'blog' }; }
  if (tok === 'checkout') return { v: 'checkout' };
  if (tok === 'done') return { v: 'done' };
  return { v: 'home' };
}
function route(tok) {
  S.tok = (tok || 'home').replace(/^#/, '') || 'home';
  S.r = parse(S.tok);
  closePanels(true);
  S.shop = { cat: S.r.cat || null, pill: 'all', sort: 'featured' };
  S.pdp = S.r.v === 'pdp' ? { id: S.r.id, vi: (byId(S.r.id).variants ? 0 : -1), gi: 0, qty: 1, vimg: null } : null;
  render();
  window.scrollTo(0, 0);
}
function go(tok) {
  route(tok);
  try { if (location.hash.slice(1) !== tok) location.hash = tok; } catch (e) { }
}
function render(keepScroll) {
  const r = S.r, SITE = tt('مدار للقهوة'); let h = '', title = SITE;
  const y = window.scrollY;
  if (r.v === 'home') h = vHome();
  else if (r.v === 'shop') { h = vShop(); title = (r.cat ? CATS[r.cat].label : tt('كل المنتجات')) + ' | ' + SITE; }
  else if (r.v === 'pdp') { h = vPdp(); title = byId(r.id).name + ' | ' + SITE; }
  else if (r.v === 'blog') { h = vBlog(); title = tt('المدونة') + ' | ' + SITE; }
  else if (r.v === 'post') { h = vPost(); title = POSTS.find(a => a.id === r.id).title + ' | ' + SITE; }
  else if (r.v === 'checkout') { h = vCheckout(); title = tt('إتمام الطلب') + ' | ' + SITE; }
  else if (r.v === 'done') { h = vDone(); title = tt('تم تجهيز طلبك') + ' | ' + SITE; }
  view.innerHTML = h;
  if (r.v === 'pdp') pdpSync();
  if (!keepScroll) { view.classList.remove('view'); void view.offsetWidth; view.classList.add('view'); }
  else window.scrollTo(0, y);
  document.body.classList.toggle('has-sticky', r.v === 'pdp');
  try { document.title = title; } catch (e) { }
  updateNav();
}
function navTok(k) { return k === 'home' ? 'home' : k === 'blog' ? 'blog' : 'shop-' + k; }
function navHTML() {
  return NAV.map(k => `<a href="#${navTok(k)}" data-nav data-t="${k}">${k === 'home' ? 'الرئيسية' : k === 'blog' ? 'المدونة' : CATS[k].label}</a>`).join('');
}
function updateNav() {
  const r = S.r; let cur = null;
  if (r.v === 'home') cur = 'home';
  else if (r.v === 'shop') cur = r.cat;
  else if (r.v === 'pdp') cur = byId(r.id).cat;
  else if (r.v === 'blog' || r.v === 'post') cur = 'blog';
  $$('#nav a, #menuB a[data-t]').forEach(a => { if (a.dataset.t === cur) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
}

/* ===================== اللوحات ===================== */
const PANEL = { cart: '#cart', menu: '#menu', acct: '#acct', search: '#search' };
function focusables(el) { return $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', el).filter(x => x.offsetParent !== null); }
function openPanel(name) {
  closePanels(true); closeChat(); $('#toast').classList.remove('open');
  S.open = name; S.opener = document.activeElement;
  if (name === 'cart') renderCart();
  if (name === 'acct') renderAcct();
  if (name === 'menu') renderMenu();
  if (name === 'search') { $('#q').value = S.qdraft; renderSearch(); }
  const el = $(PANEL[name]); el.classList.add('open'); el.setAttribute('aria-hidden', 'false');
  $('#scrim').classList.add('open'); document.body.classList.add('lock');
  setTimeout(() => { const f = name === 'search' ? $('#q') : focusables(el)[0]; if (f) f.focus({ preventScroll: true }); }, 60);
}
function closePanels(keep) {
  if (!S.open) return;
  const el = $(PANEL[S.open]); el.classList.remove('open'); el.setAttribute('aria-hidden', 'true');
  S.open = null; $('#scrim').classList.remove('open'); document.body.classList.remove('lock');
  if (!keep && S.opener && S.opener.focus && document.contains(S.opener)) { try { S.opener.focus({ preventScroll: true }); } catch (e) { } }
}
function renderMenu() {
  $('#menuB').innerHTML = NAV.map(k => `<a href="#${navTok(k)}" data-nav data-t="${k}">${k === 'home' ? 'الرئيسية' : k === 'blog' ? 'المدونة' : CATS[k].label}${ico('arrowL', 18)}</a>`).join('')
    + `<a href="#shop-matcha" data-nav>${CATS.matcha.label}${ico('arrowL', 18)}</a><a href="#shop" data-nav>كل المنتجات${ico('arrowL', 18)}</a>
       <div class="langsw langsw--menu" role="group" aria-label="اللغة / Language" data-notr><button type="button" data-act="lang" data-l="en" aria-pressed="false">English</button><button type="button" data-act="lang" data-l="ar" aria-pressed="false">العربية</button></div>
       <div class="coupon" style="margin-top:24px;padding:18px"><div><h3 style="font-size:17px">كود الإطلاق</h3><p>خصم ${CONFIG.pct}% على طلبك</p></div><div class="coupon__code" style="padding:6px 6px 6px 12px"><b dir="ltr" style="font-size:16px">${CONFIG.code}</b><button type="button" data-act="copy-code">نسخ</button></div></div>`;
  updateNav(); applyDir();
}
function miniRow(p) {
  return `<a class="mini" href="#p-${p.id}" data-nav><img src="${IMGS(p.img)}" alt="" width="54" height="54"><div><b>${esc(p.name)}</b><small>${esc(p.brand)}</small></div><b class="num" style="font:600 14px var(--font-display)">${fmt(p.price)} ريال</b></a>`;
}
function renderAcct() {
  const w = S.wish.map(byId).filter(Boolean);
  $('#acctB').innerHTML = `
    <div class="acct-sec"><h3>المفضلة <span class="num" style="color:var(--muted);font-weight:400">(${w.length})</span></h3>
      ${w.length ? w.map(miniRow).join('') : '<p style="color:var(--ink-2);font-size:14.5px">لم تضف منتجات للمفضلة بعد. اضغط على القلب في أي منتج لحفظه هنا.</p>'}</div>
    <div class="acct-sec" style="border:0"><h3>طلباتي على هذا الجهاز</h3>
      ${S.orders.length ? S.orders.map(o => `<div class="mini" style="grid-template-columns:1fr auto"><div><b dir="ltr" data-end>${esc(o.ref)}</b><small class="num">${o.count} ${o.count === 1 ? 'منتج' : 'منتجات'} · ${new Date(o.at).toLocaleDateString(isEn() ? 'en-GB' : 'ar-SA-u-ca-gregory-nu-latn')}</small></div><b class="num" style="font:600 14px var(--font-display)">${fmt(o.total)} ريال</b></div>`).join('') : '<p style="color:var(--ink-2);font-size:14.5px">لا توجد طلبات بعد.</p>'}</div>`;
}

/* ----- البحث ----- */
const hay = p => norm(HAY[p.id] || p.name);
function renderSearch() {
  const q = norm($('#q').value.trim()), box = $('#sres');
  if (!q) {
    box.innerHTML = `<div class="sq">${(isEn() ? ['Beans', 'Cup', 'Filters', 'V60', 'Matcha', 'Colombia'] : ['بن', 'كوب', 'فلاتر', 'V60', 'ماتشا', 'كولومبيا']).map(w => `<button class="pill" type="button" data-act="sq" data-w="${w}">${w}</button>`).join('')}</div>`; return;
  }
  const a = P.filter(p => q.split(/\s+/).every(w => hay(p).includes(w))).slice(0, 7);
  box.innerHTML = a.length
    ? a.map(p => `<a href="#p-${p.id}" data-nav><img src="${IMGS(p.img)}" alt="" width="54" height="54"><div><b>${esc(p.name)}</b><small>${esc(p.brand)} · ${CATS[p.cat].label}</small></div><span class="p num">${fmt(p.price)} ريال</span></a>`).join('')
    : `<div class="empty" style="padding:30px 10px"><p>لا توجد نتائج لـ «${esc($('#q').value.trim())}». جرّب كلمة أخرى.</p></div>`;
}

/* ----- المساعد ----- */
const QA = [
  { q: 'كيف أستخدم كود الخصم؟', a: () => `أضف منتجاتك إلى السلة، ثم اكتب الكود <b dir="ltr">${CONFIG.code}</b> في خانة كود الخصم لتحصل على خصم ${CONFIG.pct}%.` },
  { q: 'متى يكون التوصيل مجانيًا؟', a: () => `التوصيل مجاني لأي طلب تتجاوز قيمته ${CONFIG.freeFrom} ريال. تظهر لك في السلة كم يتبقى لتصل إليه.` },
  { q: 'أي بن يناسب V60؟', a: () => 'القهوة المقطّرة تُظهر النكهات النظيفة، فجرّب <a href="#p-oro-blanco" data-nav>بلانكو</a> أو <a href="#p-bk-excelso" data-nav>اكسيلسو</a> من كولومبيا. وللتحضير خطوة بخطوة اقرأ <a href="#post-v60-guide" data-nav>دليل V60</a>.' },
  { q: 'أبحث عن هدية', a: () => 'الأكواب خيار رائع: <a href="#p-mug-arabic" data-nav>الكوب بالعبارة العربية</a> و<a href="#p-volcanic" data-nav>الكوب البركاني</a>، وللمسافرين <a href="#p-v60-set" data-nav>طقم V60</a>.' }
];
const QA_EN = [
  { q: 'How do I use the discount code?', a: () => `Add your items to the cart, then type the code <b dir="ltr">${CONFIG.code}</b> in the discount code field to get ${CONFIG.pct}% off.` },
  { q: 'When is delivery free?', a: () => `Delivery is free on any order over ${CONFIG.freeFrom} SAR. Your cart shows how much is left to reach it.` },
  { q: 'Which beans suit V60?', a: () => 'Pour-over shows off clean flavours, so try <a href="#p-oro-blanco" data-nav>Blanco</a> or <a href="#p-bk-excelso" data-nav>Excelso</a> from Colombia. For a step-by-step guide, read the <a href="#post-v60-guide" data-nav>V60 guide</a>.' },
  { q: 'I am looking for a gift', a: () => 'Cups make a great gift: the <a href="#p-mug-arabic" data-nav>Arabic verse mug</a> and the <a href="#p-volcanic" data-nav>Volcanic cup</a>, and for travellers the <a href="#p-v60-set" data-nav>V60 travel set</a>.' }
];
const qa = () => (isEn() ? QA_EN : QA);
function chatInit() {
  $('#chatB').innerHTML = `<div class="bub bub--bot">أهلًا بك في مدار. اختر سؤالًا وأجيبك مباشرة.</div><div class="qr">${qa().map((x, i) => `<button type="button" data-act="ask" data-i="${i}">${x.q}</button>`).join('')}</div>`;
}
function ask(i) {
  const b = $('#chatB'), qr = $('.qr', b);
  const me = document.createElement('div'); me.className = 'bub bub--me'; me.textContent = qa()[i].q;
  const bot = document.createElement('div'); bot.className = 'bub bub--bot'; bot.innerHTML = qa()[i].a();
  b.insertBefore(me, qr); b.insertBefore(bot, qr); b.scrollTop = b.scrollHeight;
}
function toggleChat() { $('#chat').classList.contains('open') ? closeChat() : openChat(); }
function openChat() { closePanels(); $('#chat').classList.add('open'); $('#chat').setAttribute('aria-hidden', 'false'); $('#fab').setAttribute('aria-expanded', 'true'); }
function closeChat() { $('#chat').classList.remove('open'); $('#chat').setAttribute('aria-hidden', 'true'); $('#fab').setAttribute('aria-expanded', 'false'); }

/* ----- تنبيهات ونسخ ----- */
let toastT, toastFn;
function toast(msg, act) {
  const t = $('#toast'); t.innerHTML = `<span>${esc(msg)}</span>${act ? `<button type="button" data-act="toast-act">${act.label}</button>` : ''}`;
  toastFn = act && act.fn; t.classList.add('open'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('open'), 3600);
}
function copy(text, ok) {
  const fallback = () => toast(ok + ': ' + text);
  try { navigator.clipboard.writeText(text).then(() => toast(ok), fallback); } catch (e) { fallback(); }
}
function toggleWish(id) {
  const i = S.wish.indexOf(id); if (i >= 0) S.wish.splice(i, 1); else S.wish.push(id);
  store.set('madar.wish', S.wish);
  const w = S.wish.includes(id);
  $$(`.wish[data-id="${id}"]`).forEach(b => { b.setAttribute('aria-pressed', String(w)); b.setAttribute('aria-label', w ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'); b.innerHTML = ico(w ? 'heartf' : 'heart', 18); });
  if (S.open === 'acct') renderAcct();
}

/* ===================== تبديل اللغة ===================== */
function footCatsHTML() { return [...NAV.filter(k => CATS[k]), 'matcha'].map(k => `<li><a href="#shop-${k}" data-nav>${CATS[k].label}</a></li>`).join(''); }
function setLang(l) {
  if ((l !== 'en' && l !== 'ar') || l === LANG) return;
  LANG = l; try { localStorage.setItem('madar.lang', l); } catch (e) { }
  if (!isEn()) restoreAr(document.body);
  applyData(); applyDir();
  $('#nav').innerHTML = navHTML(); $('#footCats').innerHTML = footCatsHTML();
  chatInit(); updateBadge();
  if (S.open === 'cart') renderCart(); else if (S.open === 'acct') renderAcct(); else if (S.open === 'menu') renderMenu(); else if (S.open === 'search') renderSearch();
  render(true);
  if (isEn()) trTree(document.body);
}

/* ===================== الأحداث ===================== */
document.addEventListener('click', e => {
  const nav = e.target.closest('a[data-nav]');
  if (nav && !(e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) {
    e.preventDefault(); const t = nav.getAttribute('href').slice(1);
    if (t === S.tok && S.r.v !== 'done') { window.scrollTo({ top: 0, behavior: 'smooth' }); closePanels(); return; }
    go(t); return;
  }
  const el = e.target.closest('[data-act]'); if (!el) { if (e.target.id === 'scrim') closePanels(); return; }
  const a = el.dataset.act, d = el.dataset;
  switch (a) {
    case 'add': { cartAdd(d.id, '', 1); break; }
    case 'wish': toggleWish(d.id); break;
    case 'open-cart': openPanel('cart'); break;
    case 'open-menu': openPanel('menu'); break;
    case 'open-search': openPanel('search'); break;
    case 'open-account': openPanel('acct'); break;
    case 'close': closePanels(); break;
    case 'cq': cartQty(d.k, +d.d); break;
    case 'crm': cartRemove(d.k); break;
    case 'copy-code': copy(CONFIG.code, 'تم نسخ الكود'); break;
    case 'toggle-chat': toggleChat(); break;
    case 'open-chat': openChat(); break;
    case 'ask': ask(+d.i); break;
    case 'toast-act': if (toastFn) toastFn(); $('#toast').classList.remove('open'); break;
    case 'pill': S.shop.pill = d.k; $('#shopBody').innerHTML = shopBody(); break;
    case 'sq': $('#q').value = d.w; S.qdraft = d.w; renderSearch(); $('#q').focus(); break;
    case 'pimg': S.pdp.gi = +d.i; S.pdp.vimg = null; pdpSync(); break;
    case 'pvar': { const p = byId(S.pdp.id), v = p.variants[+d.i]; S.pdp.vi = +d.i; S.pdp.vimg = v.img || p.vfb || null; pdpSync(); break; }
    case 'pq': S.pdp.qty = Math.max(1, Math.min(20, S.pdp.qty + +d.d)); pdpSync(); break;
    case 'padd': pdpAdd(false); break;
    case 'pbuy': pdpAdd(true); break;
    case 'lb': { $('#lbImg').src = IMG(curImg()); $('#lb').classList.add('open'); $('#lb').setAttribute('aria-hidden', 'false'); break; }
    case 'close-lb': closeLb(); break;
    case 'lang': setLang(d.l); break;
    case 'copy-order': copy(orderText(S.last), 'تم نسخ ملخص الطلب'); break;
  }
});
function closeLb() { $('#lb').classList.remove('open'); $('#lb').setAttribute('aria-hidden', 'true'); }
$('#lb').addEventListener('click', e => { if (e.target.id === 'lb') closeLb(); });
document.addEventListener('change', e => { if (e.target.id === 'sort') { S.shop.sort = e.target.value; $('#shopBody').innerHTML = shopBody(); $('#sort').focus(); } });
document.addEventListener('input', e => {
  if (e.target.id === 'q') { S.qdraft = e.target.value; renderSearch(); }
  if (e.target.id === 'cpnIn') S.cpnDraft = e.target.value;
  if (e.target.closest('.fld')) { e.target.removeAttribute('aria-invalid'); const er = $('#' + e.target.id + '-e'); if (er) er.textContent = ''; }
});
document.addEventListener('submit', e => {
  const f = e.target;
  if (f.id === 'cpnForm') { e.preventDefault(); applyCoupon($('#cpnIn').value); return; }
  if (f.id === 'coForm') {
    e.preventDefault();
    if (S.sending) return;
    const v = id => $('#' + id).value.trim();
    const cv = (id, n, nl) => clean($('#' + id).value, n, nl);
    const dig = s => s.replace(/[\u0660-\u0669]/g, c => c.charCodeAt(0) - 0x660).replace(/[\u06F0-\u06F9]/g, c => c.charCodeAt(0) - 0x6F0);
    const rules = [['f-name', v('f-name').length >= 3, 'اكتب اسمك الكامل.'], ['f-phone', /^\+?\d{9,15}$/.test(dig(v('f-phone')).replace(/[\s-]/g, '')), 'اكتب رقم جوال صحيح، مثل 05XXXXXXXX.'], ['f-city', v('f-city').length >= 2, 'اكتب اسم المدينة.'], ['f-addr', v('f-addr').length >= 4, 'اكتب الحي والعنوان بشكل أوضح.']];
    let bad = null;
    rules.forEach(([id, ok, msg]) => { const el = $('#' + id), er = $('#' + id + '-e'); if (ok) { el.removeAttribute('aria-invalid'); er.textContent = ''; } else { el.setAttribute('aria-invalid', 'true'); er.textContent = msg; if (!bad) bad = el; } });
    if (bad) { bad.focus(); return; }
    const t = totals();
    const o = {
      ref: 'MD-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 6).toUpperCase(), at: Date.now(),
      c: { name: cv('f-name', 80), phone: dig(cv('f-phone', 20)), city: cv('f-city', 60), addr: cv('f-addr', 200), notes: cv('f-notes', 500, true) },
      items: t.lines.map(l => ({ id: l.id, name: (AR0.P.find(x => x.id === l.id) || l.p).name, v: l.v, qty: l.qty, price: l.p.price })), count: t.count, sub: t.sub, d: t.d, free: t.free, total: t.total
    };
    const btn = f.querySelector('button[type=submit]'), lab = btn ? btn.innerHTML : '';
    const unlock = msg => { S.sending = false; if (btn) { btn.disabled = false; btn.innerHTML = lab; } if (msg) toast(msg); };
    const finish = (saved, srv) => {
      if (srv) { o.ref = clean(srv.ref, 24); o.at = +srv.at || o.at; o.sub = +srv.sub; o.d = +srv.d; o.free = !!srv.free; o.total = +srv.total; }
      o.saved = !!saved; S.sending = false;
      S.orders.unshift({ ref: o.ref, at: o.at, count: o.count, total: o.total }); store.set('madar.orders', S.orders.slice(0, 20)); S.last = o; S.cid = '';
      S.cart = []; saveCart(); updateBadge(); go('done');
      if (!saved && WA) { try { window.open(waUrl(o), '_blank', 'noopener,noreferrer'); } catch (e) { } }
    };
    if (!CONFIG.api) { finish(false); return; }
    S.sending = true; S.cid = S.cid || newCid();
    if (btn) { btn.disabled = true; btn.textContent = 'جارٍ إرسال طلبك…'; }
    const ctl = new AbortController(), to = setTimeout(() => ctl.abort(), 20000);
    fetch(CONFIG.api, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', cache: 'no-store', signal: ctl.signal,
      body: JSON.stringify({ cid: S.cid, lang: LANG, website: '', coupon: couponOk() ? CONFIG.code : '', c: o.c, items: o.items.map(i => ({ id: i.id, v: i.v, qty: i.qty })) })
    }).then(r => r.json().catch(() => null).then(j => ({ r, j }))).then(({ r, j }) => {
      clearTimeout(to);
      if (r.ok && j && j.ok) return finish(true, j);
      if (r.status === 429) return unlock('وصلتنا طلبات كثيرة منك. حاول بعد دقائق.');
      if (r.status === 400 && j && j.error === 'invalid') return unlock('تعذر قبول بيانات الطلب. راجع الحقول وحاول مرة أخرى.');
      finish(false);
    }).catch(() => { clearTimeout(to); finish(false); });
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if ($('#lb').classList.contains('open')) closeLb(); else if (S.open) closePanels(); else if ($('#chat').classList.contains('open')) closeChat(); }
  if (e.key === 'Tab' && S.open) {
    const f = focusables($(PANEL[S.open])); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});
window.addEventListener('hashchange', () => { const t = location.hash.slice(1); if (t !== S.tok) route(t); });

/* ===================== التشغيل ===================== */
applyData(); applyDir();
$$('[data-i]').forEach(el => { el.outerHTML = ico(el.dataset.i, +el.dataset.s || 20); });
$('#nav').innerHTML = navHTML();
$('#footCats').innerHTML = footCatsHTML();
(function () {
  const bars = $$('[data-bar]'); let i = 0;
  bars[0].classList.add('on');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => { bars[i].classList.remove('on'); i = (i + 1) % bars.length; bars[i].classList.add('on'); }, 4200);
})();
chatInit(); updateBadge();
route(location.hash.slice(1) || 'home');
if (isEn()) trTree(document.body);
startObserver();

})();

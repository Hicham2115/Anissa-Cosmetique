import type { Review } from "@/lib/validations";

// Keyed by product slotId (handle) — 3 reviews per product, mixing Arabic
// and English the way real customer feedback for this catalog does.
export const PRODUCT_REVIEWS: Record<string, Review[]> = {
  "creme-anti-rides": [
    { id: "creme-anti-rides-r1", quote: "كريم رائع ضد التجاعيد، استعملتو لمدة شهر وحسيت بفرق واضح في نعومة بشرتي.", name: "سعاد", stars: 5, timeAgo: "" },
    { id: "creme-anti-rides-r2", quote: "This night cream noticeably smoothed my fine lines within a few weeks. Lightweight yet very nourishing.", name: "Sarah M.", stars: 5, timeAgo: "" },
    { id: "creme-anti-rides-r3", quote: "بشرتي كانت جافة وفيها علامات التقدم في السن، دبا حسيت براحة كبيرة ونضارة.", name: "خديجة", stars: 4.5, timeAgo: "" },
  ],
  "masque-anti-age": [
    { id: "masque-anti-age-r1", quote: "A great weekly treat — my skin feels firmer and looks more radiant after each use.", name: "Emma R.", stars: 5, timeAgo: "" },
    { id: "masque-anti-age-r2", quote: "ماسك ممتاز، كنستعملو مرتين فالسيمانة وكيعطيني نتيجة زوينة بزاف فالشد ديال البشرة.", name: "فاطمة", stars: 5, timeAgo: "" },
    { id: "masque-anti-age-r3", quote: "جربت بزاف ماسكات ماحملقتش، هادشي عطاني نتيجة من أول استعمال.", name: "مريم", stars: 4, timeAgo: "" },
  ],
  "serum-anti-age": [
    { id: "serum-anti-age-r1", quote: "Absorbs fast and my skin feels plumper already. Will definitely repurchase.", name: "Lisa K.", stars: 5, timeAgo: "" },
    { id: "serum-anti-age-r2", quote: "سيروم خفيف وكيتشرب بسرعة، حسيت ببشرتي مشدودة من بعد جيمعة استعمال.", name: "أمينة", stars: 4.5, timeAgo: "" },
    { id: "serum-anti-age-r3", quote: "Great addition to my nighttime routine — subtle glow every morning.", name: "Nora T.", stars: 5, timeAgo: "" },
  ],
  "creme-eclaircissante": [
    { id: "creme-eclaircissante-r1", quote: "الكريم هذا بدل لون بشرتي، صافية ومتوحدة دابا الحمدلله.", name: "سارة", stars: 5, timeAgo: "" },
    { id: "creme-eclaircissante-r2", quote: "My dark spots have visibly faded after a month of consistent use. Very happy with this cream.", name: "Jasmine L.", stars: 5, timeAgo: "" },
    { id: "creme-eclaircissante-r3", quote: "ريحة زوينة وملمس خفيف، والنتيجة بانت من بعد 3 سيمانات.", name: "نادية", stars: 4.5, timeAgo: "" },
  ],
  "creme-eclaircissante-mains": [
    { id: "creme-eclaircissante-mains-r1", quote: "My hands look so much softer and more even-toned now — perfect texture, not greasy.", name: "Amanda P.", stars: 5, timeAgo: "" },
    { id: "creme-eclaircissante-mains-r2", quote: "يدي كانو مسمرين شوية دابا صافيين، وكنستعملها كل يوم من بعد الاستحمام.", name: "حنان", stars: 4.5, timeAgo: "" },
    { id: "creme-eclaircissante-mains-r3", quote: "منتج رائع لليدين، كيدخل بسرعة وكيعطي رطوبة طول النهار.", name: "إيمان", stars: 5, timeAgo: "" },
  ],
  "masque-eclaircissant": [
    { id: "masque-eclaircissant-r1", quote: "بعد استعمالين حسيت ببشرتي مشرقة بزاف، ماسك يستاهل التجربة.", name: "وفاء", stars: 5, timeAgo: "" },
    { id: "masque-eclaircissant-r2", quote: "Instant glow after rinsing off — my go-to mask before any event.", name: "Chloe B.", stars: 5, timeAgo: "" },
    { id: "masque-eclaircissant-r3", quote: "كنصح بيه لكل وحدة عندها بشرة باهتة، كيعطي إشراقة فورية.", name: "سلمى", stars: 4, timeAgo: "" },
  ],
  "pack-eclaircissant": [
    { id: "pack-eclaircissant-r1", quote: "Loved having the full routine in one pack — noticed brighter, more even skin within 2 weeks.", name: "Rachel S.", stars: 5, timeAgo: "" },
    { id: "pack-eclaircissant-r2", quote: "الباك كامل، عطاني روتين متكامل وبثمن معقول، النتيجة ولات باينة.", name: "كوثر", stars: 5, timeAgo: "" },
    { id: "pack-eclaircissant-r3", quote: "شريت هاد الباك كهدية لمي وعجبها بزاف، بشرتها بانت غير.", name: "عائشة", stars: 4.5, timeAgo: "" },
  ],
  "serum-eclaircissant": [
    { id: "serum-eclaircissant-r1", quote: "Lightweight texture, absorbs quickly, and my complexion looks noticeably brighter.", name: "Olivia H.", stars: 5, timeAgo: "" },
    { id: "serum-eclaircissant-r2", quote: "سيروم قوي، بدا يبين مفعولو من بعد سيمانة وحدة على البقع السوداء.", name: "سعاد", stars: 5, timeAgo: "" },
    { id: "serum-eclaircissant-r3", quote: "خفيف بزاف على البشرة وما كيخليش لمعان، منتج ممتاز.", name: "دنيا", stars: 4.5, timeAgo: "" },
  ],
  "gel-exfoliant-aha": [
    { id: "gel-exfoliant-aha-r1", quote: "كيقشر البشرة بلطف وما كيحمرش، بشرتي ولات ناعمة بزاف من بعد الاستعمال.", name: "أسماء", stars: 5, timeAgo: "" },
    { id: "gel-exfoliant-aha-r2", quote: "Removes dead skin gently — my face feels incredibly smooth and looks brighter right after.", name: "Grace W.", stars: 5, timeAgo: "" },
    { id: "gel-exfoliant-aha-r3", quote: "منتج معجزة للبشرة الدهنية، كيزيل الرؤوس السوداء بشكل ملحوظ.", name: "ليلى", stars: 4.5, timeAgo: "" },
  ],
  "gel-nettoyant-eclaircissant": [
    { id: "gel-nettoyant-eclaircissant-r1", quote: "Cleanses deeply without drying my skin out — and it brightens over time too.", name: "Megan D.", stars: 5, timeAgo: "" },
    { id: "gel-nettoyant-eclaircissant-r2", quote: "جيل منظف رائع، كيشد الوجه وكيعطيه نظافة عميقة بلا ما يجففو.", name: "زينب", stars: 4.5, timeAgo: "" },
    { id: "gel-nettoyant-eclaircissant-r3", quote: "بقيت نستعملو نهارياً، ريحة خفيفة ونتيجة زوينة على المدى الطويل.", name: "رجاء", stars: 5, timeAgo: "" },
  ],
  "gel-nettoyant-hydratant": [
    { id: "gel-nettoyant-hydratant-r1", quote: "جيل رائع للبشرة الجافة، كينظف وفنفس الوقت كيرطب بزاف.", name: "حياة", stars: 5, timeAgo: "" },
    { id: "gel-nettoyant-hydratant-r2", quote: "Doesn't strip my skin at all — leaves it soft and hydrated after every wash.", name: "Hannah F.", stars: 5, timeAgo: "" },
    { id: "gel-nettoyant-hydratant-r3", quote: "بقات بشرتي مرطبة طول النهار من بعد ما بديت نستعملو.", name: "سميرة", stars: 4, timeAgo: "" },
  ],
  "gel-nettoyant-purifiant": [
    { id: "gel-nettoyant-purifiant-r1", quote: "Great for oily/acne-prone skin — controls shine without over-drying.", name: "Victoria N.", stars: 5, timeAgo: "" },
    { id: "gel-nettoyant-purifiant-r2", quote: "قلل عندي البثور بشكل واضح من بعد شهر ديال الاستعمال اليومي.", name: "يسرى", stars: 4.5, timeAgo: "" },
    { id: "gel-nettoyant-purifiant-r3", quote: "منظف ممتاز للبشرة الدهنية، كيعطي إحساس نظافة حقيقي.", name: "بشرى", stars: 5, timeAgo: "" },
  ],
  "nettoyant-demaquillant-argan": [
    { id: "nettoyant-demaquillant-argan-r1", quote: "كيزيل المكياج بسهولة وبلا ما يخرش العينين، وريحة الأركان زوينة.", name: "نسرين", stars: 5, timeAgo: "" },
    { id: "nettoyant-demaquillant-argan-r2", quote: "Removes even waterproof mascara gently, and leaves my skin feeling nourished, not stripped.", name: "Sophie C.", stars: 5, timeAgo: "" },
    { id: "nettoyant-demaquillant-argan-r3", quote: "أفضل مزيل مكياج جربتو، خفيف وفعال بزاف.", name: "مريم", stars: 4.5, timeAgo: "" },
  ],
  "creme-anti-imperfections": [
    { id: "creme-anti-imperfections-r1", quote: "Calmed my breakouts within a week and controlled oiliness without irritation.", name: "Isabella G.", stars: 5, timeAgo: "" },
    { id: "creme-anti-imperfections-r2", quote: "قلصت البثور عندي بشكل واضح، وبشرتي ولات أكثر توازنا.", name: "سلوى", stars: 4.5, timeAgo: "" },
    { id: "creme-anti-imperfections-r3", quote: "منتج فعال بزاف للبشرة لي فيها حبوب، نصيحة صادقة.", name: "فدوى", stars: 5, timeAgo: "" },
  ],
  "serum-anti-imperfections": [
    { id: "serum-anti-imperfections-r1", quote: "سيروم خفيف كيدخل بسرعة، حسيت بتحسن واضح فمعالجة الحبوب من بعد سيمانتين.", name: "نوال", stars: 5, timeAgo: "" },
    { id: "serum-anti-imperfections-r2", quote: "Targeted and effective — my blemishes cleared up faster than with anything else I've tried.", name: "Ava M.", stars: 5, timeAgo: "" },
    { id: "serum-anti-imperfections-r3", quote: "منتج ممتاز، ما كيخليش البشرة دهنية وكيعالج الحبوب بعمق.", name: "إكرام", stars: 4, timeAgo: "" },
  ],
  "fluide-solaire-spf50": [
    { id: "fluide-solaire-spf50-r1", quote: "Lightweight, no white cast, and layers perfectly under makeup. My new daily essential.", name: "Emily J.", stars: 5, timeAgo: "" },
    { id: "fluide-solaire-spf50-r2", quote: "واقي شمس خفيف بزاف وما كيخليش لمعان، صالح تحت الماكياج.", name: "غيثة", stars: 5, timeAgo: "" },
    { id: "fluide-solaire-spf50-r3", quote: "حماية قوية من الشمس بلا ما تحس بثقل على البشرة.", name: "كنزة", stars: 4.5, timeAgo: "" },
  ],
  "gel-aloe-vera": [
    { id: "gel-aloe-vera-r1", quote: "جيل الصبار هذا كيهدئ البشرة ويرطبها بشكل طبيعي، صار أساسي فروتيني.", name: "حسناء", stars: 5, timeAgo: "" },
    { id: "gel-aloe-vera-r2", quote: "So soothing after sun exposure, and doubles as a great daily moisturizer.", name: "Natalie R.", stars: 5, timeAgo: "" },
    { id: "gel-aloe-vera-r3", quote: "منتج طبيعي 100%، كيدخل بسرعة وما كيخليش حس لزج.", name: "جميلة", stars: 4.5, timeAgo: "" },
  ],
  "masque-detox": [
    { id: "masque-detox-r1", quote: "My skin looks so much clearer and fresher after each use — great for a weekly reset.", name: "Zoe A.", stars: 5, timeAgo: "" },
    { id: "masque-detox-r2", quote: "ماسك ديتوكس رائع، كينظف المسام بعمق ويعطي إشراقة فورية.", name: "وداد", stars: 5, timeAgo: "" },
    { id: "masque-detox-r3", quote: "بعد كل استعمال كنحس ببشرتي نظيفة ومتجددة، كنصح بيه بزاف.", name: "آسية", stars: 4.5, timeAgo: "" },
  ],
};

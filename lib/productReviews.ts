import type { Review } from "@/lib/validations";

// Keyed by product slotId (handle) — 3 reviews per product.
export const PRODUCT_REVIEWS: Record<string, Review[]> = {
  "creme-anti-rides": [
    {
      id: "creme-anti-rides-r1",
      quote:
        "Crème anti-rides incroyable, je l'ai utilisée pendant un mois et j'ai vraiment senti une différence dans la douceur de ma peau.",
      name: "سعاد",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-anti-rides-r2",
      quote:
        "Cette crème de nuit a visiblement atténué mes ridules en quelques semaines. Légère mais très nourrissante.",
      name: "Sarah M.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-anti-rides-r3",
      quote:
        "Ma peau était sèche et marquée par des signes de l'âge, maintenant je ressens un grand confort et un vrai éclat.",
      name: "خديجة",
      stars: 4.5,
      timeAgo: "",
    },
  ],
  "masque-anti-age": [
    {
      id: "masque-anti-age-r1",
      quote:
        "Un excellent soin hebdomadaire — ma peau est plus ferme et plus radieuse après chaque utilisation.",
      name: "Emma R.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "masque-anti-age-r2",
      quote:
        "Masque excellent, je l'utilise deux fois par semaine et il me donne un très bon résultat pour raffermir la peau.",
      name: "فاطمة",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "masque-anti-age-r3",
      quote:
        "J'ai essayé beaucoup de masques sans grand résultat, celui-ci m'a donné un résultat dès la première utilisation.",
      name: "مريم",
      stars: 4,
      timeAgo: "",
    },
  ],
  "serum-anti-age": [
    {
      id: "serum-anti-age-r1",
      quote:
        "S'absorbe rapidement et ma peau est déjà plus repulpée. Je le rachèterai sans hésiter.",
      name: "Lisa K.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "serum-anti-age-r2",
      quote:
        "Sérum léger qui pénètre rapidement, j'ai senti ma peau plus ferme après une semaine d'utilisation.",
      name: "أمينة",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "serum-anti-age-r3",
      quote:
        "Un excellent ajout à ma routine du soir — un éclat subtil chaque matin.",
      name: "Nora T.",
      stars: 5,
      timeAgo: "",
    },
  ],
  "creme-eclaircissante": [
    {
      id: "creme-eclaircissante-r1",
      quote:
        "Cette crème a changé le teint de ma peau, il est clair et uniforme maintenant, Dieu merci.",
      name: "سارة",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-eclaircissante-r2",
      quote:
        "Mes taches brunes se sont visiblement estompées après un mois d'utilisation régulière. Très satisfaite de cette crème.",
      name: "Jasmine L.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-eclaircissante-r3",
      quote:
        "Odeur agréable et texture légère, le résultat est apparu après 3 semaines.",
      name: "نادية",
      stars: 4.5,
      timeAgo: "",
    },
  ],
  "creme-eclaircissante-mains": [
    {
      id: "creme-eclaircissante-mains-r1",
      quote:
        "Mes mains sont tellement plus douces et le teint plus uniforme maintenant — texture parfaite, pas grasse.",
      name: "Amanda P.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-eclaircissante-mains-r2",
      quote:
        "Mes mains étaient un peu foncées, maintenant elles sont claires, je l'utilise tous les jours après la douche.",
      name: "حنان",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "creme-eclaircissante-mains-r3",
      quote:
        "Produit excellent pour les mains, il pénètre rapidement et donne une hydratation toute la journée.",
      name: "إيمان",
      stars: 5,
      timeAgo: "",
    },
  ],
  "masque-eclaircissant": [
    {
      id: "masque-eclaircissant-r1",
      quote:
        "Après deux utilisations, j'ai senti ma peau beaucoup plus lumineuse, un masque qui mérite d'être essayé.",
      name: "وفاء",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "masque-eclaircissant-r2",
      quote:
        "Un éclat instantané après rinçage — mon masque incontournable avant tout événement.",
      name: "Chloe B.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "masque-eclaircissant-r3",
      quote:
        "Je le recommande à toutes celles qui ont une peau terne, il donne un éclat immédiat.",
      name: "سلمى",
      stars: 4,
      timeAgo: "",
    },
  ],
  "pack-eclaircissant": [
    {
      id: "pack-eclaircissant-r1",
      quote:
        "J'ai adoré avoir la routine complète dans un seul pack — peau plus lumineuse et plus uniforme en 2 semaines.",
      name: "Rachel S.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-eclaircissant-r2",
      quote:
        "Le pack complet m'a donné une routine complète à un prix raisonnable, le résultat est devenu visible.",
      name: "كوثر",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-eclaircissant-r3",
      quote:
        "J'ai acheté ce pack en cadeau pour ma mère et elle l'a beaucoup aimé, sa peau a vraiment changé.",
      name: "عائشة",
      stars: 4.5,
      timeAgo: "",
    },
  ],
  "serum-eclaircissant": [
    {
      id: "serum-eclaircissant-r1",
      quote:
        "Texture légère, absorption rapide, et mon teint est visiblement plus lumineux.",
      name: "Olivia H.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "serum-eclaircissant-r2",
      quote:
        "Sérum puissant, son effet a commencé à se voir après une seule semaine sur les taches brunes.",
      name: "سعاد",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "serum-eclaircissant-r3",
      quote:
        "Très léger sur la peau et ne laisse pas de brillance, produit excellent.",
      name: "دنيا",
      stars: 4.5,
      timeAgo: "",
    },
  ],
  "gel-exfoliant-aha": [
    {
      id: "gel-exfoliant-aha-r1",
      quote:
        "Il exfolie la peau en douceur sans irriter, ma peau est devenue très douce après utilisation.",
      name: "أسماء",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "gel-exfoliant-aha-r2",
      quote:
        "Élimine les cellules mortes en douceur — mon visage est incroyablement doux et plus lumineux immédiatement après.",
      name: "Grace W.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "gel-exfoliant-aha-r3",
      quote:
        "Produit miracle pour la peau grasse, il élimine les points noirs de façon notable.",
      name: "ليلى",
      stars: 4.5,
      timeAgo: "",
    },
  ],
  // "gel-nettoyant-eclaircissant": [
  //   {
  //     id: "gel-nettoyant-eclaircissant-r1",
  //     quote:
  //       "Nettoie en profondeur sans assécher ma peau — et elle éclaircit aussi avec le temps.",
  //     name: "Megan D.",
  //     stars: 5,
  //     timeAgo: "",
  //   },
  //   {
  //     id: "gel-nettoyant-eclaircissant-r2",
  //     quote:
  //       "Gel nettoyant excellent, il raffermit le visage et lui donne une propreté profonde sans l'assécher.",
  //     name: "زينب",
  //     stars: 4.5,
  //     timeAgo: "",
  //   },
  //   {
  //     id: "gel-nettoyant-eclaircissant-r3",
  //     quote:
  //       "Je continue à l'utiliser quotidiennement, odeur légère et bon résultat sur le long terme.",
  //     name: "رجاء",
  //     stars: 5,
  //     timeAgo: "",
  //   },
  // ],
  // "gel-nettoyant-hydratant": [
  //   {
  //     id: "gel-nettoyant-hydratant-r1",
  //     quote:
  //       "Gel excellent pour la peau sèche, il nettoie tout en hydratant énormément en même temps.",
  //     name: "حياة",
  //     stars: 5,
  //     timeAgo: "",
  //   },
  //   {
  //     id: "gel-nettoyant-hydratant-r2",
  //     quote:
  //       "Ne dessèche pas du tout ma peau — elle reste douce et hydratée après chaque lavage.",
  //     name: "Hannah F.",
  //     stars: 5,
  //     timeAgo: "",
  //   },
  //   {
  //     id: "gel-nettoyant-hydratant-r3",
  //     quote:
  //       "Ma peau reste hydratée toute la journée depuis que j'ai commencé à l'utiliser.",
  //     name: "سميرة",
  //     stars: 4,
  //     timeAgo: "",
  //   },
  // ],
  // "gel-nettoyant-purifiant": [
  //   { id: "gel-nettoyant-purifiant-r1", quote: "Excellent pour les peaux grasses/à tendance acnéique — contrôle la brillance sans trop assécher.", name: "Victoria N.", stars: 5, timeAgo: "" },
  //   { id: "gel-nettoyant-purifiant-r2", quote: "Il a nettement réduit mes boutons après un mois d'utilisation quotidienne.", name: "يسرى", stars: 4.5, timeAgo: "" },
  //   { id: "gel-nettoyant-purifiant-r3", quote: "Nettoyant excellent pour la peau grasse, il donne une vraie sensation de propreté.", name: "بشرى", stars: 5, timeAgo: "" },
  // ],
  // "nettoyant-demaquillant-argan": [
  //   { id: "nettoyant-demaquillant-argan-r1", quote: "Il enlève le maquillage facilement sans irriter les yeux, et l'odeur d'argan est agréable.", name: "نسرين", stars: 5, timeAgo: "" },
  //   { id: "nettoyant-demaquillant-argan-r2", quote: "Enlève même le mascara waterproof en douceur, et laisse ma peau nourrie, pas asséchée.", name: "Sophie C.", stars: 5, timeAgo: "" },
  //   { id: "nettoyant-demaquillant-argan-r3", quote: "Le meilleur démaquillant que j'ai essayé, léger et très efficace.", name: "مريم", stars: 4.5, timeAgo: "" },
  // ],
  // "creme-anti-imperfections": [
  //   { id: "creme-anti-imperfections-r1", quote: "A calmé mes boutons en une semaine et contrôlé le gras sans irritation.", name: "Isabella G.", stars: 5, timeAgo: "" },
  //   { id: "creme-anti-imperfections-r2", quote: "Elle a nettement réduit mes boutons, et ma peau est devenue plus équilibrée.", name: "سلوى", stars: 4.5, timeAgo: "" },
  //   { id: "creme-anti-imperfections-r3", quote: "Produit très efficace pour la peau à boutons, un conseil sincère.", name: "فدوى", stars: 5, timeAgo: "" },
  // ],
  // "serum-anti-imperfections": [
  //   { id: "serum-anti-imperfections-r1", quote: "Sérum léger qui pénètre rapidement, j'ai senti une nette amélioration dans le traitement des boutons après deux semaines.", name: "نوال", stars: 5, timeAgo: "" },
  //   { id: "serum-anti-imperfections-r2", quote: "Ciblé et efficace — mes boutons ont disparu plus vite qu'avec tout ce que j'avais essayé auparavant.", name: "Ava M.", stars: 5, timeAgo: "" },
  //   { id: "serum-anti-imperfections-r3", quote: "Produit excellent, il ne laisse pas la peau grasse et traite les boutons en profondeur.", name: "إكرام", stars: 4, timeAgo: "" },
  // ],
  // "fluide-solaire-spf50": [
  //   { id: "fluide-solaire-spf50-r1", quote: "Léger, sans trace blanche, et se superpose parfaitement sous le maquillage. Mon nouvel essentiel quotidien.", name: "Emily J.", stars: 5, timeAgo: "" },
  //   { id: "fluide-solaire-spf50-r2", quote: "Protection solaire très légère qui ne laisse pas de brillance, convient sous le maquillage.", name: "غيثة", stars: 5, timeAgo: "" },
  //   { id: "fluide-solaire-spf50-r3", quote: "Protection solaire puissante sans sentir de lourdeur sur la peau.", name: "كنزة", stars: 4.5, timeAgo: "" },
  // ],
  // "gel-aloe-vera": [
  //   { id: "gel-aloe-vera-r1", quote: "Ce gel d'aloe vera apaise la peau et l'hydrate naturellement, il est devenu essentiel dans ma routine.", name: "حسناء", stars: 5, timeAgo: "" },
  //   { id: "gel-aloe-vera-r2", quote: "Tellement apaisant après une exposition au soleil, et il fait aussi un excellent hydratant quotidien.", name: "Natalie R.", stars: 5, timeAgo: "" },
  //   { id: "gel-aloe-vera-r3", quote: "Produit 100% naturel, il pénètre rapidement et ne laisse pas de sensation collante.", name: "جميلة", stars: 4.5, timeAgo: "" },
  // ],
  // "masque-detox": [
  //   { id: "masque-detox-r1", quote: "Ma peau est tellement plus claire et fraîche après chaque utilisation — parfait pour une remise à zéro hebdomadaire.", name: "Zoe A.", stars: 5, timeAgo: "" },
  //   { id: "masque-detox-r2", quote: "Masque détox excellent, il nettoie les pores en profondeur et donne un éclat immédiat.", name: "وداد", stars: 5, timeAgo: "" },
  //   { id: "masque-detox-r3", quote: "Après chaque utilisation, je sens ma peau propre et régénérée, je le recommande vivement.", name: "آسية", stars: 4.5, timeAgo: "" },
  // ],
};

import type { Review } from "@/lib/validations";

// Keyed by product slotId (handle) — 3 reviews per product. Handles must
// match real Shopify product handles; check against the live store before
// adding a new key here (a stale/renamed handle just means the reviews
// silently never render, since ProductReviews looks up by exact slotId).
export const PRODUCT_REVIEWS: Record<string, Review[]> = {
  "serum-anti-imperfections": [
    {
      id: "serum-anti-imperfections-r1",
      quote:
        "Ma peau à tendance acnéique déteste presque tout ce que j'essaie, mais celui-là elle l'a bien supporté. Boutons réduits en une dizaine de jours.",
      name: "Yousra B.",
      stars: 4.5,
      timeAgo: "il y a 2 semaines",
    },
    {
      id: "serum-anti-imperfections-r2",
      quote:
        "سيروم خفيف، ماكيخليش الوجه دهني، والحبوب بداو ينقصو من بعد سيمانة.",
      name: "بشرى",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "serum-anti-imperfections-r3",
      quote:
        "Texture agréable, absorbe vite. Petit bémol, le flacon se termine assez vite vu qu'on en met tous les soirs.",
      name: "Camille D.",
      stars: 4,
      timeAgo: "il y a 1 mois",
    },
  ],
  "gel-nettoyant-purifiant": [
    {
      id: "gel-nettoyant-purifiant-r1",
      quote:
        "Nettoie vraiment en profondeur sans tirer la peau après, ce que j'avais pas trouvé ailleurs.",
      name: "Meryem A.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "gel-nettoyant-purifiant-r2",
      quote:
        "بغيت نتوانط، الجل هذا خفف من اللمعان ديال الوجه بزاف، صباح ونهار كنستعملو.",
      name: "حياة",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "gel-nettoyant-purifiant-r3",
      quote:
        "Mousse peu mais ça suffit largement, ma peau grasse tient mieux dans la journée depuis que je l'utilise.",
      name: "Nadia F.",
      stars: 4,
      timeAgo: "il y a 3 semaines",
    },
  ],
  "gel-nettoyant-hydratant": [
    {
      id: "gel-nettoyant-hydratant-r1",
      quote:
        "Le seul nettoyant qui m'a pas asséché le visage cet hiver, franchement adopté.",
      name: "Salma K.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "gel-nettoyant-hydratant-r2",
      quote:
        "خفيف ومرطب، الوجه ديالي حساس شوية وماحسيتش بأي شد من بعد الغسل.",
      name: "زينب",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "gel-nettoyant-hydratant-r3",
      quote: "Sent bon, mousse légère, parfait le matin avant le sérum.",
      name: "Laila M.",
      stars: 4,
      timeAgo: "il y a 1 semaine",
    },
  ],
  "gel-nettoyant-eclaircissant": [
    {
      id: "gel-nettoyant-eclaircissant-r1",
      quote:
        "Utilisé avec le masque éclaircissant de la marque, la combinaison fait vraiment la différence sur le teint.",
      name: "Widad S.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "gel-nettoyant-eclaircissant-r2",
      quote:
        "بشرتي كانت مبقعة شوية، من بعد شهر بالجل هذا بقات اكثر توحد.",
      name: "سعاد",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "gel-nettoyant-eclaircissant-r3",
      quote:
        "Bonne odeur, la peau tire un peu les deux premiers jours puis ça passe, résultat au rendez-vous ensuite.",
      name: "Houda R.",
      stars: 4,
      timeAgo: "il y a 1 mois",
    },
  ],
  "gel-exfoliant-aha": [
    {
      id: "gel-exfoliant-aha-r1",
      quote:
        "Direct après la première utilisation le grain de peau est plus fin, j'étais bluffée.",
      name: "Grace W.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "gel-exfoliant-aha-r2",
      quote: "منقيش الوجه من الرؤوس السوداء بجد، كنستعملو مرتين فالسيمانة.",
      name: "ليلى",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "gel-exfoliant-aha-r3",
      quote:
        "Picote un tout petit peu au début si on force la dose, sinon très efficace sur les points noirs.",
      name: "Inès T.",
      stars: 4.5,
      timeAgo: "il y a 2 semaines",
    },
  ],
  "gel-aloe-vera": [
    {
      id: "gel-aloe-vera-r1",
      quote:
        "Je l'utilise même sur les cheveux en plus du visage, un seul pot pour tout, ça simplifie la vie.",
      name: "Nawal H.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "gel-aloe-vera-r2",
      quote: "كنحطو من بعد الشمس، كيبرد الوجه بزاف وماكيخليش أثر دهني.",
      name: "فدوى",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "gel-aloe-vera-r3",
      quote:
        "Un peu collant les premières secondes, puis ça pénètre bien. Bon apaisant après une journée au soleil.",
      name: "Élodie V.",
      stars: 4,
      timeAgo: "il y a 3 jours",
    },
  ],
  "creme-eclaircissante-mains": [
    {
      id: "creme-eclaircissante-mains-r1",
      quote:
        "Mes mains qui touchent l'eau de vaisselle toute la journée sont enfin moins marquées.",
      name: "Amanda P.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-eclaircissante-mains-r2",
      quote:
        "كنحط منها كل ليلة قبل النعاس، اليدين بداو يبانو أفتح شوية من بعد شهر.",
      name: "حنان",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "creme-eclaircissante-mains-r3",
      quote: "Texture riche sans être grasse, parfait juste avant de dormir.",
      name: "Sophia N.",
      stars: 5,
      timeAgo: "il y a 2 mois",
    },
  ],
  "creme-eclaircissante": [
    {
      id: "creme-eclaircissante-r1",
      quote:
        "Le teint est plus uni depuis que je l'utilise matin et soir, surtout au niveau des joues.",
      name: "Jasmine L.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-eclaircissante-r2",
      quote: "الكريم هذا بدل الوجه ديالي بجد، صافي وموحد الحمد لله.",
      name: "سارة",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-eclaircissante-r3",
      quote:
        "Odeur discrète, résultat sur les taches après quelques semaines, pas instantané mais ça tient dans le temps.",
      name: "نادية",
      stars: 4.5,
      timeAgo: "il y a 1 mois",
    },
  ],
  "creme-anti-rides": [
    {
      id: "creme-anti-rides-r1",
      quote:
        "Ma peau autour des yeux tirait moins dès la première semaine, texture pas grasse du tout.",
      name: "Sarah M.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-anti-rides-r2",
      quote: "استعملتها شهر كامل، الخطوط الدقيقة بانت اقل والوجه ناعم بزاف.",
      name: "خديجة",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "creme-anti-rides-r3",
      quote:
        "Un peu chère mais la texture et le résultat justifient le prix je trouve.",
      name: "Camille R.",
      stars: 4.5,
      timeAgo: "il y a 3 semaines",
    },
  ],
  "creme-anti-imperfections": [
    {
      id: "creme-anti-imperfections-r1",
      quote:
        "Contrôle bien le gras sans dessécher, ce que j'avais du mal à trouver comme crème pour peau à boutons.",
      name: "Ikram Z.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "creme-anti-imperfections-r2",
      quote: "الكريم هذا هدأ ليا الحبوب فأسبوعين، ماكيخليش الوجه يلمع.",
      name: "إكرام",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "creme-anti-imperfections-r3",
      quote:
        "Léger, s'applique bien sous le maquillage, quelques boutons en moins après un mois.",
      name: "Fatine L.",
      stars: 4,
      timeAgo: "il y a 1 semaine",
    },
  ],
  "masque-eclaircissant": [
    {
      id: "masque-eclaircissant-r1",
      quote:
        "Un masque à faire un dimanche soir, le teint est visiblement plus lumineux dès le rinçage.",
      name: "Chloe B.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "masque-eclaircissant-r2",
      quote:
        "كنستعملوه مرتين فالسيمانة، البشرة كتبان مشرقة بزاف من بعد.",
      name: "وفاء",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "masque-eclaircissant-r3",
      quote:
        "Sèche un peu vite sur le visage donc faut pas trop attendre pour rincer, sinon très bon résultat.",
      name: "سلمى",
      stars: 4,
      timeAgo: "il y a 2 semaines",
    },
  ],
  "masque-detox": [
    {
      id: "masque-detox-r1",
      quote:
        "Nettoie les pores en profondeur sans irriter, je le fais une fois par semaine, parfait pour repartir à zéro.",
      name: "Zoe A.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "masque-detox-r2",
      quote:
        "قنيعة زوينة بزاف، كتنقي الوجه من الشوائب والبشرة كتبان صافية من بعد.",
      name: "وداد",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "masque-detox-r3",
      quote:
        "Sensation de tiraillement en séchant mais rien de méchant, le teint est net après rinçage.",
      name: "Meriem D.",
      stars: 4.5,
      timeAgo: "il y a 1 mois",
    },
  ],
  "masque-anti-age": [
    {
      id: "masque-anti-age-r1",
      quote:
        "Peau plus ferme après chaque utilisation, je le fais deux fois par semaine sans faute.",
      name: "Emma R.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "masque-anti-age-r2",
      quote:
        "قنيعة قوية بزاف على البشرة، حسيت بفرق من اول مرة استعملتها.",
      name: "فاطمة",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "masque-anti-age-r3",
      quote:
        "J'ai testé pas mal de masques sans grand résultat, celui-ci a vraiment tenu ses promesses.",
      name: "مريم",
      stars: 4,
      timeAgo: "il y a 3 semaines",
    },
  ],
  "serum-anti-age": [
    {
      id: "serum-anti-age-r1",
      quote:
        "Absorbe vite, pas de sensation collante, ma peau est plus repulpée après deux semaines.",
      name: "Lisa K.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "serum-anti-age-r2",
      quote:
        "خفيف على البشرة، دخل بسرعة، حسيت بشد فالوجه من بعد سيمانة استعمال.",
      name: "أمينة",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "serum-anti-age-r3",
      quote:
        "Devenu indispensable dans ma routine du soir, éclat visible dès le matin.",
      name: "Nora T.",
      stars: 5,
      timeAgo: "il y a 1 semaine",
    },
  ],
  // Live Shopify handle for the "Sérum Éclaircissant" product — misleading
  // handle, it's a serum not a bundle (see BEFORE_AFTER_IMAGES comment in
  // GenericProductDetail.tsx).
  "pack-eclaircissant": [
    {
      id: "pack-eclaircissant-r1",
      quote:
        "Texture légère, absorption rapide, le teint est visiblement plus lumineux après deux semaines.",
      name: "Olivia H.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-eclaircissant-r2",
      quote:
        "سيروم قوي، بدا المفعول ديالو يبان من بعد سيمانة وحدة على البقع.",
      name: "سعاد",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-eclaircissant-r3",
      quote:
        "Très léger, ne laisse pas de brillance, mais l'odeur est un peu forte au début.",
      name: "دنيا",
      stars: 4.5,
      timeAgo: "il y a 2 semaines",
    },
  ],
  "pack-anti-age-acide-hyaluronique-fleur-de-kangourou": [
    {
      id: "pack-anti-age-acide-hyaluronique-fleur-de-kangourou-r1",
      quote:
        "Toute la routine anti-âge dans un seul pack, plus besoin de chercher les produits un par un. Peau visiblement plus ferme en 3 semaines.",
      name: "Rachel S.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-anti-age-acide-hyaluronique-fleur-de-kangourou-r2",
      quote:
        "البادج فيه كولشي اللي خصك: الغسول، السيروم، القناع والكريم. البشرة بانت اصغر من بعد شهر.",
      name: "كوثر",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-anti-age-acide-hyaluronique-fleur-de-kangourou-r3",
      quote:
        "Bon rapport qualité-prix comparé à acheter chaque produit séparément, et la routine est simple à suivre.",
      name: "عائشة",
      stars: 4.5,
      timeAgo: "il y a 1 mois",
    },
  ],
  "pack-anti-age-acide-hyaluronique-extrait-de-fleur-de-kangourou": [
    {
      id: "pack-anti-age-acide-hyaluronique-extrait-de-fleur-de-kangourou-r1",
      quote:
        "Pris ce pack après avoir testé le sérum seul, la routine complète donne un bien meilleur résultat.",
      name: "Julia K.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-anti-age-acide-hyaluronique-extrait-de-fleur-de-kangourou-r2",
      quote:
        "بادج كامل للعناية بالتقدم فالسن، البشرة بانت مشدودة بزاف من بعد شهر.",
      name: "مريم",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-anti-age-acide-hyaluronique-extrait-de-fleur-de-kangourou-r3",
      quote:
        "Un peu d'investissement au départ mais vu que ça remplace 4 produits, ça reste rentable.",
      name: "Claire B.",
      stars: 4.5,
      timeAgo: "il y a 3 semaines",
    },
  ],
  "pack-eclat-eclaircissant-vitamine-c-niacinamide": [
    {
      id: "pack-eclat-eclaircissant-vitamine-c-niacinamide-r1",
      quote:
        "J'ai commandé ce pack pour ma mère, sa peau est devenue plus uniforme en quelques semaines, elle est ravie.",
      name: "Rania B.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-eclat-eclaircissant-vitamine-c-niacinamide-r2",
      quote:
        "بادج زوين بزاف، الوجه بان اصفى ومتوحد من بعد شهر ونص.",
      name: "كنزة",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "pack-eclat-eclaircissant-vitamine-c-niacinamide-r3",
      quote:
        "Pratique d'avoir le nettoyant, le sérum, le masque et la crème assortis, la routine du soir prend 5 minutes.",
      name: "Sofia P.",
      stars: 5,
      timeAgo: "il y a 2 semaines",
    },
  ],
  "pack-eclat-eclaircissant-vitamine-c-niacinamide-1": [
    {
      id: "pack-eclat-eclaircissant-vitamine-c-niacinamide-1-r1",
      quote:
        "Deuxième commande de ce pack pour une amie, résultat toujours au rendez-vous sur les taches.",
      name: "Dounia F.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-eclat-eclaircissant-vitamine-c-niacinamide-1-r2",
      quote:
        "استعملت البادج هذا قبل مناسبة، الوجه بان مشرق ومتوحد فبضع ايام.",
      name: "غيثة",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-eclat-eclaircissant-vitamine-c-niacinamide-1-r3",
      quote:
        "Le format pack est plus économique et pratique, tout arrive en même temps.",
      name: "Léa M.",
      stars: 4,
      timeAgo: "il y a 1 mois",
    },
  ],
  "pack-purifiant-anti-imperfections-niacinamide-acide-salicylique": [
    {
      id: "pack-purifiant-anti-imperfections-niacinamide-acide-salicylique-r1",
      quote:
        "Ma peau à boutons a enfin une routine complète qui fonctionne, beaucoup moins d'imperfections depuis un mois.",
      name: "Hasnaa T.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-purifiant-anti-imperfections-niacinamide-acide-salicylique-r2",
      quote:
        "البادج هذا خفف ليا الحبوب اللي كانو كيطلعو كل شهر، دابا الوجه هادي بزاف.",
      name: "إيمان",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "pack-purifiant-anti-imperfections-niacinamide-acide-salicylique-r3",
      quote:
        "Le gel nettoyant et le masque ensemble, ça change vraiment la texture de peau, plus lisse.",
      name: "Yasmine C.",
      stars: 4.5,
      timeAgo: "il y a 3 semaines",
    },
  ],
  "pack-eclat-amp-eclaircissant-vitamine-c-amp-niacinamide": [
    {
      id: "pack-eclat-amp-eclaircissant-vitamine-c-amp-niacinamide-r1",
      quote:
        "Routine complète contre les boutons et les marques, plus simple que d'acheter chaque produit à part.",
      name: "Salma B.",
      stars: 5,
      timeAgo: "",
    },
    {
      id: "pack-eclat-amp-eclaircissant-vitamine-c-amp-niacinamide-r2",
      quote: "بادج مزيان لتنقية البشرة، بعد شهر الحبوب نقصو والوجه صافي.",
      name: "أسماء",
      stars: 4.5,
      timeAgo: "",
    },
    {
      id: "pack-eclat-amp-eclaircissant-vitamine-c-amp-niacinamide-r3",
      quote:
        "Le sérum et la crème du pack se complètent bien, boutons en nette baisse.",
      name: "Manon L.",
      stars: 4.5,
      timeAgo: "il y a 2 semaines",
    },
  ],
};

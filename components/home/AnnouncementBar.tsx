const MESSAGES = [
  "Livraison gratuite dès 499 MAD",
  "Nouveau Sérum À La Rose disponible",
  "Retours sous 30 jours, toujours",
];

const MESSAGES2 = [
  "Bientôt disponible dans une sélection de pharmacies partenaires partout au Maroc",
  "Bientôt disponible dans une sélection de pharmacies partenaires partout au Maroc",
];

export function AnnouncementBar() {
  const loop = [...MESSAGES, ...MESSAGES];
  const loop2 = [...MESSAGES2, ...MESSAGES2];

  return (
    <div className="text-center text-xs tracking-[0.12em] text-white uppercase">
      <div className="overflow-hidden whitespace-nowrap bg-black py-2.5">
        <div className="animate-marquee inline-block">
          {loop.map((msg, i) => (
            <span key={i} className="mx-10">
              {msg}
            </span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden whitespace-nowrap bg-[#002d21] py-2.5">
        <div className="animate-marquee-reverse inline-block">
          {loop2.map((msg, i) => (
            <span key={i} className="mx-10">
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const MESSAGES = [
  "Livraison gratuite dès 250 MAD",
  "Nouveau Sérum À La Rose disponible",
  "Retours sous 30 jours, toujours",
];

export function AnnouncementBar() {
  const loop = [...MESSAGES, ...MESSAGES];
  return (
    <div className="overflow-hidden whitespace-nowrap bg-brown py-2.5 text-center text-xs tracking-[0.12em] text-cream uppercase">
      <div className="animate-marquee inline-block">
        {loop.map((msg, i) => (
          <span key={i} className="mx-10">
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}

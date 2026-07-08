import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

const MARQUEE = [
  "Formules Propres",
  "Ingrédients Naturels",
  "Fabriqué au Maroc",
  "Non Testé sur les Animaux",
];

export function Hero() {
  const loop = [...MARQUEE, ...MARQUEE];
  return (
    <div className="relative overflow-hidden bg-[#FDFCFA] px-4 pt-12 sm:px-6 sm:pt-16">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 md:grid-cols-2">
        <div>
          <div className="mb-5 text-xs tracking-[0.2em] text-brown uppercase">
            // Soins de la peau
          </div>
          <h1 className="font-serif text-[44px] leading-[0.98] font-semibold text-ink sm:text-[64px] md:text-[76px] lg:text-[88px] lg:leading-[0.96]">
            Là où <span className="text-brown">la peau</span>
            <br />
            <span className="italic">rayonne</span>
          </h1>
          <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-[#5c534a]">
            Découvrez une sélection de soins et cosmétiques à formules propres,
            pensés pour un éclat au quotidien.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Button className="group transition-transform duration-200 hover:scale-105 active:scale-95">
              Acheter
              <ArrowRight
                className="h-[13px] w-[13px] transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <a
              href="#"
              className="group relative border-b border-ink pb-0.5 text-xs tracking-wider text-ink uppercase transition-colors duration-200 hover:text-brown"
            >
              Tout Explorer
            </a>
          </div>
        </div>

        <div className="relative mt-6 md:mt-0">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-white">
            <ImagePlaceholder
              label="Masque Éclaircissant Anissa"
              className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute -top-5 -right-5 flex h-14 w-14 items-center justify-center rounded-full bg-brown text-2xl font-light text-cream transition-transform duration-300 hover:rotate-90">
            +
          </div>
          <div className="absolute -bottom-7 -left-7 flex h-[130px] w-[130px] flex-col items-center justify-center rounded-full border border-border-sand bg-white text-center shadow-[0_20px_40px_rgba(42,36,32,0.1)] transition-transform duration-300 hover:-translate-y-1 sm:h-[150px] sm:w-[150px]">
            <div className="font-serif text-2xl text-ink sm:text-3xl">10K+</div>
            <div className="mt-1 max-w-[100px] text-[10px] tracking-wider text-[#8a7c6c] uppercase">
              Clientes conquises
            </div>
          </div>
        </div>
      </div>

      <div className="h-14 sm:h-[70px]" />
      <div className="overflow-hidden border-t border-b border-border-sand py-4 whitespace-nowrap">
        <div className="animate-marquee inline-block font-serif text-lg text-ink sm:text-xl">
          {loop.map((msg, i) => (
            <span key={i} className="mx-6">
              {msg}
              <span className="mx-6 text-gold">&#10022;</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

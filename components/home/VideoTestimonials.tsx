"use client";

import { useEffect, useRef, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { StarRow } from "@/components/ui/star-row";

const VIDEOS = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  src: `/videos/testimonials/testimonial-${i + 1}.mp4`,
  poster: `/videos/testimonials/testimonial-${i + 1}.jpg`,
}));

function VideoCard({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  function toggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    setIsMuted((m) => !m);
  }

  return (
    <div
      ref={cardRef}
      data-reveal
      onClick={togglePlay}
      className="group relative aspect-9/16 w-[240px] shrink-0 cursor-pointer snap-start overflow-hidden rounded-3xl bg-black shadow-[0_20px_45px_rgba(20,15,10,0.18)] sm:w-[300px]"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/30" />

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100",
        )}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brown shadow-lg backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
          {isPlaying ? (
            <Pause className="h-5 w-5" fill="currentColor" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true" />
          )}
        </span>
      </div>

      <button
        type="button"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
        onClick={toggleMute}
        className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/60"
      >
        {isMuted ? (
          <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
        ) : (
          <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
        )}
      </button>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
        <StarRow stars={5} />
        <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-white uppercase">
          <BadgeCheck className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
          Cliente vérifiée
        </div>
      </div>
    </div>
  );
}

export function VideoTestimonials() {
  const scopeRef = useScrollReveal<HTMLDivElement>();
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth ?? 280) + 16;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <div ref={scopeRef} className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div data-reveal className="mb-3 text-xs tracking-[0.2em] text-brown uppercase">
            Témoignages vidéo
          </div>
          <h2 data-reveal className="font-serif text-3xl leading-tight font-semibold text-black sm:text-4xl">
            Elles en parlent mieux que nous
          </h2>
        </div>

        <div data-reveal className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Précédent"
            onClick={() => scrollByCard(-1)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-sand text-ink transition-all duration-200 hover:border-brown hover:text-brown"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Suivant"
            onClick={() => scrollByCard(1)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border-sand text-ink transition-all duration-200 hover:border-brown hover:text-brown"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {VIDEOS.map((v) => (
          <VideoCard key={v.id} src={v.src} poster={v.poster} />
        ))}
      </div>
    </div>
  );
}

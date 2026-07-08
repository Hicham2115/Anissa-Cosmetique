"use client";

import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function InstagramGallery() {
  const scopeRef = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={scopeRef} className="mx-auto max-w-[1320px] px-4 pb-16 sm:px-6 sm:pb-24">
      <a
        href="https://www.instagram.com/anissacosmeticsofficiel/"
        target="_blank"
        rel="noopener noreferrer"
        data-reveal
        className="mb-9 block text-center font-serif text-xl transition-colors duration-200 hover:text-brown"
      >
        @anissacosmeticsofficiel
      </a>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} data-reveal className="group aspect-square w-full overflow-hidden">
            <ImagePlaceholder
              label="UGC"
              className="h-full w-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

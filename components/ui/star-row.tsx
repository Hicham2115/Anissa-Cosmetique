import { Star } from "lucide-react";

export function StarRow({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={i < stars ? "h-3.5 w-3.5 fill-gold text-gold" : "h-3.5 w-3.5 text-border-sand"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

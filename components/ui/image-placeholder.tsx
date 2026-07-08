import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ImagePlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 bg-[#EFE6D8] text-[#8a7c6c]",
        className
      )}
    >
      <ImageIcon className="h-6 w-6 opacity-50" aria-hidden="true" />
      <span className="px-2 text-center text-[11px] uppercase tracking-wider opacity-70">
        {label}
      </span>
    </div>
  );
}

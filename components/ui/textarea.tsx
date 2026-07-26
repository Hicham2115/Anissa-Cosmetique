import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full resize-none border border-black/15 bg-transparent px-4 py-3.5 font-sans text-sm text-black outline-none placeholder:text-black/40 focus:border-black",
        className
      )}
      {...props}
    />
  );
}

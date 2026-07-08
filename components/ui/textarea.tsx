import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full resize-none border border-[#E4D9C7] bg-transparent px-4 py-3.5 font-sans text-sm text-[#2A2420] outline-none placeholder:text-[#8a8078] focus:border-[#7E5836]",
        className
      )}
      {...props}
    />
  );
}

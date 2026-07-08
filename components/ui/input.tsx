import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex-1 border border-[#E4D9C7] bg-transparent px-4 py-3.5 font-sans text-sm text-[#2A2420] outline-none placeholder:text-[#8a8078] focus:border-[#7E5836]",
        className
      )}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "flex-1 border border-black/15 bg-transparent px-4 py-3.5 font-sans text-sm text-black outline-none placeholder:text-black/40 focus:border-black",
        className
      )}
      {...props}
    />
  );
}

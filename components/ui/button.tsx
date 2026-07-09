import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs uppercase tracking-wider font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#2A2420] text-[#FAF7F2] hover:bg-[#403830]",
        outline: "border border-[#FAF7F2] text-[#FAF7F2] bg-transparent hover:bg-white/10 rounded-lg",
        subscribe: "bg-[#FAF7F2] text-[#7E5836] hover:bg-white rounded-none rounded-r-lg",
      },
      size: {
        default: "px-8 py-4",
        sm: "px-6 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

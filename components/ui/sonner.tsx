"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!bg-cream !text-ink !border !border-border-sand !rounded-2xl !shadow-lg !font-sans",
          title: "!text-ink !font-medium",
          description: "!text-[#8a7c6c]",
          actionButton: "!bg-brown !text-cream",
          cancelButton: "!bg-sand !text-ink",
        },
      }}
      {...props}
    />
  );
}

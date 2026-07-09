"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      position="bottom-right"
      closeButton
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "!bg-cream !text-ink !border !border-border-sand !border-l-[3px] !border-l-brown !rounded-2xl !shadow-[0_20px_40px_rgba(42,36,32,0.18)] !font-sans !py-4 !px-4",
          icon: "!flex !h-9 !w-9 !shrink-0 !items-center !justify-center !rounded-full !bg-sand-light !text-brown !m-0",
          title: "!text-[15px] !font-serif !font-semibold !text-ink",
          description: "!mt-0.5 !text-[13px] !text-[#8a7c6c]",
          actionButton: "!bg-brown !text-cream !rounded-full",
          cancelButton: "!bg-sand !text-ink !rounded-full",
          closeButton:
            "!bg-cream !border !border-border-sand !text-ink hover:!bg-sand-light",
        },
      }}
      {...props}
    />
  );
}

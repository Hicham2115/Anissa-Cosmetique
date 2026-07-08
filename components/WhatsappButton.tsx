import { WhatsappIcon } from "@/components/icons/SocialIcons";

const WHATSAPP_NUMBER = "212661933416";

export function WhatsappButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed right-5 bottom-19 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5a] active:scale-95 sm:right-7 sm:bottom-23"
    >
      <WhatsappIcon className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

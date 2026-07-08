import { AlertTriangle } from "lucide-react";

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-[#E4D9C7] bg-[#FDFCFA] px-6 py-10 text-center">
      <AlertTriangle className="h-6 w-6 text-[#7E5836]" aria-hidden="true" />
      <p className="text-sm text-[#5c534a]">{message}</p>
    </div>
  );
}

import { AlertTriangle } from "lucide-react";

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-black/10 bg-black/2 px-6 py-10 text-center">
      <AlertTriangle className="h-6 w-6 text-black" aria-hidden="true" />
      <p className="text-sm text-[#5c534a]">{message}</p>
    </div>
  );
}

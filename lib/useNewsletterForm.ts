"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { newsletterSchema } from "@/lib/validations";
import { getErrorMessage } from "@/lib/utils";

const GENERIC_ERROR = "Échec de l'inscription. Veuillez réessayer.";

async function subscribe(email: string) {
  const { data } = await api.post("/newsletter", { email });
  return data as { message: string };
}

export function useNewsletterForm() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: subscribe,
    onError: (err) => toast.error(getErrorMessage(err, GENERIC_ERROR)),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);

    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setFieldError(result.error.issues[0]?.message ?? "Email invalide");
      return;
    }

    try {
      await mutation.mutateAsync(result.data.email);
      setEmail("");
    } catch (err) {
      setFieldError(getErrorMessage(err, GENERIC_ERROR));
    }
  };

  return { email, setEmail, fieldError, handleSubmit, mutation };
}

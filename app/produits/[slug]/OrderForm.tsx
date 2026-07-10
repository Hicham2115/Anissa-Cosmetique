"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2, MapPin, Package, Phone, ShieldCheck, ShoppingBag, Truck, User } from "lucide-react";
import { api } from "@/lib/axios";
import { codOrderFormSchema, type Product } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const INITIAL_VALUES = { name: "", phone: "", address: "" };

const REASSURANCE = [
  { icon: Truck, label: "Livraison 24–48h" },
  { icon: ShieldCheck, label: "Paiement à la livraison" },
];

function fieldClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 font-sans text-sm text-ink outline-none transition-all duration-200 placeholder:text-[#b3a897] focus:ring-4 ${
    hasError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "border-border-sand focus:border-brown focus:ring-brown/10"
  }`;
}

function totalPrice(price: string, quantity: number): string {
  const match = price.match(/^([\d.,]+)\s*(.*)$/);
  if (!match) return price;
  const [, numStr, suffix] = match;
  const total = Number(numStr.replace(/,/g, "")) * quantity;
  return `${Math.round(total)} ${suffix}`.trim();
}

async function placeOrder(payload: Record<string, unknown>) {
  const { data } = await api.post("/orders", payload);
  return data as { message: string };
}

function FieldLabel({ icon: Icon, children }: { icon: typeof Package; children: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-brown">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="text-[13px] font-semibold text-ink">{children}</span>
    </div>
  );
}

export function OrderForm({ product, quantity = 1 }: { product: Product; quantity?: number }) {
  const [confirmed, setConfirmed] = useState<{ phone: string } | null>(null);

  const mutation = useMutation({
    mutationFn: placeOrder,
    onError: (err) =>
      toast.error(
        axios.isAxiosError(err)
          ? (err.response?.data?.message ?? "Échec de l'envoi. Veuillez réessayer.")
          : "Échec de l'envoi. Veuillez réessayer."
      ),
  });

  const form = useForm({
    defaultValues: INITIAL_VALUES,
    onSubmit: async ({ value }) => {
      try {
        await mutation.mutateAsync({
          productSlug: product.slotId,
          productName: product.name,
          quantity,
          ...value,
        });
        setConfirmed({ phone: value.phone });
        form.reset();
      } catch {
        // handled by mutation.onError
      }
    },
  });

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border-sand bg-white p-6 shadow-[0_8px_30px_rgba(126,88,54,0.08)] sm:p-8">
      <div className="pointer-events-none absolute top-0 right-0 h-40 w-40 -translate-y-1/3 translate-x-1/3 rounded-full bg-gold/10 blur-3xl" />

      {confirmed ? (
        <div className="relative flex flex-col items-center py-4 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-brown">
            <CheckCircle2 className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-serif text-2xl font-semibold text-ink">Commande reçue !</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#8a7c6c]">
            Nous vous appellerons au <span className="font-semibold text-ink">{confirmed.phone}</span> pour
            confirmer votre commande de {quantity > 1 ? `${quantity} × ` : ""}
            {product.name}.
          </p>
          <button
            type="button"
            onClick={() => setConfirmed(null)}
            className="mt-6 cursor-pointer text-xs font-semibold tracking-wider text-brown uppercase underline underline-offset-4"
          >
            Passer une nouvelle commande
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="text-xs tracking-[0.2em] text-brown uppercase">// Commande rapide</div>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-ink sm:text-[28px]">
            Finalisez votre commande
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#8a7c6c]">
            Remplissez vos coordonnées pour procéder à la livraison — paiement à la livraison disponible.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2"
            noValidate
          >
            <div className="sm:col-span-2">
              <FieldLabel icon={Package}>Produit</FieldLabel>
              <Input
                value={product.name}
                disabled
                readOnly
                className={`${fieldClasses(false)} cursor-not-allowed bg-sand-light text-[#5c534a]`}
              />
              <div className="mt-2 flex items-center justify-between text-xs text-[#8a7c6c]">
                <span>
                  Quantité : <span className="font-semibold text-ink">{quantity}</span>
                </span>
                <span>
                  Total : <span className="font-semibold text-brown">{totalPrice(product.price, quantity)}</span>
                </span>
              </div>
            </div>

            <form.Field name="name" validators={{ onChange: codOrderFormSchema.shape.name }}>
              {(field) => (
                <div>
                  <FieldLabel icon={User}>Nom complet *</FieldLabel>
                  <Input
                    placeholder="Entrez votre nom complet"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={fieldClasses(!field.state.meta.isValid)}
                    aria-invalid={!field.state.meta.isValid}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1.5 text-xs text-red-600">{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="phone" validators={{ onChange: codOrderFormSchema.shape.phone }}>
              {(field) => (
                <div>
                  <FieldLabel icon={Phone}>Numéro de téléphone *</FieldLabel>
                  <Input
                    type="tel"
                    placeholder="06 123 456 789"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={fieldClasses(!field.state.meta.isValid)}
                    aria-invalid={!field.state.meta.isValid}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1.5 text-xs text-red-600">{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="address" validators={{ onChange: codOrderFormSchema.shape.address }}>
              {(field) => (
                <div className="sm:col-span-2">
                  <FieldLabel icon={MapPin}>Adresse de livraison *</FieldLabel>
                  <Textarea
                    placeholder="Entrez votre adresse complète de livraison"
                    rows={2}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`${fieldClasses(!field.state.meta.isValid)} resize-none`}
                    aria-invalid={!field.state.meta.isValid}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1.5 text-xs text-red-600">{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            </form.Field>

            <div className="flex justify-center sm:col-span-2">
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || mutation.isPending}
                    className="mt-2 w-full py-4 text-[13px] transition-all duration-200 hover:scale-[1.02] hover:bg-brown active:scale-95 sm:w-80"
                  >
                    <ShoppingBag className="h-[13px] w-[13px]" aria-hidden="true" />
                    {isSubmitting || mutation.isPending ? "Envoi..." : "Passer la commande"}
                  </Button>
                )}
              </form.Subscribe>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-t border-border-sand pt-4 sm:col-span-2">
              {REASSURANCE.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-[11px] text-[#8a7c6c]">
                  <Icon className="h-3.5 w-3.5 text-brown" strokeWidth={1.5} aria-hidden="true" />
                  {label}
                </div>
              ))}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

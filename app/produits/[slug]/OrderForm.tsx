"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, CheckCircle2, Gift, MapPin, Package, Phone, ShieldCheck, ShoppingBag, Truck, User } from "lucide-react";
import { api } from "@/lib/axios";
import { codOrderFormSchema, type Product } from "@/lib/validations";
import { GIFT_ELIGIBLE_PACK_HANDLES, GIFT_OPTIONS } from "@/lib/packs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/utils";

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

export function OrderForm({
  product,
  quantity = 1,
  giftSlug = null,
  onGiftSlugChange,
}: {
  product: Product;
  quantity?: number;
  giftSlug?: string | null;
  onGiftSlugChange?: (slug: string) => void;
}) {
  const [confirmed, setConfirmed] = useState<{ phone: string } | null>(null);
  const isGiftEligible = GIFT_ELIGIBLE_PACK_HANDLES.includes(product.slotId);

  const mutation = useMutation({
    mutationFn: placeOrder,
    onError: (err) => toast.error(getErrorMessage(err, "Échec de l'envoi. Veuillez réessayer.")),
  });

  const form = useForm({
    defaultValues: INITIAL_VALUES,
    onSubmit: async ({ value }) => {
      try {
        await mutation.mutateAsync({
          productSlug: product.slotId,
          productName: product.name,
          quantity,
          ...(isGiftEligible && giftSlug ? { giftSlug } : {}),
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
          {isGiftEligible && giftSlug && (
            <p className="mt-1 text-xs text-brown">
              + votre cadeau offert : {GIFT_OPTIONS.find((g) => g.handle === giftSlug)?.name}
            </p>
          )}
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

            {isGiftEligible && (
              <div className="sm:col-span-2">
                <FieldLabel icon={Gift}>Choisissez votre cadeau offert</FieldLabel>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {GIFT_OPTIONS.map((gift) => {
                    const isSelected = giftSlug === gift.handle;
                    return (
                      <button
                        key={gift.handle}
                        type="button"
                        onClick={() => onGiftSlugChange?.(gift.handle)}
                        className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${
                          isSelected
                            ? "border-brown bg-gold/10 text-ink"
                            : "border-border-sand text-[#5c534a] hover:border-brown/40"
                        }`}
                      >
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            isSelected ? "border-brown bg-brown text-cream" : "border-border-sand"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" aria-hidden="true" />}
                        </span>
                        <span className="min-w-0 truncate">{gift.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <form.Field name="name" validators={{ onSubmit: codOrderFormSchema.shape.name }}>
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

            <form.Field name="phone" validators={{ onSubmit: codOrderFormSchema.shape.phone }}>
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

            <form.Field name="address" validators={{ onSubmit: codOrderFormSchema.shape.address }}>
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

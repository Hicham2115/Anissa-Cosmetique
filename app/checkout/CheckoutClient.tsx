"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CheckCircle2,
  MapPin,
  Minus,
  Package,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
  X,
} from "lucide-react";
import { api } from "@/lib/axios";
import { cartOrderFormSchema } from "@/lib/validations";
import { useCartStore } from "@/store/cartStore";
import { formatMad, getErrorMessage, parsePriceAmount } from "@/lib/utils";
import { computeShippingFee, FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

const INITIAL_VALUES = { name: "", phone: "", address: "" };

const REASSURANCE = [
  { icon: Truck, label: "Livraison 24–48h" },
  { icon: ShieldCheck, label: "Paiement à la livraison" },
];

function fieldClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 font-sans text-sm text-ink outline-none transition-all duration-200 placeholder:text-[#b3a897] focus:ring-4 ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-border-sand focus:border-brown focus:ring-brown/10"
  }`;
}

function FieldLabel({
  icon: Icon,
  children,
}: {
  icon: typeof Package;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-2 flex items-center gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/15 text-brown">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <span className="text-[13px] font-semibold text-ink">{children}</span>
    </div>
  );
}

async function placeCartOrder(payload: Record<string, unknown>) {
  const { data } = await api.post("/orders/cart", payload);
  return data as { message: string };
}

export function CheckoutClient() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clear);

  const [confirmed, setConfirmed] = useState<{ phone: string } | null>(null);

  const subtotal = items.reduce(
    (sum, i) => sum + parsePriceAmount(i.price) * i.quantity,
    0,
  );
  const shippingFee = computeShippingFee(subtotal);
  const total = subtotal + shippingFee;

  const mutation = useMutation({
    mutationFn: placeCartOrder,
    onError: (err) =>
      toast.error(
        getErrorMessage(err, "Échec de l'envoi. Veuillez réessayer."),
      ),
  });

  const form = useForm({
    defaultValues: INITIAL_VALUES,
    onSubmit: async ({ value }) => {
      try {
        await mutation.mutateAsync({
          items: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          ...value,
        });
        setConfirmed({ phone: value.phone });
        clearCart();
        form.reset();
      } catch {
        // handled by mutation.onError
      }
    },
  });

  if (confirmed) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-brown">
          <CheckCircle2
            className="h-8 w-8"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </span>
        <h1 className="mt-5 font-serif text-3xl font-semibold text-ink">
          Commande reçue !
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#8a7c6c]">
          Nous vous appellerons au{" "}
          <span className="font-semibold text-ink">{confirmed.phone}</span> pour
          confirmer votre commande.
        </p>
        <Link href="/boutique" className="mt-8">
          <Button>Continuer mes achats</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sand-light text-brown">
          <ShoppingBag
            className="h-7 w-7"
            strokeWidth={1.4}
            aria-hidden="true"
          />
        </span>
        <h1 className="mt-5 font-serif text-2xl font-semibold text-ink">
          Votre panier est vide
        </h1>
        <p className="mt-2 text-sm text-[#8a7c6c]">
          Ajoutez des produits pour passer commande.
        </p>
        <Link href="/boutique" className="mt-8">
          <Button>Découvrir la boutique</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <div className="text-xs tracking-[0.2em] text-brown uppercase">
          {"Commande"}
        </div>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">
          Finaliser ma commande
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start lg:gap-12">
        <div className="order-2 rounded-3xl border border-border-sand bg-white p-6 shadow-[0_8px_30px_rgba(126,88,54,0.08)] sm:p-8 lg:order-1">
          <div className="mb-2 flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-brown">
              <Truck
                className="h-4 w-4"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>
            <h2 className="font-serif text-xl font-semibold text-ink">
              Livraison
            </h2>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-[#8a7c6c]">
            Remplissez vos coordonnées pour procéder à la livraison — paiement à
            la livraison disponible.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            noValidate
          >
            <form.Field
              name="name"
              validators={{ onSubmit: cartOrderFormSchema.shape.name }}
            >
              {(field) => (
                <div className="sm:col-span-2">
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
                    <p className="mt-1.5 text-xs text-red-600">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="phone"
              validators={{ onSubmit: cartOrderFormSchema.shape.phone }}
            >
              {(field) => (
                <div className="sm:col-span-2">
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
                    <p className="mt-1.5 text-xs text-red-600">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="address"
              validators={{ onSubmit: cartOrderFormSchema.shape.address }}
            >
              {(field) => (
                <div className="sm:col-span-2">
                  <FieldLabel icon={MapPin}>Adresse de livraison *</FieldLabel>
                  <Textarea
                    placeholder="Entrez votre adresse complète de livraison"
                    rows={3}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className={`${fieldClasses(!field.state.meta.isValid)} resize-none`}
                    aria-invalid={!field.state.meta.isValid}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="mt-1.5 text-xs text-red-600">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <div className="sm:col-span-2">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting || mutation.isPending}
                    className="w-full py-4 text-[13px] transition-all duration-200 hover:scale-[1.02] hover:bg-brown active:scale-95"
                  >
                    <ShoppingBag
                      className="h-[13px] w-[13px]"
                      aria-hidden="true"
                    />
                    {isSubmitting || mutation.isPending
                      ? "Envoi..."
                      : `Confirmer ma commande — ${formatMad(total)}`}
                  </Button>
                )}
              </form.Subscribe>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 border-t border-border-sand pt-4 sm:col-span-2">
              {REASSURANCE.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-[11px] text-[#8a7c6c]"
                >
                  <Icon
                    className="h-3.5 w-3.5 text-brown"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {label}
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="order-1 lg:sticky lg:top-24 lg:order-2">
          <div className="rounded-3xl border border-border-sand bg-sand-light/60 p-6 sm:p-7">
            <h2 className="mb-5 font-serif text-lg font-semibold text-ink">
              Récapitulatif ({items.length})
            </h2>

            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3.5">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <ImagePlaceholder
                        label={item.name}
                        className="absolute inset-0 h-full w-full"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-sm text-ink">{item.name}</span>
                      <button
                        type="button"
                        aria-label={`Retirer ${item.name}`}
                        onClick={() => removeItem(item.productId)}
                        className="flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8a7c6c] transition-colors duration-200 hover:text-ink"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border-sand bg-white">
                        <button
                          type="button"
                          aria-label="Diminuer la quantité"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="flex h-6 w-6 cursor-pointer items-center justify-center text-ink transition-colors duration-200 hover:text-brown"
                        >
                          <Minus className="h-3 w-3" aria-hidden="true" />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold text-ink">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Augmenter la quantité"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="flex h-6 w-6 cursor-pointer items-center justify-center text-ink transition-colors duration-200 hover:text-brown"
                        >
                          <Plus className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="text-xs font-semibold text-brown">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2.5 border-t border-border-sand pt-5 text-sm">
              <div className="flex items-center justify-between text-[#5c534a]">
                <span>Sous-total</span>
                <span>{formatMad(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-[#5c534a]">
                <span>Livraison</span>
                <span
                  className={
                    shippingFee === 0 ? "font-semibold text-brown" : undefined
                  }
                >
                  {shippingFee === 0 ? "Gratuite" : formatMad(shippingFee)}
                </span>
              </div>
              {shippingFee > 0 && (
                <p className="text-xs text-[#8a7c6c]">
                  Livraison gratuite dès {formatMad(FREE_SHIPPING_THRESHOLD)}{" "}
                  d&rsquo;achat.
                </p>
              )}
              <div className="mt-1 flex items-center justify-between border-t border-border-sand pt-3 font-serif text-lg text-ink">
                <span>Total</span>
                <span>{formatMad(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

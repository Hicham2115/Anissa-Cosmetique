# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

Anissa Cosmetics — a French-language e-commerce storefront (luxury cosmetics, Casablanca) built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Product data is sourced from Shopify's Storefront API when configured, with static fallback data otherwise.

## Commands

```bash
npm run dev     # start dev server (localhost:3000)
npm run build   # production build
npm run start   # serve production build
npm run lint    # eslint
```

There is no test runner configured in this repo.

## Architecture

### Data flow: Route Handlers as the only data boundary

Client components never call Shopify or hold secrets directly. The flow is always:

`components (useQuery via lib/axios.ts) → app/api/*/route.ts → lib/shopify.ts (server-only) → Shopify Storefront API`

- [lib/shopify.ts](lib/shopify.ts) imports `server-only` and is the sole place the Shopify Storefront token is used — it can only be imported from Route Handlers, never from client components.
- `shopifyConfigured` (exported from `lib/shopify.ts`) gates whether Shopify is called at all. [app/api/products/route.ts](app/api/products/route.ts) falls back to a hardcoded `FALLBACK_PRODUCTS` array when Shopify env vars are absent, so the site works without any backend configured.
- `app/api/categories` and `app/api/reviews` are currently static/mocked (no Shopify integration yet).
- `app/api/contact` and `app/api/newsletter` validate via Zod schemas in [lib/validations.ts](lib/validations.ts) but do not persist anywhere yet — see the inline comments in those routes for the intended parameterized-query approach when a real backend is added.

### Query keys and Axios

- All client-side reads go through the shared `api` instance in [lib/axios.ts](lib/axios.ts) (`baseURL` defaults to `/api`), combined with `useQuery`/`useMutation` from TanStack Query.
- Query keys are centralized in [lib/queryKeys.ts](lib/queryKeys.ts) — add new keys there rather than inlining key arrays in components.
- `QueryClient` is constructed once in [app/providers.tsx](app/providers.tsx) (`staleTime: 60_000`, `retry: 2`) and also wraps `LenisProvider`, so `Providers` is the single top-level client provider mounted in `app/layout.tsx`.

### Cart state

Client-side cart state (not synced to a backend) lives in [store/cartStore.ts](store/cartStore.ts) using Zustand — a plain `create()` store, no persistence middleware.

### Validation layer

[lib/validations.ts](lib/validations.ts) is the single source of truth for both Zod schemas and their inferred TypeScript types (`Product`, `Category`, `Review`, `ContactInput`, `NewsletterInput`). Route handlers validate inbound bodies with `.safeParse`; API response shapes for products/categories/reviews reuse the same types. `sanitizeInput` strips SQL-metacharacters as defense-in-depth on top of the (currently absent) real persistence layer — keep using it on any new freeform string field that might later reach a database.

### Fonts and branding

The brand spec calls for "Roden" (headings) and "Lavender" (slogan) typefaces, which are not available on Google Fonts. [app/layout.tsx](app/layout.tsx) substitutes Urbanist and Josefin Sans as the closest matches until real font files are sourced — check that comment before changing font choices. Font CSS variables are wired through `@theme inline` in [app/globals.css](app/globals.css) (`--font-serif`, `--font-sans`, `--font-slogan`), and brand colors (`--color-cream`, `--color-ink`, `--color-brown`, `--color-gold`, etc.) are also defined there rather than in `tailwind.config`.

### Component layout

- `components/home/*` — homepage sections (Hero, Categories, BestSellers, Testimonials, Newsletter, ContactForm, etc.), each typically owning its own `useQuery` call against the corresponding `app/api` route.
- `components/ui/*` — generic primitives (Skeleton, ErrorState, Button, Input, Textarea, ImagePlaceholder).
- `components/LoadingScreen.tsx`, `components/LenisProvider.tsx`, `components/ErrorBoundary.tsx`, `components/PromoPopup.tsx` — cross-cutting, mounted from `app/layout.tsx` or `app/providers.tsx`.
- `app/boutique/` is the only non-home route so far (`page.tsx` + `BoutiqueGrid.tsx`).

## Conventions in practice

- Data fetching: Axios (`lib/axios.ts`) + TanStack Query (`useQuery`/`useMutation`), never raw `fetch` from client components.
- Every `useQuery`/`useMutation` should surface `isLoading` (via `components/ui/skeleton.tsx`) and `isError` (via `components/ui/error-state.tsx`) states — see existing `components/home/*` sections for the pattern.
- GSAP animations use `useGSAP` from `@gsap/react`, not raw `useEffect` + `gsap.to`.
- `"use client"` only where browser APIs, hooks, GSAP, or Lenis are needed; Server Components are the default elsewhere.

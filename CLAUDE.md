# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint via Next.js
```

There are no tests configured in this project.

## Architecture Overview

**MODO** is a Next.js 14 App Router fashion e-commerce frontend (no backend — all data is mocked).

### Routing & Rendering Pattern

- **Server Components** by default: `app/page.tsx` (home), `app/products/[slug]/page.tsx` (product detail)
- **Client Components** where interactivity is needed: `app/products/page.tsx` (filtered listing), `app/products/[slug]/ProductDetailClient.tsx`
- Root layout (`app/layout.tsx`) wraps everything in `<Providers>` (TanStack Query + Toaster), plus `<Header>`, `<Footer>`, `<AnnouncementBar>`, and `<CartDrawer>`

### State Management

Two Zustand stores:
- `src/store/cart-store.ts` — Cart items persisted to `localStorage` under key `"fashion-cart"`. Computes subtotal/shipping/tax ($9.99 shipping, waived above $150; 8% tax). Adding an item also opens the cart drawer.
- `src/store/ui-store.ts` — Ephemeral UI state: search overlay, mobile menu, filter drawer, and client-side wishlist (not persisted).

### Data Layer

All product data lives in `src/data/products.ts` as in-memory arrays. `src/hooks/use-products.ts` wraps these with TanStack Query + artificial delays to simulate async fetching. To connect a real API, replace the data functions in `src/data/` and update the fetch functions in `src/hooks/use-products.ts`.

### Component Organization

- `components/ui/` — Shadcn UI primitives (do not edit; regenerate via Shadcn CLI if needed)
- `components/layout/` — `Header`, `Footer`, `AnnouncementBar`
- `components/home/` — Page sections for the home route
- `components/product/` — `ProductCard`, `ProductGrid`
- `components/cart/` — `CartDrawer`, `CartItem`
- `components/providers/` — `Providers` (QueryProvider + Toaster wrapper)

### Forms & Validation

All Zod schemas are centralized in `src/lib/validations/index.ts`: auth (login/register), checkout (shipping address + payment), newsletter, and search. Forms use React Hook Form with `@hookform/resolvers/zod`.

### Styling Conventions

- Tailwind CSS v3 with `font-sans` (Inter) and `font-serif` (Playfair Display) CSS variables
- Brand colors: `brand-red` (`#E11D48`), `brand-dark` (`#0A0A0A`)
- Shadcn UI color tokens (HSL CSS variables in `app/globals.css`)
- `cn()` utility from `src/lib/utils.ts` for conditional class merging (`clsx` + `tailwind-merge`)
- Custom animations: `animate-marquee`, `animate-fade-in`, `animate-slide-in-right`, `animate-zoom-in`
- Images sourced from Unsplash; `images.unsplash.com` and `plus.unsplash.com` are whitelisted in `next.config.ts`

### TypeScript

Strict mode. Core domain types are in `src/types/index.ts`: `Product`, `CartItem`, `Order`, `User`, `FilterOptions`, `PaginatedProducts`, `NavItem`.

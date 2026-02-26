# MODO — Fashion E-Commerce

A modern, full-featured fashion e-commerce website built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Components | Shadcn UI (Radix primitives) |
| State | Zustand v4 |
| Data fetching | TanStack Query v5 (React Query) |
| Forms | React Hook Form v7 + Zod |
| Animations | Framer Motion v11 |
| Icons | Lucide React |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (Header, Footer, Providers)
│   ├── page.tsx            # Home page (Server Component)
│   ├── loading.tsx         # Global loading UI
│   ├── not-found.tsx       # 404 page
│   ├── products/
│   │   ├── page.tsx        # Product listing (Client Component)
│   │   └── [slug]/
│   │       ├── page.tsx    # Product detail (Server Component)
│   │       └── ProductDetailClient.tsx
│   ├── cart/
│   │   └── page.tsx        # Cart page
│   ├── checkout/
│   │   └── page.tsx        # Checkout with multi-step form
│   └── account/
│       ├── login/page.tsx
│       └── register/page.tsx
│
├── components/
│   ├── ui/                 # Shadcn UI primitives
│   ├── layout/             # Header, Footer, AnnouncementBar
│   ├── home/               # Hero, Collections, Promo, Categories
│   ├── product/            # ProductCard, ProductGrid
│   ├── cart/               # CartDrawer, CartItem
│   └── providers/          # QueryProvider, Providers
│
├── data/                   # Mock data (products, categories)
├── hooks/                  # React Query hooks (use-products)
├── lib/                    # Utils, validations (Zod schemas)
├── store/                  # Zustand stores (cart, ui)
└── types/                  # TypeScript type definitions
```

## Key Features

- **Server-first** — Home page and product detail pages are Server Components
- **Cart** — Persistent cart with Zustand + localStorage hydration, slide-out drawer
- **Product listing** — Filtering by category/subcategory, sorting, pagination
- **Checkout** — 3-step multi-form with full Zod validation
- **Auth** — Login/Register forms with validation, password strength indicator
- **Animations** — Framer Motion scroll animations, hover effects, page transitions
- **Responsive** — Mobile-first, full responsive design
- **Wishlist** — Client-side wishlist with Zustand

## Connecting a Backend

The data layer is intentionally abstracted in `src/data/` and `src/hooks/`.

To connect a real backend:
1. Replace mock data functions in `src/data/products.ts` with API calls
2. Update `src/hooks/use-products.ts` to fetch from your API endpoints
3. Add authentication state to `src/store/ui-store.ts`
4. Implement proper session management in `src/app/layout.tsx`

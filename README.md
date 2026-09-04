# LUFFY — Premium Fashion E-Commerce (Next.js)

A full-stack-feeling fashion e-commerce demo built with Next.js App Router, TypeScript, Tailwind CSS, Zustand, and Framer Motion. Data lives in `lib/data.ts` (acts as the `db.json` seed) and cart/wishlist/auth/orders persist to `localStorage` via Zustand.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Demo accounts

- Admin — admin@luffy.com / 123456 → redirects to `/admin`
- User — user@luffy.com / 123456 → redirects to `/profile`

## What's real vs. placeholder

- All shopping flows (browse, filter, sort, product detail, cart, wishlist, checkout, order history, admin CRUD) are fully functional against local state — no external backend needed.
- Product/category photography is represented with styled placeholder panels (see `components/Placeholder.tsx`) instead of stock photos, since no licensed imagery was provided. Swap in real images by replacing `<Placeholder />` usages with `<img>`/`next/image`.
- "Payment" in checkout is a mock confirmation step — no real payment processor is wired up.

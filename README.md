# Car Loan Interest Deduction Checker

A programmatic-SEO + tool site: "Does your car qualify for the U.S. car loan interest deduction
(2025–2028)?" One page per `year/make/model`, plus a live VIN checker that decodes the vehicle with
the free NHTSA vPIC API and tells the user if the **final-assembly-in-USA** requirement is met.

## Why this exists (the strategy)

- **Gap:** the SERP for "is [car] eligible for the car loan interest deduction" is just car-dealer
  pages (brand-biased, no tool). No neutral, VIN-level checker exists.
- **Moat:** assembly data comes from the free NHTSA vPIC API — text bloggers won't build the
  pipeline; we do.
- **Scale:** one page per vehicle (year × make × model) = thousands of long-tail pages.
- **Tool intent:** people want to *check*, not read. The VIN checker is the magnet (and link-bait).

## Stack

- Next.js (App Router) with **static export** (`output: "export"`).
- No server, no database. The VIN checker runs in the browser and calls NHTSA directly → hosting is
  effectively free (Cloudflare Pages / Vercel free tier).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static site → ./out)

```bash
npm run build    # outputs static HTML/CSS/JS in ./out
```

Deploy `./out` to Cloudflare Pages, Vercel, or any static host.
Set your real domain first: `NEXT_PUBLIC_SITE_URL=https://your-domain.com` (used by sitemap/robots).

## Expand the dataset

```bash
npm run data     # pulls model lists from NHTSA and appends missing models
```

`data/vehicles.json` is the source of truth. Each entry: `{ year, make, model, assembly, bodyClass, plants, note }`.
`assembly` is `us` | `foreign` | `mixed`. The live VIN checker is always authoritative per unit.

## Compliance baked in

- "Not tax advice" disclaimers (footer + pages).
- Privacy policy + advertising/cookie note (`/privacy`).
- Affiliate + tax-advice disclosure (`/disclosure`).
- Clean ad placements only — no click-baiting, no popups (AdSense/SEO safe).

## What's done vs next

- [x] Static site, model pages, live VIN checker (verified against NHTSA), rules page, sitemap/robots, compliance pages.
- [ ] Enrich `assembly` per model from the NHTSA AALA final-assembly report (for accurate static verdicts).
- [ ] Add more programs to the checker (EV / clean-vehicle credit) — same VIN, more answers.
- [ ] Validate keyword volume (Google Keyword Planner) and add hub pages ("eligible SUVs", by make).
- [ ] Deploy + Google Search Console + AdSense.

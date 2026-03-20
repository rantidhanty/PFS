# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

**Stack:** Next.js App Router, React 19, TypeScript 5, Tailwind CSS 4, MDX, Framer Motion

**Business context:** ProFabric Steel (PFS) — B2B sports equipment e-commerce site in Indonesian, targeting customers in Bekasi, Indonesia. All content/UI is in Indonesian.

### Data Layer (no database)

All content is static:
- `src/data/products.ts` — product catalog with typed schema (categories: basketball, volleyball, football, badminton, padel, tennis, official-equipment; standards: FIBA, FIVB, FIFA, BWF, FIP, ITF)
- `src/data/projects.ts` — portfolio projects
- `src/data/testimonials.ts` — customer testimonials
- `src/content/blog/*.mdx` — blog articles (metadata in `src/lib/blog.ts`)
- `src/config/site.ts` — company info, admin WhatsApp contacts, geo coordinates, business hours

### Routing (`src/app/`)

| Route | Description |
|---|---|
| `/` | Home (Hero → Featured → Testimonials → CTA) |
| `/products` | Product catalog |
| `/products/[slug]` | Product detail |
| `/projects/[slug]` | Project detail |
| `/blog/[slug]` | MDX blog post |
| `/tentang` | About |
| `/kontak` | Contact |
| `/faq` | FAQ |

### Key Systems

**Search** (`src/context/`, `src/lib/search.ts`, `src/components/ui/SearchPalette`): Global search index combining products, blog, projects, FAQs, and pages. Triggered via Ctrl+K or search bar click. Scoring prioritizes exact phrase matches.

**WhatsApp integration** (`src/lib/wa.ts`, `WaFloat`, `WaAdminSheet`): Multiple admin contacts from `site.ts`; `waUrl()` generates pre-filled WA message links. Float button + admin sheet for consultation CTAs.

**Analytics** (`src/lib/analytics.ts`): GA4 (`NEXT_PUBLIC_GA4_ID`) + Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) initialized in root layout.

**MDX blog**: Posts in `src/content/blog/`, configured in `next.config.ts` with remark-gfm, rehype-slug, rehype-autolink-headings. Components mapped in `src/mdx-components.tsx`.

### Component Organization

```
src/components/
├── layout/     # SiteNavbar, SiteFooter
├── sections/   # Page sections (Hero, Products, Testimonials, FAQ, Featured, Bottom)
└── ui/         # Reusable UI (SearchPalette, product gallery, carousels, WhatsApp widgets)
```

Path alias: `@/*` → `./src/*`

### Image Handling

Images are served from the public directory. Formats: AVIF/WebP with 30-day cache TTL. Blog images reference paths configured in `next.config.ts`.

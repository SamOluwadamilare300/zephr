# Zephyr 2026 — Campaign Platform

"Before You Vote, Verify." — an evidence-based campaign site for Zephyr's run for
LAUTECH Student Union General Secretary (LSUG 2026).

## What's built

- Landing page: hero, animated trust metrics, track-record cards, achievement timeline,
  4-pillar vision section, testimonials, filterable evidence gallery, "Ask Zephyr" form,
  Ambassador CTA, WhatsApp join section.
- `/ambassador` — generates a personalized, downloadable "I Stand With Zephyr" card
  (PNG export) with a unique referral link and WhatsApp/X/Instagram share actions, plus
  a live leaderboard.
- `/support/{username}` — referral landing page that attributes the visit to an
  ambassador, then forwards into the main site.
- `/admin` — password-protected dashboard: QR scan analytics (total/unique scans,
  top-performing poster locations, WhatsApp/ambassador conversion), ambassador and
  referral counts, and submitted questions. Protected by middleware + a shared-secret
  cookie (`ADMIN_PASSWORD`) — swap for real auth (e.g. NextAuth) before relying on this
  for anything sensitive.
- QR tracking: put `?source=library`, `?source=hostel-a`, etc. on each poster's QR code;
  a client component records one scan per visitor per source into Postgres.
- QR code generation (both ways):
  - CLI: `npm run qr:generate` writes PNG + SVG for every location in `qrSources`
    (`src/lib/content.ts`) into a `qr-codes/` folder. Pass specific names to generate
    just those: `npm run qr:generate hostel-c sub-stadium-gate`.
  - Admin UI: `/admin/qr-codes` — type a location name (or pick a common one) and
    download the PNG/SVG instantly, no terminal needed.
  - SVG is vector — use it for anything going to large-format print. PNG is fine for
    WhatsApp flyers or digital use.
- Prisma schema for all 9 requested models: `Candidate`, `Achievement`,
  `Testimonial`, `GalleryItem`, `Question`, `Ambassador`, `Referral`, `QrScan`,
  `CampaignMetric`.

**The site works without a database** — every data-fetching function falls back to the
seed content in `src/lib/content.ts`, so you can preview and deploy immediately, then
wire up Neon when ready.

## Setup

```bash
npm install            # also runs `prisma generate` via postinstall
cp .env.example .env.local   # fill in DATABASE_URL, ADMIN_PASSWORD, WhatsApp link
```

### Connect Neon

1. Create a project at https://neon.tech, copy the connection string into
   `DATABASE_URL` in `.env.local`.
2. Push the schema: `npm run db:push`
3. Seed real campaign content: `npm run db:seed`
   (or edit `src/lib/content.ts` first so the seed matches Zephyr's actual record).
4. Browse/edit data directly any time with `npm run db:studio`.

### Run locally

```bash
npm run dev
```

### Deploy

Push to GitHub, import into Vercel, and add the same environment variables
(`DATABASE_URL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_WHATSAPP_LINK`, `NEXT_PUBLIC_SITE_URL`)
in the Vercel project settings. `prisma generate` runs automatically as part of `npm run build`.

## What's stubbed / next steps

- **Admin CRUD**: the dashboard currently shows analytics + questions (read-only).
  Adding/editing achievements, testimonials, and gallery items needs a few more forms —
  the pattern in `src/lib/actions.ts` (Zod-validated server actions) extends directly to
  this; flag it if you want it built out.
- **Real photo**: `public/zephyr-portrait.svg` is a placeholder — drop in a real photo
  and update the `src` in `src/components/hero.tsx`.
- **Admin auth**: shared-password cookie is fine for an MVP run by one or two trusted
  people; move to per-person login before handing it to a larger team.
- **Gallery uploads**: gallery items are stored as URLs (e.g. images hosted on
  Cloudinary/Vercel Blob/Imgur) — there's no upload UI yet, just the schema + display.

## Tech stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Prisma ORM · Neon Postgres ·
Server Actions · lucide-react icons · html-to-image (ambassador card export).

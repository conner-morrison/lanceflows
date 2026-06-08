# Lanceflows

Marketing site for Lanceflows, converted from a static HTML site to a **Next.js (App Router, TypeScript)** project.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export → ./out
```

The site is configured for static export (`output: "export"` in `next.config.mjs`), so `out/` is a fully static bundle deployable to any static host.

## Structure

- `app/` — routes
  - `/` (`page.tsx`) — home: hero slider, about, why-tabs, contact form
  - `/services`, `/privacy`, `/terms` — static content pages
  - `/case-study` — case-study index (data-driven)
  - `/case-study/[id]` — case detail, statically generated per case (`generateStaticParams`)
- `components/` — `Header` (hamburger nav), `Footer`, `HumanVerify` (session gate), `HeroSlider`, `WhyTabs`, `ContactForm`, `ArchDiagram` (SVG), `CaseAvatar`
- `lib/` — `cases-data.ts`, `architectures.ts` (case + diagram data)
- `app/globals.css` — original `style.css` + Google font + verify-overlay styles
- `public/` — images and logos

The contact form posts to FormSubmit (`admin@lanceflows.com`), matching the original. It keeps a honeypot field for basic spam filtering.

## Bot protection

`components/HumanVerify.tsx` gates the site once per browser session with a real
**Cloudflare Turnstile** challenge (replacing the old click-a-box UI). Set your
site key before building:

```bash
cp .env.example .env.local
# then set NEXT_PUBLIC_TURNSTILE_SITE_KEY=<your key>
```

Without a key, the build uses Cloudflare's "always passes" test key — fine for
dev, not production. Because this is a fully static site (no server), the token is
**not** verified server-side (`/siteverify`): the challenge is real, but
enforcement is client-side and the gate fails open if the script is blocked. For
hard enforcement, verify the token in a Cloudflare Worker / serverless function.

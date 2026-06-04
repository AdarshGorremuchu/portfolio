# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build (also type-checks and lints)
npm run lint     # ESLint only
npm start        # serve the production build locally
```

`npm run build` is the right pre-push check — it runs the compiler, ESLint, and generates the static output in one pass. There are no tests.

## Architecture

**Single-page portfolio.** `app/page.tsx` renders all eight sections in order: `Navbar → Hero → About → Experience → Projects → Skills → Contact → Footer`. Each is an independent client component in `components/`.

**All content lives in `lib/data.ts`.** Personal info, stats, work history, projects, and skill categories are plain TypeScript objects exported from this one file. Components import directly from `@/lib/data` — no CMS, no API. Edit here to change copy without touching JSX.

**Color system via Tailwind tokens.** `tailwind.config.js` defines the full palette under `theme.extend.colors`:
- `bg.*` — background layers (DEFAULT → soft → card → elev, darkest to lightest)
- `accent` / `accent.glow` / `accent.warm` — primary orange-red (#e85d04), hover orange (#fb8500), amber pop (#ffb703)
- `ink.*` — text hierarchy (primary = white, secondary = cool gray, muted = dark gray)
- `border.subtle` / `border.strong` — semi-transparent white borders

Changing a palette value in `tailwind.config.js` cascades to every component automatically — no component-level hex values exist except inside `globals.css` utility classes.

**Global CSS utility classes** (`app/globals.css`) supplement Tailwind with composable patterns used across components:
- `.gradient-text` — white → amber → orange-red background-clip text
- `.section-label` — monospace section counter ("01 / About") with orange left-rule
- `.section-heading` — bold 800 all-caps sans, clamp-sized
- `.tag` — orange-tinted monospace pill for tech stack badges
- `.glow-card` + `::before` — on-hover gradient border glow via pseudo-element mask

**Fonts** — three CSS variables set in `layout.tsx` and consumed everywhere:
- `--font-sans` → Inter (body/UI)
- `--font-display` → Barlow Condensed 700/800/900 (headings, hero name)
- `--font-mono` → JetBrains Mono (labels, tags, code)

**Hero particle canvas.** `components/Hero.tsx` contains an inline `ParticleCanvas` component that drives a `<canvas>` via `requestAnimationFrame`. It uses a `ResizeObserver` on the canvas element (not `window`) for correct SSR-hydration sizing. Particle density formula: `Math.floor((W * H) / 8000)` ≈ 240 dots at 1080p.

**Animations** — Framer Motion `whileInView` with `once: true` on every section card/block. The `viewport` margin is `-100px` to trigger slightly before elements enter. Hero elements use staggered `delay` on initial mount (not scroll-triggered).

**Form submission** — `Contact.tsx` posts to Formspree (`https://formspree.io/f/mwvzvlkz`) via a plain `fetch`. No server actions or API routes.

**Path alias** — `@/*` maps to the repo root (`tsconfig.json`), so imports are `@/lib/data`, `@/components/Hero`, etc.

## Deployment

Vercel auto-deploys on every push to `main`. The build command Vercel runs is `npm run build`; output is static (`○` routes). No environment variables are required.

Resume PDF: drop `resume.pdf` in `/public/` — the navbar "Resume ↗" link targets `/resume.pdf`.

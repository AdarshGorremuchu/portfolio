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

For visual checks, `.claude/skills/run-portfolio/driver.mjs` starts (or reuses) the dev server and screenshots sections through Playwright.

## Design system

**The `landing-page-design` skill governs this site.** Every visual value resolves through it: the type scale, the spacing tokens, the dark background palette, the corner radius formula, the icon set, and the motion curve. Read it before changing fonts, sizes, spacing, radii, colors, icons, or transitions. The short version of what it locks down here:

- **One typeface: Poppins.** No pairing, no italics anywhere, no weight above 600. It is imported in `components/V1Frame.tsx`, not the root layout, so the font only ships to routes that render the frame; the CSS variable lands on that div and `.v1` in `globals.css` resolves it.
- **Named text styles only.** `heading-1`…`heading-6`, `title-1`…`title-5`, `body-1`…`body-7`, `button-lg/md/sm/xsm`, `caption-1`…`caption-5`, defined once in `tailwind.config.js` through a Tailwind plugin. They are registered with `addUtilities`, not `addComponents`, which is what makes responsive variants (`heading-4 md:heading-2`) generate **and** lets a size on an element beat the size baked into a component class such as `.btn`. Moving them back to `addComponents` silently breaks `btn-primary button-sm`. Never style text with a loose size plus weight.
- **Spacing is locked.** `theme.spacing` is *replaced*, not extended, so only the approved tokens exist (0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px). An off-token class like `p-5` or `gap-9` silently produces nothing, which is the point.
- **Flat backgrounds.** No background gradients anywhere. The one sanctioned gradient on the site is `.hero-gradient`, white to `#9B9B9B` across the hero heading text.
- **Borders go all the way around a card**, never one side.
- **Icons come from Phosphor**, imported from `@phosphor-icons/react/dist/ssr` so they work in server and client components alike. Names carry the `Icon` suffix (`ArrowRightIcon`), since the bare names are deprecated.
- **Motion** uses `ease-base` (`cubic-bezier(0.22,1,0.36,1)`), 500ms for transforms and 300ms for color and opacity. Only `transform` and `opacity` animate — never height, width, top, or left. That constraint is why the FAQ is built on native `<details>` with an opacity fade rather than an animated accordion.
- **Copy carries no hyphens inside sentences.** Ranges read "70 to 85%", not "70-85%". This applies to every string in `lib/data.ts`.
- **No invented facts.** Every number, employer, and date on the page comes from Adarsh's resume. Do not add testimonials, client logos, metrics, or guarantees that he has not supplied.

## Architecture

**Single-page landing page.** `app/page.tsx` renders the sections in the order the skill's Part A prescribes:

`Hero → ProofStrip → About → ProblemSolution → Benefits → Tagline → HowItWorks → Experience → Projects → Skills → FAQ → Contact`

plus `Navbar`, `ScrollProgress`, and `Footer` outside `<main>`. One offer, one audience, one primary action: **send a message**. The resume is deliberately a secondary text link, never a second button competing with the CTA above the fold.

Supporting routes: `app/not-found.tsx` (branded 404), `app/privacy/page.tsx`, `app/terms/page.tsx`, `app/icon.svg` (favicon), `public/og.png` (social card).

**All content lives in `lib/data.ts`** — personal info, proof orgs, stats, problem and solution pairs, benefits, steps, experience, projects, skills, education, and the FAQ. Components import from `@/lib/data`. Edit here to change copy without touching JSX. The FAQ is also emitted as `FAQPage` JSON-LD from `app/page.tsx` for answer engines.

**Shared primitives:**
- `Reveal.tsx` — the one scroll reveal used everywhere (32px rise, 700ms, base curve, once). Also exports `EASE_BASE`.
- `TaglineReveal.tsx` — the skill's mandatory word by word reveal. A single rAF-throttled scroll listener lights each word as it crosses a trigger line at 58% viewport height; a word's horizontal offset shifts its threshold, which is what staggers words sharing a line instead of flipping them together.
- `CountUp.tsx` — animates a stat only when it holds exactly one number, so "70 to 85%" renders as written. Written against IntersectionObserver and matchMedia rather than Framer Motion.
- `Magnetic.tsx` — transform-only cursor pull on the primary CTA.

**Colors via Tailwind tokens** in `tailwind.config.js`:
- `bg.*` — `#131209` base (the one warm tone on the approved dark list), then `#1F1F1F`, `#272727`, `#313131`
- `accent` / `accent.glow` / `accent.deep` — the gold identity, kept through the palette change
- `ink.primary/secondary/muted/error` — contrast ratios noted inline
- `border.subtle` / `border.strong`

**Global component classes** in `app/globals.css`: `.shell`, `.section`, `.label`, `.card` / `.card-hover`, `.btn-primary` / `.btn-secondary`, `.tag`, `.field`, `.hero-gradient`, `.skip-link`, `.grain`, `.portrait-mask`.

**Hero portrait.** `Hero.tsx` holds a 2D canvas `ParticlePortrait` that samples `/public/headshot.webp` into gold particles. On capable desktops it upgrades to `ParticlePortrait3D` (three.js, code split, loaded only when WebGL is present, the viewport is above 768px, and reduced motion is off). On mobile it is a dim full bleed backdrop at 20% opacity; on desktop it occupies the right half with its left edge feathered by `.portrait-mask`.

**Navigation.** A floating pill 16px off the top edge, sized to its content, translucent over a backdrop blur. The toggle rotates two rules into a cross, the mobile menu is a full height panel with links arriving 60ms apart, and the section in view is marked with `aria-current` by an IntersectionObserver.

**Form submission** — `Contact.tsx` validates on the client (required fields plus email shape), focuses the first invalid field, then posts to Formspree (`https://formspree.io/f/mwvzvlkz`). Success replaces the form with a composed confirmation panel. No server actions or API routes.

**Images.** `public/headshot.webp` (93 KB) is the source every surface reads: the 2D canvas, the 3D point cloud, and the `next/image` in About. `headshot.png` is the 1.4 MB original, kept for re-exports and referenced by nothing. Do not point code back at the PNG.

**Path alias** — `@/*` maps to the repo root (`tsconfig.json`).

## Deployment

Vercel auto-deploys on every push to `main`. The build command is `npm run build`; output is static (`○` routes). No environment variables are required.

Resume PDF: drop `resume.pdf` in `/public/` — the nav, hero, about, and footer all link to `/resume.pdf`.

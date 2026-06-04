---
name: run-portfolio
description: Build, run, and screenshot the portfolio site. Use when asked to start the portfolio, run it locally, take a screenshot, verify a visual change, or check that a section renders correctly.
---

Next.js 14 static portfolio. Drive it via `node .claude/skills/run-portfolio/driver.mjs` — it starts (or reuses) the dev server and takes screenshots via Playwright headless Chromium. No auth, no env vars required.

## Prerequisites

```bash
npm install   # installs playwright as a devDependency — already in package.json
```

Playwright's Chromium binary is cached at `~/Library/Caches/ms-playwright/` after the first install — no extra `playwright install` step needed on this machine.

## Run (agent path)

```bash
# Screenshot all six sections → /tmp/portfolio-shots/<section>.png
node .claude/skills/run-portfolio/driver.mjs

# Screenshot one section only
node .claude/skills/run-portfolio/driver.mjs hero
node .claude/skills/run-portfolio/driver.mjs about
node .claude/skills/run-portfolio/driver.mjs experience
node .claude/skills/run-portfolio/driver.mjs projects
node .claude/skills/run-portfolio/driver.mjs skills
node .claude/skills/run-portfolio/driver.mjs contact
```

The driver detects whether the dev server is already on port 3000 and reuses it if so — no double-launch. If it starts the server itself, it kills it on exit.

**Screenshots land at:** `/tmp/portfolio-shots/<section>.png`

The driver also prints `Orange accent present: true/false` — a quick sanity check that the VISTA.IO orange-red palette is rendering (vs. leftover indigo from the old theme).

## Run (human path)

```bash
npm run dev   # → http://localhost:3000, Ctrl-C to stop
```

## Build

```bash
npm run build   # type-checks + lints + generates static output
```

This is the right pre-push check. There are no tests.

## Gotchas

- **Stop previous server before relaunching.** Port 3000 stays occupied across restarts. `pkill -f "next dev"` before starting fresh, otherwise you'll get `EADDRINUSE`.

  ```bash
  pkill -f "next dev"; sleep 1; npm run dev &
  ```

- **Particle canvas needs ~2 s to populate.** The driver waits 2 000 ms after `networkidle` before the first screenshot — reducing this makes the hero particle dots disappear.

- **Framer Motion `whileInView` needs 700 ms after scrollIntoView.** The driver waits 700 ms after each section scroll. Cutting this causes sections to be captured mid-animation (partially faded in).

- **`timeout` is not available on macOS zsh.** Use a polling loop instead of `timeout 30 bash -c '…'`. The driver handles this internally with `fetch` polling.

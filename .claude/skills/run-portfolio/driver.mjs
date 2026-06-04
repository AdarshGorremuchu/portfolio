#!/usr/bin/env node
/**
 * Portfolio driver — starts dev server, screenshots every section.
 *
 * Usage:
 *   node .claude/skills/run-portfolio/driver.mjs [section]
 *
 * section = hero | about | experience | projects | skills | contact | all (default: all)
 *
 * Screenshots → /tmp/portfolio-shots/<section>.png
 */

import { chromium } from "playwright";
import { spawn } from "child_process";
import { mkdirSync } from "fs";
import { setTimeout as sleep } from "timers/promises";

const PORT = 3000;
const BASE = `http://localhost:${PORT}`;
const SHOT_DIR = "/tmp/portfolio-shots";
const SECTIONS = ["hero", "about", "experience", "projects", "skills", "contact"];
const target = process.argv[2] ?? "all";

mkdirSync(SHOT_DIR, { recursive: true });

// ── helpers ──────────────────────────────────────────────────────────────────

async function serverReady(ms = 30_000) {
  const deadline = Date.now() + ms;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(BASE);
      if (r.ok) return;
    } catch {}
    await sleep(500);
  }
  throw new Error(`Dev server not ready after ${ms}ms`);
}

async function shot(page, name) {
  const dest = `${SHOT_DIR}/${name}.png`;
  await page.screenshot({ path: dest });
  console.log(`  screenshot → ${dest}`);
  return dest;
}

async function scrollTo(page, id) {
  await page.evaluate((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
  }, id);
  await sleep(700); // let Framer Motion settle
}

// ── main ─────────────────────────────────────────────────────────────────────

let devProc = null;
let ownedServer = false;

// Start dev server only if nothing is already listening on port 3000
try {
  await fetch(BASE);
  console.log("Dev server already running — reusing.");
} catch {
  console.log("Starting dev server …");
  devProc = spawn("npm", ["run", "dev"], {
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
  });
  devProc.stdout.on("data", (d) => process.stdout.write(d));
  devProc.stderr.on("data", (d) => process.stderr.write(d));
  ownedServer = true;
  await serverReady();
  console.log("Dev server ready.");
}

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

try {
  await page.goto(BASE, { waitUntil: "networkidle" });
  await sleep(2000); // particles need a moment

  const targets = target === "all" ? SECTIONS : [target];

  for (const id of targets) {
    console.log(`\n[ ${id} ]`);
    if (id !== "hero") await scrollTo(page, id);
    await shot(page, id);
  }

  // Quick smoke checks
  const errors = await page.evaluate(() =>
    window.__errors__ ? window.__errors__ : []
  );
  if (errors.length) console.warn("Console errors:", errors);

  // Verify orange accent is present (no indigo/cyan remnants)
  const hasOrange = await page.evaluate(() => {
    const all = Array.from(document.querySelectorAll("*"));
    return all.some((el) => {
      const bg = getComputedStyle(el).backgroundColor;
      return bg.includes("232, 93, 4") || bg.includes("251, 133, 0");
    });
  });
  console.log(`\nOrange accent present: ${hasOrange}`);

  console.log(`\nAll shots in ${SHOT_DIR}/`);
} finally {
  await browser.close();
  if (ownedServer && devProc) {
    devProc.kill();
    console.log("Dev server stopped.");
  }
}

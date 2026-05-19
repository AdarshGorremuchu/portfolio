# Adarsh Gorremuchu — Portfolio

A modern, dark-themed personal portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js 18+](https://nodejs.org/) — download the LTS version
- A code editor like [VS Code](https://code.visualstudio.com/)

### Run it on your laptop

```bash
# 1. Install dependencies (only needed once)
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see your portfolio live.

---

## ✏️ How to Edit Your Content

All your personal info, experience, projects, and skills live in **one file**:

```
/lib/data.ts
```

Open it and edit. Save, and the site updates automatically. No need to touch React components for content changes.

---

## 📄 Adding Your Resume PDF

1. Drop your resume PDF inside the `/public` folder
2. Rename it to `resume.pdf`
3. The "Resume ↗" button in the navbar will automatically link to it

Path: `/public/resume.pdf`

---

## 📬 Activating the Contact Form (Free, 2 minutes)

The contact form uses **Formspree** — free for 50 submissions/month, no backend needed.

### Steps:
1. Go to [https://formspree.io](https://formspree.io) and sign up (free, use your Gmail)
2. Click **"+ New Form"**
3. Name it (e.g., "Portfolio Contact"), then click **Create Form**
4. Copy your form ID (looks like `xqkrabcd`)
5. Open `/components/Contact.tsx`
6. Find this line:
   ```
   const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
   ```
7. Replace `YOUR_FORM_ID` with your actual ID

Submissions will be delivered straight to your Gmail inbox.

---

## 🌐 Deployment (Free — Vercel)

Vercel is free for personal projects, made by the creators of Next.js. ~5 minutes total.

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
```

Create a new repo at [github.com/new](https://github.com/new) (public or private), then:
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [https://vercel.com/signup](https://vercel.com/signup) and sign in with GitHub
2. Click **"Add New... → Project"**
3. Select your portfolio repo
4. Click **Deploy** (no config needed — Vercel auto-detects Next.js)
5. Done — you'll get a free URL like `adarsh-portfolio.vercel.app`

### Step 3: Auto-deploys
Every `git push` to `main` will redeploy your site automatically.

---

## 🌍 Optional — Custom Domain

If you want `adarshgorremuchu.com` instead of the free Vercel URL:

1. Buy a domain at [Namecheap](https://namecheap.com) or [Porkbun](https://porkbun.com) (~$10/year)
2. In Vercel project → **Settings → Domains → Add Domain**
3. Vercel gives you DNS records to add at your registrar
4. SSL is automatic and free

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx        # Root layout, fonts, SEO metadata
│   ├── page.tsx          # Main page (assembles all sections)
│   └── globals.css       # Global styles, theme, animations
├── components/
│   ├── Navbar.tsx        # Navigation with mobile menu
│   ├── Hero.tsx          # Landing section
│   ├── About.tsx         # Bio + stats + education
│   ├── Experience.tsx    # Timeline of work history
│   ├── Projects.tsx      # Featured projects grid
│   ├── Skills.tsx        # Skills by category
│   ├── Contact.tsx       # Contact form (Formspree)
│   └── Footer.tsx        # Footer with links
├── lib/
│   └── data.ts           # ALL content — edit here
├── public/
│   └── resume.pdf        # Your resume (add this)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

---

## 🎨 Customizing the Theme

Theme colors are in `tailwind.config.js` under `theme.extend.colors`. Edit hex values to retune the palette:
- `accent` — primary indigo
- `accent.cyan` — secondary cyan
- `bg.*` — background shades
- `ink.*` — text shades

---

## 🛠️ Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Run locally at http://localhost:3000 |
| `npm run build` | Production build (Vercel runs this) |
| `npm start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

Built with care. Questions? Reach out at adarshg15102000@gmail.com.

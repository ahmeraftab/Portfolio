# Ahmer Aftab, Portfolio

**Live:** [portfolio-theta-puce-36.vercel.app](https://portfolio-theta-puce-36.vercel.app/)

My personal portfolio: an AI-focused full stack developer based in Karachi, Pakistan, showcasing production RAG pipelines, LLM-integrated products, and full-stack web/mobile work.

A single-page, dark-themed site with a mouse-reactive 3D hero, scroll-triggered animation throughout, framed project screenshots (browser-chrome mockups for live apps, clean cards for architecture diagrams), and a working contact form that emails me directly.

## Features

- Full-screen hero with a mouse-reactive distorted 3D icosahedron (React Three Fiber), lazy-mounted so it never blocks first paint, and gracefully skipped for reduced-motion or non-WebGL browsers.
- Scroll-triggered reveals and staggered animation throughout, built with Framer Motion.
- Project cards with real framing: a browser-chrome mockup (with the live domain in the address bar) for shipped apps, a clean light card for architecture/workflow diagrams.
- Animated stat counters, a drawn-in-on-scroll experience timeline, and an education section.
- A working contact form (react-hook-form + zod) that emails submissions via Gmail SMTP, with a small in-memory rate limiter.
- SEO metadata, Open Graph tags, `sitemap.xml`, and `robots.txt`.

## Stack

- **Next.js 16** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.js`, theme lives in `app/globals.css`)
- **Framer Motion**: scroll reveals, hover micro-interactions, page-load animation
- **React Three Fiber + drei**: lazy-loaded, mouse-reactive 3D hero background
- **shadcn/ui**: Button, Input, Textarea, Card, Badge, Label, Sonner (toasts)
- **react-hook-form + zod**: validated contact form
- **Nodemailer**: sends contact form messages via Gmail SMTP

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # lint
```

## Where content lives

| What | File |
|---|---|
| Name, role, taglines, bio pitch, email, resume link | `lib/constants.ts` |
| Social links (GitHub, LinkedIn) | `lib/constants.ts` → `SOCIAL_LINKS` |
| Stats (projects shipped, years, etc.) | `lib/constants.ts` → `STATS` |
| Skills by category | `lib/data.ts` → `SKILLS` |
| Projects (name, description, tech, links, image, image frame style) | `lib/data.ts` → `PROJECTS` |
| Work experience timeline | `lib/data.ts` → `EXPERIENCE` |
| Education | `lib/data.ts` → `EDUCATION` |
| Full bio paragraphs | `components/sections/about.tsx` |

Project screenshots live in `public/` and are framed automatically by `components/project-media.tsx`: set `imageKind: "app"` for a browser-chrome mockup (shows the real domain from `liveUrl` in the address bar when set) or `imageKind: "diagram"` for a clean light card, better suited to architecture/workflow diagrams.

Still open:

1. **Open Graph image**, add a 1200x630 image at `public/og-image.png` for rich link previews.
2. **Favicon**, replace `app/favicon.ico` with your own (also add `public/apple-touch-icon.png`, referenced in `app/layout.tsx`).

## Contact form / email

The form at `/#contact` posts to `app/api/contact/route.ts`, which validates input with zod and, once configured, sends email via Gmail SMTP through Nodemailer.

1. Enable 2-Step Verification on the Gmail account you want to send from (**Google Account → Security**).
2. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). Pick "Mail" as the app; Google gives you a 16-character password.
3. Copy `.env.example` to `.env.local` and set:
   ```
   GMAIL_USER=youraddress@gmail.com
   GMAIL_APP_PASSWORD=the16charapppassword
   ```
4. Restart `npm run dev`. `GMAIL_USER` only needs to be able to send mail; submissions always land at `SITE.email` in `lib/constants.ts` regardless of which account sends them, so a dedicated sending account works fine. `replyTo` is set to the visitor's email so you can reply directly.

Without those two variables set, the route still validates and logs submissions server-side (so the form works end-to-end in local dev), it just won't deliver email.

A small in-memory rate limiter caps submissions per IP; swap it for a durable store (e.g. Upstash Redis) if you deploy across multiple serverless instances and see abuse.

## Analytics

Structured to make analytics a one-line addition later:

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from "@vercel/analytics/react";
// ...inside <body>, alongside <Toaster />:
<Analytics />
```

Or swap in Google Analytics via a small client component in `app/layout.tsx`.

## Deploying to Vercel

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo. Vercel auto-detects Next.js, no config needed.
3. Add environment variables in the Vercel project settings (**Settings → Environment Variables**): `GMAIL_USER` and `GMAIL_APP_PASSWORD`.
4. Deploy. Subsequent pushes to your main branch auto-deploy.

Or from the CLI:

```bash
npm install -g vercel
vercel
```

## Notes on the 3D hero

The scene (`components/three/hero-scene.tsx`) is dynamically imported with `ssr: false` and mounted only after the browser is idle (`components/hero-canvas.tsx`), so it never blocks first paint or LCP. It skips rendering entirely for `prefers-reduced-motion: reduce` or browsers without WebGL support, falling back to a static gradient.

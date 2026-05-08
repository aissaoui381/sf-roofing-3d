# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server (localhost:5173)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint
```

No test suite configured.

## Architecture

Single-page marketing site for "Peak Roofing SF" built with **React + Vite**, **Tailwind CSS v3**, **GSAP**, and **Spline** (3D).

### Section flow

```
App
├── BottomDock          (fixed floating nav — bottom of viewport)
└── main
    ├── Hero            (full-screen, Spline 3D background)
    ├── Services        (6-card grid, scroll-triggered stagger)
    ├── WhyUs           (stat counters + benefit cards)
    ├── QuoteCalculator (4-step wizard → email capture)
    ├── Testimonials    (3 review cards)
    └── Footer          (email-only contact, no phone number)
```

### Key conventions

**GSAP — always use `useGSAP()`:**
```jsx
import { useGSAP } from '@gsap/react';
useGSAP(() => { /* tweens here */ }, { scope: containerRef });
```
Never put GSAP tweens in raw `useEffect`. `ScrollTrigger` and `useGSAP` are registered once in `App.jsx`.

**Spline — always wrap in `Suspense`:**
`src/components/ui/SplineScene.jsx` lazy-loads `@splinetool/react-spline` and provides a skeleton fallback. Use `<SplineScene url="..." />` everywhere; never import Spline directly in section components.

**Spline scene URL:** The `DEFAULT_SCENE` constant in `SplineScene.jsx` is a placeholder. Replace it with a real export URL from spline.design → Share → Export → React.

**Email-first business rule:** No phone numbers anywhere in the UI. All contact surfaces use `mailto:` or the quote calculator email field.

**Quote calculator pricing:** `calcEstimate()` in `QuoteCalculator.jsx` computes `base × sizeFactor × materialFactor × timelineFactor`. The `handleSubmit` function is a stub — wire it to your email automation provider (Resend, ConvertKit, Mailchimp, etc.).

**Bottom dock active state** is driven by a scroll listener that compares `window.scrollY + vh/2` against each section's `offsetTop`. Sections must have matching `id` attributes (`hero`, `services`, `quote`, `testimonials`, `footer`).

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->

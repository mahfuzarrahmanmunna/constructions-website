# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint (flat config, Next.js + TypeScript rules)
```

There is no test runner configured yet.

## Stack

- **Next.js 16.2.6** with App Router — read `node_modules/next/dist/docs/` for this version's APIs before writing code (see AGENTS.md)
- **React 19.2.4**
- **Tailwind CSS v4** — uses `@import "tailwindcss"` in CSS, not the v3 `@tailwind` directives; theme tokens are declared with `@theme inline`
- **TypeScript** with strict mode; path alias `@/*` → `src/*`
- **Swiper 12.1.4** — used for HeroBanner slider; imports from `swiper/react` and `swiper/modules`
- **MongoDB** planned — `src/lib/dbConnect.ts` and `src/lib/mongodbAdapter.ts` are empty stubs

## Architecture

```
src/
  app/                     # Next.js App Router root
    layout.tsx             # Root layout — Geist fonts, Navbar, html/body shell
    page.tsx               # Home route — renders HeroBanner
    globals.css            # Global styles (Tailwind v4 import + CSS vars)
    components/
      Navbar/Navbar.tsx    # Fixed top navbar with mega menu
      HeroBanner/HeroBanner.tsx
  lib/
    dbConnect.ts           # MongoDB connection helper (stub)
    mongodbAdapter.ts      # MongoDB adapter (stub)
    utils.ts               # Shared utilities (stub)
```

```
public/
  images/
    image1.png             # HeroBanner slide 1
    image2.png             # HeroBanner slide 2
    image3.png             # HeroBanner slide 3
    Nav-Photos/
      p1.png               # Earthmoving Machinery
      p2.png               # MEWPs
      p3.png               # Mobile Crane Machinery
      p4.png               # Construction Hoisting Machinery
      p5.png               # Concrete Machinery
      p6.png               # Agricultural Machinery
```

Components live inside `src/app/components/<Name>/<Name>.tsx` (one directory per component). Follow this convention for all new components.

CSS custom properties (`--background`, `--foreground`) are defined in `:root` in `globals.css` and exposed as Tailwind tokens via `@theme inline`. Add new design tokens there, not in `tailwind.config`.

## Components

### Navbar (`src/app/components/Navbar/Navbar.tsx`)
- `'use client'` — uses `useState`, `useRef`, `useEffect`
- Fixed at top, `z-50`, transparent by default; transitions to white when any menu is open or on `group-hover`
- Logo: "CPL" text left, nav links center, icons (search, Global, grid) right
- All text/icons are white by default; turn dark when navbar is active (`isActive = megaOpen || serviceOpen || investorOpen || newsOpen || aboutOpen || contactOpen || mobileOpen`)
- Tailwind `group` on `<header>` drives white-state color changes via `group-hover:` variants
- **State**: `megaOpen`, `activeCategory`, `serviceOpen`, `investorOpen`, `newsOpen`, `aboutOpen`, `contactOpen`, `mobileOpen`, `mobileProdOpen`
- **No-flicker close**: `onMouseLeave` is debounced via a 120 ms `closeTimer` ref; `onMouseEnter` cancels it. Entire navbar + all panels are wrapped in a single `<div onMouseLeave={startClose} onMouseEnter={cancelClose}>`.
- **Dropdown transitions**: all panels use `overflow-hidden` + `max-h` on the outer wrapper (400ms/350ms `ease-out`) combined with `translate-y` + `opacity` on the inner content div for a smooth drop-down feel. `border-t` and `shadow` are applied **only when open** so no ghost line/strip appears in the default state.
- **Active link colour**: the open panel's corresponding nav link turns `text-green-600`; all others turn `text-gray-700`. "Construction Cases" also turns green on hover but has no dropdown.
- **Products mega menu** (desktop only, `hidden lg:block`):
  - Opens on `onMouseEnter` of Products link; `max-h-[600px]` / `max-h-0` transition (400ms)
  - Left column `w-72`: 6 product categories with photo thumbnails (`/images/Nav-Photos/p1–p6.png`); active row is `green-600`; tracked by `activeCategory` state
  - Right column: `bg-gray-50` (no grid overlay); sections: SERVICE SUPPORT (2 links), SERVICE HOTLINE (5 country numbers at `text-base`); green CPL brand box at bottom
  - Bottom bar: "Inquiry" (gray pill) + "Online consultation" (green pill) buttons
- **Subnav dropdowns** (Service, Investor, News, About CPL, Contact) — desktop only, full-width white bars, 60px tall, `ease-out` 350ms:
  - Each has a bold heading + vertical divider + nav links in a flex row
  - Positioned via large fixed `pl-[]` padding to visually align under their respective nav link
  - Service: `lg:pl-[620px]` — CPL Services | Services Offered | Service Network | Parts Network
  - Investor: `lg:pl-[730px]` — Stock Chart | Announcements | Financial Reports
  - News: `lg:pl-[800px]` — Press Release | Events | Video
  - About CPL: `lg:pl-[580px]` — Company Profile | Technology & Innovation | Social Responsibility | Career
  - Contact: `lg:pl-[880px]` — Contact Us
- **Responsive / mobile** (`lg:hidden` / `hidden lg:*`):
  - Below `lg`: center links and right icons hidden; hamburger button shown on right
  - Hamburger toggles `mobileOpen`; icon swaps ☰ ↔ ✕
  - Mobile drawer slides open below header using `max-h` transition
  - All nav links stacked with `border-b` separators
  - Products row has a chevron button that expands/collapses `mobileProdOpen` accordion showing all 6 categories

### HeroBanner (`src/app/components/HeroBanner/HeroBanner.tsx`)
- `'use client'` — Swiper requires client
- Full-viewport-height (`h-screen`) image slider using Swiper's **Creative Effect + Parallax**
- Background images are 130% wide with `data-swiper-parallax="-20%"` for depth effect
- Each slide has a dark gradient shader overlay at `z-[1]`: `rgba(0,0,0,0.72)` left → `rgba(0,0,0,0.15)` right, improving text legibility
- Slide content sits at `z-[2]` above the overlay
- Content elements (badge, title, divider, subtitle, CTAs) each have staggered `data-swiper-parallax` values (`-400` to `-150`) for layered parallax
- 3 slides: each has `badge`, `title`, `subtitle`, `primaryCta`, `secondaryCta`, `accent` colour, and `image` path
- Autoplay every 5500ms, loop enabled, speed 1000ms

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Casa Vista Verde is a bilingual (Spanish/English) website for a rural vacation rental house in Tapezco, Zarcero, Costa Rica. Built as a single-page application with React, TypeScript, Chakra UI, and Vite. Deployed on Vercel.

## Commands

- `npm run dev` - Start development server
- `npm run build` - TypeScript check + Vite production build (`tsc -b && vite build`)
- `npm run lint` - ESLint
- `npm run preview` - Preview production build locally

## Architecture

**Stack:** React 18, TypeScript, Chakra UI v2, Vite, Framer Motion, Swiper, react-router-dom v7

**Routing:** Two routes in `src/App.tsx` — home page (`/`) with all sections, and privacy policy (`/politica-de-privacidad`).

**i18n:** Custom context-based system (no library). `src/context/LanguageContext.tsx` provides `useLanguage()` hook with `lang` ('es'|'en'), `toggleLang()`, and `t(key)`. All translatable strings live in `src/translations.ts` as a flat object keyed by section. Default language is Spanish.

**Theming:** Chakra UI theme extended in `src/theme.ts` with `light.*` and `dark.*` color tokens. Key colors: greens for text/secondary, `#ff914d` accent (orange), `#292f3d` primary. Font: Inter.

**Serverless API:** `api/send-email.js` is a Vercel serverless function using Nodemailer (Gmail) to handle reservation form submissions. Requires `EMAIL_USER` and `EMAIL_PASS` environment variables on Vercel.

**Components** (`src/components/`): Navbar, Hero (video backgrounds with Swiper), Habitaciones (rooms), Experiencias (amenities/spaces), Ubicacion (location/map), Precios (pricing), Resenas (reviews), CallToAction, ReservationModal, Footer, ScrollToTop/ScrollToTopButton, PoliticaPrivacidad.

## Key Conventions

- Component names and most UI text use Spanish (Habitaciones, Experiencias, Resenas, etc.)
- All user-visible text must go through the `t()` translation function from `useLanguage()`
- When adding new translatable text, add keys to both `es` and `en` objects in `src/translations.ts`
- Smooth scrolling between sections uses `react-scroll`
- Image carousels use Swiper with effect-fade
- Animations use Framer Motion

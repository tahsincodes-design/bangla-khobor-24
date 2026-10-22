# AGENTS.md

Bengali news portal built with Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, Better Auth, and MongoDB. News content comes from an external API; this repo has no article database.

## Commands

- `npm run dev` — dev server on :3000
- `npm run lint` — ESLint 9 flat config over the whole repo
- `npx tsc --noEmit` — typecheck; there is no `typecheck` script
- `npm run build` — production build, also typechecks

No test suite or CI exists. Verify with lint + tsc + build, then click through in dev.

## Critical: the news API is currently down

All upstream endpoints (`https://news-api-v2.vercel.app`) return HTTP 402 `DEPLOYMENT_DISABLED`. The app therefore renders from bundled fixtures:

- `src/lib/fixtures.ts` — 28 Bengali articles, categories, section grouping, generated article bodies.
- `src/lib/news-api.ts` — **the only place that should call the API**. It has a 2.5s timeout, caches successful responses, applies a 60s cooldown after failure, normalizes inconsistent payloads, and falls back to fixtures.
- Keep fixtures realistic and in Bengali; they back the sitemap, search, categories, and article pages.

Do not hardcode `news-api-v2.vercel.app` in pages/components, and do not add mock data inline in a page — extend the data layer or fixtures.

## Environment

`.env` is required for auth:

- `MONGODB_URL` — database name is hardcoded as `bangla-khobor-24` in `src/lib/auth.ts`
- `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
- Optional: `NEWS_API_URL`, `NEXT_PUBLIC_SITE_URL`

## Structure

- Routes: `/`, `/category/[id]`, `/news/[id]`, `/search`, `/signIn`, `/signUp`, `/profile`, `/about`, `/contact`, `/privacy`, `/terms`, `api/auth/[...all]`.
- `src/proxy.ts` is Next 16 middleware. It only guards `/profile` and redirects to `/signIn?next=...`; articles and categories are public.
- `src/Components/ui/` — design primitives (`NewsCard`, `SectionHeading`, `Container`, `PasswordField`, `Ticker`, `ShareBar`, etc.). `src/Components/auth/` and `src/Components/profile/` hold the large client flows.
- `src/Components/SiteHeader.tsx` is the single client header (sticky nav, search, mobile drawer, user menu). `Topbar.tsx` is its async server wrapper; `Footer.tsx` is an async server component.
- `src/types/news.ts` — shared article/section/detail types. Never import types from a page file.
- `src/lib/format.ts` — Bengali digits, dates, relative time, reading time. Use it instead of `toLocaleDateString` (avoids ICU differences).

## Conventions

- Import alias: `@/*` → `src/*`. Shared components live in `src/Components` (capital C).
- Keep pages as server components; add `"use client"` only to files that use hooks/browser APIs. Data is passed down as props.
- All user-facing copy is Bengali (`lang="bn"`). Keep it that way.
- Styling uses Tailwind v4 tokens declared in `src/app/globals.css`: `bg-paper`, `bg-surface`, `text-ink`, `text-muted`, `border-line`, `bg-brand-600`, `text-gold-300`, `shadow-card`, `shadow-lift`, `font-serif`. Use these instead of raw slate/red values.
- There is no `tailwind.config.*` and no UI kit dependency. Fonts are Noto Sans Bengali (UI/body) and Noto Serif Bengali (headings) loaded in `layout.tsx`.
- The theme is intentionally light-only. There is no dark-mode toggle.

## Gotchas

- `LayoutProps<"/">` in `layout.tsx` is a generated global type; a fresh clone may show a TS error until `next dev`/`next build` creates `.next/types`.
- Remote images are allowed from any `https` host (`next.config.ts`). Fixtures use curated `images.unsplash.com` photos; the real API may return arbitrary hosts.
- `AuthShell` and auth forms rely on `useSearchParams`, so they must stay inside a `Suspense` boundary in the page files.
- `/profile` tabs are URL-driven (`?tab=profile|security|sessions|account`); session revocation uses `authClient.listSessions()` / `revokeSession({ token })`.
- `public/logo.webp` is a copy of `src/assets/logo.webp` and is referenced by metadata/manifest. Update both if the logo changes.

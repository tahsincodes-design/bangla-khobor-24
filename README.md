# 📰 Bangla News 24 (বাংলা নিউজ ২৪)

A modern, high-performance, full-stack Bengali news portal web application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Better Auth**.

---

## ✨ Features

- **🔐 Secure Authentication (Better Auth):**
  - Email & Password Registration and Sign In.
  - Social Logins via **Google** and **GitHub**.
  - Password management & session revocation.
- **👤 Interactive User Profile:**
  - View account details and accurate email verification status.
  - Custom profile picture URL updates with live image preview.
  - Password change with "sign out other devices" option.
  - Active session list with per-device revocation.
- **📰 News Catalog & Dynamic Pages:**
  - Editorial home page with lead story, latest rail and most-read sidebar.
  - Dynamic category news listing with pagination (`/category/[id]`).
  - Dynamic individual news view with share tools, reading progress and related news (`/news/[id]`).
  - Full-text search (`/search`) and static info pages (about, contact, privacy, terms).
  - Sitemap, robots and article JSON-LD structured data.
- **🎨 Premium Bengali UI/UX:**
  - Fully responsive, mobile-first design with a sticky header and mobile drawer.
  - Warm editorial palette (paper, ink, crimson, gold) and Bengali display typography.
  - Real-time notification banners using `react-hot-toast`.
  - Custom 404, error boundary and skeleton loading states.
  - Bundled Bengali fixtures keep every page working while the upstream news API is unavailable.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [Better Auth](https://www.better-auth.com/)
- **Notifications:** [react-hot-toast](https://react-hot-toast.com/)
- **UI primitives:** Local components in `src/Components/ui` with inline SVG icons (no UI kit dependency)

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) / [yarn](https://yarnpkg.com/)

---

### 2. Installation

Clone the repository and install the dependencies:

```bash
git clone [https://github.com/your-username/bangla-khobor-24.git](https://github.com/your-username/bangla-khobor-24.git)
cd bangla-khobor-24
npm install
```

### 3. Environment

Create a `.env` file in the project root:

```env
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URL=mongodb://user:password@host:27017/?ssl=true
# Optional: the app falls back to bundled fixtures when this is unavailable
NEWS_API_URL=https://news-api-v2.vercel.app

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
```

The database name is fixed to `bangla-khobor-24` in `src/lib/auth.ts`. The MongoDB user must have read/write access to it. If authentication fails with `MongoServerError: bad auth`, verify the URI with a direct MongoDB ping and restart the dev server after editing `.env`.

**OAuth callback URLs** (add these to the Google/GitHub OAuth apps):

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`

Use your deployed origin instead of `localhost:3000` in production.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use `npm run build && npm start` for a production check.
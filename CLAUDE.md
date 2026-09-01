# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

claude
**HomeSherut** is a bilingual (Hebrew/English) home services marketplace for Israel. It connects clients with service providers (babysitting, cleaning, electricians, plumbing, etc.) across 23+ service categories. The UI language defaults to Hebrew (RTL).

## Commands

### Frontend (run from repo root)

```bash
npm run dev        # Vite dev server on port 5173 (proxies /api to localhost:5000)
npm run build      # Production build → dist/
npm run lint       # ESLint (max-warnings 0 — zero warnings allowed)
npm run lint:fix   # Auto-fix lint issues
```

### Backend (run from `backend/`)

```bash
npm run dev        # nodemon server.js (auto-reload)
npm start          # node server.js (production)
npm run migrate    # Run database migrations
npm test           # Jest + Supertest
npm run lint       # ESLint
```

### Local Database (Docker)

```bash
docker-compose up -d   # MySQL 8.0 on port 3309 + phpMyAdmin on port 9092
```

## Architecture

claudec### Monorepo Layout

- `/src/` — React 18 frontend (Vite 5, Tailwind CSS 4, React Router 6)
- `/backend/` — Node.js/Express 4 API (CommonJS)
- `/docs/` — API, deployment, and migration documentation
- `/backend/database/schema-unified.sql` — Full DB schema (source of truth)

### Frontend Structure

- `src/App.jsx` — Root component: wraps `LanguageProvider` → `AuthProvider` → `Router`. All routes are defined here. `/dashboard` is the only protected route.
- `src/context/AuthContext.jsx` — Global auth state and JWT token management
- `src/context/LanguageContext.jsx` — Language/RTL toggle
- `src/pages/services/` — One page per service category (23 pages, all follow same pattern)
- `src/components/services/` — Service-specific sub-components, organized per category
- `src/services/` — Axios-based API client modules (one file per backend route group)

### Backend Structure

- `backend/server.js` — Express app entry point. Registers all routes and middleware.
- `backend/config/config.js` — Central config object (DB, JWT, rate limits, available services list)
- `backend/config/database.js` — MySQL connection pool (mysql2/promise, pool of 10)
- `backend/middleware/subscriptionMiddleware.js` — `checkSubscriptionStatus`, `enrichWithSubscriptionData`, `requireActiveSubscription` — applied per-route group in server.js
- `backend/services/cronService.js` — Node-cron job for subscription expiration checks
- `backend/middleware/response.js` — Standardizes all API responses

### API Route Groups (all prefixed `/api/`)

| Route            | Auth middleware                                          | Notes                                 |
| ---------------- | -------------------------------------------------------- | ------------------------------------- |
| `/auth`          | none                                                     | Register, login, me                   |
| `/services`      | none                                                     | Available services list               |
| `/location`      | none                                                     | Neighborhoods data                    |
| `/contact`       | none                                                     | Contact form                          |
| `/subscriptions` | none                                                     | Plans, status, upgrade, cancel        |
| `/search`        | `checkSubscriptionStatus`                                | Provider search with priority sorting |
| `/providers`     | `checkSubscriptionStatus` + `enrichWithSubscriptionData` | Provider CRUD + gallery               |
| `/reviews`       | `checkSubscriptionStatus` + `enrichWithSubscriptionData` | 3-step email verification flow        |
| `/users`         | none (routes handle their own auth)                      | Profile management                    |
| `/upload`        | `uploadLimiter` (10/hour)                                | File uploads via Cloudinary/Multer    |

### Database (MySQL 8.0)

- Connection pool via `backend/config/database.js`, timezone `+03:00`, charset `utf8mb4`
- Key tables: `users`, `service_providers`, `services`, `reviews`, `subscriptions`, `trial_history`, `locations`
- User roles: `user`, `client`, `provider`, `admin`
- Subscription plans: trial (1 free listing per new provider), monthly €79, yearly €790

### Important Implementation Notes

- **Billing/Pricing is currently disabled** — `BillingPage` and `PricingPage` are commented out in `App.jsx`. Do not re-enable without explicit instruction.
- **Payment routes exist** (Bit Pay / Tranzila integration in `backend/routes/subscriptions.js`) but the frontend payment UI is disabled.
- The backend default port is `10000` (for Render deployment), but Vite proxies to `5000` locally — set `PORT=5000` in `backend/.env` for local dev.
- CORS whitelist in `server.js` includes `localhost:5173`, `allsherut.com`, and `homesherut-frontend.vercel.app`.
- All API responses use the `{ success: boolean, message: string, data: ... }` shape standardized by `backend/middleware/response.js`.
- Image uploads: Multer → Cloudinary for remote storage; local `/backend/uploads/` for fallback.
- Reviews use a 3-step email verification flow (send code → verify → create).

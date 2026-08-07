---
name: Google OAuth + session auth
description: Replacing Clerk with Passport.js + express-session in this pnpm monorepo; key gotchas for proxy routing and lib rebuild.
---

## Rule
Use `/api/auth/google/callback` as CALLBACK_PATH (not `/auth/google/callback`). The dev reverse proxy only forwards `/api/*` to the api-server, so a callback at `/auth/…` is never received in dev.

**Why:** The Replit shared proxy routes by path prefix. `/api` goes to api-server; `/` goes to qr-course. A callback at `/auth/google/callback` hits qr-course's Vite dev server and returns a 404.

**How to apply:** Whenever registering Google OAuth redirect URIs — in Google Cloud Console and in the Passport strategy config — always use the `/api/auth/google/callback` path. Register `/auth/google/callback` as a secondary alias in the Express route table for production-only convenience (api-server serves everything in prod).

## Rule
Run `pnpm run typecheck:libs` before typechecking api-server after adding new tables to `lib/db/src/schema/`.

**Why:** `lib/db` is a composite TypeScript lib. The api-server reads its declarations. New schema exports (e.g. `usersTable`, `visitsTable`) are invisible to `tsc` until the lib is rebuilt with `tsc --build`.

**How to apply:** Schema change → update `lib/db/src/schema/*.ts` + `schema/index.ts` → `pnpm run typecheck:libs` → then `pnpm --filter @workspace/api-server run typecheck`.

## Architecture summary
- `lib/db/src/schema/auth.ts` — `usersTable` (id, username, googleId, email, displayName, createdAt) + `visitsTable` (id, userId FK, email, visitedAt)
- `artifacts/api-server/src/storage.ts` — drizzle-based CRUD over those tables
- `artifacts/api-server/src/auth.ts` — Passport GoogleStrategy + express-session with connect-pg-simple store; mounts `/api/auth/google`, `/api/auth/google/callback`, `/api/auth/user`, `/api/auth/logout`, `/api/admin/visits`
- Frontend auth: `artifacts/qr-course/src/lib/auth.tsx` — `AuthProvider` + `useAuth()` hook fetching `/api/auth/user` on mount
- Login UX: plain `<a href="/api/auth/google">` anchor (not wouter Link); logout via `POST /api/auth/logout` + `window.location.href = "/"`
- Session cookies are `secure: true` in both dev (REPLIT_DEV_DOMAIN set) and prod

## User action required (one-time)
Register the callback URI in Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client:
- Dev: `https://<REPLIT_DEV_DOMAIN>/api/auth/google/callback`
- Prod: `https://<deployed-domain>/api/auth/google/callback`

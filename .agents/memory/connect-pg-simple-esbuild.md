---
name: connect-pg-simple + esbuild
description: createTableIfMissing:true crashes when the server is bundled with esbuild — table.sql is not included in the bundle.
---

# connect-pg-simple + esbuild bundle incompatibility

## The rule
Always set `createTableIfMissing: false` when using `connect-pg-simple` in a server bundled by esbuild.

## Why
`createTableIfMissing: true` makes connect-pg-simple read a `table.sql` file from its own package directory at runtime. esbuild bundles source code but does not include arbitrary package assets, so `table.sql` is missing from `dist/`. The result is an `ENOENT` error on every session store operation — sessions are never stored, OAuth state checks always fail, and every login attempt redirects to `/?error=auth_failed`.

## How to apply
- Set `createTableIfMissing: false` in the PgSession constructor.
- Create the `user_sessions` table via the Drizzle schema instead (add it to `lib/db/src/schema/auth.ts`), so the Publish flow creates it in production automatically.
- The required schema: `sid varchar PK`, `sess json NOT NULL`, `expire timestamp(6) NOT NULL`, plus an index on `expire`.

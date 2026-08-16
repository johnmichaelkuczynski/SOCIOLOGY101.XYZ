---
name: Anonymous metering & visitor counting
description: How anon free-preview metering and unique-visitor counting work in the course app
---
- Metering is token-based: `meterAnonymousUsage` wraps `res.json` and accumulates lengths of string values ≥120 chars into `session.anonAiChars`; limit `FREE_ANON_AI_CHARS` (~two paragraphs). 401 `login_required` past limit. Dev + GET always free.
- **Why:** user demanded anonymous visitors get ~two paragraphs of AI output, not N actions. Counting all strings meters metadata; the 120-char floor keeps it to generated prose.
- Unique visitors: `recordUniqueVisitor` inserts one `visits` row per new session (email null). Session-flag alone races on parallel first requests — an in-process Set on `req.sessionID` dedupes. Owner-only stats at `/api/admin/visits` (isAdmin = owner email).
- `/api/admin/*` routes are isAdmin-gated in production (dev open) — grader-lab was an open AI-cost abuse endpoint before.
- pdfkit must be in build.mjs esbuild `external` list (reads .afm font assets at runtime), same class of bug as connect-pg-simple table.sql.

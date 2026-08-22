---
name: Fully public course
description: User mandate that Sociology 101 remain open with no authentication or usage gate
---

The entire course must remain public. Do not add login, account identity, OAuth, protected routes, owner-only pages, anonymous usage quotas, or sign-in redirects.

**Why:** The user explicitly ordered all login removed after earlier OAuth and anonymous-metering work. Partial removal is not acceptable.

**How to apply:** New pages and API actions must work without authentication. Keep the landing page as a public introduction and `/dashboard` as the open course. Client-side Administrator mode is a course tool, not authentication.
# RelayWorks backend

## Local setup

1. Use a supported Node.js LTS release.
2. From this directory, install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and set `DATABASE_URL`, `JWT_SECRET`, and (if needed) `FRONTEND_ORIGIN`.
4. Ensure PostgreSQL is running and the database exists.
5. Generate the Prisma client and apply the schema using your chosen migration workflow.
6. Run `npm run dev`; check `GET /health` for API and database status.

Never commit the real `.env` file or a production JWT secret. The built-in `dev-secret` fallback is only for local pre-alpha development; production startup requires `JWT_SECRET`.

## Initial API

- `GET /health` — process/database health.
- `POST /auth/login` — checks a persisted Owner, Reviewer, or Worker account and returns a bearer token.
- `GET /tasks` — lists tasks within the authenticated operator's tenant; workers only see their own assigned tasks.
- `GET /tasks/:id` — fetches a task within the authenticated operator's tenant.
- `POST /tasks` — creates a task (Owner/Operator).
- `PATCH /tasks/:id/assign` — assigns an existing task to a worker in the same operator tenant (Owner/Operator).
- `PATCH /tasks/:id/status` — applies the task status transition rules.

Authenticated requests use `Authorization: Bearer <token>`. Account password fields must contain bcrypt hashes.

## Voluntary 4-4-1 planning policy

`src/policies/workforce441.ts` provides a pure assessment helper for the optional 4-hour primary work / 4-hour secondary work or education / 1-hour logistics plan. It is not a scheduler, does not compel participation, and does not treat a non-participating plan as a policy violation. When opted in, it validates category targets and the combined nine-hour ceiling.

## Pre-alpha limitations

The current Prisma schema has no persistent Client, Notification, Activity, or Payout entity. The corresponding frontend panels should not be treated as wired to production-ready backend endpoints yet. No automated integration test suite is configured in this first stabilization pass; run the build and exercise the endpoints against a disposable development database before relying on them.

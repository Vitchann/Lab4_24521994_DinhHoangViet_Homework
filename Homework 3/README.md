# Esports Fair-Play Appeal Tribunal

Isolated Homework 3 simulation workspace. Current authorized scope: P3-01–P3-05. Appeal form, matrix, SLA timer, business API and MongoDB persistence are later tasks.

Use Node 24 and npm 11 (verified v24.18.0/11.16.0). From Homework 3 run `npm.cmd install` on a fresh checkout, then `npm.cmd run dev:frontend` (127.0.0.1:5174). In a separate terminal run `npm.cmd run dev:backend` (port 3002). Use `npm` on non-Windows systems. No backend/database is needed for local frontend fixtures.

Checks: `npm.cmd test`, `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd run check:backend`. Root npm workspaces share development tools, while each app declares runtime dependencies. Lockfile will pin the actual installed tree.

P3-01 verified React/DOM 19.3.1, Router DOM 7.18.7, Mongoose 8.24.11, Vitest 5.1.2 and Vite 8.3.8. Initial frontend/backend scaffold tests, lint/build and backend syntax passed. Actual task evidence and subsequent results are in PROMPT_LOG.md.

Backend .env.example contains PORT, CLIENT_ORIGIN and a reserved MONGODB_URI placeholder. Frontend VITE_API_BASE_URL is reserved/public, never a secret. MongoDB connection and seeding are not implemented. Do not mistake installed Mongoose or skeleton HTTP checks for persistence.

Architecture: frontend/src/domain (contracts), data (frozen simulation records), routing, components and pages; backend/src (transport factory/listener only). The current scaffold will be expanded task by task. All case content must be explicitly simulated, with no unsupported claims about real players or sanctions.

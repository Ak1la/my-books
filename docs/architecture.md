# Architecture

## Stack

- NestJS — REST API.
- Prisma — ORM.
- SQLite — локальна база.
- Commander — CLI.
- TypeScript — єдина мова проєкту.

## Source of truth

SQLite database is the source of truth.
Seed data lives in `prisma/seed-data.json`.

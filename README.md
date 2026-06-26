# My Books

Personal Reading OS: NestJS + Prisma + SQLite app for tracking books, reading taste, predictions and statistics.

> SQLite у Prisma не підтримує enum, тому статуси збережені як `String` + TypeScript-константи в `src/common/status.constants.ts`.

## Setup

```bash
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Run API

```bash
npm run start:dev
```

Endpoints:

```text
GET /api/books
GET /api/books?status=READ
GET /api/books/:id
GET /api/statistics/summary
GET /api/reader/profile
GET /api/predictions
```

## CLI

```bash
npm run stats

npm run book:add -- --title "Some Book" --author "Some Author" --status TO_READ

npm run book:finish -- --title "Ґідеон Дев'ята" --rating 5
```

## Project idea

Це не Goodreads-клон. Це персональна система, яка відповідає не тільки на питання “що я прочитав?”, а й:

- чому мені це сподобалось;
- які риси книги вплинули на оцінку;
- наскільки точними були прогнози;
- яку книгу краще читати саме зараз.

# Fix: SQLite enums

Prisma SQLite connector does not support enums.

Therefore:
- `Book.status` is `String`
- `ReadingSession.status` is `String`
- `Prediction.status` is `String`

Allowed values are represented in TypeScript constants:

```ts
src/common/status.constants.ts
```

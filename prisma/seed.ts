import { PrismaClient } from '@prisma/client';
import seedData from './seed-data.json';

const prisma = new PrismaClient();

async function upsertAuthor(name?: string | null) {
  if (!name) return null;
  return prisma.author.upsert({ where: { name }, update: {}, create: { name } });
}

async function upsertSeries(title?: string | null) {
  if (!title) return null;
  return prisma.series.upsert({ where: { title }, update: {}, create: { title } });
}

async function findOrCreateBook(title: string, authorId?: number | null) {
  const existing = await prisma.book.findFirst({ where: { title, authorId: authorId ?? null } });
  if (existing) return existing;
  return prisma.book.create({ data: { title, authorId: authorId ?? undefined } });
}

async function main() {
  for (const item of seedData.books) {
    const author = await upsertAuthor(item.author);
    const series = await upsertSeries(item.series);
    const book = await findOrCreateBook(item.title, author?.id);
    await prisma.book.update({
      where: { id: book.id },
      data: {
        status: item.status,
        rating: item.rating,
        goodreadsOrder: item.goodreadsOrder,
        seriesId: series?.id
      }
    });
  }

  for (const item of seedData.wishlist) {
    const author = await upsertAuthor(item.author);
    const book = await findOrCreateBook(item.title, author?.id);
    await prisma.book.update({
      where: { id: book.id },
      data: { status: item.status }
    });
    await prisma.prediction.create({
      data: {
        bookId: book.id,
        predictedEnjoymentPercent: item.predictedEnjoymentPercent,
        predictedRating: item.predictedEnjoymentPercent >= 90 ? 5 : item.predictedEnjoymentPercent >= 80 ? 4 : 3,
        reasoning: 'Initial prediction based on reader profile and chat analysis.'
      }
    });
  }

  await prisma.readerProfile.create({
    data: {
      name: seedData.readerProfile.name,
      version: seedData.readerProfile.version,
      summary: seedData.readerProfile.summary,
      dna: { create: seedData.readerProfile.dna },
      hypotheses: {
        create: [
          { code: 'H1', text: 'Герої важливіші за сюжет.', confidence: 0.91 },
          { code: 'H2', text: 'Тобі подобаються проактивні герої.', confidence: 0.95 },
          { code: 'H3', text: 'Сильна центральна ідея суттєво підвищує оцінку.', confidence: 0.84 },
          { code: 'H4', text: 'Сильний фінал може підняти оцінку всієї книги.', confidence: 0.79 },
          { code: 'H5', text: 'Контекст читання сильно впливає на оцінку.', confidence: 0.9 }
        ]
      }
    }
  });

  console.log('Seeded Reading OS.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => prisma.$disconnect());

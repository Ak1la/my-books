import { Command } from 'commander';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const program = new Command();

program.name('my-books').description('CLI for personal Reading OS').version('0.1.0');

program.command('stats').description('Print reading statistics').action(async () => {
  const readBooks = await prisma.book.findMany({ where: { status: 'READ' } });
  const rated = readBooks.filter((book) => book.rating !== null);
  const averageRating = rated.length
    ? Number((rated.reduce((sum, book) => sum + (book.rating ?? 0), 0) / rated.length).toFixed(2))
    : null;
  console.log(JSON.stringify({
    readBooksCount: readBooks.length,
    ratedBooksCount: rated.length,
    averageRating
  }, null, 2));
});

program
  .command('book:add')
  .requiredOption('-t, --title <title>', 'Book title')
  .option('-a, --author <author>', 'Author name')
  .option('-s, --status <status>', 'Reading status', 'TO_READ')
  .action(async (options: { title: string; author?: string; status: string }) => {
    const author = options.author
      ? await prisma.author.upsert({ where: { name: options.author }, update: {}, create: { name: options.author } })
      : null;
    const book = await prisma.book.create({
      data: { title: options.title, status: options.status, authorId: author?.id },
      include: { author: true }
    });
    console.log(`Added: ${book.title}`);
  });

program
  .command('book:finish')
  .requiredOption('-t, --title <title>', 'Book title')
  .requiredOption('-r, --rating <rating>', 'Rating 1-5')
  .option('-p, --pages <pages>', 'Pages count')
  .action(async (options: { title: string; rating: string; pages?: string }) => {
    const book = await prisma.book.findFirst({ where: { title: options.title } });
    if (!book) throw new Error(`Book not found: ${options.title}`);
    const updated = await prisma.book.update({
      where: { id: book.id },
      data: {
        status: 'READ',
        rating: Number(options.rating),
        pages: options.pages ? Number(options.pages) : book.pages,
        dateFinished: new Date()
      }
    });
    console.log(`Finished: ${updated.title} — ${updated.rating}/5`);
  });

program.parseAsync(process.argv).finally(async () => prisma.$disconnect());

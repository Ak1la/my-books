import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async summary() {
    const readBooks = await this.prisma.book.findMany({
      where: { status: 'READ' },
      include: { author: true, series: true },
    });

    const rated = readBooks.filter((book) => book.rating !== null);
    const withPages = readBooks.filter((book) => book.pages !== null);
    const avg = (values: number[]) =>
      values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2)) : null;

    const ratingDistribution = rated.reduce<Record<string, number>>((acc, book) => {
      const key = String(book.rating);
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    return {
      readBooksCount: readBooks.length,
      ratedBooksCount: rated.length,
      averageRating: avg(rated.map((book) => book.rating!)),
      ratingDistribution,
      pagesTotal: withPages.reduce((sum, book) => sum + (book.pages ?? 0), 0),
      averagePages: avg(withPages.map((book) => book.pages!)),
    };
  }
}

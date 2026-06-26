import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(status?: string) {
    return this.prisma.book.findMany({
      where: status ? { status } : undefined,
      include: { author: true, series: true, genres: { include: { genre: true } } },
      orderBy: [{ goodreadsOrder: 'asc' }, { title: 'asc' }],
    });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
        series: true,
        genres: { include: { genre: true } },
        sessions: true,
        discussions: true,
        predictions: true,
      },
    });
  }
}

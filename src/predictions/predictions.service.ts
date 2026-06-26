import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PredictionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.prediction.findMany({
      include: { book: { include: { author: true } } },
      orderBy: [{ predictedEnjoymentPercent: 'desc' }, { createdAt: 'desc' }],
    });
  }
}

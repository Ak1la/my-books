import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReaderService {
  constructor(private readonly prisma: PrismaService) {}

  profile() {
    return this.prisma.readerProfile.findFirst({
      include: { dna: true, hypotheses: { orderBy: { code: 'asc' } } },
    });
  }
}

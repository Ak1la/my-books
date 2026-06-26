import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ReaderModule } from './reader/reader.module';
import { PredictionsModule } from './predictions/predictions.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [BooksModule, StatisticsModule, ReaderModule, PredictionsModule],
  providers: [PrismaService],
})
export class AppModule {}

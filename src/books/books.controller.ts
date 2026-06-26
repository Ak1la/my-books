import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.booksService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }
}

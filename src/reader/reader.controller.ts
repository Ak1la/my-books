import { Controller, Get } from '@nestjs/common';
import { ReaderService } from './reader.service';

@Controller('reader')
export class ReaderController {
  constructor(private readonly readerService: ReaderService) {}

  @Get('profile')
  profile() {
    return this.readerService.profile();
  }
}

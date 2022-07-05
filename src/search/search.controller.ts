import { Controller, Get } from '@nestjs/common';

@Controller('search')
export class SearchController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}

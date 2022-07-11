import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async findAll(@Query() query): Promise<string> {
    // console.log(query);
    const result = await this.searchService.search(query);
    return JSON.stringify(result);
  }
}

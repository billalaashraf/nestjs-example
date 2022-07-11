import { Test } from '@nestjs/testing';
import { Book, BookSchema } from '../database/schemas/books.schema';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { book } from './search.mock';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

describe('SearchController', () => {
  let searchController: SearchController;
  let searchService: SearchService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`mongodb://localhost:27017/bookstore`),
        MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
        HttpModule,
      ],
      controllers: [SearchController],
      providers: [SearchService],
    }).compile();

    searchService = moduleRef.get<SearchService>(SearchService);
    searchController = moduleRef.get<SearchController>(SearchController);
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const result: Book[] = [book];
      jest
        .spyOn(searchService, 'search')
        .mockImplementation(
          () => new Promise<Book[]>((resolve) => resolve(result)),
        );

      expect(await searchController.findAll(null)).toBe(JSON.stringify(result));
    });
  });
});

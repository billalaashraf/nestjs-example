import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { query, queryResult, books, book, bookDto } from './search.mock';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../database/schemas/books.schema';
import { HttpModule } from '@nestjs/axios';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(`mongodb://localhost:27017/bookstore`),
        MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
        HttpModule,
      ],
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('it should create proper query', async () => {
    const result = service.searchQuery(query);
    expect(result).toEqual(queryResult);
  });
  it('it should find all books', async () => {
    jest
      .spyOn(service, 'search')
      .mockImplementation(() => new Promise((resolve) => resolve(books)));
    expect(await service.search(null)).toEqual(books);
  });
  it('it should return book created', async () => {
    jest
      .spyOn(service, 'create')
      .mockImplementation(() => new Promise((resolve) => resolve(book)));
    expect(await service.create(bookDto)).toEqual(book);
  });
});

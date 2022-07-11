import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateBookDto, mapDTO } from 'src/database/dtos/book.dto';
import { Book, BookDocument } from 'src/database/schemas/books.schema';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    @InjectConnection() private readonly connection: Connection,
    private readonly http: HttpService,
  ) {
    this.connection.getClient().connect(() => {
      this.seed();
    });
  }

  private async seed() {
    const books = await this.bookModel.find();
    if (books.length === 0) {
      console.log('download books....');
      const json = await this.http.axiosRef.get(
        'https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e',
      );
      for (const book of json.data) {
        await this.create(book);
      }
    }
  }

  async search(query: any): Promise<BookDocument[]> {
    if (!query) {
      return this.bookModel.find();
    }
    const search = this.searchQuery(query);
    return this.bookModel.find({ $and: [search] });
  }

  async create(book: CreateBookDto): Promise<BookDocument> {
    return this.bookModel.create(mapDTO(book));
  }

  private searchQuery(query: any): any {
    const returnObj = {};
    if (query.title) {
      returnObj['title'] = { $regex: `.*${query.title}.*` };
    }
    if (query.isbn) {
      returnObj['isbn'] = { $regex: `.*${query.isbn}.*` };
    }
    if (query.price) {
      returnObj['published'] = {};
      returnObj['published']['price'] = { $eq: Number(query.price) };
    }
    return returnObj;
  }
}

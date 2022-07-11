import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { CreateBookDto, mapDTO } from '../database/dtos/book.dto';
import { Book, BookDocument } from '../database/schemas/books.schema';
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

  async search(query: any): Promise<Book[]> {
    if (!query) {
      return this.bookModel.find();
    }
    const search = this.searchQuery(query);
    return this.bookModel.find({ $and: [search] });
  }

  async create(book: CreateBookDto): Promise<Book> {
    return this.bookModel.create(mapDTO(book));
  }

  searchQuery(query: any): any {
    let mongoQuery = {};
    if (query.title) {
      mongoQuery = { ...mongoQuery, title: { $regex: `.*${query.title}.*` } };
    }
    if (query.isbn) {
      mongoQuery = { ...mongoQuery, isbn: { $regex: `.*${query.isbn}.*` } };
    }
    if (query.pageCount && !isNaN(query.pageCount)) {
      mongoQuery = {
        ...mongoQuery,
        pageCount: Number(query.pageCount),
      };
    }
    if (query.date) {
      mongoQuery = {
        ...mongoQuery,
        'published.date': { $regex: `.*${query.date}.*` },
      };
    }
    if (query.price && !isNaN(query.price)) {
      mongoQuery = { ...mongoQuery, 'published.price': Number(query.price) };
    }
    if (query.currency) {
      mongoQuery = {
        ...mongoQuery,
        'published.currency': {
          $regex: `.*${String(query.currency).toUpperCase()}.*`,
        },
      };
    }
    if (query.description) {
      mongoQuery = {
        ...mongoQuery,
        shortDescription: {
          $regex: `.*${query.description}.*`,
        },
        longDescription: {
          $regex: `.*${query.description}.*`,
        },
      };
    }

    if (query.status) {
      mongoQuery = {
        ...mongoQuery,
        status: {
          $regex: `.*${String(query.status).toUpperCase()}.*`,
        },
      };
    }

    if (query.author) {
      mongoQuery = {
        ...mongoQuery,
        authors: {
          $regex: `.*${query.author}.*`,
        },
      };
    }
    if (query.category) {
      mongoQuery = {
        ...mongoQuery,
        categories: {
          $regex: `.*${query.category}.*`,
        },
      };
    }
    return mongoQuery;
  }
}

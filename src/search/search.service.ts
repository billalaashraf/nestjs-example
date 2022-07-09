import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/database/dtos/book.dto';
import { Book, BookDocument } from 'src/database/schemas/books.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async search(query: string): Promise<BookDocument[]> {
    return this.bookModel.find({
      $text: { $search: query },
    });
  }

  async create(book: CreateBookDto): Promise<BookDocument> {
    return this.bookModel.create(book);
  }
}

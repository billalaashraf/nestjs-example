import { CreateBookDto } from 'src/database/dtos/book.dto';

export const book = {
  title: 'test',
  isbn: 'test',
  pageCount: 1,
  status: 'test',
  shortDescription: 'test',
  longDescription: 'test',
  authors: [],
  published: { date: 'test', price: 1, currency: 'test' },
  thumbnailUrl: 'test',
  categories: [],
};

export const bookDto: CreateBookDto = {
  title: 'test',
  isbn: 'test',
  pageCount: 1,
  published: { date: new Date(), price: 1, currency: 'test' },
  thumbnailUrl: 'test',
  shortDescription: 'test',
  longDescription: 'test',
  status: '',
  authors: [],
  categories: [],
};

export const query = {
  title: 'test',
  isbn: 'test',
  pageCount: 1,
  status: 'test',
  description: 'test',
  author: 'test',
  date: '2009-04-01',
  price: 1,
  currency: 'test',
  category: 'test',
};

export const queryResult = {
  title: { $regex: `.*${query.title}.*` },
  isbn: { $regex: `.*${query.isbn}.*` },
  pageCount: Number(query.pageCount),
  status: { $regex: `.*${String(query.status).toUpperCase()}.*` },
  shortDescription: { $regex: `.*${query.description}.*` },
  longDescription: { $regex: `.*${query.description}.*` },
  authors: { $regex: `.*${'test'}.*` },
  'published.date': { $regex: `.*${query.date}.*` },
  'published.price': Number(query.price),
  'published.currency': {
    $regex: `.*${String(query.currency.toUpperCase())}.*`,
  },
  categories: { $regex: `.*${query.category}.*` },
};

export const books = [book, book];

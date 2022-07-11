export interface Published {
  date: Date;
  price: number;
  currency: string;
}

export interface CreateBookDto {
  title: string;
  isbn: string;
  pageCount: number;
  published: Published;
  thumbnailUrl: string;
  shortDescription: string;
  longDescription: string;
  status: string;
  authors: string[];
  categories: string[];
}

export const mapDTO = (book: any): CreateBookDto => {
  return {
    title: book.title,
    isbn: book.isbn,
    pageCount: book.pageCount,
    published: {
      date: book.published.$date,
      price: book.published.price,
      currency: book.published.currency,
    },
    thumbnailUrl: book.thumbnailUrl,
    shortDescription: book.shortDescription,
    longDescription: book.longDescription,
    status: book.status,
    authors: book.authors,
    categories: book.categories,
  };
};

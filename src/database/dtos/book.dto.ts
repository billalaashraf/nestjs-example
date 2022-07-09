export interface Published {
  $date: Date;
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

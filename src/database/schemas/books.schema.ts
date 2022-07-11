import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop()
  isbn: string;

  @Prop()
  pageCount: number;

  @Prop(
    raw({
      date: { type: String },
      price: { type: Number },
      currency: { type: String },
    }),
  )
  published: Record<string, any>;

  @Prop()
  thumbnailUrl: string;

  @Prop()
  shortDescription: string;

  @Prop()
  longDescription: string;

  @Prop()
  status: string;

  @Prop()
  authors: string[];

  @Prop()
  categories: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

import { Module } from '@nestjs/common';
import { SearchController } from './search/search.controller';
import { SearchModule } from './search/search.module';
import { SearchService } from './search/search.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { dbConfig } from './database/config/dbConfig';
import { BookSchema } from './database/schemas/books.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `${dbConfig().type}://${dbConfig().host}:${dbConfig().port}/${
        dbConfig().database
      }`,
    ),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    HttpModule,
    SearchModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class AppModule {}

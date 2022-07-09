import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';

@Global()
@Module({
  imports: [MongooseModule],
  providers: [SeedService],
})
export class SeedModule {}

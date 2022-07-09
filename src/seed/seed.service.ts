import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(@InjectConnection() private connection: Connection) {
    console.error('SeedService constructor');
  }

  async seed() {
    console.log('Seeding database...');
  }
}

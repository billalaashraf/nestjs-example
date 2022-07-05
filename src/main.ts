import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dbConfig } from './database/config/dbConfig';

async function bootstrap() {
  const config = dbConfig();
  console.log(
    `${config.type}://${config.host}:${config.port}/${config.database}`,
  );
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const { port } = config.get<{ port: number }>('server');

  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log(`Application listening on http://localhost:${port}`);
}
bootstrap();

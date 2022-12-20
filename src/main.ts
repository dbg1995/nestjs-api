import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { CLIENT_DOMAIN, SERVER_HOST, SERVER_PORT } from './constant/common.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: CLIENT_DOMAIN } });

  await app.listen(SERVER_PORT, SERVER_HOST);
}
bootstrap();

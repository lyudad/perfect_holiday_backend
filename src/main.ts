import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SendEmail} from './utils/sendEmail';
import * as dotenv from 'dotenv'
dotenv.config()
async function bootstrap() {
  //await SendEmail();
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.originPort,
    credentials: true,
  });
  await app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
}

bootstrap();

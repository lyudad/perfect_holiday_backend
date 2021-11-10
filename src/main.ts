import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {cors:true});
  app.enableCors({
    origin: process.env.originPort,
    credentials: true,
  });
  await app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
}

bootstrap();

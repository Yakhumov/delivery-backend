import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

   app.enableCors({
    origin: '*',
  });

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log(`Server running on port ${port}`);
}

bootstrap();
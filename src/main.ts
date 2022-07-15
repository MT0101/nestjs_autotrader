import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
const helmet = require('helmet')

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
        disableErrorMessages: true,

        whitelist: true,
        forbidNonWhitelisted: true,

        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
  );

  app.use(cookieParser());

  (app as any).set('etag', false);

  app.use(helmet());

  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();

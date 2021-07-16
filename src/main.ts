import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalFilterException } from './filter/global.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule.register());
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    transform:true,
    forbidNonWhitelisted:true,
  }))
  app.useGlobalFilters(new GlobalFilterException())
  app.enableCors()
  await app.listen(3000);
}
bootstrap();

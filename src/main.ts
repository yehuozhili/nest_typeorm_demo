import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guard/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { testMiddleWares } from './middlewares/test';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserTdo } from './user/dto/create.user.dto';
import { MYValidationPipe } from './pipes/validation/validation.pipe';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(testMiddleWares());
  app.useGlobalInterceptors(new TransformInterceptor());
  //app.useGlobalInterceptors(new LoggingInterceptor());
  // app.useGlobalPipes(new ValidationPipe({

  // }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new MYValidationPipe());
  console.log('ok', '3000');
  await app.listen(3000);
}
bootstrap();

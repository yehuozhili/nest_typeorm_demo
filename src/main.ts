import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './guard/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { testMiddleWares } from './middlewares/test';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(testMiddleWares());
  app.useGlobalInterceptors(new LoggingInterceptor());
  console.log('ok', '3000');
  await app.listen(3000);
}
bootstrap();

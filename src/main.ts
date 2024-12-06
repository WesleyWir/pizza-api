import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';
import { LoggerService } from './infrastructure/logger/logger.service';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { ResponseInterceptor } from './infrastructure/common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
  const port = process.env.PORT ?? 3001;
  await app.listen(process.env.PORT ?? 3001);
  console.log(`runnin app on port ${port}`);
  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
    .map(layer => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter(item => item !== undefined);
  console.log(availableRoutes);
}
bootstrap();

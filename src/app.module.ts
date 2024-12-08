import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { join } from 'path';
import { ServicesModule } from './infrastructure/services/services.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    UsecasesProxyModule.register(),
    ServicesModule,
    ControllersModule,
    EnvironmentConfigModule,
  ],
  providers: [],
})
export class AppModule { }

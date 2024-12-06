import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    EnvironmentConfigModule,
  ],
  providers: [],
})
export class AppModule { }

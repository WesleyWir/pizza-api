import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { SizeController } from './size/size.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [SizeController],
})
export class ControllersModule { }
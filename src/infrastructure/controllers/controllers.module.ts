import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { SizeController } from './size/size.controller';
import { FlavorController } from './flavor/flavor.controller';
import { AdditionalController } from './additional/additional.controller';
import { MenuController } from './menu/menu.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [
    SizeController, 
    FlavorController, 
    AdditionalController,
    MenuController
  ],
})
export class ControllersModule { }
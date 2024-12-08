import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { ResetService } from './reset.service';

@Module({
    imports: [
        TypeOrmConfigModule,
        ExceptionsModule
    ],
    providers: [
        ResetService,
        ExceptionsService
    ],
    exports: [
        ResetService,
    ],
})
export class ServicesModule { }

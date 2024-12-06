import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Size } from '../entities/size.entity';
import { DatabaseSizeRepository } from './size.repository';

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Size])],
    providers: [DatabaseSizeRepository],
    exports: [DatabaseSizeRepository],
})
export class RepositoriesModule { }

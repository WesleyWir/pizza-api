import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Size } from '../entities/size.entity';
import { DatabaseSizeRepository } from './size.repository';
import { DatabaseFlavorRepository } from './flavor.repository';
import { Flavor } from '../entities/flavor.entity';

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Size, Flavor])],
    providers: [DatabaseSizeRepository, DatabaseFlavorRepository],
    exports: [DatabaseSizeRepository, DatabaseFlavorRepository],
})
export class RepositoriesModule { }

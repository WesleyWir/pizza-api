import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Size } from '../entities/size.entity';
import { DatabaseSizeRepository } from './size.repository';
import { DatabaseFlavorRepository } from './flavor.repository';
import { Flavor } from '../entities/flavor.entity';
import { Additional } from '../entities/additional.entity';
import { DatabaseAdditionalRepository } from './additional.repository';

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Size, Flavor, Additional])],
    providers: [DatabaseSizeRepository, DatabaseFlavorRepository, DatabaseAdditionalRepository],
    exports: [DatabaseSizeRepository, DatabaseFlavorRepository, DatabaseAdditionalRepository],
})
export class RepositoriesModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Size } from '../entities/size.entity';
import { DatabaseSizeRepository } from './size.repository';
import { DatabaseFlavorRepository } from './flavor.repository';
import { Flavor } from '../entities/flavor.entity';
import { Additional } from '../entities/additional.entity';
import { DatabaseAdditionalRepository } from './additional.repository';
import { DatabaseOrderRepository } from './order.repository';
import { Order } from '../entities/order.entity';
import { DatabasePizzaRepository } from './pizza.repository';
import { Pizza } from '../entities/pizza.entity';

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Size, Flavor, Additional, Order, Pizza])],
    providers: [
        DatabaseSizeRepository,
        DatabaseFlavorRepository,
        DatabaseAdditionalRepository,
        DatabaseOrderRepository,
        DatabasePizzaRepository
    ],
    exports: [
        DatabaseSizeRepository,
        DatabaseFlavorRepository,
        DatabaseAdditionalRepository,
        DatabaseOrderRepository,
        DatabasePizzaRepository
    ],
})
export class RepositoriesModule { }

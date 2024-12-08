import { InjectDataSource } from '@nestjs/typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { sizes } from '../../../database/seeders/size/data';
import { flavors } from '../../../database/seeders/flavor/data';
import { additionals } from '../../../database/seeders/additionals/data';
import { Size } from '../../infrastructure/entities/size.entity';
import { Flavor } from '../../infrastructure/entities/flavor.entity';
import { Additional } from '../../infrastructure/entities/additional.entity';



@Injectable()
export class ResetDatabaseUseCases {
    constructor(
        private readonly logger: ILogger,
        @InjectDataSource() private readonly dataSource: DataSource
    ) { }

    async execute(): Promise<void> {
        const tables = ['pizza_additionals', 'pizzas', 'sizes', 'additionals', 'flavors', 'orders'];

        try {
            await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
            for (const table of tables) {
                await this.dataSource.query(`TRUNCATE TABLE ${table};`);
                await this.dataSource.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1;`);
            }
            // Seed sizes using DataSource
            for (const size of sizes) {
                const { name, price, preparationTime } = size;
                const newSize = new Size();
                newSize.name = name;
                newSize.price = price;
                newSize.preparationTime = preparationTime;
                await this.dataSource.manager.save(newSize);
            }

            // Seed flavors using DataSource
            for (const flavor of flavors) {
                const { name, additionalTime } = flavor;
                const newFlavor = new Flavor();
                newFlavor.name = name;
                newFlavor.additionalTime = additionalTime;
                await this.dataSource.manager.save(newFlavor);
            }

            // Seed additionals using DataSource
            for (const additional of additionals) {
                const { name, additionalTime, additionalPrice } = additional;
                const newAdditional = new Additional();
                newAdditional.name = name;
                newAdditional.additionalTime = additionalTime;
                newAdditional.additionalPrice = additionalPrice;
                await this.dataSource.manager.save(newAdditional);
            }
            this.logger.log('ResetDatabaseUseCases execute', 'Database reset and seed successful.');
        } catch (error) {
            this.logger.error('ResetDatabaseUseCases execute', `Error resetting the database: ${error}`);
        }
    }
}

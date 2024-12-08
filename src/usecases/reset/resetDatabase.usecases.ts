import { InjectDataSource } from '@nestjs/typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { DataSource } from 'typeorm';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class ResetDatabaseUseCases {
    constructor(
        private readonly logger: ILogger,
        @InjectDataSource() private readonly dataSource: DataSource
    ) {}

    async execute(): Promise<void> {
        const tables = ['pizza_additionals', 'pizzas', 'sizes', 'additionals', 'flavors', 'orders'];

        try {
            await this.dataSource.query('SET FOREIGN_KEY_CHECKS = 0;');
            for (const table of tables) {
                await this.dataSource.query(`TRUNCATE TABLE ${table};`);
                await this.dataSource.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1;`);
            }
            await execPromise('npm run seed');
            this.logger.log('ResetDatabaseUseCases execute', 'Database reset and seed successful.');
        } catch (error) {
            this.logger.error('ResetDatabaseUseCases execute', `Error resetting the database: ${error}`);
        }
    }
}

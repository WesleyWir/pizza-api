import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { exec } from 'child_process';
import { Connection } from 'typeorm';
import { promisify } from 'util';

const execPromise = promisify(exec);

@Injectable()
export class ResetService {
    constructor(@InjectConnection() private readonly connection: Connection) { }

    async resetDatabase() {
        const tables = ['pizza_additionals', 'pizzas', 'sizes', 'additionals', 'flavors', 'orders'];

        try {
            await this.connection.query('SET FOREIGN_KEY_CHECKS = 0;');
            for (const table of tables) {
                await this.connection.query(`TRUNCATE TABLE ${table};`);
                await this.connection.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1;`);
            }

            await execPromise('npm run seed');
            // TODO: use logger servicec instead
            console.log('Database reset and seed successful.');
        } catch (error) {
            console.error('Error resetting the database:', error);
        }
    }
}

import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { Seeder } from "database/seeders/seeder";
import { SeederModule } from "database/seeders/seeder.module";
import { LoggerService } from "@/infrastructure/logger/logger.service";

async function bootstrap() {
    NestFactory.createApplicationContext(SeederModule)
        .then(appContext => {
            const logger = appContext.get(LoggerService);
            const seeder = appContext.get(Seeder);
            seeder
                .seed()
                .then(() => {
                    logger.debug('seed successful!', 'Seeding complete!');
                })
                .catch(error => {
                    logger.error('seed fail!', 'Seeding failed!');
                    throw error;
                })
                .finally(() => appContext.close());
        })
        .catch(error => {
            throw error;
        });
}
bootstrap();
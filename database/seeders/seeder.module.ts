import { Logger } from "@nestjs/common/services/logger.service";
import { SizeSeederModule } from "./size/size.module";
import { Seeder } from "./seeder";
import { Module } from "@nestjs/common";
import { LoggerModule } from "@/infrastructure/logger/logger.module";
import { FlavorSeederModule } from "./flavor/flavor.module";
import { AdditionalSeederModule } from "./additionals/additional.module";

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
    imports: [
        SizeSeederModule,
        FlavorSeederModule,
        AdditionalSeederModule,
        LoggerModule
    ],
    providers: [Logger, Seeder],
})
export class SeederModule { }
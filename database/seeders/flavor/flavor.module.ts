import { Module } from "@nestjs/common";
import { FlavorSeederService } from "./flavor.service";
import { UsecasesProxyModule } from "@/infrastructure/usecases-proxy/usecases-proxy.module";
import { EnvironmentConfigModule } from "@/infrastructure/config/environment-config/environment-config.module";

@Module({
    imports: [
        EnvironmentConfigModule,
        UsecasesProxyModule.register(),
    ],
    providers: [FlavorSeederService],
    exports: [FlavorSeederService],
})
export class FlavorSeederModule { }
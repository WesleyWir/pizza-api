import { Module } from "@nestjs/common";
import { AdditionalSeederService } from "./additional.service";
import { UsecasesProxyModule } from "@/infrastructure/usecases-proxy/usecases-proxy.module";
import { EnvironmentConfigModule } from "@/infrastructure/config/environment-config/environment-config.module";

@Module({
    imports: [
        EnvironmentConfigModule,
        UsecasesProxyModule.register(),
    ],
    providers: [AdditionalSeederService],
    exports: [AdditionalSeederService],
})
export class AdditionalSeederModule { }
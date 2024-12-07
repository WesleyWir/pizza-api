import { Module } from "@nestjs/common";
import { SizeSeederService } from "./size.service";
import { UsecasesProxyModule } from "@/infrastructure/usecases-proxy/usecases-proxy.module";
import { EnvironmentConfigModule } from "@/infrastructure/config/environment-config/environment-config.module";

@Module({
    imports: [
        EnvironmentConfigModule,
        UsecasesProxyModule.register(),
    ],
    providers: [SizeSeederService],
    exports: [SizeSeederService],
})
export class SizeSeederModule { }
import { UsecasesProxyModule } from "../../../infrastructure/usecases-proxy/usecases-proxy.module";
import { Controller, Inject, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResetDatabaseUseCases } from "../../../usecases/reset/resetDatabase.usecases";
import { UseCaseProxy } from "../../../infrastructure/usecases-proxy/usecases-proxy";

@Controller('reset')
@ApiTags('reset')
@ApiResponse({ status: 500, description: 'Internal error' })
export class ResetController {

    constructor(
        @Inject(UsecasesProxyModule.RESET_DATABASE_USECASES_PROXY)
        private readonly resetDatabaseUsecaseProxy: UseCaseProxy<ResetDatabaseUseCases>,
    ) { }

    @Post('/database')
    async resetDatabase() {
        return this.resetDatabaseUsecaseProxy.getInstance().execute();
    }
}
import { ResetService } from "../../../infrastructure/services/reset.service";
import { Controller, Inject, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('reset')
@ApiTags('reset')
@ApiResponse({ status: 500, description: 'Internal error' })
export class ResetController {

    constructor(
        @Inject(ResetService)
        private readonly resetService: ResetService,
    ) { }

    @Post('/database')
    async resetDatabase() {
        return this.resetService.resetDatabase();
    }
}
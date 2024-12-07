import { Controller, Get, Inject } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenuPresenter } from "./menu.presenter";
import { ApiResponseType } from "@/infrastructure/common/swagger/response.decorator";
import { UsecasesProxyModule } from "@/infrastructure/usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "@/infrastructure/usecases-proxy/usecases-proxy";
import { getAdditionalsUseCases } from "@/usecases/additional/getAdditionals.usecases";
import { getFlavorsUseCases } from "@/usecases/flavor/getFlavors.usecases";
import { getSizesUseCases } from "@/usecases/size/getSizes.usecases";

@Controller('menu')
@ApiTags('menu')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(MenuPresenter)
export class MenuController {

    constructor(
        @Inject(UsecasesProxyModule.GET_FLAVORS_USECASES_PROXY)
        private readonly getAllFlavorUsecaseProxy: UseCaseProxy<getFlavorsUseCases>,
        @Inject(UsecasesProxyModule.GET_ADDITIONALS_USECASES_PROXY)
        private readonly getAllAdditionalUsecaseProxy: UseCaseProxy<getAdditionalsUseCases>,
        @Inject(UsecasesProxyModule.GET_SIZES_USECASES_PROXY)
        private readonly getAllSizeUsecaseProxy: UseCaseProxy<getSizesUseCases>,
    ) { }

    @Get()
    @ApiResponseType(MenuPresenter, true)
    async getMenus() {
        const flavors = await this.getAllFlavorUsecaseProxy.getInstance().execute();
        const additionals = await this.getAllAdditionalUsecaseProxy.getInstance().execute();
        const sizes = await this.getAllSizeUsecaseProxy.getInstance().execute();
        return {
            flavors,
            sizes,
            additionals,
        };
    }
}
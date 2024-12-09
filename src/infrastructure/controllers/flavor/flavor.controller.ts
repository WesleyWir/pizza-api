
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { getFlavorUseCases } from '../../../usecases/flavor/getFlavor.usecases';
import { FlavorPresenter } from './flavor.presenter';
import { ApiResponseType } from '../../../infrastructure/common/swagger/response.decorator';
import { getFlavorsUseCases } from '../../../usecases/flavor/getFlavors.usecases';
import { updateFlavorUseCases } from '../../../usecases/flavor/updateFlavor.usecases';
import { CreateFlavorDto, UpdateFlavorDto } from './flavor.dto';
import { deleteFlavorUseCases } from '../../../usecases/flavor/deleteFlavor.usecases';
import { createFlavorUseCases } from '../../../usecases/flavor/createFlavor.usecases';

@Controller('flavors')
@ApiTags('flavors')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(FlavorPresenter)
export class FlavorController {
  constructor(
    @Inject(UsecasesProxyModule.GET_FLAVOR_USECASES_PROXY)
    private readonly getFlavorUsecaseProxy: UseCaseProxy<getFlavorUseCases>,
    @Inject(UsecasesProxyModule.GET_FLAVORS_USECASES_PROXY)
    private readonly getAllFlavorUsecaseProxy: UseCaseProxy<getFlavorsUseCases>,
    @Inject(UsecasesProxyModule.PUT_FLAVOR_USECASES_PROXY)
    private readonly updateFlavorUsecaseProxy: UseCaseProxy<updateFlavorUseCases>,
    @Inject(UsecasesProxyModule.DELETE_FLAVOR_USECASES_PROXY)
    private readonly deleteFlavorUsecaseProxy: UseCaseProxy<deleteFlavorUseCases>,
    @Inject(UsecasesProxyModule.POST_FLAVOR_USECASES_PROXY)
    private readonly createFlavorUsecaseProxy: UseCaseProxy<createFlavorUseCases>,
  ) { }

  @Get(':id')
  @ApiResponseType(FlavorPresenter, false)
  async getFlavor(@Param('id', ParseIntPipe) id: number) {
    const flavor = await this.getFlavorUsecaseProxy.getInstance().execute(id);
    return new FlavorPresenter(flavor, true);
  }

  @Get()
  @ApiResponseType(FlavorPresenter, true)
  async getFlavors() {
    const flavors = await this.getAllFlavorUsecaseProxy.getInstance().execute();
    return flavors.map((flavor) => new FlavorPresenter(flavor));
  }

  @Put(':id')
  @ApiResponseType(FlavorPresenter, true)
  async updateFlavor(@Body() updateFlavorDto: UpdateFlavorDto) {
    const { id, name, additional_time } = updateFlavorDto;
    await this.updateFlavorUsecaseProxy.getInstance().execute(id, name, additional_time);
    return 'success';
  }

  @Delete(':id')
  @ApiResponseType(FlavorPresenter, true)
  async deleteFlavor(@Query('id', ParseIntPipe) id: number) {
    await this.deleteFlavorUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post()
  @ApiResponseType(FlavorPresenter, true)
  async createFlavor(@Body() createFlavorDto: CreateFlavorDto) {
    const { name, additional_time } = createFlavorDto;
    const flavorCreated = await this.createFlavorUsecaseProxy.getInstance().execute(name, additional_time);
    return new FlavorPresenter(flavorCreated);
  }
}
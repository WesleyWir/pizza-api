
import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { getAdditionalUseCases } from '../../../usecases/additional/getAdditional.usecases';
import { AdditionalPresenter } from './additional.presenter';
import { ApiResponseType } from '../../../infrastructure/common/swagger/response.decorator';
import { getAdditionalsUseCases } from '../../../usecases/additional/getAdditionals.usecases';
import { updateAdditionalUseCases } from '../../../usecases/additional/updateAdditional.usecases';
import { CreateAdditionalDto, UpdateAdditionalDto } from './additional.dto';
import { deleteAdditionalUseCases } from '../../../usecases/additional/deleteAdditional.usecases';
import { createAdditionalUseCases } from '../../../usecases/additional/createAdditional.usecases';

@Controller('additionals')
@ApiTags('additionals')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(AdditionalPresenter)
export class AdditionalController {
  constructor(
    @Inject(UsecasesProxyModule.GET_ADDITIONAL_USECASES_PROXY)
    private readonly getAdditionalUsecaseProxy: UseCaseProxy<getAdditionalUseCases>,
    @Inject(UsecasesProxyModule.GET_ADDITIONALS_USECASES_PROXY)
    private readonly getAllAdditionalUsecaseProxy: UseCaseProxy<getAdditionalsUseCases>,
    @Inject(UsecasesProxyModule.PUT_ADDITIONAL_USECASES_PROXY)
    private readonly updateAdditionalUsecaseProxy: UseCaseProxy<updateAdditionalUseCases>,
    @Inject(UsecasesProxyModule.DELETE_ADDITIONAL_USECASES_PROXY)
    private readonly deleteAdditionalUsecaseProxy: UseCaseProxy<deleteAdditionalUseCases>,
    @Inject(UsecasesProxyModule.POST_ADDITIONAL_USECASES_PROXY)
    private readonly createAdditionalUsecaseProxy: UseCaseProxy<createAdditionalUseCases>,
  ) { }

  @Get(':id')
  @ApiResponseType(AdditionalPresenter, false)
  async getAdditional(@Param('id', ParseIntPipe) id: number) {
    const additional = await this.getAdditionalUsecaseProxy.getInstance().execute(id);
    return new AdditionalPresenter(additional, true);
  }

  @Get()
  @ApiResponseType(AdditionalPresenter, true)
  async getAdditionals() {
    const additionals = await this.getAllAdditionalUsecaseProxy.getInstance().execute();
    return additionals.map((additional) => new AdditionalPresenter(additional));
  }

  @Put(':id')
  @ApiResponseType(AdditionalPresenter, true)
  async updateAdditional(@Body() updateAdditionalDto: UpdateAdditionalDto) {
    const { id, name, additionalTime, additionalPrice } = updateAdditionalDto;
    await this.updateAdditionalUsecaseProxy.getInstance().execute(id, name, additionalTime, additionalPrice);
    return 'success';
  }

  @Delete(':id')
  @ApiResponseType(AdditionalPresenter, true)
  async deleteAdditional(@Query('id', ParseIntPipe) id: number) {
    await this.deleteAdditionalUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post()
  @ApiResponseType(AdditionalPresenter, true)
  async createAdditional(@Body() createAdditionalDto: CreateAdditionalDto) {
    const { name, additionalTime, additionalPrice } = createAdditionalDto;
    const additionalCreated = await this.createAdditionalUsecaseProxy.getInstance().execute(name, additionalTime, additionalPrice);
    return new AdditionalPresenter(additionalCreated);
  }
}
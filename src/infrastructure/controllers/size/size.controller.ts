
import { Body, Controller, Delete, Get, Inject, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { getSizeUseCases } from '../../../usecases/size/getSize.usecases';
import { SizePresenter } from './size.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { getSizesUseCases } from '../../../usecases/size/getSizes.usecases';
import { updateSizeUseCases } from '../../../usecases/size/updateSize.usecases';
import { CreateSizeDto, UpdateSizeDto } from './size.dto';
import { deleteSizeUseCases } from '../../../usecases/size/deleteSize.usecases';
import { createSizeUseCases } from '../../../usecases/size/createSize.usecases';

@Controller('sizes')
@ApiTags('sizes')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(SizePresenter)
export class SizeController {
  constructor(
    @Inject(UsecasesProxyModule.GET_SIZE_USECASES_PROXY)
    private readonly getSizeUsecaseProxy: UseCaseProxy<getSizeUseCases>,
    @Inject(UsecasesProxyModule.GET_SIZES_USECASES_PROXY)
    private readonly getAllSizeUsecaseProxy: UseCaseProxy<getSizesUseCases>,
    @Inject(UsecasesProxyModule.PUT_SIZE_USECASES_PROXY)
    private readonly updateSizeUsecaseProxy: UseCaseProxy<updateSizeUseCases>,
    @Inject(UsecasesProxyModule.DELETE_SIZE_USECASES_PROXY)
    private readonly deleteSizeUsecaseProxy: UseCaseProxy<deleteSizeUseCases>,
    @Inject(UsecasesProxyModule.POST_SIZE_USECASES_PROXY)
    private readonly createSizeUsecaseProxy: UseCaseProxy<createSizeUseCases>,
  ) {}

  @Get(':id')
  @ApiResponseType(SizePresenter, false)
  async getSize(@Query('id', ParseIntPipe) id: number) {
    const size = await this.getSizeUsecaseProxy.getInstance().execute(id);
    return new SizePresenter(size);
  }

  @Get()
  @ApiResponseType(SizePresenter, true)
  async getSizes() {
    const sizes = await this.getAllSizeUsecaseProxy.getInstance().execute();
    return sizes.map((size) => new SizePresenter(size));
  }

  @Put(':id')
  @ApiResponseType(SizePresenter, true)
  async updateSize(@Body() updateSizeDto: UpdateSizeDto) {
    const { id, name, price } = updateSizeDto;
    await this.updateSizeUsecaseProxy.getInstance().execute(id, name, price);
    return 'success';
  }

  @Delete(':id')
  @ApiResponseType(SizePresenter, true)
  async deleteSize(@Query('id', ParseIntPipe) id: number) {
    await this.deleteSizeUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post()
  @ApiResponseType(SizePresenter, true)
  async createSize(@Body() createSizeDto: CreateSizeDto) {
    const { name, price } = createSizeDto;
    const sizeCreated = await this.createSizeUsecaseProxy.getInstance().execute(name, price);
    return new SizePresenter(sizeCreated);
  }
}
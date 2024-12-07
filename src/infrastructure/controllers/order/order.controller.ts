import { Body, Controller, Delete, Get, Inject, Post, Query } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderPresenter } from "./order.presenter";
import { ApiResponseType } from "../../../infrastructure/common/swagger/response.decorator";
import { UsecasesProxyModule } from "../../../infrastructure/usecases-proxy/usecases-proxy.module";
import { UseCaseProxy } from "../../../infrastructure/usecases-proxy/usecases-proxy";
import { storeOrderUseCases } from "../../../usecases/order/storeOrder.usecases";
import { getOrderUseCases } from "../../../usecases/order/getOrder.usecases";
import { deleteOrderUseCases } from "../../../usecases/order/deleteOrder.usecases";
import { StoreOrderDto } from "./order.dto";

@Controller('orders')
@ApiTags('orders')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(OrderPresenter)
export class OrderController {

    constructor(
        @Inject(UsecasesProxyModule.STORE_ORDER_USECASES_PROXY)
        private readonly storeOrderUsecaseProxy: UseCaseProxy<storeOrderUseCases>,
        @Inject(UsecasesProxyModule.GET_ORDER_USECASES_PROXY)
        private readonly getOrderUsecaseProxy: UseCaseProxy<getOrderUseCases>,
        @Inject(UsecasesProxyModule.DELETE_ORDER_USECASES_PROXY)
        private readonly deleteOrderUsecaseProxy: UseCaseProxy<deleteOrderUseCases>,
    ) { }

    @Post()
    @ApiResponseType(OrderPresenter, true)
    async storeOrder(@Body() storeOrderDto: StoreOrderDto) {
        const { observation, pizzas } = storeOrderDto;
        const orderCreated = await this.storeOrderUsecaseProxy.getInstance().execute(observation, pizzas);
        return new OrderPresenter(orderCreated);
    }

    @Get(':id ')
    @ApiResponseType(OrderPresenter, false)
    async getOrder(@Query('id') id: string) {
        const order = await this.getOrderUsecaseProxy.getInstance().execute(id);
        return new OrderPresenter(order);
    }

    @Delete(':id')
    @ApiResponseType(OrderPresenter, true)
    async deleteOrder(@Query('id') id: string) {
        await this.deleteOrderUsecaseProxy.getInstance().execute(id);
        return 'success';
    }
}
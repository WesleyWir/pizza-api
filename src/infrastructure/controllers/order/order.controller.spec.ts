import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { StoreOrderDto } from './order.dto';
import { OrderPresenter } from './order.presenter';
import { PizzaModel } from '../../../domain/models/pizza';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
jest.mock('./order.presenter', () => {
    return {
        OrderPresenter: jest.fn().mockImplementation((order) => ({
            id: order.id,
            pizzas: order.pizzas,
            observation: order.observation,
        })),
    };
});

describe('OrderController', () => {
    let controller: OrderController;
    const mockCreatePizzaUseCase = { execute: jest.fn() };
    const mockStoreOrderUseCase = { execute: jest.fn() };
    const mockGetOrderUseCase = { execute: jest.fn() };
    const mockDeleteOrderUseCase = { execute: jest.fn() };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrderController],
            providers: [
                {
                    provide: UsecasesProxyModule.CREATE_PIZZA_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockCreatePizzaUseCase),
                },
                {
                    provide: UsecasesProxyModule.STORE_ORDER_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockStoreOrderUseCase),
                },
                {
                    provide: UsecasesProxyModule.GET_ORDER_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockGetOrderUseCase),
                },
                {
                    provide: UsecasesProxyModule.DELETE_ORDER_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockDeleteOrderUseCase),
                },
            ],
        }).compile();

        controller = module.get<OrderController>(OrderController);
    });

    describe('storeOrder', () => {
        it('should store an order', async () => {
            const storeOrderDto: StoreOrderDto = {
                observation: 'Test observation',
                pizzas: [{ size_id: 1, flavor_id: 1, price: 20, preparationTime: 15 }],
            };
            const createdPizza: PizzaModel = { ...storeOrderDto.pizzas[0], id: 1 };
            const orderCreated = { id: '1', pizzas: [createdPizza], observation: storeOrderDto.observation };
            mockCreatePizzaUseCase.execute.mockResolvedValue(createdPizza);
            mockStoreOrderUseCase.execute.mockResolvedValue(orderCreated);

            const result = await controller.storeOrder(storeOrderDto);

            expect(result.id).toBe('1');
            expect(result.pizzas.length).toBe(1);
            expect(mockCreatePizzaUseCase.execute).toHaveBeenCalledTimes(1);
            expect(mockStoreOrderUseCase.execute).toHaveBeenCalledTimes(1);
        });
    });

    describe('getOrder', () => {
        it('should return an order by id', async () => {
            const orderId = '1';
            const order = { id: '1', pizzas: [], observation: 'Test observation' };
            mockGetOrderUseCase.execute.mockResolvedValue(order);

            const result = await controller.getOrder(orderId);

            expect(result.id).toBe(orderId);
            expect(mockGetOrderUseCase.execute).toHaveBeenCalledWith(orderId);
        });
    });

    describe('deleteOrder', () => {
        it('should delete an order by id', async () => {
            const orderId = '1';
            mockDeleteOrderUseCase.execute.mockResolvedValue(undefined);

            const result = await controller.deleteOrder(orderId);

            expect(result).toBe('success');
            expect(mockDeleteOrderUseCase.execute).toHaveBeenCalledWith(orderId);
        });
    });
});

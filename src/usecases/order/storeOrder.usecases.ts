import { PizzaModel } from '../../domain/models/pizza';
import { ILogger } from '../../domain/logger/logger.interface';
import { OrderModel } from '../../domain/models/order';
import { OrderRepository } from '../../domain/repositories/OrderRepository.interface';
import { PizzaRepository } from '../../domain/repositories/PizzaRepository.interface';
import { SizeRepository } from '../../domain/repositories/SizeRepository.interface';
import { FlavorRepository } from '../../domain/repositories/FlavorRepository.interface';
import { AdditionalRepository } from '../../domain/repositories/AdditionalRepository.interface';

export class storeOrderUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly orderRepository: OrderRepository,
    ) { }

    async execute(observation: string, pizzas: PizzaModel[]): Promise<OrderModel> {
        const order = new OrderModel();
        order.observation = observation;
        order.pizzas = pizzas;
        const createdOrder = await this.orderRepository.create(order);
        this.logger.log('storeOrderUseCases execute', 'New order has been inserted');
        return createdOrder;
    }
}
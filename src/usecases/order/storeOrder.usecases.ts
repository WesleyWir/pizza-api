import { PizzaModel } from '../../domain/models/pizza';
import { ILogger } from '../../domain/logger/logger.interface';
import { OrderModel } from '../../domain/models/order';
import { OrderRepository } from '../../domain/repositories/OrderRepository.interface';

export class storeOrderUseCases {
    constructor(
        private readonly logger: ILogger,
        private readonly orderRepository: OrderRepository,
    ) { }

    async execute(observation: string, pizzas: PizzaModel[]): Promise<OrderModel> {
        const order = new OrderModel();
        order.observation = observation;
        let totalPreparationTime = 0;
        let totalPrice = 0;
        if (pizzas && pizzas.length > 0) {
            order.pizzas = pizzas.map(pizza => {
                pizza.order = order;
                totalPreparationTime += pizza.preparationTime;
                totalPrice += pizza.price;
                return pizza;
            });
        }
        order.totalPreparationTime = totalPreparationTime;
        order.totalPrice = totalPrice;
        const createdOrder = await this.orderRepository.create(order);
        this.logger.log('storeOrderUseCases execute', 'New order has been inserted');
        return createdOrder;
    }
}
import { OrderModel } from '../../domain/models/order';
import { OrderRepository } from '../../domain/repositories/OrderRepository.interface';

export class getOrderUseCases {
    constructor(private readonly orderRepository: OrderRepository) { }

    async execute(id: string): Promise<OrderModel> {
        return await this.orderRepository.findById(id, ['pizzas', 'pizzas.flavor',
            'pizzas.size', 'pizzas.additionals']);
    }
}
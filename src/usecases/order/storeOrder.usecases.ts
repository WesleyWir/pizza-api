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
        private readonly pizzaRepository: PizzaRepository,
        private readonly sizeRepository: SizeRepository,
        private readonly flavorRepository: FlavorRepository,
        private readonly additionalRepository: AdditionalRepository,
    ) { }

    async execute(observation: string, pizzas: PizzaModel[]): Promise<OrderModel> {
        const order = new OrderModel();
        order.observation = observation;
        for (const pizza of pizzas) {
            const newPizza = new PizzaModel();
            let preparationTime = 0;
            const size = await this.sizeRepository.findById(pizza.size_id);
            const flavor = await this.flavorRepository.findById(pizza.flavor_id);
            let price = size.price;
            preparationTime += flavor.additionalTime;
            newPizza.size = size;
            newPizza.flavor = flavor;
            let additionals = [];
            for (const additionalId of pizza.additional_ids) {
                const additional = await this.additionalRepository.findById(additionalId);
                price += additional.additionalPrice;
                preparationTime += additional.additionalTime;
                additionals.push(additional);
            }
            newPizza.additionals = additionals;
            const createdPizza = await this.pizzaRepository.create(newPizza);
            order.pizzas.push(createdPizza);
        }
        const result = await this.orderRepository.create(order);
        this.logger.log('storeOrderUseCases execute', 'New order have been inserted');
        return result;
    }
}
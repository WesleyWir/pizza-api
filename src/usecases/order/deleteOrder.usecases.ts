import { ILogger } from '../../domain/logger/logger.interface';
import { OrderRepository } from '../../domain/repositories/OrderRepository.interface';

export class deleteOrderUseCases {
  constructor(private readonly logger: ILogger, private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<void> {
    await this.orderRepository.deleteById(id);
    this.logger.log('deleteOrderUseCases execute', `Order ${id} have been deleted`);
  }
}
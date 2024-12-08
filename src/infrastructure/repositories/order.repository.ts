import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderModel } from '../../domain/models/order';
import { Order } from '../entities/order.entity';
import { OrderRepository } from '../../domain/repositories/OrderRepository.interface';
import { ExceptionsService } from '../exceptions/exceptions.service';

@Injectable()
export class DatabaseOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderEntityRepository: Repository<Order>,
    private readonly exceptionsService: ExceptionsService,
  ) { }

  async create(order: OrderModel): Promise<OrderModel> {
    if (order.pizzas && order.pizzas.length > 0) {
      order.pizzas = order.pizzas.map(pizza => {
        pizza.order = order;
        return pizza;
      });
    }

    return await this.orderEntityRepository.save(order);
  }

  async update(id: string, order: OrderModel): Promise<void> {
    await this.orderEntityRepository.update(
      {
        id: id,
      },
      { ...order },
    );
  }

  async findById(id: string, relations: string[] = []): Promise<OrderModel> {
    try {
      return await this.orderEntityRepository.findOneOrFail({
        where: { id },
        relations
      });
    } catch (e) {
      this.exceptionsService.badRequestException({ message: 'Failed to get order', code_error: 404 });
    }
  }

  async deleteById(id: string): Promise<void> {
    const result = await this.orderEntityRepository.delete({ id });
    if (result.affected === 0) {
      this.exceptionsService.badRequestException({ message: 'Failed to delete order', code_error: 400 });
    }
  }
}
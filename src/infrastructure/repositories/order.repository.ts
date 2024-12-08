import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderModel } from '../../domain/models/order';
import { Order } from '../entities/order.entity';
import { OrderRepository } from '../../domain/repositories/OrderRepository.interface';

@Injectable()
export class DatabaseOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderEntityRepository: Repository<Order>,
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
    return await this.orderEntityRepository.findOneOrFail({
      where: { id },
      relations
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.orderEntityRepository.delete({ id: id });
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderModel } from '../../domain/models/order';
import { Order } from '../entities/order.entity';
import { OrderRepository } from '@/domain/repositories/OrderRepository.interface';

@Injectable()
export class DatabaseOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderEntityRepository: Repository<Order>,
  ) {}

  async create(order: OrderModel): Promise<OrderModel> {
    const orderEntity = order;
    const result = await this.orderEntityRepository.insert(orderEntity);
    return result.generatedMaps[0] as Order;
  }

  async update(id: string, order: OrderModel): Promise<void> {
    await this.orderEntityRepository.update(
      {
        id: id,
      },
      { ...order },
    );
  }

  async findById(id: string): Promise<OrderModel> {
    return await this.orderEntityRepository.findOneOrFail({ where: { id } });
  }
  async deleteById(id: string): Promise<void> {
    await this.orderEntityRepository.delete({ id: id });
  }
}
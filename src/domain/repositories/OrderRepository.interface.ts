import { OrderModel } from '../models/order';

export interface OrderRepository {
  create(order: OrderModel): Promise<OrderModel>;
  findById(id: string, relations?: string[]): Promise<OrderModel>;
  deleteById(id: string): Promise<void>;
  update(id: string, order: OrderModel): Promise<void>;
}
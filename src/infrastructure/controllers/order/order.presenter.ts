import { ApiProperty } from '@nestjs/swagger';
import { OrderModel } from '../../../domain/models/order';
import { PizzaPresenter } from './pizza.presenter';

export class OrderPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  pizzas: PizzaPresenter[];
  @ApiProperty()
  observation: string;
  @ApiProperty()
  total_preparation_time: number;
  @ApiProperty()
  total_price: number;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;

  constructor(order: OrderModel) {
    this.id = order.id;
    this.pizzas = order.pizzas.map((pizza) => new PizzaPresenter(pizza));
    this.observation = order.observation;
    this.total_preparation_time = order.totalPreparationTime;
    this.total_price = order.totalPrice;
    this.created_at = order.createdAt;
    this.updated_at = order.updatedAt;
  }
}
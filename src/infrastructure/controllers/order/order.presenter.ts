import { ApiProperty } from '@nestjs/swagger';
import { OrderModel } from '../../../domain/models/order';
import { PizzaModel } from '../../../domain/models/pizza';

export class OrderPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  pizzas: PizzaModel[];
  @ApiProperty()
  observation: string;
  @ApiProperty()
  totalPreparationTime: number;
  @ApiProperty()
  totalPrice: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(order: OrderModel) {
    this.id = order.id;
    this.pizzas = order.pizzas;
    this.observation = order.observation;
    this.totalPreparationTime = order.totalPreparationTime;
    this.totalPrice = order.totalPrice;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }
}
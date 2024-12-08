import { ApiProperty } from '@nestjs/swagger';
import { OrderModel } from '../../../domain/models/order';
import { PizzaPresenter } from './pizza.presenter';

export class OrderPresenter {
  @ApiProperty({
    example: 'ORD12345',
  })
  id: string;

  @ApiProperty({
    type: [PizzaPresenter],
    example: [
      {
        id: 1,
        order_id: 'ORD12345',
        size: {
          id: 1,
          name: 'Large',
          price: 15.99,
        },
        flavor: {
          id: 1,
          name: 'Margherita',
          additional_time: 5
        },
        additionals: [
          {
            id: 1,
            name: 'Olives',
            additional_time: 5,
            additional_price: 15,
          },
        ],
        price: 18.99,
        preparation_time: 15,
      },
    ],
  })
  pizzas: PizzaPresenter[];

  @ApiProperty({
    example: 'No onions on the pizza.',
  })
  observation: string;

  @ApiProperty({
    example: 45,
  })
  total_preparation_time: number;

  @ApiProperty({
    example: 49.99,
  })
  total_price: number;

  @ApiProperty({
    example: '2024-12-07T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-12-07T12:30:00Z',
  })
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

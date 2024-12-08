import { PizzaModel } from '../../../domain/models/pizza';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StoreOrderDto {
  @ApiProperty({
    required: false,
    example: 'Extra spicy pizza with no olives.',
    description: 'Any special instructions or observations for the order.',
  })
  readonly observation: string;

  @ApiProperty({
    required: true,
    example: [
      {
        id: 1,
        size_id: 1,
        flavor_id: 2,
        additional_ids: [1, 2, 3]
      },
    ],
    description: 'The list of pizzas included in the order.',
  })
  @IsNotEmpty()
  readonly pizzas: PizzaModel[];
}

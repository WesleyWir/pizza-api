import { PizzaModel } from '../../../domain/models/pizza';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePizzaDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: 'The ID of the pizza size.',
  })
  @IsInt()
  size_id: number;

  @ApiProperty({
    required: true,
    example: 2,
    description: 'The ID of the pizza flavor.',
  })
  @IsInt()
  flavor_id: number;

  @ApiProperty({
    required: false,
    example: [1, 2, 3],
    description: 'The list of additional ingredients for the pizza.',
  })
  @IsArray()
  @IsOptional()
  @IsInt({ each: true })
  additional_ids?: number[];
}

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
  readonly pizzas: CreatePizzaDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import { SizeModel } from '../../../domain/models/size';

export class SizePresenter {
  @ApiProperty({
    description: 'Unique identifier for the size',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the size (e.g., Small, Medium, Large)',
    example: 'Large',
  })
  name: string;

  @ApiProperty({
    description: 'Price of the size',
    example: 15.99,
  })
  price: number;

  @ApiProperty({
    description: 'Preparation time for the size.',
    example: 10,
  })
  preparation_time: number;

  @ApiProperty({
    description: 'Timestamp when the size was created.',
    example: '2023-12-09T12:00:00Z',
  })
  created_at?: string;

  @ApiProperty({
    description: 'Timestamp when the size was last updated.',
    example: '2023-12-10T12:00:00Z',
  })
  updated_at?: string;

  constructor(size: SizeModel, timestamps = false) {
    this.id = size.id;
    this.name = size.name;
    this.price = size.price;
    this.preparation_time = size.preparationTime;

    if (timestamps) {
      this.created_at = size.createdAt?.toISOString();
      this.updated_at = size.updatedAt?.toISOString();
    }
  }
}

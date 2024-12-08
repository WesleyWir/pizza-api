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

  constructor(size: SizeModel) {
    this.id = size.id;
    this.name = size.name;
    this.price = size.price;
  }
}

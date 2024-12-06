import { ApiProperty } from '@nestjs/swagger';
import { SizeModel } from '../../../domain/models/size';

export class SizePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(size: SizeModel) {
    this.id = size.id;
    this.name = size.name;
    this.price = size.price;
    this.createdAt = size.createdAt;
    this.updatedAt = size.updatedAt;
  }
}
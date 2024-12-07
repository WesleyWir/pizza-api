import { ApiProperty } from '@nestjs/swagger';
import { FlavorModel } from '@/domain/models/flavor';

export class FlavorPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  additionalTime: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(size: FlavorModel) {
    this.id = size.id;
    this.name = size.name;
    this.additionalTime = size.additionalTime;
    this.createdAt = size.createdAt;
    this.updatedAt = size.updatedAt;
  }
}
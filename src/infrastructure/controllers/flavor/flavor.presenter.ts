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

  constructor(flavor: FlavorModel) {
    this.id = flavor.id;
    this.name = flavor.name;
    this.additionalTime = flavor.additionalTime;
    this.createdAt = flavor.createdAt;
    this.updatedAt = flavor.updatedAt;
  }
}
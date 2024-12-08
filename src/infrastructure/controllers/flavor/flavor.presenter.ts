import { ApiProperty } from '@nestjs/swagger';
import { FlavorModel } from '../../../domain/models/flavor';

export class FlavorPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  additional_time: number;

  constructor(flavor: FlavorModel) {
    this.id = flavor.id;
    this.name = flavor.name;
    this.additional_time = flavor.additionalTime;
  }
}
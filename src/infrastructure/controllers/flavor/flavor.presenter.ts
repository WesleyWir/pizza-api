import { ApiProperty } from '@nestjs/swagger';
import { FlavorModel } from '../../../domain/models/flavor';

export class FlavorPresenter {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Margherita',
  })
  name: string;

  @ApiProperty({
    example: 5,
  })
  additional_time: number;

  constructor(flavor: FlavorModel) {
    this.id = flavor.id;
    this.name = flavor.name;
    this.additional_time = flavor.additionalTime;
  }
}

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

  constructor(flavor: FlavorModel, timestamps = false) {
    this.id = flavor.id;
    this.name = flavor.name;
    this.additional_time = flavor.additionalTime;

    if (timestamps) {
      this.created_at = flavor.createdAt?.toISOString();
      this.updated_at = flavor.updatedAt?.toISOString();
    }
  }
}

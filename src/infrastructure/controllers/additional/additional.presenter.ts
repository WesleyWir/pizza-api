import { ApiProperty } from '@nestjs/swagger';
import { AdditionalModel } from '../../../domain/models/additional';

export class AdditionalPresenter {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Olives',
  })
  name: string;

  @ApiProperty({
    example: 10,
  })
  additional_time: number;

  @ApiProperty({
    example: 2.5,
  })
  additional_price: number;

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

  constructor(additional: AdditionalModel, timestamps = false) {
    this.id = additional.id;
    this.name = additional.name;
    this.additional_time = additional.additionalTime;
    this.additional_price = additional.additionalPrice;

    if (timestamps) {
      this.created_at = additional.createdAt?.toISOString();
      this.updated_at = additional.updatedAt?.toISOString();
    }
  }
}

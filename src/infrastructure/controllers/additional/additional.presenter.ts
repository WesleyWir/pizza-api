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

  constructor(additional: AdditionalModel) {
    this.id = additional.id;
    this.name = additional.name;
    this.additional_time = additional.additionalTime;
    this.additional_price = additional.additionalPrice;
  }
}

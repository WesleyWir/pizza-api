import { ApiProperty } from '@nestjs/swagger';
import { AdditionalModel } from '../../../domain/models/additional';

export class AdditionalPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  additional_time: number;
  @ApiProperty()
  additional_price: number;

  constructor(additional: AdditionalModel) {
    this.id = additional.id;
    this.name = additional.name;
    this.additional_time = additional.additionalTime;
    this.additional_price = additional.additionalPrice;
  }
}
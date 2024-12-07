import { ApiProperty } from '@nestjs/swagger';
import { AdditionalModel } from '@/domain/models/additional';

export class AdditionalPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  additionalTime: number;
  @ApiProperty()
  additionalPrice: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(additional: AdditionalModel) {
    this.id = additional.id;
    this.name = additional.name;
    this.additionalTime = additional.additionalTime;
    this.additionalPrice = additional.additionalPrice;
    this.createdAt = additional.createdAt;
    this.updatedAt = additional.updatedAt;
  }
}
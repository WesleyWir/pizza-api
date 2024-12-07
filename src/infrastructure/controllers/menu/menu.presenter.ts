import { ApiProperty } from '@nestjs/swagger';
import { FlavorModel } from '../../../domain/models/flavor';
import { SizeModel } from '../../../domain/models/size';
import { AdditionalModel } from '../../../domain/models/additional';

export class Menu {
    flavors: FlavorModel[];
    sizes: SizeModel[];
    additionals: AdditionalModel[];
}

export class MenuPresenter {
  @ApiProperty()
  flavors: FlavorModel[];
  @ApiProperty()
  sizes: SizeModel[];
  @ApiProperty()
  additionals: AdditionalModel[];

  constructor(menu: Menu) {
    this.flavors = menu.flavors;
    this.sizes = menu.sizes;
    this.additionals = menu.additionals;
  }
}
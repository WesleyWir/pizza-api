import { ApiProperty } from '@nestjs/swagger';
import { FlavorModel } from '@/domain/models/flavor';
import { FlavorPresenter } from '../flavor/flavor.presenter';
import { SizePresenter } from '../size/size.presenter';
import { AdditionalPresenter } from '../additional/additional.presenter';
import { SizeModel } from '@/domain/models/size';
import { AdditionalModel } from '@/domain/models/additional';

export class Menu {
    flavors: FlavorModel[];
    sizes: SizeModel[];
    additionals: AdditionalModel[];
}

export class MenuPresenter {
  @ApiProperty()
  flavors: FlavorPresenter[];
  @ApiProperty()
  sizes: SizePresenter[];
  @ApiProperty()
  additionals: AdditionalPresenter[];

  constructor(menu: Menu) {
    this.flavors = menu.flavors.map((flavor) => new FlavorPresenter(flavor));
    this.sizes = menu.sizes.map((size) => new SizePresenter(size));
    this.additionals = menu.additionals.map((additional) => new AdditionalPresenter(additional));
  }
}
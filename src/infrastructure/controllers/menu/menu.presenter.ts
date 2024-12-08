import { ApiProperty } from '@nestjs/swagger';
import { FlavorModel } from '../../../domain/models/flavor';
import { SizeModel } from '../../../domain/models/size';
import { AdditionalModel } from '../../../domain/models/additional';
import { FlavorPresenter } from '../flavor/flavor.presenter';
import { SizePresenter } from '../size/size.presenter';
import { AdditionalPresenter } from '../additional/additional.presenter';

export class Menu {
  flavors: FlavorModel[];
  sizes: SizeModel[];
  additionals: AdditionalModel[];
}

export class MenuPresenter {
  @ApiProperty({
    type: [FlavorPresenter],
    example: [
      {
        id: 1,
        name: 'Margherita',
        additional_time: 5
      },
      {
        id: 2,
        name: 'Pepperoni',
        additional_time: 0
      },
    ],
  })
  flavors: FlavorPresenter[];

  @ApiProperty({
    type: [SizePresenter],
    example: [
      {
        id: 1,
        name: 'Small',
        price: 8.99,
      },
      {
        id: 2,
        name: 'Large',
        price: 12.99,
      },
    ],
  })
  sizes: SizePresenter[];

  @ApiProperty({
    type: [AdditionalPresenter],
    example: [
      {
        id: 1,
        name: 'Olives',
        additional_time: 5,
        additional_price: 2.5,
      },
      {
        id: 2,
        name: 'Mushrooms',
        additional_time: 5,
        additional_price: 3.0,
      },
    ],
  })
  additionals: AdditionalPresenter[];

  constructor(menu: Menu) {
    this.flavors = menu.flavors.map((flavor) => new FlavorPresenter(flavor));
    this.sizes = menu.sizes.map((size) => new SizePresenter(size));
    this.additionals = menu.additionals.map((additional) => new AdditionalPresenter(additional));
  }
}

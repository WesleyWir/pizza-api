import { ApiProperty } from '@nestjs/swagger';
import { PizzaModel } from '../../../domain/models/pizza';
import { FlavorPresenter } from '../flavor/flavor.presenter';
import { SizePresenter } from '../size/size.presenter';
import { AdditionalPresenter } from '../additional/additional.presenter';

export class PizzaPresenter {
    @ApiProperty({
        example: 1,
    })
    id: number;

    @ApiProperty({
        type: SizePresenter,
        example: {
            id: 1,
            name: 'Large',
            price: 15.99,
        },
    })
    size: SizePresenter;

    @ApiProperty({
        type: FlavorPresenter,
        example: {
            id: 1,
            name: 'Margherita',
            additional_time: 5
        },
    })
    flavor: FlavorPresenter;

    @ApiProperty({
        type: [AdditionalPresenter],
        example: [
            {
                id: 1,
                name: 'Olives',
                price: 20.5,
            },
            {
                id: 2,
                name: 'Mushrooms',
                price: 30.5,
            },
        ],
    })
    additionals: AdditionalPresenter[];

    @ApiProperty({
        example: 18.99,
    })
    price: number;

    @ApiProperty({
        example: 15,
    })
    preparation_time: number;

    constructor(pizza: PizzaModel) {
        this.id = pizza.id;
        this.size = new SizePresenter(pizza.size);
        this.flavor = new FlavorPresenter(pizza.flavor);
        this.additionals = pizza.additionals.map((additional) => new AdditionalPresenter(additional));
        this.price = pizza.price;
        this.preparation_time = pizza.preparationTime;
    }
}

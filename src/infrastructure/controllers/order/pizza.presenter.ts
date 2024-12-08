import { ApiProperty } from '@nestjs/swagger';
import { PizzaModel } from '../../../domain/models/pizza';
import { FlavorPresenter } from '../flavor/flavor.presenter';
import { SizePresenter } from '../size/size.presenter';
import { AdditionalPresenter } from '../additional/additional.presenter';

export class PizzaPresenter {
    @ApiProperty()
    id: number;
    @ApiProperty()
    order_id: string;
    @ApiProperty()
    size: SizePresenter
    @ApiProperty()
    flavor: FlavorPresenter
    @ApiProperty()
    additionals: AdditionalPresenter[];
    @ApiProperty()
    price: number;
    @ApiProperty()
    preparation_time: number;

    constructor(pizza: PizzaModel) {
        this.id = pizza.id;
        this.order_id = pizza.orderId;
        this.size = new SizePresenter(pizza.size);
        this.flavor = new FlavorPresenter(pizza.flavor);
        this.additionals = pizza.additionals.map((additional) => new AdditionalPresenter(additional));
        this.price = pizza.price;
        this.preparation_time = pizza.preparationTime;
    }
}
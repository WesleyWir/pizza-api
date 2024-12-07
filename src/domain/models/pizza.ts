import { FlavorModel } from "./flavor";
import { SizeModel } from "./size";

export class PizzaModel {
    id: number;
    order_id?: string;
    size_id?: number;
    flavor_id?: number;
    size?: SizeModel;
    Flavor?: FlavorModel;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}
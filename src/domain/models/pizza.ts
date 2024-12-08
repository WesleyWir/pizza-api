import { Additional } from "../../infrastructure/entities/additional.entity";
import { FlavorModel } from "./flavor";
import { OrderModel } from "./order";
import { SizeModel } from "./size";

export class PizzaModel {
    id: number;
    orderId?: string;
    size_id?: number;
    flavor_id?: number;
    order?: OrderModel;
    size?: SizeModel;
    flavor?: FlavorModel;
    additionals?: Additional[];
    additional_ids?: number[];
    price: number;
    preparationTime: number;
    createdAt?: Date;
    updatedAt?: Date;
}
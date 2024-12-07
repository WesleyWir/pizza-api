import { Additional } from "@/infrastructure/entities/additional.entity";
import { FlavorModel } from "./flavor";
import { SizeModel } from "./size";

export class PizzaModel {
    id: number;
    order_id?: string;
    size_id?: number;
    flavor_id?: number;
    size?: SizeModel;
    flavor?: FlavorModel;
    additionals?: Additional[];
    additional_ids?: number[];
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}
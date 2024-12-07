import { PizzaModel } from "./pizza";

export class OrderModel {
    id: string;
    observation: string;
    totalPreparationTime: number;
    totalPrice: number;
    pizzas?: PizzaModel[];
    createdAt: Date;
    updatedAt: Date;
}
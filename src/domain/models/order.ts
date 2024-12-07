import { PizzaModel } from "./pizza";

export class OrderModel {
    id: string;
    observation: string;
    preparationTime: number;
    totalPrice: number;
    pizzas?: PizzaModel[];
    createdAt: Date;
    updatedAt: Date;
}
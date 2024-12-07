import { PizzaModel } from '../models/pizza';

export interface PizzaRepository {
    create(pizza: PizzaModel): Promise<PizzaModel>;
    findById(id: number): Promise<PizzaModel>;
}
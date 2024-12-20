import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaModel } from '../../domain/models/pizza';
import { Pizza } from '../entities/pizza.entity';
import { PizzaRepository } from '../../domain/repositories/PizzaRepository.interface';

@Injectable()
export class DatabasePizzaRepository implements PizzaRepository {
    constructor(
        @InjectRepository(Pizza)
        private readonly pizzaEntityRepository: Repository<Pizza>,
    ) { }

    async create(pizza: PizzaModel): Promise<PizzaModel> {
        return await this.pizzaEntityRepository.save(pizza);
    }

    async findById(id: number, relations: string[]): Promise<PizzaModel> {
        return await this.pizzaEntityRepository.findOneOrFail({ where: { id }, relations });
    }
}
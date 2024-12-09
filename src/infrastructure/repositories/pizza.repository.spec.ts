import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabasePizzaRepository } from './pizza.repository';
import { Pizza } from '../entities/pizza.entity';
import { PizzaModel } from '../../domain/models/pizza';

describe('DatabasePizzaRepository', () => {
    let repository: DatabasePizzaRepository;
    let pizzaEntityRepository: Repository<Pizza>;

    const mockPizzaEntityRepository = {
        save: jest.fn(),
        findOneOrFail: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DatabasePizzaRepository,
                {
                    provide: getRepositoryToken(Pizza),
                    useValue: mockPizzaEntityRepository,
                },
            ],
        }).compile();

        repository = module.get<DatabasePizzaRepository>(DatabasePizzaRepository);
        pizzaEntityRepository = module.get<Repository<Pizza>>(getRepositoryToken(Pizza));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should save and return the created pizza with relations', async () => {
            const pizzaData: PizzaModel = {
                id: 1,
                flavorId: 1,
                sizeId: 2,
                additional_ids: [1, 2, 3],
                price: 20,
                preparationTime: 15,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockPizzaEntityRepository.save.mockResolvedValue(pizzaData);

            const result = await repository.create(pizzaData);

            expect(pizzaEntityRepository.save).toHaveBeenCalledWith(pizzaData);
            expect(result).toEqual(pizzaData);
        });
    });

    describe('findById', () => {
        it('should return the pizza with its relations when found', async () => {
            const pizzaData: PizzaModel = {
                id: 1,
                flavorId: 1,
                sizeId: 2,
                additional_ids: [1, 2, 3],
                price: 20,
                preparationTime: 15,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            mockPizzaEntityRepository.findOneOrFail.mockResolvedValue(pizzaData);
            const relations = ['size', 'flavor', 'additionals'];
            const result = await repository.findById(1, ['size', 'flavor', 'additionals']);

            expect(pizzaEntityRepository.findOneOrFail).toHaveBeenCalledWith({
                where: { id: 1 },
                relations,
            });
            expect(result).toEqual(pizzaData);
        });

        it('should throw an error when pizza is not found', async () => {
            mockPizzaEntityRepository.findOneOrFail.mockRejectedValue(new Error('Pizza not found'));
            const relations = ['size', 'flavor', 'additionals'];
            await expect(repository.findById(99, relations)).rejects.toThrow('Pizza not found');
            expect(pizzaEntityRepository.findOneOrFail).toHaveBeenCalledWith({
                where: { id: 99 },
                relations,
            });
        });
    });
});

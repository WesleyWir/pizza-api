import { DatabaseFlavorRepository } from './flavor.repository';
import { FlavorModel } from '../../domain/models/flavor';
import { Repository } from 'typeorm';
import { Flavor } from '../entities/flavor.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { InsertResult } from 'typeorm';

describe('DatabaseFlavorRepository', () => {
    let repository: DatabaseFlavorRepository;
    let mockFlavorRepository: jest.Mocked<Repository<Flavor>>;

    beforeEach(async () => {
        mockFlavorRepository = {
            insert: jest.fn(),
            update: jest.fn(),
            find: jest.fn(),
            findOneOrFail: jest.fn(),
            delete: jest.fn(),
        } as unknown as jest.Mocked<Repository<Flavor>>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DatabaseFlavorRepository,
                {
                    provide: getRepositoryToken(Flavor),
                    useValue: mockFlavorRepository,
                },
            ],
        }).compile();

        repository = module.get<DatabaseFlavorRepository>(DatabaseFlavorRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a flavor', async () => {
        const mockFlavor = new FlavorModel();
        mockFlavor.id = 1;
        mockFlavor.name = 'Vanilla';
        mockFlavor.additionalTime = 5;
        mockFlavor.createdAt = new Date();

        const flavorEntity = new Flavor();
        flavorEntity.id = 1;
        flavorEntity.name = 'Vanilla';
        flavorEntity.additionalTime = 5;
        flavorEntity.createdAt = new Date();

        const insertResult: InsertResult = {
            generatedMaps: [flavorEntity],
            raw: [],
            identifiers: [],
        };

        mockFlavorRepository.insert.mockResolvedValue(insertResult);

        const result = await repository.create(mockFlavor);
        expect(mockFlavorRepository.insert).toHaveBeenCalledWith(mockFlavor);
        expect(result).toEqual(mockFlavor);
    });

    it('should update a flavor', async () => {
        const mockFlavor = new FlavorModel();
        mockFlavor.id = 1;
        mockFlavor.name = 'Strawberry';
        mockFlavor.additionalTime = 10;
        mockFlavor.createdAt = new Date();

        await repository.update(1, mockFlavor);
        expect(mockFlavorRepository.update).toHaveBeenCalledWith(
            { id: 1 },
            { ...mockFlavor },
        );
    });

    it('should return all flavors', async () => {
        const flavorEntity = new Flavor();
        flavorEntity.id = 1;
        flavorEntity.name = 'Chocolate';
        flavorEntity.additionalTime = 5;
        flavorEntity.createdAt = new Date();

        mockFlavorRepository.find.mockResolvedValue([flavorEntity]);

        const result = await repository.findAll();
        expect(mockFlavorRepository.find).toHaveBeenCalled();
        expect(result).toEqual([
            expect.objectContaining({
                id: flavorEntity.id,
                name: flavorEntity.name,
                additionalTime: flavorEntity.additionalTime,
                createdAt: flavorEntity.createdAt,
            }),
        ]);
    });

    it('should return a flavor by ID', async () => {
        const flavorEntity = new Flavor();
        flavorEntity.id = 1;
        flavorEntity.name = 'Mint';
        flavorEntity.additionalTime = 5;
        flavorEntity.createdAt = new Date();

        mockFlavorRepository.findOneOrFail.mockResolvedValue(flavorEntity);

        const result = await repository.findById(1);
        expect(mockFlavorRepository.findOneOrFail).toHaveBeenCalledWith({
            where: { id: 1 },
        });
        expect(result).toEqual(
            expect.objectContaining({
                id: flavorEntity.id,
                name: flavorEntity.name,
                additionalTime: flavorEntity.additionalTime,
                createdAt: flavorEntity.createdAt,
            }),
        );
    });

    it('should delete a flavor by ID', async () => {
        await repository.deleteById(1);
        expect(mockFlavorRepository.delete).toHaveBeenCalledWith({ id: 1 });
    });
});

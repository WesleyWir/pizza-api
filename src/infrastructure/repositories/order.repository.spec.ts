import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseOrderRepository } from './order.repository';
import { Order } from '../entities/order.entity';
import { ExceptionsService } from '../exceptions/exceptions.service';

describe('DatabaseOrderRepository', () => {
    let repository: DatabaseOrderRepository;
    let orderEntityRepository: Repository<Order>;
    let exceptionsService: ExceptionsService;

    const mockOrderEntityRepository = {
        save: jest.fn(),
        update: jest.fn(),
        findOneOrFail: jest.fn(),
        delete: jest.fn(),
    };

    const mockExceptionsService = {
        badRequestException: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DatabaseOrderRepository,
                {
                    provide: getRepositoryToken(Order),
                    useValue: mockOrderEntityRepository,
                },
                {
                    provide: ExceptionsService,
                    useValue: mockExceptionsService,
                },
            ],
        }).compile();

        repository = module.get<DatabaseOrderRepository>(DatabaseOrderRepository);
        orderEntityRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
        exceptionsService = module.get<ExceptionsService>(ExceptionsService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('deleteById', () => {
        it('should delete the order with the given id', async () => {
            mockOrderEntityRepository.delete.mockResolvedValue({ affected: 1 });

            await repository.deleteById('1');

            expect(orderEntityRepository.delete).toHaveBeenCalledWith({ id: '1' });
        });

        it('should call badRequestException if deletion fails', async () => {
            mockOrderEntityRepository.delete.mockResolvedValue({ affected: 0 });
            await expect(repository.deleteById('999'));
            expect(mockExceptionsService.badRequestException).toHaveBeenCalledWith({ message: 'Failed to delete order', code_error: 400 });
        });
    });
});

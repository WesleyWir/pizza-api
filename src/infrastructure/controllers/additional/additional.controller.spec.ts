import { Test, TestingModule } from '@nestjs/testing';
import { AdditionalController } from './additional.controller';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { AdditionalPresenter } from './additional.presenter';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { CreateAdditionalDto, UpdateAdditionalDto } from './additional.dto';

describe('AdditionalController', () => {
    let controller: AdditionalController;
    const mockGetAdditionalUseCase = { execute: jest.fn() };
    const mockGetAdditionalsUseCase = { execute: jest.fn() };
    const mockUpdateAdditionalUseCase = { execute: jest.fn() };
    const mockDeleteAdditionalUseCase = { execute: jest.fn() };
    const mockCreateAdditionalUseCase = { execute: jest.fn() };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AdditionalController],
            providers: [
                {
                    provide: UsecasesProxyModule.GET_ADDITIONAL_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockGetAdditionalUseCase),
                },
                {
                    provide: UsecasesProxyModule.GET_ADDITIONALS_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockGetAdditionalsUseCase),
                },
                {
                    provide: UsecasesProxyModule.PUT_ADDITIONAL_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockUpdateAdditionalUseCase),
                },
                {
                    provide: UsecasesProxyModule.DELETE_ADDITIONAL_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockDeleteAdditionalUseCase),
                },
                {
                    provide: UsecasesProxyModule.POST_ADDITIONAL_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockCreateAdditionalUseCase),
                },
            ],
        }).compile();

        controller = module.get<AdditionalController>(AdditionalController);
    });

    describe('getAdditional', () => {
        it('should return an additional by id', async () => {
            const additionalId = 1;
            const additional = { id: 1, name: 'Extra Cheese', additionalTime: 5, additionalPrice: 2 };
            mockGetAdditionalUseCase.execute.mockResolvedValue(additional);

            const result = await controller.getAdditional(additionalId);
            expect(result).toBeInstanceOf(AdditionalPresenter);
            expect(result.id).toBe(additionalId);
            expect(mockGetAdditionalUseCase.execute).toHaveBeenCalledWith(additionalId);
        });
    });

    describe('getAdditionals', () => {
        it('should return all additionals', async () => {
            const additionals = [
                { id: 1, name: 'Extra Cheese', additionalTime: 5, additionalPrice: 2 },
                { id: 2, name: 'Olives', additionalTime: 3, additionalPrice: 1 },
            ];
            mockGetAdditionalsUseCase.execute.mockResolvedValue(additionals);

            const result = await controller.getAdditionals();

            expect(result.length).toBe(2);
            expect(result[0]).toBeInstanceOf(AdditionalPresenter);
            expect(mockGetAdditionalsUseCase.execute).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateAdditional', () => {
        it('should update an additional', async () => {
            const updateAdditionalDto: UpdateAdditionalDto = { id: 1, name: 'New Extra Cheese', additionalTime: 10, additionalPrice: 3 };
            mockUpdateAdditionalUseCase.execute.mockResolvedValue(undefined);

            const result = await controller.updateAdditional(updateAdditionalDto);

            expect(result).toBe('success');
            expect(mockUpdateAdditionalUseCase.execute).toHaveBeenCalledWith(1, 'New Extra Cheese', 10, 3);
        });
    });

    describe('deleteAdditional', () => {
        it('should delete an additional', async () => {
            const additionalId = 1;
            mockDeleteAdditionalUseCase.execute.mockResolvedValue(undefined);

            const result = await controller.deleteAdditional(additionalId);

            expect(result).toBe('success');
            expect(mockDeleteAdditionalUseCase.execute).toHaveBeenCalledWith(additionalId);
        });
    });

    describe('createAdditional', () => {
        it('should create a new additional', async () => {
            const createAdditionalDto: CreateAdditionalDto = { name: 'Extra Olives', additionalTime: 5, additionalPrice: 2 };
            const additionalCreated = { id: 1, ...createAdditionalDto };
            mockCreateAdditionalUseCase.execute.mockResolvedValue(additionalCreated);

            const result = await controller.createAdditional(createAdditionalDto);

            expect(result).toBeInstanceOf(AdditionalPresenter);
            expect(result.id).toBe(1);
            expect(mockCreateAdditionalUseCase.execute).toHaveBeenCalledWith('Extra Olives', 5, 2);
        });
    });
});

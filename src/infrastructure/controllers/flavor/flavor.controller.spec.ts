import { Test, TestingModule } from '@nestjs/testing';
import { FlavorController } from './flavor.controller';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { FlavorPresenter } from './flavor.presenter';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { CreateFlavorDto, UpdateFlavorDto } from './flavor.dto';

describe('FlavorController', () => {
    let controller: FlavorController;
    const mockGetFlavorUseCase = { execute: jest.fn() };
    const mockGetFlavorsUseCase = { execute: jest.fn() };
    const mockUpdateFlavorUseCase = { execute: jest.fn() };
    const mockDeleteFlavorUseCase = { execute: jest.fn() };
    const mockCreateFlavorUseCase = { execute: jest.fn() };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FlavorController],
            providers: [
                {
                    provide: UsecasesProxyModule.GET_FLAVOR_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockGetFlavorUseCase),
                },
                {
                    provide: UsecasesProxyModule.GET_FLAVORS_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockGetFlavorsUseCase),
                },
                {
                    provide: UsecasesProxyModule.PUT_FLAVOR_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockUpdateFlavorUseCase),
                },
                {
                    provide: UsecasesProxyModule.DELETE_FLAVOR_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockDeleteFlavorUseCase),
                },
                {
                    provide: UsecasesProxyModule.POST_FLAVOR_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockCreateFlavorUseCase),
                },
            ],
        }).compile();

        controller = module.get<FlavorController>(FlavorController);
    });

    describe('getFlavor', () => {
        it('should return a flavor by id', async () => {
            const flavorId = 1;
            const flavor = { id: 1, name: 'Margherita', additional_time: 15 };
            mockGetFlavorUseCase.execute.mockResolvedValue(flavor);

            const result = await controller.getFlavor(flavorId);

            expect(result).toBeInstanceOf(FlavorPresenter);
            expect(result.id).toBe(flavorId);
            expect(mockGetFlavorUseCase.execute).toHaveBeenCalledWith(flavorId);
        });
    });

    describe('getFlavors', () => {
        it('should return all flavors', async () => {
            const flavors = [
                { id: 1, name: 'Margherita', additional_time: 15 },
                { id: 2, name: 'Pepperoni', additional_time: 20 },
            ];
            mockGetFlavorsUseCase.execute.mockResolvedValue(flavors);

            const result = await controller.getFlavors();

            expect(result.length).toBe(2);
            expect(result[0]).toBeInstanceOf(FlavorPresenter);
            expect(mockGetFlavorsUseCase.execute).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateFlavor', () => {
        it('should update a flavor', async () => {
            const updateFlavorDto: UpdateFlavorDto = { id: 1, name: 'New Flavor', additional_time: 25 };
            mockUpdateFlavorUseCase.execute.mockResolvedValue(undefined);

            const result = await controller.updateFlavor(updateFlavorDto);

            expect(result).toBe('success');
            expect(mockUpdateFlavorUseCase.execute).toHaveBeenCalledWith(1, 'New Flavor', 25);
        });
    });

    describe('deleteFlavor', () => {
        it('should delete a flavor', async () => {
            const flavorId = 1;
            mockDeleteFlavorUseCase.execute.mockResolvedValue(undefined);

            const result = await controller.deleteFlavor(flavorId);

            expect(result).toBe('success');
            expect(mockDeleteFlavorUseCase.execute).toHaveBeenCalledWith(flavorId);
        });
    });

    describe('createFlavor', () => {
        it('should create a new flavor', async () => {
            const createFlavorDto: CreateFlavorDto = { name: 'Veggie', additional_time: 10 };
            const flavorCreated = { id: 1, ...createFlavorDto };
            mockCreateFlavorUseCase.execute.mockResolvedValue(flavorCreated);

            const result = await controller.createFlavor(createFlavorDto);

            expect(result).toBeInstanceOf(FlavorPresenter);
            expect(result.id).toBe(1);
            expect(mockCreateFlavorUseCase.execute).toHaveBeenCalledWith('Veggie', 10);
        });
    });
});

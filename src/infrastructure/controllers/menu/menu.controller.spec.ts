import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { UseCaseProxy } from '../../../infrastructure/usecases-proxy/usecases-proxy';
import { MenuPresenter } from './menu.presenter';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';
import { getFlavorsUseCases } from '../../../usecases/flavor/getFlavors.usecases';
import { getAdditionalsUseCases } from '../../../usecases/additional/getAdditionals.usecases';
import { getSizesUseCases } from '../../../usecases/size/getSizes.usecases';

describe('MenuController', () => {
    let controller: MenuController;
    const mockGetFlavorsUseCase = { execute: jest.fn() };
    const mockGetAdditionalsUseCase = { execute: jest.fn() };
    const mockGetSizesUseCase = { execute: jest.fn() };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MenuController],
            providers: [
                {
                    provide: UsecasesProxyModule.GET_FLAVORS_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockGetFlavorsUseCase),
                },
                {
                    provide: UsecasesProxyModule.GET_ADDITIONALS_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockGetAdditionalsUseCase),
                },
                {
                    provide: UsecasesProxyModule.GET_SIZES_USECASES_PROXY,
                    useValue: new UseCaseProxy(mockGetSizesUseCase),
                },
            ],
        }).compile();

        controller = module.get<MenuController>(MenuController);
    });

    describe('getMenus', () => {
        it('should return the menu data with flavors, additionals, and sizes', async () => {
            const mockFlavors = [{ id: 1, name: 'Margherita' }];
            const mockAdditionals = [{ id: 1, name: 'Cheese' }];
            const mockSizes = [{ id: 1, name: 'Small' }];

            mockGetFlavorsUseCase.execute.mockResolvedValue(mockFlavors);
            mockGetAdditionalsUseCase.execute.mockResolvedValue(mockAdditionals);
            mockGetSizesUseCase.execute.mockResolvedValue(mockSizes);

            const result = await controller.getMenus();

            expect(result).toBeInstanceOf(MenuPresenter);
            expect(result.flavors).toEqual(mockFlavors);
            expect(result.additionals).toEqual(mockAdditionals);
            expect(result.sizes).toEqual(mockSizes);

            expect(mockGetFlavorsUseCase.execute).toHaveBeenCalledTimes(1);
            expect(mockGetAdditionalsUseCase.execute).toHaveBeenCalledTimes(1);
            expect(mockGetSizesUseCase.execute).toHaveBeenCalledTimes(1);
        });
    });
});

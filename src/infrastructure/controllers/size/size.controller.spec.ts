import { Test, TestingModule } from '@nestjs/testing';
import { SizeController } from './size.controller';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { SizePresenter } from './size.presenter';
import { UsecasesProxyModule } from '../../../infrastructure/usecases-proxy/usecases-proxy.module';

const mockGetSizeUseCase = { execute: jest.fn() };
const mockGetSizesUseCase = { execute: jest.fn() };
const mockUpdateSizeUseCase = { execute: jest.fn() };
const mockDeleteSizeUseCase = { execute: jest.fn() };
const mockCreateSizeUseCase = { execute: jest.fn() };

describe('SizeController', () => {
    let controller: SizeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [SizeController],
          providers: [
            {
              provide: UsecasesProxyModule.GET_SIZE_USECASES_PROXY,
              useValue: new UseCaseProxy(mockGetSizeUseCase),
            },
            {
              provide: UsecasesProxyModule.GET_SIZES_USECASES_PROXY,
              useValue: new UseCaseProxy(mockGetSizesUseCase),
            },
            {
              provide: UsecasesProxyModule.PUT_SIZE_USECASES_PROXY,
              useValue: new UseCaseProxy(mockUpdateSizeUseCase),
            },
            {
              provide: UsecasesProxyModule.DELETE_SIZE_USECASES_PROXY,
              useValue: new UseCaseProxy(mockDeleteSizeUseCase),
            },
            {
              provide: UsecasesProxyModule.POST_SIZE_USECASES_PROXY,
              useValue: new UseCaseProxy(mockCreateSizeUseCase),
            },
          ],
        }).compile();
    
        controller = module.get<SizeController>(SizeController);
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });

    describe('getSize', () => {
        it('should return a size', async () => {
            const mockSize = { id: 1, name: 'Small', price: 100 };
            mockGetSizeUseCase.execute.mockResolvedValue(mockSize);

            const result = await controller.getSize(1);
            expect(result).toEqual(new SizePresenter(mockSize));
            expect(mockGetSizeUseCase.execute).toHaveBeenCalledWith(1);
        });
    });

    describe('getSizes', () => {
        it('should return a list of sizes', async () => {
            const mockSizes = [
                { id: 1, name: 'Small', price: 100, createdAt: null, updatedAt: null },
                { id: 2, name: 'Large', price: 200, createdAt: null, updatedAt: null },
            ];
            mockGetSizesUseCase.execute.mockResolvedValue(mockSizes);

            const result = await controller.getSizes();
            expect(result).toEqual(mockSizes.map((size) => new SizePresenter(size)));
            expect(mockGetSizesUseCase.execute).toHaveBeenCalled();
        });
    });

    describe('updateSize', () => {
        it('should update a size and return success', async () => {
            mockUpdateSizeUseCase.execute.mockResolvedValue(undefined);

            const updateSizeDto = { id: 1, name: 'Medium', price: 150 };
            const result = await controller.updateSize(updateSizeDto);

            expect(result).toBe('success');
            expect(mockUpdateSizeUseCase.execute).toHaveBeenCalledWith(1, 'Medium', 150);
        });
    });

    describe('deleteSize', () => {
        it('should delete a size and return success', async () => {
            mockDeleteSizeUseCase.execute.mockResolvedValue(undefined);

            const result = await controller.deleteSize(1);

            expect(result).toBe('success');
            expect(mockDeleteSizeUseCase.execute).toHaveBeenCalledWith(1);
        });
    });

    describe('createSize', () => {
        it('should create a size and return it', async () => {
            const mockSize = { id: 1, name: 'Small', price: 100 };
            mockCreateSizeUseCase.execute.mockResolvedValue(mockSize);

            const createSizeDto = { name: 'Small', price: 100 };
            const result = await controller.createSize(createSizeDto);

            expect(result).toEqual(new SizePresenter(mockSize));
            expect(mockCreateSizeUseCase.execute).toHaveBeenCalledWith('Small', 100);
        });
    });
});

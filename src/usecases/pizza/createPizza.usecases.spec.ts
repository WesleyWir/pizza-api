import { createPizzaUseCases } from './createPizza.usecases';
import { ILogger } from '../../domain/logger/logger.interface';
import { PizzaModel } from '../../domain/models/pizza';
import { PizzaRepository } from '../../domain/repositories/PizzaRepository.interface';
import { SizeRepository } from '../../domain/repositories/SizeRepository.interface';
import { FlavorRepository } from '../../domain/repositories/FlavorRepository.interface';
import { AdditionalRepository } from '../../domain/repositories/AdditionalRepository.interface';

// Mock dependencies
const mockLogger: jest.Mocked<ILogger> = {
    log: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    verbose: jest.fn(),
};

const mockPizzaRepository: jest.Mocked<PizzaRepository> = {
    create: jest.fn(),
    findById: jest.fn(),
};

const mockSizeRepository: jest.Mocked<SizeRepository> = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    deleteById: jest.fn(),
};

const mockFlavorRepository: jest.Mocked<FlavorRepository> = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    deleteById: jest.fn(),
};

const mockAdditionalRepository: jest.Mocked<AdditionalRepository> = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    deleteById: jest.fn(),
};

describe('createPizzaUseCases', () => {
    let createPizza: createPizzaUseCases;

    beforeEach(() => {
        createPizza = new createPizzaUseCases(
            mockLogger,
            mockPizzaRepository,
            mockSizeRepository,
            mockFlavorRepository,
            mockAdditionalRepository
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a pizza with the correct price and preparation time', async () => {
        const mockPizza = new PizzaModel();
        mockPizza.sizeId = 1;
        mockPizza.flavorId = 2;
        mockPizza.additional_ids = [3, 4];

        const mockSize = { id: 1, name: 'Medium', price: 10, preparationTime: 15 };
        const mockFlavor = { id: 2, name: 'Pepperoni', additionalTime: 5 };
        const mockAdditional1 = { id: 3, name: 'Extra Bacon', additionalPrice: 2, additionalTime: 3 };
        const mockAdditional2 = { id: 4, name: 'Olives', additionalPrice: 3, additionalTime: 2 };

        mockPizza.price = mockSize.price + mockAdditional1.additionalPrice + mockAdditional2.additionalPrice;
        mockPizza.preparationTime = mockSize.preparationTime + mockFlavor.additionalTime + mockAdditional1.additionalTime + mockAdditional2.additionalTime;

        mockSizeRepository.findById.mockResolvedValue(mockSize);
        mockFlavorRepository.findById.mockResolvedValue(mockFlavor);
        mockAdditionalRepository.findById.mockResolvedValueOnce(mockAdditional1);
        mockAdditionalRepository.findById.mockResolvedValueOnce(mockAdditional2);
        mockPizzaRepository.create.mockResolvedValue(mockPizza);

        const result = await createPizza.execute(mockPizza);

        expect(result.price).toBe(15); // 10 (size) + 2 + 3 (additionals)
        expect(result.preparationTime).toBe(25); // 15 (size) + 5 (flavor) + 3 + 2 (additionals)

        expect(mockSizeRepository.findById).toHaveBeenCalledWith(1);
        expect(mockFlavorRepository.findById).toHaveBeenCalledWith(2);
        expect(mockAdditionalRepository.findById).toHaveBeenCalledWith(3);
        expect(mockAdditionalRepository.findById).toHaveBeenCalledWith(4);
        expect(mockPizzaRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            size: mockSize,
            flavor: mockFlavor,
            additionals: [mockAdditional1, mockAdditional2],
            price: 15,
            preparationTime: 25,
        }));

        expect(mockLogger.log).toHaveBeenCalledWith('createPizzaUseCases execute', 'New pizza have been created');
    });

    it('should handle missing size gracefully', async () => {
        mockSizeRepository.findById.mockResolvedValue(null);

        const mockPizza = new PizzaModel();
        mockPizza.sizeId = 1;

        await expect(createPizza.execute(mockPizza)).rejects.toThrow('Size not found');
        expect(mockSizeRepository.findById).toHaveBeenCalledWith(1);
    });

    it('should handle missing flavor gracefully', async () => {
        const mockSize = { id: 1, name: 'Medium', price: 10, preparationTime: 15 };
        mockSizeRepository.findById.mockResolvedValue(mockSize);
        mockFlavorRepository.findById.mockResolvedValue(null);

        const mockPizza = new PizzaModel();
        mockPizza.sizeId = 1;
        mockPizza.flavorId = 2;

        await expect(createPizza.execute(mockPizza)).rejects.toThrow('Flavor not found');
        expect(mockSizeRepository.findById).toHaveBeenCalledWith(1);
        expect(mockFlavorRepository.findById).toHaveBeenCalledWith(2);
    });

    it('should handle invalid additional IDs gracefully', async () => {
        const mockSize = { id: 1, name: 'Medium', price: 10, preparationTime: 15 };
        const mockFlavor = { id: 2, name: 'Pepperoni', additionalTime: 5 };

        mockSizeRepository.findById.mockResolvedValue(mockSize);
        mockFlavorRepository.findById.mockResolvedValue(mockFlavor);
        mockAdditionalRepository.findById.mockResolvedValue(null);

        const mockPizza = new PizzaModel();
        mockPizza.sizeId = 1;
        mockPizza.flavorId = 2;
        mockPizza.additional_ids = [999];

        await expect(createPizza.execute(mockPizza)).rejects.toThrow('Additional not found');
        expect(mockAdditionalRepository.findById).toHaveBeenCalledWith(999);
    });
});
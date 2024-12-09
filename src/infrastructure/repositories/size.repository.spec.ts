import { DatabaseSizeRepository } from './size.repository';
import { SizeModel } from '../../domain/models/size';
import { Repository } from 'typeorm';
import { Size } from '../entities/size.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { InsertResult } from 'typeorm';

describe('DatabaseSizeRepository', () => {
  let repository: DatabaseSizeRepository;
  let mockSizeRepository: jest.Mocked<Repository<Size>>;

  beforeEach(async () => {
    mockSizeRepository = {
      insert: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      findOneOrFail: jest.fn(),
      delete: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Size>>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseSizeRepository,
        {
          provide: getRepositoryToken(Size),
          useValue: mockSizeRepository,
        },
      ],
    }).compile();

    repository = module.get<DatabaseSizeRepository>(DatabaseSizeRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a size', async () => {
    const newDate = new Date();
    const mockSize = new SizeModel();
    mockSize.id = 1;
    mockSize.name = 'Large';
    mockSize.price = 100;
    mockSize.createdAt = newDate;

    const sizeEntity = new Size();
    sizeEntity.id = 1;
    sizeEntity.name = 'Large';
    sizeEntity.price = 100;
    sizeEntity.createdAt = newDate;

    mockSizeRepository.save.mockResolvedValue(sizeEntity);

    const result = await repository.create(mockSize);
    expect(mockSizeRepository.save).toHaveBeenCalledWith(mockSize);
    expect(result).toEqual(mockSize);
  });

  it('should update a size', async () => {
    const mockSize = new SizeModel();
    mockSize.id = 1;
    mockSize.name = 'Large';
    mockSize.price = 100;
    mockSize.createdAt = new Date();

    await repository.update(1, mockSize);
    expect(mockSizeRepository.update).toHaveBeenCalledWith(
      { id: 1 },
      { ...mockSize },
    );
  });

  it('should return all sizes', async () => {
    const sizeEntity = new Size();
    sizeEntity.id = 1;
    sizeEntity.name = 'Small';
    sizeEntity.price = 50;
    sizeEntity.createdAt = new Date();

    mockSizeRepository.find.mockResolvedValue([sizeEntity]);

    const result = await repository.findAll();
    expect(mockSizeRepository.find).toHaveBeenCalled();
    expect(result).toEqual([
      expect.objectContaining({
        id: sizeEntity.id,
        name: sizeEntity.name,
        price: sizeEntity.price,
        createdAt: sizeEntity.createdAt,
      }),
    ]);
  });

  it('should return a size by ID', async () => {
    const sizeEntity = new Size();
    sizeEntity.id = 1;
    sizeEntity.name = 'Medium';
    sizeEntity.price = 75;
    sizeEntity.createdAt = new Date();

    mockSizeRepository.findOneOrFail.mockResolvedValue(sizeEntity);

    const result = await repository.findById(1);
    expect(mockSizeRepository.findOneOrFail).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(
      expect.objectContaining({
        id: sizeEntity.id,
        name: sizeEntity.name,
        price: sizeEntity.price,
        createdAt: sizeEntity.createdAt,
      }),
    );
  });

  it('should delete a size by ID', async () => {
    await repository.deleteById(1);
    expect(mockSizeRepository.delete).toHaveBeenCalledWith({ id: 1 });
  });
});

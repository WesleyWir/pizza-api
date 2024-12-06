import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SizeModel } from '../../domain/models/size';
import { SizeRepository } from '../../domain/repositories/SizeRepository.interface';
import { Size } from '../entities/size.entity';

@Injectable()
export class DatabaseSizeRepository implements SizeRepository {
  constructor(
    @InjectRepository(Size)
    private readonly sizeEntityRepository: Repository<Size>,
  ) {}

  async create(size: SizeModel): Promise<SizeModel> {
    const sizeEntity = size;
    const result = await this.sizeEntityRepository.insert(sizeEntity);
    return this.toSize(result.generatedMaps[0] as Size);
  }

  async update(id: number, size: SizeModel): Promise<void> {
    await this.sizeEntityRepository.update(
      {
        id: id,
      },
      { ...size },
    );
  }
  async findAll(): Promise<SizeModel[]> {
    const sizesEntity = await this.sizeEntityRepository.find();
    return sizesEntity.map((sizeEntity) => this.toSize(sizeEntity));
  }
  async findById(id: number): Promise<SizeModel> {
    const sizeEntity = await this.sizeEntityRepository.findOneOrFail({ where: { id } });
    return this.toSize(sizeEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.sizeEntityRepository.delete({ id: id });
  }

  private toSize(sizeEntity: Size): SizeModel {
    const size: SizeModel = new SizeModel();

    size.id = sizeEntity.id;
    size.name = sizeEntity.name;
    size.price = sizeEntity.price;
    size.createdAt = sizeEntity.createdAt;
    size.createdAt = sizeEntity.createdAt;

    return size;
  }
}
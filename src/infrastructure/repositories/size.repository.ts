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
  ) { }

  async create(size: SizeModel): Promise<SizeModel> {
    const sizeEntity = size;
    const result = await this.sizeEntityRepository.save(sizeEntity);
    return result;
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
    return sizesEntity.map((sizeEntity) => sizeEntity);
  }
  async findById(id: number): Promise<SizeModel> {
    const sizeEntity = await this.sizeEntityRepository.findOneOrFail({ where: { id } });
    return sizeEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.sizeEntityRepository.delete({ id: id });
  }
}
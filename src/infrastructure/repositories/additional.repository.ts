import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdditionalModel } from '../../domain/models/additional';
import { Additional } from '../entities/additional.entity';
import { AdditionalRepository } from '@/domain/repositories/AdditionalRepository.interface';

@Injectable()
export class DatabaseAdditionalRepository implements AdditionalRepository {
  constructor(
    @InjectRepository(Additional)
    private readonly additionalEntityRepository: Repository<Additional>,
  ) {}

  async create(additional: AdditionalModel): Promise<AdditionalModel> {
    const additionalEntity = additional;
    const result = await this.additionalEntityRepository.insert(additionalEntity);
    return result.generatedMaps[0] as Additional;
  }

  async update(id: number, additional: AdditionalModel): Promise<void> {
    await this.additionalEntityRepository.update(
      {
        id: id,
      },
      { ...additional },
    );
  }
  async findAll(): Promise<AdditionalModel[]> {
    const additionalsEntity = await this.additionalEntityRepository.find();
    return additionalsEntity.map((additionalEntity) => additionalEntity);
  }
  async findById(id: number): Promise<AdditionalModel> {
    const additionalEntity = await this.additionalEntityRepository.findOneOrFail({ where: { id } });
    return additionalEntity;
  }
  async deleteById(id: number): Promise<void> {
    await this.additionalEntityRepository.delete({ id: id });
  }
}
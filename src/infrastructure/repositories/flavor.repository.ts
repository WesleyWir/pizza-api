import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlavorModel } from '../../domain/models/flavor';
import { Flavor } from '../entities/flavor.entity';
import { FlavorRepository } from '../../domain/repositories/FlavorRepository.interface';

@Injectable()
export class DatabaseFlavorRepository implements FlavorRepository {
  constructor(
    @InjectRepository(Flavor)
    private readonly flavorEntityRepository: Repository<Flavor>,
  ) {}

  async create(flavor: FlavorModel): Promise<FlavorModel> {
    const flavorEntity = flavor;
    const result = await this.flavorEntityRepository.insert(flavorEntity);
    return result.generatedMaps[0] as Flavor;
  }

  async update(id: number, flavor: FlavorModel): Promise<void> {
    await this.flavorEntityRepository.update(
      {
        id: id,
      },
      { ...flavor },
    );
  }
  async findAll(): Promise<FlavorModel[]> {
    const flavorsEntity = await this.flavorEntityRepository.find();
    return flavorsEntity.map((flavorEntity) => flavorEntity);
  }
  async findById(id: number): Promise<FlavorModel> {
    return await this.flavorEntityRepository.findOneOrFail({ where: { id } });
  }
  async deleteById(id: number): Promise<void> {
    await this.flavorEntityRepository.delete({ id: id });
  }
}
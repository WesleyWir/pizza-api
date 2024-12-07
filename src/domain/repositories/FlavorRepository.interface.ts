import { FlavorModel } from '../models/flavor';

export interface FlavorRepository {
  create(flavor: FlavorModel): Promise<FlavorModel>;
  update(id: number, flavor: FlavorModel): Promise<void>;
  findAll(): Promise<FlavorModel[]>;
  findById(id: number): Promise<FlavorModel>;
  deleteById(id: number): Promise<void>;
}
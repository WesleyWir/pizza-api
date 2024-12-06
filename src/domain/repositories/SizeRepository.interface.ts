import { SizeModel } from '../models/size';

export interface SizeRepository {
  create(size: SizeModel): Promise<SizeModel>;
  update(id: number, size: SizeModel): Promise<void>;
  findAll(): Promise<SizeModel[]>;
  findById(id: number): Promise<SizeModel>;
  deleteById(id: number): Promise<void>;
}
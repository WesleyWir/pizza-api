import { AdditionalModel } from '../models/additional';

export interface AdditionalRepository {
  create(additional: AdditionalModel): Promise<AdditionalModel>;
  update(id: number, additional: AdditionalModel): Promise<void>;
  findAll(): Promise<AdditionalModel[]>;
  findById(id: number): Promise<AdditionalModel>;
  deleteById(id: number): Promise<void>;
}
import { AdditionalModel } from '../../domain/models/additional';
import { ILogger } from '../../domain/logger/logger.interface';
import { AdditionalRepository } from '../../domain/repositories/AdditionalRepository.interface';

export class updateAdditionalUseCases {
  constructor(private readonly logger: ILogger, private readonly additionalRepository: AdditionalRepository) {}

  async execute(id: number, name: string, additionalTime: number, additionalPrice: number): Promise<void> {
    const additional = new AdditionalModel();
    additional.name = name;
    additional.additionalTime = additionalTime;
    additional.additionalPrice = additionalPrice;
    await this.additionalRepository.update(id, additional);
    this.logger.log('updateAdditionalUseCases execute', `Additional ${id} have been updated`);
  }
}
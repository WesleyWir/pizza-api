import { ILogger } from '../../domain/logger/logger.interface';
import { AdditionalModel } from '../../domain/models/additional';
import { AdditionalRepository } from '../../domain/repositories/AdditionalRepository.interface';

export class createAdditionalUseCases {
  constructor(private readonly logger: ILogger, private readonly additionalRepository: AdditionalRepository) {}

  async execute(name: string, additionalTime: number, additionalPrice: number): Promise<AdditionalModel> {
    const additional = new AdditionalModel();
    additional.name = name;
    additional.additionalTime = additionalTime;
    additional.additionalPrice = additionalPrice;
    const result = await this.additionalRepository.create(additional);
    this.logger.log('addAdditionalUseCases execute', 'New additional have been inserted');
    return result;
  }
}
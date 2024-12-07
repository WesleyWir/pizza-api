import { ILogger } from '../../domain/logger/logger.interface';
import { AdditionalRepository } from '../../domain/repositories/AdditionalRepository.interface';

export class deleteAdditionalUseCases {
  constructor(private readonly logger: ILogger, private readonly additionalRepository: AdditionalRepository) {}

  async execute(id: number): Promise<void> {
    await this.additionalRepository.deleteById(id);
    this.logger.log('deleteAdditionalUseCases execute', `Additional ${id} have been deleted`);
  }
}
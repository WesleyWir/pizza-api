import { ILogger } from '../../domain/logger/logger.interface';
import { FlavorRepository } from '../../domain/repositories/FlavorRepository.interface';

export class deleteFlavorUseCases {
  constructor(private readonly logger: ILogger, private readonly flavorRepository: FlavorRepository) {}

  async execute(id: number): Promise<void> {
    await this.flavorRepository.deleteById(id);
    this.logger.log('deleteFlavorUseCases execute', `Flavor ${id} have been deleted`);
  }
}
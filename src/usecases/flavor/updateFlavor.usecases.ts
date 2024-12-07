import { FlavorModel } from '../../domain/models/flavor';
import { ILogger } from '../../domain/logger/logger.interface';
import { FlavorRepository } from '../../domain/repositories/FlavorRepository.interface';

export class updateFlavorUseCases {
  constructor(private readonly logger: ILogger, private readonly flavorRepository: FlavorRepository) {}

  async execute(id: number, name: string, additionalTime: number): Promise<void> {
    const flavor = new FlavorModel();
    flavor.name = name;
    flavor.additionalTime = additionalTime;
    await this.flavorRepository.update(id, flavor);
    this.logger.log('updateFlavorUseCases execute', `Flavor ${id} have been updated`);
  }
}
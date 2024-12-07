import { ILogger } from '../../domain/logger/logger.interface';
import { FlavorModel } from '../../domain/models/flavor';
import { FlavorRepository } from '../../domain/repositories/FlavorRepository.interface';

export class createFlavorUseCases {
  constructor(private readonly logger: ILogger, private readonly flavorRepository: FlavorRepository) {}

  async execute(name: string, additionalTime: number): Promise<FlavorModel> {
    const flavor = new FlavorModel();
    flavor.name = name;
    flavor.additionalTime = additionalTime;
    const result = await this.flavorRepository.create(flavor);
    this.logger.log('addFlavorUseCases execute', 'New flavor have been inserted');
    return result;
  }
}
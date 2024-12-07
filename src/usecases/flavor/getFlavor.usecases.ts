import { FlavorModel } from '../../domain/models/flavor';
import { FlavorRepository } from '../../domain/repositories/FlavorRepository.interface';

export class getFlavorUseCases {
    constructor(private readonly flavorRepository: FlavorRepository) { }

    async execute(id: number): Promise<FlavorModel> {
        return await this.flavorRepository.findById(id);
    }
}
import { FlavorModel } from '../../domain/models/flavor';
import { FlavorRepository } from '../../domain/repositories/FlavorRepository.interface';

export class getFlavorsUseCases {
    constructor(private readonly flavorRepository: FlavorRepository) { }

    async execute(): Promise<FlavorModel[]> {
        return await this.flavorRepository.findAll();
    }
}
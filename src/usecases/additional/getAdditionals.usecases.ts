import { AdditionalModel } from '../../domain/models/additional';
import { AdditionalRepository } from '../../domain/repositories/AdditionalRepository.interface';

export class getAdditionalsUseCases {
    constructor(private readonly additionalRepository: AdditionalRepository) { }

    async execute(): Promise<AdditionalModel[]> {
        return await this.additionalRepository.findAll();
    }
}
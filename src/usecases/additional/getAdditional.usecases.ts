import { AdditionalModel } from '../../domain/models/additional';
import { AdditionalRepository } from '../../domain/repositories/AdditionalRepository.interface';

export class getAdditionalUseCases {
    constructor(private readonly additionalRepository: AdditionalRepository) { }

    async execute(id: number): Promise<AdditionalModel> {
        return await this.additionalRepository.findById(id);
    }
}
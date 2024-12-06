import { SizeModel } from '../../domain/models/size';
import { SizeRepository } from '../../domain/repositories/SizeRepository.interface';

export class getSizesUseCases {
    constructor(private readonly sizeRepository: SizeRepository) { }

    async execute(): Promise<SizeModel[]> {
        return await this.sizeRepository.findAll();
    }
}
import { SizeModel } from '../../domain/models/size';
import { SizeRepository } from '../../domain/repositories/SizeRepository.interface';

export class GetSizeUseCases {
    constructor(private readonly sizeRepository: SizeRepository) { }

    async execute(id: number): Promise<SizeModel> {
        return await this.sizeRepository.findById(id);
    }
}
import { ILogger } from '../../domain/logger/logger.interface';
import { SizeRepository } from '../../domain/repositories/SizeRepository.interface';

export class deleteSizeUseCases {
  constructor(private readonly logger: ILogger, private readonly sizeRepository: SizeRepository) {}

  async execute(id: number): Promise<void> {
    await this.sizeRepository.deleteById(id);
    this.logger.log('deleteSizeUseCases execute', `Size ${id} have been deleted`);
  }
}
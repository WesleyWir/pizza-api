import { SizeModel } from '../../domain/models/size';
import { ILogger } from '../../domain/logger/logger.interface';
import { SizeRepository } from '../../domain/repositories/SizeRepository.interface';

export class updateSizeUseCases {
  constructor(private readonly logger: ILogger, private readonly sizeRepository: SizeRepository) { }

  async execute(id: number, name: string, price: number | null, preparationTime: number | null): Promise<void> {
    const size = new SizeModel();
    size.name = name;
    size.price = price;
    size.preparationTime = preparationTime;
    await this.sizeRepository.update(id, size);
    this.logger.log('updateSizeUseCases execute', `Size ${id} have been updated`);
  }
}
import { ILogger } from '../../domain/logger/logger.interface';
import { SizeModel } from '../../domain/models/size';
import { SizeRepository } from '../../domain/repositories/SizeRepository.interface';

export class createSizeUseCases {
  constructor(private readonly logger: ILogger, private readonly sizeRepository: SizeRepository) {}

  async execute(name: string, price: number|null, preparationTime: number|null): Promise<SizeModel> {
    const size = new SizeModel();
    size.name = name;
    size.price = price;
    size.preparationTime = preparationTime;
    const result = await this.sizeRepository.create(size);
    this.logger.log('addSizeUseCases execute', 'New size have been inserted');
    return result;
  }
}
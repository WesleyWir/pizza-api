import { SizeRepository } from '../../domain/repositories/SizeRepository.interface';
import { ILogger } from '../../domain/logger/logger.interface';
import { PizzaModel } from '../../domain/models/pizza';
import { PizzaRepository } from '../../domain/repositories/PizzaRepository.interface';
import { FlavorRepository } from '../../domain/repositories/FlavorRepository.interface';
import { AdditionalRepository } from '../../domain/repositories/AdditionalRepository.interface';

export class createPizzaUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly pizzaRepository: PizzaRepository,
    private readonly sizeRepository: SizeRepository,
    private readonly flavorRepository: FlavorRepository,
    private readonly additionalRepository: AdditionalRepository,
  ) { }

  async execute(pizza: PizzaModel): Promise<PizzaModel> {
    const newPizza = new PizzaModel();

    const size = await this.sizeRepository.findById(pizza.sizeId);
    const flavor = await this.flavorRepository.findById(pizza.flavorId);

    let price = size.price;
    let preparationTime = size.preparationTime;

    preparationTime += flavor.additionalTime;
    newPizza.size = size;
    newPizza.flavor = flavor;

    let additionals = [];
    const orderedAdditionals = Array.isArray(pizza.additional_ids) ? pizza.additional_ids : [];
    for (const additionalId of orderedAdditionals) {
      const additional = await this.additionalRepository.findById(additionalId);
      price += additional.additionalPrice;
      preparationTime += additional.additionalTime;
      additionals.push(additional);
    }
    newPizza.additionals = additionals;

    newPizza.price = price;
    newPizza.preparationTime = preparationTime;
    const result = await this.pizzaRepository.create(newPizza);
    this.logger.log('createPizzaUseCases execute', 'New pizza have been created');
    return result;
  }
}
import { Injectable } from "@nestjs/common";
import { SizeSeederService } from "./size/size.service";
import { LoggerService } from "@/infrastructure/logger/logger.service";
import { FlavorSeederService } from "./flavor/flavor.service";
import { AdditionalSeederService } from "./additionals/additional.service";

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: LoggerService,
    private readonly sizeSeederService: SizeSeederService,
    private readonly flavorSeederService: FlavorSeederService,
    private readonly additionalSeederService: AdditionalSeederService,
  ) { }
  async seed() {
    await this.sizes()
      .then(completed => {
        this.logger.debug('seed sizes', 'Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('seed sizes', 'Failed seeding users...');
        Promise.reject(error);
      });

    await this.flavors()
      .then(completed => {
        this.logger.debug('seed flavors', 'Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('seed flavors', 'Failed seeding users...');
        Promise.reject(error);
      });

    await this.additionals()
      .then(completed => {
        this.logger.debug('seed additionals', 'Successfuly completed seeding users...');
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('seed additionals', 'Failed seeding users...');
        Promise.reject(error);
      });
  }
  async sizes() {
    return await Promise.all(this.sizeSeederService.create())
      .then(createdSizes => {
        this.logger.debug(
          'sizes seed',
          'No. of sizes created : ' +
          createdSizes.filter(
            nullValueOrCreatedSize => nullValueOrCreatedSize,
          ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }

  async flavors() {
    return await Promise.all(this.flavorSeederService.create())
      .then(createdFlavors => {
        this.logger.debug(
          'flavors seed',
          'No. of flavors created : ' +
          createdFlavors.filter(
            nullValueOrCreatedFlavor => nullValueOrCreatedFlavor,
          ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }

  async additionals() {
    return await Promise.all(this.additionalSeederService.create())
      .then(createdAdditionals => {
        this.logger.debug(
          'additionals seed',
          'No. of additionals created : ' +
          createdAdditionals.filter(
            nullValueOrCreatedAdditional => nullValueOrCreatedAdditional,
          ).length,
        );
        return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}
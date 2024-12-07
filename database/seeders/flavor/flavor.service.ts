import { UseCaseProxy } from "@/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "@/infrastructure/usecases-proxy/usecases-proxy.module";
import { createFlavorUseCases } from "@/usecases/flavor/createFlavor.usecases";
import { Inject, Injectable } from "@nestjs/common";
import { flavors } from "./data";
import { FlavorModel } from "@/domain/models/flavor";
import { IFlavor } from "../interfaces/IFlavor";

@Injectable()
export class FlavorSeederService {
    constructor(
        @Inject(UsecasesProxyModule.POST_FLAVOR_USECASES_PROXY)
        private readonly createFlavorUsecaseProxy: UseCaseProxy<createFlavorUseCases>,
    ) { }

    create(): Array<Promise<FlavorModel>> {
        return flavors.map(async (flavor: IFlavor) => {
            const { name, additionalTime } = flavor;
            return await this.createFlavorUsecaseProxy.getInstance().execute(name, additionalTime);
        });
    }
}
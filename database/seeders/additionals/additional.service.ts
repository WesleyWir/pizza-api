import { UseCaseProxy } from "@/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "@/infrastructure/usecases-proxy/usecases-proxy.module";
import { createAdditionalUseCases } from "@/usecases/additional/createAdditional.usecases";
import { Inject, Injectable } from "@nestjs/common";
import { additionals } from "./data";
import { AdditionalModel } from "@/domain/models/additional";
import { IAdditional } from "../interfaces/IAdditional";

@Injectable()
export class AdditionalSeederService {
    constructor(
        @Inject(UsecasesProxyModule.POST_ADDITIONAL_USECASES_PROXY)
        private readonly createAdditionalUsecaseProxy: UseCaseProxy<createAdditionalUseCases>,
    ) { }

    create(): Array<Promise<AdditionalModel>> {
        return additionals.map(async (additional: IAdditional) => {
            const { name, additionalTime, additionalPrice } = additional;
            return await this.createAdditionalUsecaseProxy.getInstance().execute(name, additionalTime, additionalPrice);
        });
    }
}
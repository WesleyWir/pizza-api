import { UseCaseProxy } from "@/infrastructure/usecases-proxy/usecases-proxy";
import { UsecasesProxyModule } from "@/infrastructure/usecases-proxy/usecases-proxy.module";
import { createSizeUseCases } from "@/usecases/size/createSize.usecases";
import { Inject, Injectable } from "@nestjs/common";
import { sizes } from "./data";
import { SizeModel } from "@/domain/models/size";
import { ISize } from "../interfaces/ISize";

@Injectable()
export class SizeSeederService {
    constructor(
        @Inject(UsecasesProxyModule.POST_SIZE_USECASES_PROXY)
        private readonly createSizeUsecaseProxy: UseCaseProxy<createSizeUseCases>,
    ) { }

    create(): Array<Promise<SizeModel>> {
        return sizes.map(async (size: ISize) => {
            const { name, price } = size;
            return await this.createSizeUsecaseProxy.getInstance().execute(name, price);
        });
    }
}
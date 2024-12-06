import { DynamicModule, Module } from '@nestjs/common';
import { createSizeUseCases } from '../../usecases/size/createSize.usecases';
import { deleteSizeUseCases } from '../../usecases/size/deleteSize.usecases';
import { GetSizeUseCases } from '../../usecases/size/getSize.usecases';
import { getSizesUseCases } from '../../usecases/size/getSizes.usecases';
import { updateSizeUseCases } from '../../usecases/size/updateSize.usecases';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseSizeRepository } from '../repositories/size.repository';
import { UseCaseProxy } from './usecases-proxy';

@Module({
    imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
    static GET_SIZE_USECASES_PROXY = 'getSizeUsecasesProxy';
    static GET_SIZES_USECASES_PROXY = 'getSizesUsecasesProxy';
    static POST_SIZE_USECASES_PROXY = 'postSizeUsecasesProxy';
    static DELETE_SIZE_USECASES_PROXY = 'deleteSizeUsecasesProxy';
    static PUT_SIZE_USECASES_PROXY = 'putSizeUsecasesProxy';

    static register(): DynamicModule {
        return {
            module: UsecasesProxyModule,
            providers: [
                {
                    inject: [DatabaseSizeRepository],
                    provide: UsecasesProxyModule.GET_SIZE_USECASES_PROXY,
                    useFactory: (sizeRepository: DatabaseSizeRepository) => new UseCaseProxy(new GetSizeUseCases(sizeRepository)),
                },
                {
                    inject: [DatabaseSizeRepository],
                    provide: UsecasesProxyModule.GET_SIZES_USECASES_PROXY,
                    useFactory: (sizeRepository: DatabaseSizeRepository) =>
                        new UseCaseProxy(new getSizesUseCases(sizeRepository)),
                },
                {
                    inject: [LoggerService, DatabaseSizeRepository],
                    provide: UsecasesProxyModule.POST_SIZE_USECASES_PROXY,
                    useFactory: (logger: LoggerService, sizeRepository: DatabaseSizeRepository) =>
                        new UseCaseProxy(new createSizeUseCases(logger, sizeRepository)),
                },
                {
                    inject: [LoggerService, DatabaseSizeRepository],
                    provide: UsecasesProxyModule.PUT_SIZE_USECASES_PROXY,
                    useFactory: (logger: LoggerService, sizeRepository: DatabaseSizeRepository) =>
                        new UseCaseProxy(new updateSizeUseCases(logger, sizeRepository)),
                },
                {
                    inject: [LoggerService, DatabaseSizeRepository],
                    provide: UsecasesProxyModule.DELETE_SIZE_USECASES_PROXY,
                    useFactory: (logger: LoggerService, sizeRepository: DatabaseSizeRepository) =>
                        new UseCaseProxy(new deleteSizeUseCases(logger, sizeRepository)),
                },
            ],
            exports: [
                UsecasesProxyModule.GET_SIZE_USECASES_PROXY,
                UsecasesProxyModule.GET_SIZES_USECASES_PROXY,
                UsecasesProxyModule.POST_SIZE_USECASES_PROXY,
                UsecasesProxyModule.PUT_SIZE_USECASES_PROXY,
                UsecasesProxyModule.DELETE_SIZE_USECASES_PROXY,
            ],
        };
    }
}
import { PizzaModel } from '../../../domain/models/pizza';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class StoreOrderDto {
    @ApiProperty({ required: false })
    readonly observation: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly pizzas: PizzaModel[];
}
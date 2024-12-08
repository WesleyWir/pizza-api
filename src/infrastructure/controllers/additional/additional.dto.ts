import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateAdditionalDto {
    @ApiProperty({
        required: true,
        example: 1,
        description: 'The unique identifier of the additional item.',
    })
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty({
        required: true,
        example: 'Olives',
        description: 'The name of the additional item.',
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        required: false,
        example: 10,
        description: 'The additional time (in minutes) required for this item.',
    })
    @IsOptional()
    @IsNumber()
    readonly additionalTime: number;

    @ApiProperty({
        required: false,
        example: 3,
        description: 'The additional price for this item.',
    })
    @IsOptional()
    @IsNumber()
    readonly additionalPrice: number;
}

export class CreateAdditionalDto {
    @ApiProperty({
        required: true,
        example: 'Olives',
        description: 'The name of the additional item.',
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        required: false,
        example: 10,
        description: 'The additional time (in minutes) required for this item.',
    })
    @IsOptional()
    @IsNumber()
    readonly additionalTime: number;

    @ApiProperty({
        required: false,
        example: 3,
        description: 'The additional price for this item.',
    })
    @IsOptional()
    @IsNumber()
    readonly additionalPrice: number;
}

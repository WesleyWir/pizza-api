import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSizeDto {
    @ApiProperty({
        required: true,
        example: 1,
        description: 'The unique identifier of the size.',
    })
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty({
        required: true,
        example: 'Medium',
        description: 'The name of the size.',
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        required: true,
        example: 10.0,
        description: 'The price of the size.',
    })
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty({
        required: true,
        example: 10,
        description: 'The preparation time (in minutes) required for this size.',
    })
    @IsNotEmpty()
    readonly preparation_time: number;
}

export class CreateSizeDto {
    @ApiProperty({
        required: true,
        example: 'Large',
        description: 'The name of the size.',
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        required: true,
        example: 12.0,
        description: 'The price of the size.',
    })
    @IsNotEmpty()
    readonly price: number;

    @ApiProperty({
        required: true,
        example: 10,
        description: 'The preparation time (in minutes) required for this size',
    })
    @IsNotEmpty()
    readonly preparation_time: number;
}

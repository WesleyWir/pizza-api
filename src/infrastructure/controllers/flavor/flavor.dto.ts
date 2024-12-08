import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFlavorDto {
    @ApiProperty({
        required: true,
        example: 1,
        description: 'The unique identifier of the flavor.',
    })
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty({
        required: true,
        example: 'Margherita',
        description: 'The name of the flavor.',
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        required: true,
        example: 5,
        description: 'The additional time (in minutes) required for this flavor.',
    })
    @IsNotEmpty()
    readonly additional_time: number;
}

export class CreateFlavorDto {
    @ApiProperty({
        required: true,
        example: 'Pepperoni',
        description: 'The name of the flavor.',
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        required: true,
        example: 7,
        description: 'The additional time (in minutes) required for this flavor.',
    })
    @IsNotEmpty()
    readonly additional_time: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAdditionalDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({ required: false })
    @IsNotEmpty()
    readonly additionalTime: number
    @ApiProperty({ required: false })
    @IsNotEmpty()
    readonly additionalPrice: number;
}

export class CreateAdditionalDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({ required: false })
    @IsNotEmpty()
    readonly additionalTime: number;
    @ApiProperty({ required: false })
    @IsNotEmpty()
    readonly additionalPrice: number;
}
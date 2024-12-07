import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFlavorDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly additionalTime: number;
}

export class CreateFlavorDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly additionalTime: number;
}
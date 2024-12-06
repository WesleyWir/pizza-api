import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSizeDto {
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
    readonly price: number;
}

export class CreateSizeDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly price: number;
}
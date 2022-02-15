import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMesaDto {


    @IsBoolean()
    @ApiProperty()
    livre: boolean;

    @IsString()
    @ApiProperty()
    descricao: string;
}
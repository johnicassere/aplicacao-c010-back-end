import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsArray } from "class-validator";


export class CriarMesaDto{

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    numeroMesa: number;


    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    livre: true;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    imagem: string;


    @ApiProperty()
    @IsString()
    descricao: string;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty()
    menus: number[];

}
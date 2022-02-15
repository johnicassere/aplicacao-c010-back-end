import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    sobreNome: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    senha: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    confirmacaoSenha: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    imagem: string;
}
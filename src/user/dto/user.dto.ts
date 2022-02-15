import { IsString, IsNotEmpty, IsEmail, IsUrl, IsDate } from "class-validator";

export class UserDto {

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    sobreNome: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    imagem: string;

    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
}
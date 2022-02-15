import { IsString, IsNotEmpty, IsEmail, IsOptional, IsUrl} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    sobreNome: string;

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @IsOptional()
    @ApiProperty()
    imagem: string;
}
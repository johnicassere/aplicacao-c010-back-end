import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginInputDto } from './dto/login-input.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';





@Injectable()
export class AuthService {
constructor(private prismaService: PrismaService, private jwtService: JwtService ){}

async login(loginInputDto: LoginInputDto){
    const { email, senha } = loginInputDto;
    const userExists = await this.prismaService.user.findUnique({
        where: { email : loginInputDto.email }
    });

    if(!userExists){
        throw new NotFoundException('Usuario não encontrado');
    }

    const isHashalid = await bcrypt.compare(senha, userExists.senha);

    if(!isHashalid){
        throw new UnauthorizedException('Credenciais invalidas');
    }

    delete userExists.senha;

    return {
        token: this.jwtService.sign({ email }),
        user: userExists,
    };
}

}

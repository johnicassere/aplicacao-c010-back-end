import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService){}

  async create(createUserDto: CreateUserDto): Promise<User>{
        const userEmailExists = await this.prismaService.user.findUnique({
            where: { email: createUserDto.email},
        });

        if(userEmailExists){
            throw new ConflictException('Email ja Cadastrado')
        }

        if(createUserDto.senha !== createUserDto.confirmacaoSenha){
            throw new ConflictException('Senhas não conferem');
        }

        delete createUserDto.confirmacaoSenha;

        const hashedSenha = await bcrypt.hash(createUserDto.senha, 10);

        const criarUser = await this.prismaService.user.create({
            data: {
                ...createUserDto,
                senha: hashedSenha,
            },
        });

        delete criarUser.senha;
        return criarUser;
    }

   async findMany(): Promise<UserDto[]>{
    const users = await this.prismaService.user.findMany({
        select: {
            id: true,
            email: true,
            nome: true,
            sobreNome: true,
            imagem: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return users;
    }

   async findUnique(userId: string ): Promise<User>{
    const userFinded = await this.prismaService.user.findUnique({
        where: { id: userId }
    });

    if(!userFinded){
        throw new NotFoundException('Usuario não encontrado')
    }
    delete userFinded.senha;
    return userFinded;
    }


   async update(userId: string, updateUserDto: UpdateUserDto): Promise<User>{
    const userFinded = await this.prismaService.user.findUnique({
        where: { id: userId}
    });

    if(!userFinded){
        throw new NotFoundException('Usuario não encontrado')
    }

    if(updateUserDto.email){
        const userEmailExists = await this.prismaService.user.findUnique({
            where: { email: updateUserDto.email}
        });

        if(userEmailExists){
            throw new NotFoundException('Email já cadastrado');
        }
    }

    const updateUser = await this.prismaService.user.update({
        where: { id: userId},
        data: {
            email: updateUserDto.email,
            nome: updateUserDto.nome,
            sobreNome: updateUserDto.sobreNome,
            imagem: updateUserDto.imagem,
        },
    });
      
    delete updateUser.senha   
    return updateUser;
}
    

    async delete(userId: string){
        const userFinded = await this.prismaService.user.findUnique({
            where: { id: userId}
        });

        if(!userFinded){
            throw new NotFoundException('Usuario não encontrado')
        }

        const deleteUser = await this.prismaService.user.delete({
            where: {
                id: userId
            }
        });

        delete deleteUser.senha;
        return deleteUser;
    }
}

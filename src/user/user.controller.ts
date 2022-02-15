import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um usuário',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User>{
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Ler todos os usuários',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findMany(): Promise<UserDto[]>{
    return this.userService.findMany();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Ler um usuário'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findUnique(@Param('id') userId: string): Promise<User>{
    return this.userService.findUnique(userId);
  }

  @Patch()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Alterar seu próprio usuário'
  })
  @ApiBearerAuth()
  update(@LoggedUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<User>{
    return this.userService.update(user.id, updateUserDto)
  }

  @Delete()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Deletar seu próprio usuário',
  })
  @ApiBearerAuth()
  delee(@LoggedUser() user: User){
    return this.userService.delete(user.id);
  }
}

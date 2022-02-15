import { Controller, Body, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { LoggedUser } from './logged-user.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Post()
@ApiOperation({
  summary: 'Fazer Login'
})

login(@Body() loginInputDto: LoginInputDto): Promise<LoginResponseDto>{
  return this.authService.login(loginInputDto)
}

@Get()
@UseGuards(AuthGuard())
@ApiOperation({
  summary: 'Perfil do usuario Logado'
})
@ApiBearerAuth()
me(@LoggedUser() user: User){
  return user;
}

}


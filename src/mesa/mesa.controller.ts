import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Mesa } from '@prisma/client';
import { CriarMesaDto } from './dto/criar-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { MesaService } from './mesa.service';
import { AuthGuard } from '@nestjs/passport';




@ApiTags('mesa')
@Controller('mesa')
export class MesaController {
  constructor(private readonly mesaService: MesaService) {}

@Post()
@ApiOperation({
  summary: 'Criar uma mesa'
})
create(@Body() criarMesaDto: CriarMesaDto, userId: string){
  return this.mesaService.create(criarMesaDto, userId)
}

@Get()
@ApiOperation({
  summary: 'Listar todas as mesas',
})
@ApiBearerAuth()
@UseGuards(AuthGuard())
findMany(): Promise<Mesa[]>{
  return this.mesaService.findMany()
}

@Get(':id')
@ApiOperation({
  summary: 'Listar uma mesa',
})
@ApiBearerAuth()
@UseGuards(AuthGuard())
findUnique(@Param('id') userId: string): Promise<Mesa>{
return this.mesaService.findUnique(userId);
}

@Patch(':id')
@ApiOperation({
  summary: 'Alterar os dados da mesa'
})
@ApiBearerAuth()
@UseGuards(AuthGuard())
update(@Param('id') userId: string, @Body() updateMesaDto: UpdateMesaDto): Promise<Mesa>{
return this.mesaService.update(userId, updateMesaDto)
}

@Delete(':id')
@ApiOperation({
  summary: 'Fechar uma mesa'
})
@ApiBearerAuth()
@UseGuards(AuthGuard())
delete(@Param('id') mesaId: string): Promise<Mesa>{
  return this.mesaService.delete(mesaId)
}


}

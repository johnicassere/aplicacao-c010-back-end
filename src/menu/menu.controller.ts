import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { MenuService } from './menu.service';
import { CriarMenuDto } from './dto/criar-menu.dto';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { AuthGuard } from '@nestjs/passport';



@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

 @Post()
 @ApiOperation({
   summary: 'Criar um menu'
 })
 create(@Body() criarMenuDto: CriarMenuDto){
   return this.menuService.create(criarMenuDto)
 }

 @Get()
 @ApiOperation({
   summary: 'Listar todos menus'
 })
 @ApiBearerAuth()
 @UseGuards(AuthGuard())
 findMany(){
   return this.menuService.findMany();
 }

 @Get(':id')
 @ApiOperation({
   summary: 'Lista um unico menu'
 })
 @ApiBearerAuth()
 @UseGuards(AuthGuard())
 findUnique(@Param('id') menuId: string){
  return this.menuService.findUnique(menuId)
 }

 @Patch(':id')
 @ApiOperation({
   summary: 'Atualizar menu'
 })
 @ApiBearerAuth()
 @UseGuards(AuthGuard())
update(@Param('id') menuId: string, @Body() updateMenuDto: UpdateMenuDto): Promise<Menu>{
return this.menuService.update(menuId, updateMenuDto);
}

@Delete(':id')
@ApiOperation({
  summary: 'Deletar Menu'
})
@ApiBearerAuth()
@UseGuards(AuthGuard())
delete(@Param('id') menuId: string): Promise<Menu>{
  return this.menuService.delete(menuId);
}

}

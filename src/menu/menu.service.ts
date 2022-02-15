import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CriarMenuDto } from './dto/criar-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';


@Injectable()
export class MenuService {
    constructor(private prismaService: PrismaService){}

  async create(criarMenuDto: CriarMenuDto): Promise<Menu>{
    
    const createdMenu = await this.prismaService.menu.create({
        data: {
            nome: criarMenuDto.nome,
            item: criarMenuDto.item,
            tamanho: criarMenuDto.tamanho,
            imagem: criarMenuDto.imagem,
            preco: criarMenuDto.preco,
            observacao: criarMenuDto.observacao,
        }
    })
    return createdMenu;
   }

  async findMany(){
       const menus = await this.prismaService.menu.findMany({
           select: {
               id: true,
               nome: true,
               item:true,
               tamanho: true,
               preco: true,
               imagem: true,
               observacao: true,
           }
       })
       return menus;
   }

   async findUnique(menuId: string){
    const menuFinded = await this.prismaService.menu.findUnique({
        where: { id: menuId }
    });
    if(!menuFinded){
        throw new NotFoundException('Menu nao encontrado');
    }
    return menuFinded;
   }



async update(menuId: string, updateMenuDto: UpdateMenuDto): Promise<Menu>{
const menuFinded = await this.prismaService.menu.findUnique({
    where: { id: menuId }
});

if(!menuFinded){
throw new ConflictException('Menu nao existe');
}
const updateMenu = await this.prismaService.menu.update({
    where: { id: menuId },
    data: { 
            nome: updateMenuDto.nome,
            item: updateMenuDto.item,
            tamanho: updateMenuDto.tamanho,
            imagem: updateMenuDto.imagem,
            preco: updateMenuDto.preco,   
    }
})

return updateMenu;
}

async delete(menuId: string): Promise<Menu>{
    const  menuFinded = await this.prismaService.menu.findUnique({
        where: { id: menuId },
    });
    if(!menuFinded){
        throw new NotFoundException('Menu não encontrado')
    }
    const deletedMenu = await this.prismaService.menu.delete({
        where: { id: menuId },
    });
    return deletedMenu;
}
}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MesaModule } from './mesa/mesa.module';
import { MenuModule } from './menu/menu.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, MesaModule, MenuModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

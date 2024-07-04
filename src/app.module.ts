import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AdminModule } from './Admin/admin-module/admin.module';
import 'dotenv/config'
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './global/role-guard/role/role.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), UsersModule, AdminModule,  JwtModule.register({global: false, secret: process.env.JWT_SECRET_KEY , signOptions: { expiresIn: '2h' } })],
  controllers: [AppController],
  providers: [AppService,{provide:APP_GUARD,useClass:RoleGuard}],
})
export class AppModule {}
 
import { Module } from '@nestjs/common';
import { AdminController } from '../controllers/admin/admin.controller';
import { AdminService } from '../services/admin/admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from 'src/Model/admin.schema';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config' 

@Module({
  imports:[MongooseModule.forFeature([{name:'Admin',schema:AdminSchema}]),JwtModule.register({global: false, secret: process.env.JWT_SECRET , signOptions: { expiresIn: '2h' } })],
  providers:[AdminService],
  controllers:[AdminController]
})
export class AdminModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './controllers/auth/schemas/user.schema';
import { UsersService } from './users.service';
import { UserController } from './controllers/user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config'
const secretKey = process.env.JWT_SECRET;

@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}]),
  JwtModule.register({global: true, secret: secretKey , signOptions: { expiresIn: '2h' } })],
  providers:[UsersService],
  controllers:[UserController]
})
export class UsersModule {}

import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/Types/admin.type';
import * as becrypt from 'bcryptjs'
import { LoginType } from 'src/Types/login.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private adminModel:Model<Admin>,private readonly jwtService:JwtService) {}
 async signInSub(data:Admin) {
  const {name,email,password} = data
  const exist = await this.adminModel.findOne({email:email})
  if(!exist) {
    const salt = becrypt.genSaltSync(10)
    const hashedPassword = becrypt.hashSync(password,salt)
   await this.adminModel.create({email:email,password:hashedPassword,name:name})
  } else {
   throw new HttpException('User Exist',HttpStatus.CONFLICT)
  }
  }
async loginSub(data:LoginType) {
  const result = await this.adminModel.findOne({email:data.email})
  if(!result) {
      throw new HttpException("User Not Found",HttpStatus.NOT_FOUND)
  } 
  const check = await becrypt.compare(data.password,result.password)
   if(check) {
    const payload = {_id:result._id+'',email:result.email,role:'Admin'}
    return await this.jwtService.signAsync(payload)
   } else {
    throw new UnauthorizedException()
   }
}

}


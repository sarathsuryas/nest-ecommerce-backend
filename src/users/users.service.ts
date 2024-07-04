import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './zodSchemaForUserValidation/zodUser.schema';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { UserLoginDto } from './zodSchemaForUserValidation/userLogin.schema';
import { waitForDebugger } from 'inspector';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/Types/user.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>,private readonly jwtService: JwtService) { }
  async create(data: CreateUserDto): Promise<CreateUserDto | string> {
    try {
      const { name, email, password } = data
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt)
      const userDetails = await this.userModel.findOne({ email: data.email })
      if (!userDetails) {
        const result = await this.userModel.create({
          name: name,
          email: email,
          password: hashedPassword,
        })
      } else {
        return "User data is existing"
      }
    } catch (error) {
      console.error(error)
      throw new HttpException('internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async loginSub(data: UserLoginDto) {
    
      const res = await this.userModel.findOne({ email: data.email }) 
      if (!res) {
         throw new HttpException('User data not found', HttpStatus.NOT_FOUND)
      } else {
       const check = await bcrypt.compare(data.password,res.password)
       if(check) {
        const payload = { id:res._id+'', username: res.name,role:'User'};
          const jwt = await this.jwtService.signAsync(payload)
        return jwt
       } else {
        throw new UnauthorizedException()
       }
      } 

  }

}

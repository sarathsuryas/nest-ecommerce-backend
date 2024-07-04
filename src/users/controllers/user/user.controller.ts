import { Body, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { RoleGuard } from 'src/global/role-guard/role/role.guard';
import { UserRoleGuard } from 'src/users/guards/userRole.guard';
import { AuthInterceptor } from 'src/users/intercptors/auth/auth.interceptor';
import { LoginValidationPipe } from 'src/users/pipes/login-validation/login-validation.pipe';
import { SigninValidationPipe } from 'src/users/pipes/signin-validation/signin-validation.pipe';
import { UsersGuard } from 'src/users/users.guard';
import { UsersService } from 'src/users/users.service';
import { UserLoginDto, userLoginSchema } from 'src/users/zodSchemaForUserValidation/userLogin.schema';
import { createUserSchema, CreateUserDto } from 'src/users/zodSchemaForUserValidation/zodUser.schema';

interface CustomRequest extends Request{
  user?:string
}

@Controller('user')
export class UserController {
  constructor(private userService:UsersService) {}
  @Post('/signin')
  async signIn(@Body(new SigninValidationPipe(createUserSchema)) data:CreateUserDto) {
       const res =  await this.userService.create(data)
       return res
   }
   @Post('/login') 
   async login(@Body(new LoginValidationPipe(userLoginSchema)) data:UserLoginDto,@Res()res:Response){
     const token = await this.userService.loginSub(data)
      res.setHeader('Bearer',token).send()
   }
   @Get('/home') 
    @UseGuards(UserRoleGuard)
   userHome(@Req()req:CustomRequest) {
    
     return { message: 'This response has custom headers' };
   } 
    
}

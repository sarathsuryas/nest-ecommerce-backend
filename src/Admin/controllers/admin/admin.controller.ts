import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { AdminGuard } from 'src/Admin/guards/adminRole.guard';
import { LoginValidationPipe } from 'src/Admin/pipes/login-validation/login-validation.pipe';
import { SigninValidationPipe } from 'src/Admin/pipes/signin-validation/signin-validation.pipe';
import { AdminService } from 'src/Admin/services/admin/admin.service';
import { Admin } from 'src/Types/admin.type';
import { LoginType } from 'src/Types/login.type';
import { Roles } from 'src/decorators/roles.decorator';
interface CustomRequest extends Request {
  admin:string;
}

@Controller('admin')
export class AdminController { 
  constructor(private services:AdminService){}
  @Post('signin')
  @HttpCode(201)
  @UsePipes(SigninValidationPipe)
  signin(@Body() body:Admin) {
   return this.services.signInSub(body)
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(LoginValidationPipe)
  async login(@Body()body:LoginType,@Res()res:Response) {
      const token = await this.services.loginSub(body)
      res.setHeader('Admin',token).send()
  }
  @Get('admindash') 
  @HttpCode(200) 
  @UseGuards(AdminGuard)
  getDashboard(@Req()req) {
  
    return 'this is admin'
  }
}

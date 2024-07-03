import { Controller, Post, Req, Res } from '@nestjs/common';
interface CustomRequest extends Request {
  admin:string;
}

@Controller('admin')
export class AdminController {
  @Post('login')
  login(@Req()req:Request) {
      
  }
}

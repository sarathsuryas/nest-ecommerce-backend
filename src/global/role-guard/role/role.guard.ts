import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import 'dotenv/config'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly jwtService:JwtService){}
 async canActivate(context: ExecutionContext) {

    const request = context.switchToHttp().getRequest();
    const token =  request.headers.admin || request.headers.bearer
    const { method, route } = request;
    if ((method === 'POST' && route.path === '/admin/login') || (method === 'POST' && route.path === '/admin/signin')) {
      return true;
    } else if((method === 'POST' && route.path === '/user/login') || (method === 'POST' && route.path === '/user/signin')) {
      return true
    }
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: process.env.JWT_SECRET
        }
      )
      request['role'] = payload.role
    } catch (error) {
     
      throw new UnauthorizedException()
    }
    return true
  }
}

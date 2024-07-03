import { BadRequestException, CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor, RequestTimeoutException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import 'dotenv/config'
import { tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private jwtService:JwtService) {}
 async intercept(context: ExecutionContext, next: CallHandler) {
    const request:Request =  context.switchToHttp().getRequest()
    
    const token = request.headers.bearer
    if(!token) {
      throw new UnauthorizedException()
    } else {
      try {
        const payload = await this.jwtService.verifyAsync(
          token as string,
          {
            secret: process.env.SECRET_KEY
          }
        )
        request['user'] = payload
      } catch (error) {
        throw new RequestTimeoutException()
      }
    }
   
    
    return next.handle().pipe(
      tap(()=>{
         const response:Response = context.switchToHttp().getResponse()
         response.setHeader('userData',"sarath")
      })
    )
  }
}

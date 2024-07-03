import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request:Request = context.switchToHttp().getRequest()
    const response:Response = context.switchToHttp().getResponse()
    return next.handle().pipe(
      tap(()=>{
        const method = request.method
        const url = request.url
        const statusCode = response.statusCode
        console.log(`${method}/${url}/${statusCode}`)
      })
    ) 
  }
}

import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAdminDto } from 'src/Admin/classLoginValidator/admin-signin-dto';

@Injectable()
export class SigninValidationPipe implements PipeTransform {
   async transform(value: any, metadata: ArgumentMetadata) {
    const object = plainToInstance(CreateAdminDto,value)
    const errors = await validate(object)
    if(errors.length > 0) {
      throw new HttpException("validation failed",HttpStatus.BAD_REQUEST)
    }
    return value;
  }
}

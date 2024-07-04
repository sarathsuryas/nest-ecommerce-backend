import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateLoginDto } from 'src/Admin/classLoginValidator/login-admin-dto';

@Injectable()
export class LoginValidationPipe implements PipeTransform {
 async transform(value: any,  {metatype}: ArgumentMetadata) {
    const object = plainToInstance(CreateLoginDto,value)
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

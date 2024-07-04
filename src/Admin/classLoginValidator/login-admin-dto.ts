import { IsEmail, IsString } from "class-validator";

export class CreateLoginDto {
  @IsEmail()
  @IsString()
  email:string;
  @IsString() 
  password:string;
}
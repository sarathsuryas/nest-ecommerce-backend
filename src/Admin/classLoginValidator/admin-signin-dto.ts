import { IsEmail, IsString, Matches } from "class-validator";

export class CreateAdminDto {
  @Matches(/^[a-zA-z\s]+$/)
  @IsString()
  name:string;
  
  @IsEmail()
  @IsString()
  email:string

  @IsString()
  password:string
}
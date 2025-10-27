import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export type UserRole = 'superadmin' | 'usuario';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  fullname: string;

  @IsOptional()
  @IsEnum(['superadmin', 'usuario'])
  role?: UserRole; 
}

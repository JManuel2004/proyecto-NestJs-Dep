import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type UserRole = 'superadmin' | 'usuario';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, example: 'secret123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  fullname: string;

  @ApiPropertyOptional({ enum: ['superadmin', 'usuario'] })
  @IsOptional()
  @IsEnum(['superadmin', 'usuario'])
  role?: UserRole; 
}

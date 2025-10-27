import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed'])
  status?: 'pending' | 'in-progress' | 'completed';
}

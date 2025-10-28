import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Mi proyecto' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Descripción breve del proyecto' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: ['pending', 'in-progress', 'completed'] })
  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed'])
  status?: 'pending' | 'in-progress' | 'completed';
}

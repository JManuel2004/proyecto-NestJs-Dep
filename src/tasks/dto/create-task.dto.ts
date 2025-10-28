import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título de la tarea' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Descripción de la tarea' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ 
    description: 'Estado de la tarea', 
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  })
  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed', 'cancelled'])
  status?: 'pending' | 'in-progress' | 'completed' | 'cancelled';

  @ApiPropertyOptional({ 
    description: 'Prioridad de la tarea', 
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority?: 'low' | 'medium' | 'high';

  @ApiPropertyOptional({ description: 'Fecha límite de la tarea', type: String })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ description: 'ID del proyecto al que pertenece la tarea' })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ApiPropertyOptional({ description: 'ID del usuario asignado a la tarea' })
  @IsOptional()
  @IsUUID()
  assignedToId?: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  password?: string;

  @ApiPropertyOptional()
  fullname?: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ minLength: 6, example: 'secret123' })
  password: string;

  @ApiProperty({ example: 'Juan Pérez' })
  fullname: string;
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Solo superadmin puede crear usuarios directamente (o usar /auth/register)
  @Auth('superadmin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Solo superadmin puede ver todos los usuarios
  @Auth('superadmin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Usuarios autenticados pueden ver su propio perfil
  // Superadmin puede ver cualquier perfil
  @Auth()
  @Get('profile')
  getProfile(@GetUser() user: User) {
    const { password, ...profile } = user;
    return profile;
  }

  // Ver perfil de cualquier usuario (solo superadmin)
  @Auth('superadmin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // Solo superadmin puede modificar usuarios
  @Auth('superadmin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // Solo superadmin puede eliminar usuarios
  @Auth('superadmin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

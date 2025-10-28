import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Auth } from '../../auth/decorators/auth.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth('bearer')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth('superadmin')
  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Auth('superadmin')
  @Get()
  @ApiResponse({ status: 200, description: 'Listado de usuarios' })
  findAll() {
    return this.usersService.findAll();
  }

  @Auth()
  @Get('profile')
  @ApiResponse({ status: 200, description: 'Perfil del usuario autenticado' })
  getProfile(@GetUser() user: User) {
    const { password, ...profile } = user;
    return profile;
  }

  @Auth('superadmin')
  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Detalle de usuario' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Auth('superadmin')
  @Patch(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Auth('superadmin')
  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

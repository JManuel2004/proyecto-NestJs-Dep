import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { Auth } from '../decorators/auth.decorator';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../../users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado' })
  register(@Body() dto: CreateUserDto) {
    return this.auth.create(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login exitoso con JWT' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Auth()
  @ApiBearerAuth('bearer')
  @ApiResponse({ status: 200, description: 'Token válido' })
  @Get('check')
  check(@GetUser() user: User) {
    return this.auth.check(user);
  }

  
}

import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { Jwt } from '../interfaces/jwt.interface';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}


  async create(createUserDto: CreateUserDto) {
    const { password, role, ...userData } = createUserDto;

    try {
      const user = this.userRepository.create({
        ...userData,
        role: role ?? 'usuario',
        isActive: true,
        password: this.encryptPassword(password),
      });

      await this.userRepository.save(user);
      delete (user as any).password;

      return {
        ...user,
        };
    } catch (error) {
      this.handleException(error);
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase().trim() },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        fullname: true,
        isActive: true,
      },
    });

    if (!user) throw new NotFoundException(`User ${email} not found`);
    if (!user.isActive) throw new UnauthorizedException('Account is inactive');

    if (!bcrypt.compareSync(password, user.password!)) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    delete (user as any).password;

    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    };
  }

  encryptPassword(password: string) {
    const rounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    return bcrypt.hashSync(password, rounds);
  }

  private getJwtToken(payload: Jwt) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleException(error: any): never {
    this.logger.error(error);
    if (error?.code === '23505') {
      throw new InternalServerErrorException(error.detail);
    }
    throw new InternalServerErrorException('Unexpected error, check logs');
  }

  async check(user: User) {
    const token = this.signToken(user);
    return { user, token };
  }

  private signToken(user: User) {
    const payload: Jwt = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User } from '../../users/entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';
import { Jwt } from '../interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private signToken(user: User) {
    const payload: Jwt = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async register(dto: CreateUserDto) {
    const exists = await this.users.findOne({ where: { email: dto.email.toLowerCase().trim() } });
    if (exists) throw new BadRequestException('El email ya está registrado');

    const hash = await bcrypt.hash(dto.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '12', 10));

    const user = this.users.create({
      email: dto.email,
      password: hash,
      fullname: dto.fullname,
      role: dto.role ?? 'usuario',
      isActive: true,
    });
    await this.users.save(user);

    const { password, ...safe } = user;
    const token = this.signToken(user);

    return { user: safe, token };
  }

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase().trim();

    const user = await this.users.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    if (!user.isActive) throw new UnauthorizedException('Cuenta desactivada');

    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');

    const token = this.signToken(user);
    const { password, ...safe } = user;
    return { user: safe, token };
  }

  async check(user: User) {
    const token = this.signToken(user);
    return { user, token };
  }
}

import { Injectable, UnauthorizedException, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const isMatch = await bcrypt.compare(pass, user.password);

      if (!isMatch) {
        console.log('AQUI ');
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id, username: user.name };
      const token = await this.jwtService.signAsync(payload);

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24,
      });
      return { access_token: token };
    } catch (error) {
      console.error('Erro no signIn:', error);
      throw new UnauthorizedException('Erro ao autenticar');
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const foundUser = await this.userService.findOneOrFailByEmail(email);
    const isMatched = await this.userService.comparePassword(
      password,
      foundUser.password,
    );

    if (!isMatched) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = {
      sub: foundUser.id,
      email: foundUser.email,
      //TODO : add role
    };

    const jwt = await this.jwtService.signAsync(payload);

    return { jwt, payload };
  }
}

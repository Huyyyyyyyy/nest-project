import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(email: string, password: string) {
    const foundUser = await this.userService.findOneOrFailByEmail(email);
    const isMatched = await this.userService.comparePassword(
      password,
      foundUser.password,
    );

    if (!isMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    return foundUser;
  }
}

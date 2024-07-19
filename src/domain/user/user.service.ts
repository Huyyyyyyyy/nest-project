import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { BaseService } from 'src/common/service/base.service';

@Injectable()
export class UserService extends BaseService<
  Prisma.UserCreateArgs,
  Prisma.UserCreateInput
> {
  constructor(databaseService: DatabaseService) {
    super(databaseService, 'User');
  }

  async createWithHash(data: Prisma.UserCreateInput) {
    const hashedPassword = await this.hashPassword(data.password);
    const userData = {
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      timezoneCode: data.timezoneCode,
    };

    return this.create({ data: userData });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async findOneOrFailByEmail(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  updatePassword(data: any) {
    console.log('update password to ', data['newPassword']);
  }

  updateUser(data: any) {
    console.log('updated user ', data);
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  findMany() {
    return this.databaseService.user.findMany();
  }

  create(data: Prisma.UserCreateInput) {
    const userData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      timezoneCode: data.timezoneCode,
      phone: data.phone,
    };

    return this.databaseService.user.create({
      data: userData,
    });
  }

  updatePassword(data: any) {
    console.log('update password to ', data['newPassword']);
  }

  updateUser(data: any) {
    console.log('updated user ', data);
  }
}

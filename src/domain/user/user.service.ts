import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  register(data: any) {
    console.log('register', data);
  }

  updatePassword(data : any){
    console.log('update password to ', data['newPassword'] )
  }
}

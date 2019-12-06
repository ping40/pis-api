import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { ConfigService } from 'src/config/ConfigService';
import { LoginUserDto } from './dto/login-user.dto';
import * as _ from 'lodash';
import { sign, verify } from 'jsonwebtoken';
import { SECRET } from 'src/config/config';

const ALLUSER: User[] = ConfigService.getAllUser();

@Injectable()
export class UserService {

  async findOne(loginUserDto: LoginUserDto): Promise<User> {
     const user  = _.find(ALLUSER, (o) => {
          return o.name ===  loginUserDto.name  &&   o.password === loginUserDto.password;
      });

     return user;
  }

  public generateJWT(user: User): string {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return sign({
      id: user.id,
      name: user.name,
      exp: exp.getTime() / 1000,
    }, SECRET);
  }

}

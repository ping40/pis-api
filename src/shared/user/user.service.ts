import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { LoginUserDto } from './dto/login-user.dto';
import * as _ from 'lodash';
import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from 'nestjs-config';
import { LoggerService } from 'nest-logger';

@Injectable()
export class UserService {

ALLUSER: User[];
SECRET: string;

constructor(private readonly config: ConfigService,
            private readonly logger: LoggerService) {
    this.ALLUSER = config.get('users').allUser;
    this.SECRET = config.get('config').SECRET;
    this.logger.debug( JSON.stringify(this.ALLUSER));
  }

  async findOne111(loginUserDto: LoginUserDto): Promise<User> {
    console.log("not ok ");
     const user  = _.find(this.ALLUSER, (o) => {
          return o.name ===  loginUserDto.name  &&   o.password === loginUserDto.password;
      });

     return user;
  }

  async findById(id: number): Promise<User> {
    const user  = _.find(this.ALLUSER, (o) => {
         return o.id === id;
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
    }, this.SECRET);
  }

}

import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../../feature/ebbinghaus/service/user.service';
import { UserRO } from './user.interface';
import { ConfigService } from 'nestjs-config';
import { LoggerService } from 'nest-logger';
import {User} from "./model/user.model";
import {sign} from "jsonwebtoken";

@Controller('user')
export class UserController {

    SECRET: string;

    constructor(private readonly config: ConfigService,
                private readonly userService: UserService,
                private readonly logger: LoggerService) {
      this.SECRET = config.get('config').SECRET;
    }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    this.logger.debug(' in login method123: '  + JSON.stringify( loginUserDto)  ) ;
    const user = await this.userService.findOne(loginUserDto);

    const error2 = ' username/password is wrong.';
    if(!user) { throw new HttpException(error2, 401); }

//    const token = this.userService.generateJWT(user);
    const token = this.generateJWT(user);
    const {name, id} = user;
    const userRo = {id, name, token};
    return {user: userRo};
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

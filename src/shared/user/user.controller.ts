import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { LoggerService } from 'nest-logger';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService,
                private readonly logger: LoggerService) {}

  @Post('login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    this.logger.debug(`in login method:  ${loginUserDto}` ) ;
    const user = await this.userService.findOne(loginUserDto);

    const errors = {user: ' not found'};
    if (!user) { throw new HttpException({errors}, 401); }

    const token = this.userService.generateJWT(user);
    const {name, id} = user;
    const userRo = {id, name, token};
    return {user: userRo};
  }
}

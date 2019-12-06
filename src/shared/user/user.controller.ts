import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { UserRO } from './user.interface';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
    const user = await this.userService.findOne(loginUserDto);

    const errors = {User: ' not found'};
    if (!user) { throw new HttpException({errors}, 401); }

    const token = this.userService.generateJWT(user);
    const {name, id} = user;
    const userRo = {name, token};
    return {user: userRo};
  }
}

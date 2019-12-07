import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../../config/config';
import { UserService } from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    console.log("in middlewar: " +  req.originalUrl);

    if (req.originalUrl === '/user/login') {
      console.log("in middlewar: 1111 " +  req.originalUrl);
      next();
    } else {
      console.log("in middlewar: 2222" +  req.originalUrl);
      const authHeaders = req.headers.authorization;
      if (authHeaders && (authHeaders as string).split(' ')[1]) {
        const token = (authHeaders as string).split(' ')[1];
        const decoded: any = verify(token, SECRET);
        const user = await this.userService.findById(decoded.id);

        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }

        req.user = user;
        next();
      } else {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}

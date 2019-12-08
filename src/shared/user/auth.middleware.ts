import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../../config/config';
import { UserService } from './user.service';
import { LoggerService } from 'nest-logger';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService,
              private readonly logger: LoggerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug(`in middlewar: url: ${req.originalUrl}`);

    if (req.originalUrl === '/user/login') {
      next();
    } else {
      const authHeaders = req.headers.authorization;
      if (authHeaders && (authHeaders as string).split(' ')[1]) {
        const token = (authHeaders as string).split(' ')[1];
        const decoded: any = verify(token, SECRET);
        const user = await this.userService.findById(decoded.id);

        if (!user) {
          this.logger.warn(`in middlewar: url: ${req.originalUrl}, User not found`);
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

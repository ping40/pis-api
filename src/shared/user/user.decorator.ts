import { createParamDecorator } from '@nestjs/common';
import { SECRET } from '../../config/config';
import { verify } from 'jsonwebtoken';

export const User = createParamDecorator((data, req) => {

  // if route is protected, there is a user set in auth.middleware
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  };

  // in case a route is not protected, we still want to get the optional auth user from jwt
  const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
  if (token && token[1]) {
    const decoded: any = verify(token[1], SECRET);
    return !!data ? decoded[data] : decoded.user;
  }

});

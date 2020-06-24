import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import {UserEntity} from "../entities/user.entity";
import {UserRepository} from "../repository/user.repository";
import {LoginUserDto} from "../../../shared/user/dto/login-user.dto";
import {User} from "../../../shared/user/model/user.model";
import * as _ from "lodash";
import {LoggerService} from "nest-logger";
import { Util } from "../../../common/util";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService
  ) {
    this.initData();
  }

  @Transactional()
  async initData(
  ): Promise<UserEntity> {

    const one = await this.userRepository.findOne();
    if (one) {
      return new UserEntity();
    }

    const u = new UserEntity();
    u.id = 1 ;
    u.name = 'ping40';
    u.password = 'nestjdds12';

    return await this.userRepository.save(u);
  }


  async findOne(loginUserDto: LoginUserDto): Promise<User> {
    this.logger.debug(' in service user.service.ts ' + JSON.stringify(loginUserDto));
    const one = await this.userRepository.findOne({name: loginUserDto.name});
    if (one) {

      this.logger.debug(' in service user.service.ts  ' + JSON.stringify(one));
      if (one.password === Util.sha2(loginUserDto.password)) {
        return one;
      }
    } else {
      this.logger.debug(' in service user.service.ts  null');
    }
    return null;
  }


  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({id: id});
  }
}

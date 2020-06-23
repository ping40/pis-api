import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import {UserEntity} from "../entities/user.entity";
import {UserRepository} from "../repository/user.repository";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {
    console.log('..............................ping');
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

}

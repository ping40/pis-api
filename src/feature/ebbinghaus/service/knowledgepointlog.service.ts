import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { KnowledgePointRepository } from '../repository/knowledgepoint.repository';
import { KnowledgePointLogRepository } from '../repository/knowledgepointlog.repository';
import { KnowledgePointEntity } from '../entities/knowledgepoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgePointLogEntity } from '../entities/knowledgepointlog.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { Util } from '../../../common/util';
import { KnowledgePointLogDto } from '../dtos/KnowledgePointLogDto';
import _ = require('lodash');

@Injectable()
export class KnowledgePointLogService {
  constructor(
    @InjectRepository(KnowledgePointEntity)
    private readonly kpRepository: KnowledgePointRepository,
    @InjectRepository(KnowledgePointLogEntity)
    private readonly kplRepository: KnowledgePointLogRepository,
  ) {}

  @Transactional()
  async createKnowledgePointLog(userId: number,
                                dto: KnowledgePointLogDto,
  ): Promise<KnowledgePointLogEntity> {
    const one = await this.kpRepository.findOne({id: dto.kpId},  {relations: ['logs']  });
    if (!one) {
      throw new HttpException(
        { message: '知识点不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (one.userId !== userId) {
      throw new HttpException(
        { message: '无权给别人的知识点增加备注.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const today = Util.formatDate(new Date());
    const oldLog = _.find(one.logs, { reviewDate : today} );
    if ( oldLog ) {
      return oldLog;
    }

    const newKpl = new KnowledgePointLogEntity();
    newKpl.knowledgePointEntity = one;
    newKpl.reviewDate = Util.formatDate(new Date());

    const newLog = await this.kplRepository.save(newKpl); // 这种情况下，postman 不好测试
    if ( one.logs.length === 7) {//TODO hard code
        if(Util.subDays(newKpl.reviewDate, one.createDate) >= 90 ) {
          one.allDone = true;
          this.kpRepository.save(one);
        }
    }
    return newLog;
  }

}

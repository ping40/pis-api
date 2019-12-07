import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { KnowledgePointRepository } from '../repository/knowledgepoint.repository';
import { KnowledgePointCommentRepository } from '../repository/knowledgepointcomment.repository';
import { KnowledgePointLogRepository } from '../repository/knowledgepointlog.repository';
import { KnowledgePointEntity } from '../entities/knowledgepoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgePointCommentEntity } from '../entities/knowledgepointcomment.entity';
import { KnowledgePointLogEntity } from '../entities/knowledgepointlog.entity';
import { KnowledgePointDto } from '../dtos/KnowledgePointDto';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { DeleteResult } from 'typeorm';
import { Util } from 'src/common/util';

@Injectable()
export class KnowledgePointService {
  constructor(
    @InjectRepository(KnowledgePointEntity)
    private readonly kpRepository: KnowledgePointRepository,
    @InjectRepository(KnowledgePointCommentEntity)
    private readonly kpcRepository: KnowledgePointCommentRepository,
    @InjectRepository(KnowledgePointLogEntity)
    private readonly kplRepository: KnowledgePointLogRepository,
  ) {}

  async createKnowledgePoint(
    dto: KnowledgePointDto,
  ): Promise<KnowledgePointEntity> {
    const newKp = new KnowledgePointEntity();
    newKp.allDone = false;
    newKp.content = dto.content;
    newKp.createDate = Util.formatDate(new Date());
    newKp.userId = dto.userId;

    return await this.kpRepository.save(newKp);
  }

  @Transactional()
  async editKnowledgePoint(
    dto: KnowledgePointDto,
  ): Promise<KnowledgePointEntity> {
    const one = await this.findOne(dto.userId,dto.id);
    if (!one) {
      throw new HttpException(
        { message: '知识点不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (one.userId !== dto.userId) {
      throw new HttpException(
        { message: '无权修改别人的知识点.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (one.createDate !== Util.formatDate(new Date())) {
      throw new HttpException(
        { message: '仅仅允许修改今天的知识点.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    one.content = dto.content;

    return await this.kpRepository.save(one);
  }

  @Transactional()
  async deleteKnowledgePoint(userId: number, kpId: number): Promise<DeleteResult> {
    const one = await this.findOne(userId, kpId);
    if (!one) {
      throw new HttpException(
        { message: '知识点不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (one.userId !== userId) {
      throw new HttpException(
        { message: '无权修改别人的知识点.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.kpRepository.delete({ id: kpId });
  }

  private async findOne(userId: number, kpId: number): Promise<KnowledgePointEntity> {
    const findOneOptions = {
      'id': kpId,
      userId: userId,
    };

    return await this.kpRepository.findOne(findOneOptions);
  }

  @Transactional()
  async findByDay(userId: number, date: number): Promise<KnowledgePointEntity[]> {
    const qb = this.kpRepository
      .createQueryBuilder('kp')
      .where('kp.userId = :userId', {userId})
      .andWhere('kp.createDate = :createDate', {createDate:  date})
      .leftJoinAndSelect('kp.logs', 'kp_log');

    return await qb.getMany();
  }

  @Transactional()
  async reviewByDay(userId: number, date: number): Promise<KnowledgePointEntity[]> {

    console.log('reviewDay: ' + JSON.stringify( Util.getReviewDays(date)));
    const qb = this.kpRepository
      .createQueryBuilder('kp')
      .where('kp.userId = :userId', {userId})
      .andWhere('kp.createDate = :b1 OR ' +
                              'kp.createDate = :b2 OR  ' +
                              'kp.createDate = :b4 OR ' +
                              'kp.createDate = :b7 OR ' +
                              'kp.createDate = :b15 OR ' +
                              'kp.createDate = :m1 OR ' +
                              'kp.createDate = :m3 OR ' +
                              'kp.createDate = :m6',
       Util.getReviewDays(date))
      .leftJoinAndSelect('kp.logs', 'kp_log');

    return await qb.getMany();
  }
}

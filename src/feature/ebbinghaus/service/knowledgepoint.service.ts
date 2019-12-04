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
    newKp.createDate = new Date();
    newKp.userId = dto.userId;

    return await this.kpRepository.save(newKp);
  }

  async editKnowledgePoint(
    dto: KnowledgePointDto,
  ): Promise<KnowledgePointEntity> {
    const newKp = new KnowledgePointEntity();
    newKp.id = dto.id;
    newKp.allDone = false;
    newKp.content = dto.content;
    newKp.createDate = new Date();
    newKp.userId = dto.userId;

    return await this.kpRepository.save(newKp);
  }

  @Transactional()
  async deleteKnowledgePoint(kpId: number): Promise<DeleteResult> {
    const one = await this.findOne(kpId);
    if (!one) {
      throw new HttpException(
        { message: '知识点不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 判断是否是自己的kp

    return await this.kpRepository.delete({ id: kpId });
  }

  private async findOne(kpId: number): Promise<KnowledgePointEntity> {
    const findOneOptions = {
      id: kpId,
    };

    return await this.kpRepository.findOne(findOneOptions);
  }

  @Transactional()
  async findByDay(date: Date): Promise<KnowledgePointEntity[]> {
    const qb = this.kpRepository
      .createQueryBuilder('kp')
      .where('kp.createDate = :createDate', date);

    return await qb.getMany();
  }
}

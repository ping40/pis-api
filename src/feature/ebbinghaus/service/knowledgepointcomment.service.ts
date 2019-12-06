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
import { KnowledgePointLogDto } from '../dtos/KnowledgePointLogDto';
import { KnowledgePointCommentDto } from '../dtos/KnowledgePointCommentDto';

@Injectable()
export class KnowledgePointLogService {
  constructor(
    @InjectRepository(KnowledgePointEntity)
    private readonly kpRepository: KnowledgePointRepository,
    @InjectRepository(KnowledgePointCommentEntity)
    private readonly kpcRepository: KnowledgePointCommentRepository,
  ) {}

  @Transactional()
  async createKnowledgePointComment(
    dto: KnowledgePointCommentDto,
  ): Promise<KnowledgePointCommentEntity> {
    const one = await this.kpRepository.findOne({id: dto.kpId});
    if (!one) {
      throw new HttpException(
        { message: '知识点不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newKpc = new KnowledgePointCommentEntity();
    newKpc.kpId = dto.kpId;
    newKpc.content = dto.content;
    newKpc.createDate = new Date();

    return await this.kpcRepository.save(newKpc);
  }

  @Transactional()
  async editKnowledgePointComment(
    dto: KnowledgePointCommentDto,
  ): Promise<KnowledgePointCommentEntity> {
    const one = await this.kpRepository.findOne({id: dto.kpId});
    if (!one) {
      throw new HttpException(
        { message: '知识点备注不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newKpl = new KnowledgePointLogEntity();
    newKpl.id = one.id;
    newKpl.kpId = one.kpId;
    newKpl.reviewDate = new Date();
    newKpl.content = dto.content;

    return await this.kplRepository.save(newKpl);
  }

  @Transactional()
  async deleteKnowledgePointLog(logId: number): Promise<DeleteResult> {
     const one = await this.kplRepository.findOne({id: logId});
     if (!one) {
      throw new HttpException(
        { message: '知识点备注不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 判断是否是自己的kp

     return await this.kplRepository.delete({ id: logId });
  }

}

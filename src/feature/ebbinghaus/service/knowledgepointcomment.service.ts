import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { KnowledgePointRepository } from '../repository/knowledgepoint.repository';
import { KnowledgePointCommentRepository } from '../repository/knowledgepointcomment.repository';
import { KnowledgePointEntity } from '../entities/knowledgepoint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowledgePointCommentEntity } from '../entities/knowledgepointcomment.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { DeleteResult } from 'typeorm';
import { KnowledgePointCommentDto } from '../dtos/KnowledgePointCommentDto';

@Injectable()
export class KnowledgePointCommentService {
  constructor(
    @InjectRepository(KnowledgePointEntity)
    private readonly kpRepository: KnowledgePointRepository,
    @InjectRepository(KnowledgePointCommentEntity)
    private readonly kpcRepository: KnowledgePointCommentRepository,
  ) {}

  @Transactional()
  async createKnowledgePointComment(userId: number,
                                    dto: KnowledgePointCommentDto,
  ): Promise<KnowledgePointCommentEntity> {
    const one = await this.kpRepository.findOne({id: dto.kpId});
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

    const newKpc = new KnowledgePointCommentEntity();
    newKpc.kpId = dto.kpId;
    newKpc.content = dto.content;
    newKpc.createDate = new Date();

    return await this.kpcRepository.save(newKpc);
  }

  @Transactional()
  async editKnowledgePointComment(userId: number,
                                  dto: KnowledgePointCommentDto,
  ): Promise<KnowledgePointCommentEntity> {
    const one = await this.kpcRepository.findOne({id: dto.id});
    if (!one) {
      throw new HttpException(
        { message: '知识点备注不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const kpOne = await this.kpRepository.findOne({id: one.kpId});
    if (!kpOne) {
      throw new HttpException(
        { message: '知识点不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (kpOne.userId !== userId) {
      throw new HttpException(
        { message: '无权修改别人的知识点的备注.' },
        HttpStatus.BAD_REQUEST,
      );
    } 

    one.content = dto.content;
    one.createDate = new Date();
  
    return await this.kpcRepository.save(one);
  }

  @Transactional()
  async deleteKnowledgePointComment(userId: number, logId: number): Promise<DeleteResult> {
     const one = await this.kpcRepository.findOne({id: logId});
     if (!one) {
      throw new HttpException(
        { message: '知识点备注不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

     const kpOne = await this.kpRepository.findOne({id: one.kpId});
     if (!kpOne) {
      throw new HttpException(
        { message: '知识点不存在.' },
        HttpStatus.BAD_REQUEST,
      );
    }

     if (kpOne.userId !== userId) {
      throw new HttpException(
        { message: '无权删除别人的知识点的备注.' },
        HttpStatus.BAD_REQUEST,
      );
    }

     return await this.kpcRepository.delete({ id: logId });
  }
}

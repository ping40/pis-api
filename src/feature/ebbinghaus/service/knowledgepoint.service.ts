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
import { KnowledgePointPageCondition } from '../dtos/KnowledgePointPageCondition';
import { KnowledgePointPageDto, KnowledgePointStatus } from '../dtos/KnowledgePointPageDto';
import { LoggerService } from 'nest-logger';
import { KnowledgePointDetailDto } from '../dtos/KnowledgePointDetailDto';
import { KnowledgePointLogDto } from '../dtos/KnowledgePointLogDto';
import { of } from 'rxjs';
import { KnowledgePointCommentDto } from '../dtos/KnowledgePointCommentDto';


@Injectable()
export class KnowledgePointService {
  constructor(
    @InjectRepository(KnowledgePointEntity)
    private readonly kpRepository: KnowledgePointRepository,
    @InjectRepository(KnowledgePointCommentEntity)
    private readonly kpcRepository: KnowledgePointCommentRepository,
    @InjectRepository(KnowledgePointLogEntity)
    private readonly kplRepository: KnowledgePointLogRepository,
    private readonly logger: LoggerService,
  ) {}

  async createKnowledgePoint(
    dto: KnowledgePointDto,
  ): Promise<KnowledgePointEntity> {
    const newKp = new KnowledgePointEntity();
    newKp.allDone = false;
    newKp.content = dto.content;
    newKp.createDate = Util.formatDate(new Date());
    newKp.userId = dto.userId;
    newKp.title = Util.getTitle(dto.content);

    return await this.kpRepository.save(newKp);
  }

  @Transactional()
  async editKnowledgePoint(
    dto: KnowledgePointDto,
  ): Promise<KnowledgePointEntity> {
    const one = await this.findSimpleOne(dto.userId,dto.id);
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
    one.title = Util.getTitle(dto.content);

    return await this.kpRepository.save(one);
  }

  @Transactional()
  async deleteKnowledgePoint(userId: number, kpId: number): Promise<DeleteResult> {
    const one = await this.findSimpleOne(userId, kpId);
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

  async findOne(userId: number, kpId: number): Promise<KnowledgePointDetailDto> {
    
    const qb = this.kpRepository
    .createQueryBuilder('kp')
    .where('kp.userId = :userId', {userId})
    .andWhere('kp.id = :id', {id: kpId})
    .leftJoinAndSelect('kp.logs', 'kp_log');

    const kp = await qb.getOne();
    if( !kp) {
    throw new HttpException(
      { message: '知识点不存在.' },
      HttpStatus.BAD_REQUEST,
    );
  }

    const dto  = new KnowledgePointDetailDto(kp.id, kp.title, kp.createDate);
    dto.logs = [];

    dto.content = kp.content;
    this.setKPReviewStatus(kp, dto);

    let logDto: KnowledgePointLogDto;
    kp.logs.forEach((log) => {
      logDto = new KnowledgePointLogDto();
      logDto.reviewDate = log.reviewDate;
      dto.logs.push(logDto);
    });

    dto.comments = await this.getCommentsByKpId(kp.id);

    return dto;
  }

  async getCommentsByKpId( kpId: number): Promise<KnowledgePointCommentDto[]> {
    const qb = this.kpcRepository
    .createQueryBuilder('kpc')
    .where('kpc.kpId = :kpId', {kpId});

    const kpcs = await qb.getMany();

    const kpcList: KnowledgePointCommentDto[] = [];
    if( !kpcs) {
      return kpcList;
    }

    kpcs.forEach(v => {
      const dto = new KnowledgePointCommentDto();
      dto.content = v.content;
      dto.id = v.id;
      dto.createDate = v.createDate;
      dto.kpId = v.kpId;
      kpcList.push(dto);
    });

    return kpcList;
  }

  private async findSimpleOne(userId: number, kpId: number): Promise<KnowledgePointEntity> {
    const findOneOptions = {
      id: kpId,
      userId,
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

    this.logger.debug('reviewDay: ' + JSON.stringify( Util.getReviewDays(date)));
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

  async findKnowledgePointByPage(userId: number, cond: KnowledgePointPageCondition): Promise<KnowledgePointPageDto[]> {

    const cond2 = new KnowledgePointPageCondition(); //呈现一个问题：@Body 过来的对象，里面的method没有起作用？？？
    cond2.limit = cond.limit;
    cond2.pageNumber = cond.pageNumber;

    let qb = this.kpRepository
      .createQueryBuilder('kp')
      .where('kp.userId = :userId', {userId});

    if (cond.filterContent != '') {
        qb = qb.andWhere('kp.content like :content', {content: '%' + cond.filterContent + '%'});
      }

    qb =  qb.skip(cond2.skip())
       .take(cond.limit)
       .orderBy('kp.id', 'DESC')
      .leftJoinAndSelect('kp.logs', 'kp_log');

    const kpList = await qb.getMany();
    const pageList: KnowledgePointPageDto[] = [];
    let dto: KnowledgePointPageDto;

    for (const kp of  kpList) {
      dto = new KnowledgePointPageDto(kp.id, kp.title, kp.createDate);
      pageList.push(dto);
      this.setKPReviewStatus(kp, dto);
    }

    return pageList;
  }


  private setKPReviewStatus(kp: KnowledgePointEntity, dto: KnowledgePointPageDto) {
    if (kp.allDone) {
      dto.reviewStatus = KnowledgePointStatus.Done;
    }  else if (kp.logs.length >= Util.getNeedReviewDays(kp.createDate)) {
      dto.reviewStatus = KnowledgePointStatus.PARTIAL_DONE;
    } else {
      dto.reviewStatus = KnowledgePointStatus.NO_DONE;
    }
  }
}

import { KnowledgePointService } from '../service/knowledgepoint.service';
import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { KnowledgePointDto } from '../dtos/KnowledgePointDto';
import { DeleteResult } from 'typeorm';
import { KnowledgePointEntity } from '../entities/knowledgepoint.entity';
import { User } from '../../../shared/user/user.decorator';
import { KnowledgePointPageCondition } from '../dtos/KnowledgePointPageCondition';
import { KnowledgePointPageDto } from '../dtos/KnowledgePointPageDto';
import { ApiHeader } from '@nestjs/swagger';
import { KnowledgePointDetailDto } from '../dtos/KnowledgePointDetailDto';

@ApiHeader({
  name: 'Authorization',
  description: 'Auth token',
})
@Controller('knowledgepoints')
export class KnowledgePointController {
  constructor(private kpService: KnowledgePointService) {}

  @Post()
  async create(@User('id') userId: number, @Body() kpDto: KnowledgePointDto): Promise<KnowledgePointEntity> {
    kpDto.userId = userId;

    return await this.kpService.createKnowledgePoint(kpDto);
  }

  @Put()
  async edit(@User('id') userId: number, @Body() kpDto: KnowledgePointDto): Promise<KnowledgePointEntity> {
    kpDto.userId = userId;

    return await this.kpService.editKnowledgePoint(kpDto);
  }

  @Delete(':id')
  async delete(@User('id') userId: number, @Param('id') kpId: number): Promise<DeleteResult> {
    return await this.kpService.deleteKnowledgePoint(userId, kpId);
  }


  @Get(':id')
  async find(@User('id') userId: number, @Param('id') kpId: number): Promise<KnowledgePointDetailDto > {
    return await  this.kpService.findOne(userId, kpId);
  }

  /**
   * 时间date 创立的知识点
   * @param userId
   */
  @Get('today/create')
  async findByDay(@User('id') userId: number): Promise<KnowledgePointPageDto[]> {
    return await  this.kpService.findByDay(userId);
  }

  /**
   * 时间date 要复习的知识点
   * @param userId
   */
  @Get('today/review')
  async reviewByDay(@User('id') userId: number): Promise<KnowledgePointPageDto[]> {
    return await  this.kpService.reviewByDay(userId);
  }

  @Post('page')
  async findKnowledgePointByPage(@User('id') userId: number, @Body() cond: KnowledgePointPageCondition): Promise<KnowledgePointPageDto[] > {
    return await  this.kpService.findKnowledgePointByPage(userId, cond);
  }
}

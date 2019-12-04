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

@Controller('knowledgepoints')
export class EbbinghausController {
  constructor(private ehService: KnowledgePointService) {}

  @Get('1')
  async create(@Body() kpDto: KnowledgePointDto): Promise<KnowledgePointDto> {
    kpDto.userId = 12;
    kpDto.createDate = new Date();
    kpDto.content = 'asdfas';
    kpDto.allDone = true;

    return await this.ehService.createKnowledgePoint(kpDto);
  }

  @Get('2')
  async edit(@Body() kpDto: KnowledgePointDto): Promise<KnowledgePointDto> {
    kpDto.id = 2;
    kpDto.userId = 12;
    kpDto.createDate = new Date();
    kpDto.content = 'asdfas';
    kpDto.allDone = true;

    return await this.ehService.editKnowledgePoint(kpDto);
  }

  @Get(':id')
  async delete(@Param('id') kpId: number): Promise<DeleteResult> {
    return await this.ehService.deleteKnowledgePoint(kpId);
  }

  @Get(':date/date')
  async findByDay(@Param(':data') date: Date): Promise<KnowledgePointEntity[] > {
    return await  this.ehService.findByDay(date);
  }
}

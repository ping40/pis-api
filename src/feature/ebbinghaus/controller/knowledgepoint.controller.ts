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
import { Util } from 'src/common/util';

@Controller('knowledgepoints')
export class KnowledgePointController {
  constructor(private kpService: KnowledgePointService) {}

  @Post()
  async create(@Body() kpDto: KnowledgePointDto): Promise<KnowledgePointEntity> {
    kpDto.userId = 12;
    kpDto.createDate = Util.formatDate(new Date());
    kpDto.content = 'asdfas';
    kpDto.allDone = true;

    return await this.kpService.createKnowledgePoint(kpDto);
  }

  @Put()
  async edit(@Body() kpDto: KnowledgePointDto): Promise<KnowledgePointEntity> {
    kpDto.id = 2;
    kpDto.userId = 12;
    kpDto.createDate = Util.formatDate(new Date());
    kpDto.content = 'asdfas';
    kpDto.allDone = true;

    return await this.kpService.editKnowledgePoint(kpDto);
  }

  @Delete(':id')
  async delete(@Param('id') kpId: number): Promise<DeleteResult> {
    return await this.kpService.deleteKnowledgePoint(kpId);
  }

  @Get(':date/date')
  async findByDay(@Param('date') date: number): Promise<KnowledgePointEntity[] > {
    return await  this.kpService.findByDay(date);
  }
}

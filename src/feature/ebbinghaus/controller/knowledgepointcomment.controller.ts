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
import { KnowledgePointLogService } from '../service/knowledgepointlog.service';
import { KnowledgePointLogDto } from '../dtos/KnowledgePointLogDto';
import { KnowledgePointLogEntity } from '../entities/knowledgepointlog.entity';

@Controller('knowledgepointlogs')
export class KnowledgePointLogController {
  constructor(private kplService: KnowledgePointLogService) {}

  @Post()
  async create(@Body() kplDto: KnowledgePointLogDto): Promise<KnowledgePointLogEntity> {
    kplDto.content = 'asdfas';
    kplDto.kpId = 2;

    return await this.kplService.createKnowledgePointLog(kplDto);
  }

  @Put()
  async edit(@Body() kplDto: KnowledgePointLogDto): Promise<KnowledgePointLogEntity> {
    kplDto.content = 'asdfas';
    kplDto.kpId = 2;

    return await this.kplService.editKnowledgePointLog(kplDto);
  }

  @Delete(':id')
  async delete(@Param('id') logId: number): Promise<DeleteResult> {
    return await this.kplService.deleteKnowledgePointLog(logId);
  }

}

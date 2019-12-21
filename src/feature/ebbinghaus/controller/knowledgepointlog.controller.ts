import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { KnowledgePointLogService } from '../service/knowledgepointlog.service';
import { KnowledgePointLogDto } from '../dtos/KnowledgePointLogDto';
import { KnowledgePointLogEntity } from '../entities/knowledgepointlog.entity';
import { User } from '../../../shared/user/user.decorator';

@Controller('knowledgepointlogs')
export class KnowledgePointLogController {
  constructor(private kplService: KnowledgePointLogService) {}

  @Post()
  async create(@User('id') userId: number, @Body() kplDto: KnowledgePointLogDto): Promise<KnowledgePointLogEntity> {

    return await this.kplService.createKnowledgePointLog(userId, kplDto);
  }

}

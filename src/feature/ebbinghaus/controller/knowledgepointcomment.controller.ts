
import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { User } from 'src/shared/user/user.decorator';
import { KnowledgePointCommentService } from '../service/knowledgepointcomment.service';
import { KnowledgePointCommentDto } from '../dtos/KnowledgePointCommentDto';
import { KnowledgePointCommentEntity } from '../entities/knowledgepointcomment.entity';

@Controller('knowledgepointcomments')
export class KnowledgePointCommentController {
  constructor(private kpcService: KnowledgePointCommentService) {}

  @Post()
  async create(@User('id') userId: number, @Body() kpcDto: KnowledgePointCommentDto): Promise<KnowledgePointCommentEntity> {
    return await this.kpcService.createKnowledgePointComment(userId, kpcDto);
  }

  @Put()
  async edit(@User('id') userId: number, @Body() kpcDto: KnowledgePointCommentDto): Promise<KnowledgePointCommentEntity> {
    return await this.kpcService.editKnowledgePointComment(userId, kpcDto);
  }

  @Delete(':id')
  async delete(@User('id') userId: number, @Param('id') logId: number): Promise<DeleteResult> {
    return await this.kpcService.deleteKnowledgePointComment(userId, logId);
  }

}

import { EbbinghausService } from '../service/ebbinghaus.service';
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

@Controller('ebbinghaus')
export class EbbinghausController {
  constructor(private ehService: EbbinghausService) {}

  @Get()
  create(@Body() kpDto: KnowledgePointDto): Promise<KnowledgePointDto> {
    kpDto.userId = 12;
    kpDto.createDate = new Date();
    kpDto.content = "asdfas";
    kpDto.allDone = true;
    

    return this.ehService.createKnowledgePoint(kpDto);
  }
}

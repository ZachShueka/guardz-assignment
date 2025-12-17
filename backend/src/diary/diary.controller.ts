import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { DiaryEntryResponseDto } from './dto/diary-entry-response.dto';
import * as Docs from './diary.decorators';

@ApiTags('diary')
@Controller('entries')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) { }

  @Post()
  @Docs.ApiDiaryCreate()
  async create(@Body() createDto: CreateDiaryEntryDto): Promise<DiaryEntryResponseDto> {
    return this.diaryService.create(createDto);
  }

  @Get()
  @Docs.ApiDiaryFindAll()
  async findAll(): Promise<DiaryEntryResponseDto[]> {
    return this.diaryService.findAll();
  }

  @Get(':id')
  @Docs.ApiDiaryFindOne()
  async findOne(@Param('id') id: string): Promise<DiaryEntryResponseDto> {
    return this.diaryService.findOne(id);
  }

  @Patch(':id')
  @Docs.ApiDiaryUpdate()
  async update(@Param('id') id: string, @Body() updateDto: UpdateDiaryEntryDto): Promise<DiaryEntryResponseDto> {
    return this.diaryService.update(id, updateDto);
  }

  @Delete(':id')
  @Docs.ApiDiaryDelete()
  async remove(@Param('id') id: string): Promise<void> {
    return this.diaryService.remove(id);
  }
}
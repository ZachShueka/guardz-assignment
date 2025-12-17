import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { DiaryEntryResponseDto } from './dto/diary-entry-response.dto';
import {
  ApiDiaryCreate,
  ApiDiaryFindAll,
  ApiDiaryFindOne,
  ApiDiaryUpdate,
  ApiDiaryDelete,
} from './diary.decorators';

@ApiTags('diary')
@Controller('entries')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) { }

  @Post()
  @ApiDiaryCreate()
  async create(
    @Body() createDto: CreateDiaryEntryDto,
  ): Promise<DiaryEntryResponseDto> {
    return this.diaryService.create(createDto);
  }

  @Get()
  @ApiDiaryFindAll()
  async findAll(): Promise<DiaryEntryResponseDto[]> {
    return this.diaryService.findAll();
  }

  @Get(':id')
  @ApiDiaryFindOne()
  async findOne(@Param('id') id: string): Promise<DiaryEntryResponseDto> {
    return this.diaryService.findOne(id);
  }

  @Patch(':id')
  @ApiDiaryUpdate()
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDiaryEntryDto,
  ): Promise<DiaryEntryResponseDto> {
    return this.diaryService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiDiaryDelete()
  async remove(@Param('id') id: string): Promise<void> {
    return this.diaryService.remove(id);
  }
}

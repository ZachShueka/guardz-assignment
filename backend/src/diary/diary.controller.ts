import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { DiaryEntryResponseDto } from './dto/diary-entry-response.dto';

@ApiTags('diary')
@Controller('entries')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new diary entry',
    description: 'Creates a new diary entry with topic and body. Both fields are required and must meet length requirements.',
  })
  @ApiBody({
    type: CreateDiaryEntryDto,
    description: 'Diary entry data to create',
  })
  @ApiCreatedResponse({
    description: 'The diary entry has been successfully created.',
    type: DiaryEntryResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data. Topic must be 3-25 characters, body must be 10-1000 characters.',
  })
  async create(
    @Body() createDiaryEntryDto: CreateDiaryEntryDto,
  ): Promise<DiaryEntryResponseDto> {
    return this.diaryService.create(createDiaryEntryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all diary entries',
    description: 'Retrieves all diary entries sorted by creation date (newest first).',
  })
  @ApiOkResponse({
    description: 'List of all diary entries',
    type: [DiaryEntryResponseDto],
  })
  async findAll(): Promise<DiaryEntryResponseDto[]> {
    return this.diaryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a diary entry by ID',
    description: 'Retrieves a specific diary entry by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the diary entry',
    type: String,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({
    description: 'The diary entry has been found.',
    type: DiaryEntryResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Diary entry with the specified ID was not found.',
  })
  async findOne(@Param('id') id: string): Promise<DiaryEntryResponseDto> {
    return this.diaryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a diary entry',
    description: 'Updates an existing diary entry. You can update topic, body, or both. All fields are optional.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the diary entry to update',
    type: String,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdateDiaryEntryDto,
    description: 'Partial diary entry data to update',
  })
  @ApiOkResponse({
    description: 'The diary entry has been successfully updated.',
    type: DiaryEntryResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data. Topic must be 3-25 characters, body must be 10-1000 characters.',
  })
  @ApiNotFoundResponse({
    description: 'Diary entry with the specified ID was not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDiaryEntryDto: UpdateDiaryEntryDto,
  ): Promise<DiaryEntryResponseDto> {
    return this.diaryService.update(id, updateDiaryEntryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a diary entry',
    description: 'Permanently deletes a diary entry by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the diary entry to delete',
    type: String,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiNoContentResponse({
    description: 'The diary entry has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'Diary entry with the specified ID was not found.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.diaryService.remove(id);
  }
}




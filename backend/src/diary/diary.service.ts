import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { DiaryEntry } from './entities/diary-entry.entity';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';

@Injectable()
export class DiaryService {
  private readonly logger = new Logger(DiaryService.name);

  constructor(private readonly diaryRepository: DiaryRepository) { }

  async create(createDiaryEntryDto: CreateDiaryEntryDto): Promise<DiaryEntry> {
    this.logger.log(`Creating new diary entry: ${createDiaryEntryDto.topic}`);
    return this.diaryRepository.create(createDiaryEntryDto);
  }

  async findAll(): Promise<DiaryEntry[]> {
    this.logger.log('Fetching all diary entries');
    return this.diaryRepository.findAll();
  }

  async findOne(id: string): Promise<DiaryEntry> {
    this.logger.log(`Fetching diary entry with ID: ${id}`);
    const entry = await this.diaryRepository.findOne(id);
    if (entry === null) {
      this.logger.warn(`Diary entry with ID ${id} not found`);
      throw new NotFoundException(`Diary entry with ID ${id} not found`);
    }

    return entry;
  }

  async update(
    id: string,
    updateDiaryEntryDto: UpdateDiaryEntryDto,
  ): Promise<DiaryEntry> {
    this.logger.log(`Updating diary entry with ID: ${id}`);
    const updatedEntry = await this.diaryRepository.update(
      id,
      updateDiaryEntryDto,
    );

    if (updatedEntry === null) {
      this.logger.warn(`Failed to update: Diary entry with ID ${id} not found`);
      throw new NotFoundException(`Diary entry with ID ${id} not found`);
    }

    return updatedEntry;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing diary entry with ID: ${id}`);
    const isDeleted = await this.diaryRepository.remove(id);

    if (isDeleted === false) {
      this.logger.warn(`Failed to remove: Diary entry with ID ${id} not found`);
      throw new NotFoundException(`Diary entry with ID ${id} not found`);
    }
  }
}

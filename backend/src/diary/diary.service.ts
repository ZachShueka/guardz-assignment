import { Injectable, NotFoundException } from '@nestjs/common';
import { DiaryRepository } from './diary.repository';
import { DiaryEntry } from './entities/diary-entry.entity';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';

@Injectable()
export class DiaryService {
  constructor(private readonly diaryRepository: DiaryRepository) {}

  async create(createDiaryEntryDto: CreateDiaryEntryDto): Promise<DiaryEntry> {
    return this.diaryRepository.create(createDiaryEntryDto);
  }

  async findAll(): Promise<DiaryEntry[]> {
    return this.diaryRepository.findAll();
  }

  async findOne(id: string): Promise<DiaryEntry> {
    const entry = await this.diaryRepository.findOne(id);
    if (!entry) {
      throw new NotFoundException(`Diary entry with ID ${id} not found`);
    }

    return entry;
  }

  async update(
    id: string,
    updateDiaryEntryDto: UpdateDiaryEntryDto,
  ): Promise<DiaryEntry> {
    const updatedEntry = await this.diaryRepository.update(
      id,
      updateDiaryEntryDto,
    );

    if (!updatedEntry) {
      throw new NotFoundException(`Diary entry with ID ${id} not found`);
    }

    return updatedEntry;
  }

  async remove(id: string): Promise<void> {
    const result = await this.diaryRepository.remove(id);

    if (!result) {
      throw new NotFoundException(`Diary entry with ID ${id} not found`);
    }
  }
}

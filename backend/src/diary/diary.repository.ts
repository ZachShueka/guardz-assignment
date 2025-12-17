import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiaryEntry } from './entities/diary-entry.entity';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';

@Injectable()
export class DiaryRepository {
  constructor(
    @InjectRepository(DiaryEntry)
    private readonly typeOrmRepository: Repository<DiaryEntry>,
  ) {}

  async create(createDiaryEntryDto: CreateDiaryEntryDto): Promise<DiaryEntry> {
    const entry = this.typeOrmRepository.create(createDiaryEntryDto);
    return await this.typeOrmRepository.save(entry);
  }

  async findAll(): Promise<DiaryEntry[]> {
    return await this.typeOrmRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<DiaryEntry | null> {
    return await this.typeOrmRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateDiaryEntryDto: UpdateDiaryEntryDto,
  ): Promise<DiaryEntry | null> {
    const entry = await this.typeOrmRepository.preload({
      id,
      ...updateDiaryEntryDto,
    });

    if (entry === undefined) {
      return null;
    }

    return await this.typeOrmRepository.save(entry);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.typeOrmRepository.delete(id);

    return !!result.affected;
  }
}

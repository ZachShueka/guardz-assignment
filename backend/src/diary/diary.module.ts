import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DiaryRepository } from './diary.repository';
import { DiaryEntry } from './entities/diary-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryEntry])],
  controllers: [DiaryController],
  providers: [DiaryService, DiaryRepository],
  exports: [DiaryService],
})
export class DiaryModule {}




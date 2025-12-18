import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { CreateDiaryEntryDto } from '../src/diary/dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from '../src/diary/dto/update-diary-entry.dto';

/**
 * A helper client to encapsulate HTTP calls for Diary E2E tests.
 * This makes the tests more readable and easier to maintain.
 */
export class DiaryTestClient {
  constructor(private readonly app: INestApplication) {}

  private get server() {
    return this.app.getHttpServer();
  }

  async createEntry(dto: CreateDiaryEntryDto) {
    return request(this.server).post('/entries').send(dto);
  }

  async getAllEntries() {
    return request(this.server).get('/entries');
  }

  async getEntry(id: string) {
    return request(this.server).get(`/entries/${id}`);
  }

  async updateEntry(id: string, dto: UpdateDiaryEntryDto) {
    return request(this.server).patch(`/entries/${id}`).send(dto);
  }

  async deleteEntry(id: string) {
    return request(this.server).delete(`/entries/${id}`);
  }
}

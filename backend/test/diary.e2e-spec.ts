import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request = require('supertest');
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { DiaryEntry } from '../src/diary/entities/diary-entry.entity';
import { DiaryModule } from '../src/diary/diary.module';
import { CreateDiaryEntryDto } from '../src/diary/dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from '../src/diary/dto/update-diary-entry.dto';

describe('DiaryController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [DiaryEntry],
          synchronize: true,
          dropSchema: true,
        }),
        DiaryModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    dataSource = moduleFixture.get<DataSource>(DataSource);
    await app.init();
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  beforeEach(async () => {
    // Clean database before each test
    const repository: Repository<DiaryEntry> = dataSource.getRepository(DiaryEntry);
    await repository.clear();
  });

  describe('GET /entries', () => {
    it('should return an empty array when no entries exist', async () => {
      await request(app.getHttpServer())
        .get('/entries')
        .expect(200)
        .expect([]);
    });

    it('should return all diary entries sorted by createdAt DESC', async () => {
      const repository: Repository<DiaryEntry> = dataSource.getRepository(DiaryEntry);

      // Create test entries with different timestamps
      const entry1: DiaryEntry = repository.create({
        topic: 'First Entry',
        body: 'This is the first diary entry with enough text',
        createdAt: new Date('2024-01-01T10:00:00Z'),
        updatedAt: new Date('2024-01-01T10:00:00Z'),
      });

      const entry2: DiaryEntry = repository.create({
        topic: 'Second Entry',
        body: 'This is the second diary entry with enough text',
        createdAt: new Date('2024-01-02T10:00:00Z'),
        updatedAt: new Date('2024-01-02T10:00:00Z'),
      });

      await repository.save([entry1, entry2]);

      const response: request.Response = await request(app.getHttpServer())
        .get('/entries')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].topic).toBe('Second Entry');
      expect(response.body[1].topic).toBe('First Entry');
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('topic');
      expect(response.body[0]).toHaveProperty('body');
      expect(response.body[0]).toHaveProperty('createdAt');
      expect(response.body[0]).toHaveProperty('updatedAt');
    });

    it('should return entries with correct structure', async () => {
      const repository: Repository<DiaryEntry> = dataSource.getRepository(DiaryEntry);

      const entry: DiaryEntry = repository.create({
        topic: 'Test Entry',
        body: 'This is a test entry with enough characters to pass validation',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await repository.save(entry);

      const response: request.Response = await request(app.getHttpServer())
        .get('/entries')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject({
        topic: 'Test Entry',
        body: 'This is a test entry with enough characters to pass validation',
      });
      expect(response.body[0].id).toBeDefined();
      expect(response.body[0].createdAt).toBeDefined();
      expect(response.body[0].updatedAt).toBeDefined();
    });
  });

  describe('POST /entries', () => {
    it('should create a new diary entry successfully', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: 'New Entry',
        body: 'This is a new diary entry with enough text to pass validation',
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.topic).toBe(createDto.topic);
          expect(res.body.body).toBe(createDto.body);
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
          expect(typeof res.body.id).toBe('string');
        });
    });

    it('should return 400 when topic is too short', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: 'AB', // Less than 3 characters
        body: 'This is a valid body with enough characters',
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(400);
    });

    it('should return 400 when topic is too long', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: 'A'.repeat(26), // More than 25 characters
        body: 'This is a valid body with enough characters',
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(400);
    });

    it('should return 400 when body is too short', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: 'Valid Topic',
        body: 'Short', // Less than 10 characters
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(400);
    });

    it('should return 400 when body is too long', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: 'Valid Topic',
        body: 'A'.repeat(1001), // More than 1000 characters
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(400);
    });

    it('should return 400 when topic is missing', async () => {
      const createDto: Partial<CreateDiaryEntryDto> = {
        body: 'This is a valid body with enough characters',
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(400);
    });

    it('should return 400 when body is missing', async () => {
      const createDto: Partial<CreateDiaryEntryDto> = {
        topic: 'Valid Topic',
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(400);
    });

    it('should return 400 when topic is empty string', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: '',
        body: 'This is a valid body with enough characters',
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(400);
    });

    it('should create entry with minimum valid length values', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: 'ABC', // Exactly 3 characters
        body: '1234567890', // Exactly 10 characters
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.topic).toBe(createDto.topic);
          expect(res.body.body).toBe(createDto.body);
        });
    });

    it('should create entry with maximum valid length values', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: 'A'.repeat(25), // Exactly 25 characters
        body: 'A'.repeat(1000), // Exactly 1000 characters
      };

      await request(app.getHttpServer())
        .post('/entries')
        .send(createDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.topic).toBe(createDto.topic);
          expect(res.body.body).toBe(createDto.body);
        });
    });
  });

  describe('PATCH /entries/:id', () => {
    it('should update an existing diary entry', async () => {
      const repository: Repository<DiaryEntry> = dataSource.getRepository(DiaryEntry);

      // Create an entry first
      const entry: DiaryEntry = repository.create({
        topic: 'Original Topic',
        body: 'This is the original body text with enough characters',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const savedEntry: DiaryEntry = await repository.save(entry);

      const updateDto: UpdateDiaryEntryDto = {
        topic: 'Updated Topic',
        body: 'This is the updated body text with enough characters',
      };

      const response: request.Response = await request(app.getHttpServer())
        .patch(`/entries/${savedEntry.id}`)
        .send(updateDto)
        .expect(200);

      expect(response.body.topic).toBe(updateDto.topic);
      expect(response.body.body).toBe(updateDto.body);
      expect(response.body.id).toBe(savedEntry.id);
    });

    it('should return 404 when updating non-existent entry', async () => {
      const updateDto: UpdateDiaryEntryDto = {
        topic: 'Updated Topic',
        body: 'This is the updated body text with enough characters',
      };

      await request(app.getHttpServer())
        .patch('/entries/non-existent-id')
        .send(updateDto)
        .expect(404);
    });
  });
});


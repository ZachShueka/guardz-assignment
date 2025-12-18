import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { DiaryEntry } from '../src/diary/entities/diary-entry.entity';
import { DiaryModule } from '../src/diary/diary.module';
import { CreateDiaryEntryDto } from '../src/diary/dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from '../src/diary/dto/update-diary-entry.dto';
import { DiaryTestClient } from './diary-test-client';

describe('DiaryController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let client: DiaryTestClient;

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
    client = new DiaryTestClient(app);
    await app.init();
  });

  afterAll(async () => {
    await dataSource.destroy();
    await app.close();
  });

  beforeEach(async () => {
    const repository: Repository<DiaryEntry> =
      dataSource.getRepository(DiaryEntry);
    await repository.clear();
  });

  describe('GET /entries', () => {
    it('should return an empty array when no entries exist', async () => {
      // Act
      const response = await client.getAllEntries();

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all diary entries sorted by createdAt DESC', async () => {
      // Arrange
      const repository: Repository<DiaryEntry> =
        dataSource.getRepository(DiaryEntry);

      await repository.save([
        {
          topic: 'First Entry',
          body: 'This is the first diary entry with enough text',
          createdAt: new Date('2024-01-01T10:00:00Z'),
        },
        {
          topic: 'Second Entry',
          body: 'This is the second diary entry with enough text',
          createdAt: new Date('2024-01-02T10:00:00Z'),
        },
      ]);

      // Act
      const response = await client.getAllEntries();

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].topic).toBe('Second Entry');
      expect(response.body[1].topic).toBe('First Entry');
    });
  });

  describe('POST /entries', () => {
    it('should create a new diary entry successfully', async () => {
      // Arrange
      const createDto: CreateDiaryEntryDto = {
        topic: 'New Entry',
        body: 'This is a new diary entry with enough text to pass validation',
      };

      // Act
      const response = await client.createEntry(createDto);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(createDto);
      expect(response.body.id).toBeDefined();
    });

    it('should return 400 when validation fails (topic too short)', async () => {
      // Arrange
      const createDto: CreateDiaryEntryDto = {
        topic: 'AB',
        body: 'This is a valid body with enough characters',
      };

      // Act
      const response = await client.createEntry(createDto);

      // Assert
      expect(response.status).toBe(400);
    });
  });

  describe('PATCH /entries/:id', () => {
    it('should update an existing diary entry', async () => {
      // Arrange
      const repository: Repository<DiaryEntry> =
        dataSource.getRepository(DiaryEntry);
      const savedEntry = await repository.save({
        topic: 'Original Topic',
        body: 'This is the original body text with enough characters',
      });

      const updateDto: UpdateDiaryEntryDto = {
        topic: 'Updated Topic',
      };

      // Act
      const response = await client.updateEntry(savedEntry.id, updateDto);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.topic).toBe(updateDto.topic);
      expect(response.body.id).toBe(savedEntry.id);
    });
  });

  describe('DELETE /entries/:id', () => {
    it('should delete an existing entry', async () => {
      // Arrange
      const repository: Repository<DiaryEntry> =
        dataSource.getRepository(DiaryEntry);
      const savedEntry = await repository.save({
        topic: 'To Delete',
        body: 'This is a body that will be deleted shortly',
      });

      // Act
      const deleteResponse = await client.deleteEntry(savedEntry.id);
      const getResponse = await client.getEntry(savedEntry.id);

      // Assert
      expect(deleteResponse.status).toBe(204);
      expect(getResponse.status).toBe(404);
    });
  });
});

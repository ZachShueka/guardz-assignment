import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryRepository } from './diary.repository';
import { DiaryEntry } from './entities/diary-entry.entity';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';


describe('DiaryService', () => {
  let service: DiaryService;
  let repository: DiaryRepository;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiaryService,
        {
          provide: DiaryRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DiaryService>(DiaryService);
    repository = module.get<DiaryRepository>(DiaryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of diary entries sorted by createdAt DESC', async () => {
      const mockEntries: DiaryEntry[] = [
        {
          id: '1',
          topic: 'Test Topic 1',
          body: 'Test body 1',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date('2024-01-02'),
        },
        {
          id: '2',
          topic: 'Test Topic 2',
          body: 'Test body 2',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-01'),
        },
      ];

      mockRepository.findAll.mockResolvedValue(mockEntries);

      const result = await service.findAll();

      expect(result).toEqual(mockEntries);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no entries exist', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create and return a new diary entry', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: 'New Topic',
        body: 'This is a new diary entry body text',
      };

      const mockEntry: DiaryEntry = {
        id: '1',
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.create.mockResolvedValue(mockEntry);

      const result = await service.create(createDto);

      expect(result).toEqual(mockEntry);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });

    it('should handle repository errors during creation', async () => {
      const createDto: CreateDiaryEntryDto = {
        topic: 'New Topic',
        body: 'This is a new diary entry body text',
      };

      const error = new Error('Database error');
      mockRepository.create.mockRejectedValue(error);

      await expect(service.create(createDto)).rejects.toThrow(error);
      expect(repository.create).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findOne', () => {
    it('should return a diary entry when found', async () => {
      const mockEntry: DiaryEntry = {
        id: '1',
        topic: 'Test Topic',
        body: 'Test body',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(mockEntry);

      const result = await service.findOne('1');

      expect(result).toEqual(mockEntry);
      expect(repository.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException when entry not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findOne('non-existent')).rejects.toThrow(
        'Diary entry with ID non-existent not found',
      );
      expect(repository.findOne).toHaveBeenCalledWith('non-existent');
    });
  });

  describe('update', () => {
    it('should update and return the updated diary entry', async () => {
      const existingEntry: DiaryEntry = {
        id: '1',
        topic: 'Original Topic',
        body: 'Original body',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updateDto: UpdateDiaryEntryDto = {
        topic: 'Updated Topic',
      };

      const updatedEntry: DiaryEntry = {
        ...existingEntry,
        ...updateDto,
        updatedAt: new Date(),
      };

      mockRepository.update.mockResolvedValue(updatedEntry);

      const result = await service.update('1', updateDto);

      expect(result).toEqual(updatedEntry);
      expect(repository.update).toHaveBeenCalledWith('1', updateDto);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when entry not found', async () => {
      const updateDto: UpdateDiaryEntryDto = {
        topic: 'New Topic',
      };

      mockRepository.update.mockResolvedValue(null);

      await expect(service.update('non-existent', updateDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.update('non-existent', updateDto)).rejects.toThrow(
        'Diary entry with ID non-existent not found',
      );
      expect(repository.update).toHaveBeenCalledWith('non-existent', updateDto);
    });
  });

  describe('remove', () => {
    it('should remove the diary entry', async () => {
      mockRepository.remove.mockResolvedValue(true);

      await service.remove('1');

      expect(repository.remove).toHaveBeenCalledWith('1');
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when entry not found', async () => {
      mockRepository.remove.mockResolvedValue(false);

      await expect(service.remove('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.remove('non-existent')).rejects.toThrow(
        'Diary entry with ID non-existent not found',
      );
      expect(repository.remove).toHaveBeenCalledWith('non-existent');
    });
  });
});

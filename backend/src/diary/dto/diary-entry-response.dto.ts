import { ApiProperty } from '@nestjs/swagger';

export class DiaryEntryResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the diary entry',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'The topic or title of the diary entry',
    example: 'My First Entry',
    type: String,
  })
  topic: string;

  @ApiProperty({
    description: 'The body content of the diary entry',
    example:
      'This is my first diary entry. I am excited to start documenting my thoughts and experiences.',
    type: String,
  })
  body: string;

  @ApiProperty({
    description: 'Timestamp when the diary entry was created',
    example: '2024-01-15T10:30:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the diary entry was last updated',
    example: '2024-01-15T10:30:00.000Z',
    type: Date,
  })
  updatedAt: Date;
}

import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export function IsDiaryTopic() {
  return applyDecorators(
    ApiProperty({
      description: 'The topic or title of the diary entry',
      example: 'My First Entry',
      minLength: 3,
      maxLength: 25,
      type: String,
    }),
    Transform(({ value }: { value: unknown }): unknown =>
      typeof value === 'string' ? value.trim() : value,
    ),
    IsString({ message: 'Topic must be a string' }),
    IsNotEmpty({
      message: 'Topic is required and cannot be empty or only whitespace',
    }),
    MinLength(3, { message: 'Topic must be at least 3 characters' }),
    MaxLength(25, { message: 'Topic must be 25 characters or less' }),
  );
}

export function IsDiaryBody() {
  return applyDecorators(
    ApiProperty({
      description: 'The body content of the diary entry',
      example:
        'This is my first diary entry. I am excited to start documenting my thoughts and experiences.',
      minLength: 10,
      maxLength: 1000,
      type: String,
    }),
    Transform(({ value }: { value: unknown }): unknown =>
      typeof value === 'string' ? value.trim() : value,
    ),
    IsString({ message: 'Body must be a string' }),
    IsNotEmpty({
      message: 'Body is required and cannot be empty or only whitespace',
    }),
    MinLength(10, { message: 'Body must be at least 10 characters' }),
    MaxLength(1000, { message: 'Body must be 1000 characters or less' }),
  );
}

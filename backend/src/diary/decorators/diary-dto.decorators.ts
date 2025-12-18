import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

type DiaryFieldOptions = {
  description: string;
  example: string;
  minLength: number;
  maxLength: number;
  swaggerOptions?: Partial<ApiPropertyOptions>;
}

export function IsDiaryField(options: DiaryFieldOptions) {
  const { description, example, minLength, maxLength, swaggerOptions } =
    options;

  return applyDecorators(
    ApiProperty({
      description,
      example,
      minLength,
      maxLength,
      ...(swaggerOptions as ApiPropertyOptions),
    }),
    Transform(({ value }: { value: unknown }): unknown =>
      typeof value === 'string' ? value.trim() : value,
    ),
    IsString({ message: `${description} must be a string` }),
    IsNotEmpty({
      message: `${description} is required and cannot be empty`,
    }),
    MinLength(minLength, {
      message: `${description} must be at least ${minLength} characters`,
    }),
    MaxLength(maxLength, {
      message: `${description} must be ${maxLength} characters or less`,
    }),
  );
}

export const IsDiaryTopic = () =>
  IsDiaryField({
    description: 'Topic',
    example: 'My First Entry',
    minLength: 3,
    maxLength: 25,
  });

export const IsDiaryBody = () =>
  IsDiaryField({
    description: 'Body',
    example: 'This is my first diary entry content...',
    minLength: 10,
    maxLength: 1000,
  });


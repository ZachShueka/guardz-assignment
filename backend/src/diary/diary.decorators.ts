import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
    ApiOperation,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiParam,
    ApiNoContentResponse,
} from '@nestjs/swagger';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { UpdateDiaryEntryDto } from './dto/update-diary-entry.dto';
import { DiaryEntryResponseDto } from './dto/diary-entry-response.dto';

export function ApiDiaryCreate() {
    return applyDecorators(
        HttpCode(HttpStatus.CREATED),
        ApiOperation({
            summary: 'Create a new diary entry',
            description: 'Creates a new diary entry with topic and body. Both fields are required.',
        }),
        ApiBody({ type: CreateDiaryEntryDto, description: 'Diary entry data to create' }),
        ApiCreatedResponse({ description: 'The diary entry has been successfully created.', type: DiaryEntryResponseDto }),
        ApiBadRequestResponse({ description: 'Invalid input data. Topic (3-25 chars), Body (10-1000 chars).' }),
    );
}

export function ApiDiaryFindAll() {
    return applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({
            summary: 'Get all diary entries',
            description: 'Retrieves all diary entries sorted by creation date (newest first).',
        }),
        ApiOkResponse({ description: 'List of all diary entries', type: [DiaryEntryResponseDto] }),
    );
}

export function ApiDiaryFindOne() {
    return applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({ summary: 'Get a diary entry by ID' }),
        ApiParam({
            name: 'id',
            description: 'Unique identifier of the diary entry',
            format: 'uuid',
            example: '123e4567-e89b-12d3-a456-426614174000',
        }),
        ApiOkResponse({ description: 'The diary entry has been found.', type: DiaryEntryResponseDto }),
        ApiNotFoundResponse({ description: 'Diary entry with the specified ID was not found.' }),
    );
}

export function ApiDiaryUpdate() {
    return applyDecorators(
        HttpCode(HttpStatus.OK),
        ApiOperation({
            summary: 'Update a diary entry',
            description: 'Updates an existing diary entry. All fields are optional.',
        }),
        ApiParam({ name: 'id', format: 'uuid', example: '123e4567-e89b-12d3-a456-426614174000' }),
        ApiBody({ type: UpdateDiaryEntryDto }),
        ApiOkResponse({ description: 'The diary entry has been successfully updated.', type: DiaryEntryResponseDto }),
        ApiBadRequestResponse({ description: 'Invalid input data.' }),
        ApiNotFoundResponse({ description: 'Diary entry not found.' }),
    );
}

export function ApiDiaryDelete() {
    return applyDecorators(
        HttpCode(HttpStatus.NO_CONTENT),
        ApiOperation({ summary: 'Delete a diary entry' }),
        ApiParam({ name: 'id', format: 'uuid' }),
        ApiNoContentResponse({ description: 'The diary entry has been successfully deleted.' }),
        ApiNotFoundResponse({ description: 'Diary entry not found.' }),
    );
}
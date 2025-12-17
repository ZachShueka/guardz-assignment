import { IsDiaryTopic, IsDiaryBody } from '../decorators/validation.decorators';

export class CreateDiaryEntryDto {
  @IsDiaryTopic()
  topic: string;

  @IsDiaryBody()
  body: string;
}

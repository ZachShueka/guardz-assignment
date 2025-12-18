import z from "zod";

export const MAX_TOPIC_LENGTH = 25;
export const MIN_TOPIC_LENGTH = 3;
export const MAX_BODY_LENGTH = 1000;
export const MIN_BODY_LENGTH = 10;

export const diarySchema = z.object({
    topic: z
      .string()
      .trim()
      .min(1, 'Topic is required')
      .min(MIN_TOPIC_LENGTH, 'Topic must be at least 3 characters')
      .max(MAX_TOPIC_LENGTH, 'Topic must be 25 characters or less'),
    body: z
      .string()
      .trim()
      .min(1, 'Body is required')
      .min(MIN_BODY_LENGTH, 'Body must be at least 10 characters')
      .max(MAX_BODY_LENGTH, 'Body must be 1000 characters or less'),
  });
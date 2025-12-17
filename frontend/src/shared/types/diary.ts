export type DiaryEntry = {
  id?: string;
  topic: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

export type DiaryFormData = {
  topic: string;
  body: string;
}


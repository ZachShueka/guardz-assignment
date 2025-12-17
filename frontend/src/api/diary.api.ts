import { axiosInstance } from './axiosInstance';
import type { DiaryEntry } from '../shared/types/diary';

export const diaryApi = {
  getAllEntries: async (): Promise<DiaryEntry[]> => {
    const { data } = await axiosInstance.get<DiaryEntry[]>('/entries');
    return data;
  },

  createEntry: async (entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<DiaryEntry> => {
    const { data } = await axiosInstance.post<DiaryEntry>('/entries', entry);
    return data;
  },

  updateEntry: async (
    id: string,
    entry: Partial<Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<DiaryEntry> => {
    const { data } = await axiosInstance.patch<DiaryEntry>(`/entries/${id}`, entry);
    return data;
  },

  deleteEntry: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/entries/${id}`);
  },
};








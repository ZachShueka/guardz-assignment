import { axiosInstance } from './axiosInstance';
import type { DiaryEntry } from '../shared/types/diary';


const SERVICE_PREFIX = '/entries';

export const diaryApi = {
  getAllEntries: async (): Promise<DiaryEntry[]> => {
    const { data } = await axiosInstance.get<DiaryEntry[]>(SERVICE_PREFIX);
    return data;
  },

  createEntry: async (entry: Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<DiaryEntry> => {
    const { data } = await axiosInstance.post<DiaryEntry>(SERVICE_PREFIX, entry);
    return data;
  },

  updateEntry: async (
    id: string,
    entry: Partial<Omit<DiaryEntry, 'id' | 'createdAt' | 'updatedAt'>>,
  ): Promise<DiaryEntry> => {
    const { data } = await axiosInstance.patch<DiaryEntry>(`${SERVICE_PREFIX}/${id}`, entry);
    return data;
  },

  deleteEntry: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${SERVICE_PREFIX}/${id}`);
  },
};



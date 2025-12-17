import { useState, useEffect, useCallback } from 'react';
import { diaryApi } from '../api/diary.api';
import type { DiaryEntry, DiaryFormData } from '../shared/types/diary';
import type { ApiError } from '../api/axiosInstance';

export const useDiaries = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await diaryApi.getAllEntries();
      setEntries(data);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to load diary entries. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createEntry = useCallback(async (data: DiaryFormData): Promise<DiaryEntry | void> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const newEntry = await diaryApi.createEntry(data);
      setEntries((prev) => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to create diary entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const updateEntry = useCallback(async (id: string, data: DiaryFormData): Promise<DiaryEntry | void> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const updatedEntry = await diaryApi.updateEntry(id, data);
      setEntries((prev) =>
        prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
      );
      return updatedEntry;
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to update diary entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const deleteEntry = useCallback(async (id: string): Promise<void> => {
    setError(null);
    try {
      await diaryApi.deleteEntry(id);
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to delete diary entry. Please try again.');
    }
  }, []);

  const handleDiarySubmit = useCallback(
    async (editingEntry: DiaryEntry | null, data: DiaryFormData): Promise<void> => {
      if (editingEntry && editingEntry.id) {
        await updateEntry(editingEntry.id, data);
      } else {
        await createEntry(data);
      }
    },
    [createEntry, updateEntry]
  );


  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return {
    entries,
    isLoading,
    isSubmitting,
    error,
    fetchEntries,
    createEntry,
    updateEntry,
    deleteEntry,
    handleDiarySubmit,
    handleDiaryDelete: deleteEntry,
    clearError,
  };
};


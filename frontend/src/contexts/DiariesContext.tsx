import { createContext, useContext, type ReactNode } from 'react';
import { useDiaries } from '../hooks/useDiaries';
import type { DiaryEntry, DiaryFormData } from '../shared/types/diary';

type DiariesContextType = {
  entries: DiaryEntry[];
  isLoading: boolean;
  error: string | null;
  isSubmitting: boolean;
  handleDiarySubmit: (editingEntry: DiaryEntry | null, data: DiaryFormData) => Promise<void>;
  handleDiaryDelete: (id: string) => Promise<void>;
  clearError: () => void;
}

const DiariesContext = createContext<DiariesContextType | undefined>(undefined);

export const DiariesProvider = ({ children }: { children: ReactNode }) => {
  const diaries = useDiaries();

  return (
    <DiariesContext.Provider value={diaries}>
      {children}
    </DiariesContext.Provider>
  );
};

export const useDiariesContext = () => {
  const context = useContext(DiariesContext);
  if (context === undefined) {
    throw new Error('useDiariesContext must be used within a DiariesProvider');
  }
  return context;
};


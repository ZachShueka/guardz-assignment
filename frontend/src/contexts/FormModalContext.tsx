import { createContext, useContext, type ReactNode } from 'react';
import { useToggleModal } from '../hooks/useToggleModal';
import type { DiaryEntry } from '../shared/types/diary';
import { FormModal } from '../components/FormModal';

type FormModalContextType = {
  isFormModalOpen: boolean;
  editingEntry: DiaryEntry | null;
  openModal: (entry?: DiaryEntry) => void;
  closeModal: () => void;
}

const FormModalContext = createContext<FormModalContextType | undefined>(undefined);

export const FormModalProvider = ({ children }: { children: ReactNode }) => {
  const formModal = useToggleModal();

  return (
    <FormModalContext.Provider value={formModal}>
      {children}
      {formModal.isFormModalOpen && <FormModal />}
    </FormModalContext.Provider>
  );
};

export const useFormModalContext = () => {
  const context = useContext(FormModalContext);
  if (context === undefined) {
    throw new Error('useFormModalContext must be used within a FormModalProvider');
  }
  return context;
};


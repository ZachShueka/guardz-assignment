import { DiaryForm } from '../DiaryForm';
import type { DiaryFormData } from '../../shared/types/diary';
import { useFormModalContext } from '../../contexts';
import { useDiariesContext } from '../../contexts';
import './FormModal.css';
import { useMemo } from 'react';

export const FormModal = () => {
  const {
    editingEntry,
    closeModal,
  } = useFormModalContext();

  const { handleDiarySubmit, isSubmitting } = useDiariesContext();

  
  const initialValues = useMemo(()=> 
     editingEntry
      ? { topic: editingEntry.topic, body: editingEntry.body }
      : undefined
  , [editingEntry]);

  const modalTitle = useMemo(
    ()=> editingEntry ? 'Edit Diary Entry' : 'New Diary Entry'
  , [editingEntry]);


  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  const handleFormSubmit = async (data: DiaryFormData) => {
    try {
      await handleDiarySubmit(editingEntry, data);
      closeModal();
    } catch (error) {
      closeModal();
    }
  };

  return (
    <div
      className="form-modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
    >
      <div className="form-modal-content">
        <div className="form-modal-header">
          <h2 id="form-modal-title">{modalTitle}</h2>
          <button
            className="form-modal-close"
            onClick={closeModal}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className="form-modal-body">
          <DiaryForm
            onSubmit={handleFormSubmit}
            isLoading={isSubmitting}
            initialValues={initialValues}
          />
        </div>
      </div>
    </div>
  );
};



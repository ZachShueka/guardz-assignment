import  { useState, useCallback } from "react";
import type { DiaryEntry } from "../shared/types/diary";

export const useToggleModal = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);

  const openModal = useCallback((entry?: DiaryEntry) => {
    setEditingEntry(entry ?? null);
    setIsFormModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsFormModalOpen(false);
    setEditingEntry(null);
  }, []);

  return {
    isFormModalOpen,
    editingEntry,
    openModal,
    closeModal,
  };
};


 
import { useCallback, useState } from 'react';
import type { DiaryEntry } from '../../shared/types/diary';
import { useFormModalContext, useDiariesContext } from '../../contexts';
import { formatDate } from '../../shared/utils';
import { KEYBOARD_KEYS } from '../../shared/constants';
import { DeleteConfirmation } from '../DeleteConfirmation';
import './DiaryModal.css';

type EntryModalProps = {
  entry: DiaryEntry;
  onClose: () => void;
}

export const EntryModal = ({
  entry,
  onClose,
}: EntryModalProps) => {
  const { openModal } = useFormModalContext();
  const { handleDiaryDelete } = useDiariesContext();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== KEYBOARD_KEYS.ESCAPE) return;
    
      if (showDeleteConfirm) {
        setShowDeleteConfirm(false);
      } else {
        onClose();
      }
    
  }, [onClose, showDeleteConfirm]);

  const handleEdit = useCallback(() => {
    openModal(entry);
    onClose();
  }, [entry, openModal, onClose]);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (entry.id) {
      handleDiaryDelete(entry.id);
      onClose();
    }
  }, [entry.id, handleDiaryDelete, onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">{entry.topic}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {entry.createdAt && (
          <time className="modal-date" dateTime={entry.createdAt}>
            {formatDate(entry.createdAt)}
          </time>
        )}

        <div className="modal-body">
          <p>{entry.body}</p>
        </div>

        <div className="modal-actions">
          {!showDeleteConfirm ? (
            <>
              <button
                className="modal-action-button edit-button"
                onClick={handleEdit}
                aria-label="Edit entry"
              >
                ✏️ Edit
              </button>

              <button
                className="modal-action-button delete-button"
                onClick={handleDeleteClick}
                aria-label="Delete entry"
              >
                🗑️ Delete
              </button>
            </>
          ) : (
            <DeleteConfirmation 
              onConfirm={handleConfirmDelete} 
              onCancel={handleCancelDelete} 
            />
          )}
        </div>
      </div>
    </div>
  );
};



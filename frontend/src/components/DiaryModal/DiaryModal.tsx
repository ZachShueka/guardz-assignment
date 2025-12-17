import type { DiaryEntry } from '../../shared/types/diary';
import { useFormModalContext } from '../../contexts';
import { useDiariesContext } from '../../contexts';
import { formatDate } from '../../shared/utils';
import './DiaryModal.css';
import { useCallback } from 'react';

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

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  },
    [onClose]
  );

  const handleEdit = useCallback(() => {
    openModal(entry);
    onClose();
  },
    [entry, openModal, onClose]
  );

  const handleDelete = useCallback(() => {
      if (entry.id && window.confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
        handleDiaryDelete(entry.id);
        onClose();
      }
  },
    [entry.id, handleDiaryDelete, onClose]
  );

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
          <button
            className="modal-action-button edit-button"
            onClick={handleEdit}
            aria-label="Edit entry"
          >
            ✏️ Edit
          </button>

          <button
            className="modal-action-button delete-button"
            onClick={handleDelete}
            aria-label="Delete entry"
          >
            🗑️ Delete
          </button>

        </div>
      </div>
    </div>
  );
};



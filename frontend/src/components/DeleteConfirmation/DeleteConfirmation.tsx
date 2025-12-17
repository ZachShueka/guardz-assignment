import './DeleteConfirmation.css';

type DeleteConfirmationProps = {
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
};

export const DeleteConfirmation = ({
  onConfirm,
  onCancel,
  message = 'Are you sure? This action cannot be undone.',
}: DeleteConfirmationProps) => {
  return (
    <div className="delete-confirmation">
      <p className="confirmation-message">{message}</p>
      <div className="confirmation-buttons">
        <button
          className="confirm-button"
          onClick={onConfirm}
          aria-label="Confirm deletion"
        >
          Confirm Delete
        </button>
        <button
          className="cancel-button"
          onClick={onCancel}
          aria-label="Cancel deletion"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};



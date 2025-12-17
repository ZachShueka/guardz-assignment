import './SubmitButton.css';

interface SubmitButtonProps {
  isLoading: boolean;
  disabled?: boolean;
  label?: string;
  loadingLabel?: string;
}

export const SubmitButton = ({
  isLoading,
  disabled = false,
  label = 'Save Entry',
  loadingLabel = 'Saving...',
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="submit-button"
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <span className="spinner"></span>
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
};


import './ErrorBanner.css';

type ErrorBannerProps = {
  message: string;
  onDismiss: () => void;
}

export const ErrorBanner = ({ message, onDismiss }: ErrorBannerProps) => {
  return (
    <div className="error-banner" role="alert">
      <span className="error-icon">⚠️</span>
      <span>{message}</span>
      <button
        className="error-dismiss"
        onClick={onDismiss}
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
};



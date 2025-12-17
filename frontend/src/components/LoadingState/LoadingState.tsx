import './LoadingState.css';

export const LoadingState = () => {
  return (
    <div className="diary-list-container">
      <div className="loading-state">
        <div className="spinner-large"></div>
        <p>Loading entries...</p>
      </div>
    </div>
  );
};



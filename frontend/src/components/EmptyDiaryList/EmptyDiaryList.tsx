import './EmptyDiaryList.css';

export const EmptyDiaryList = () => {
  return (
    <div className="diary-list-container">
      <div className="empty-state">
        <div className="empty-icon">📔</div>
        <h3>No entries yet</h3>
        <p>Click "New Entry" to create your first diary entry!</p>
      </div>
    </div>
  );
};



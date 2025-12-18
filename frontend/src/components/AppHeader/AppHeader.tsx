import { useFormModalContext } from '../../contexts';
import './AppHeader.css';

export const AppHeader = () => {
  const { openModal } = useFormModalContext();

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">
          <span className="title-icon">📖</span>
          My Diary
        </h1>
        <p className="app-subtitle">Capture your thoughts and memories</p>
        <button className="new-entry-button" onClick={() => openModal()}>
          + New Entry
        </button>
      </div>
    </header>
  );
};



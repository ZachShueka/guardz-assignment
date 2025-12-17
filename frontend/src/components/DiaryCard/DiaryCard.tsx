import { useCallback } from 'react';
import type { DiaryEntry } from '../../shared/types/diary';
import { formatDate, truncateText } from '../../shared/utils';
import './DiaryCard.css';

type DiaryCardProps = {
  entry: DiaryEntry;
  onClick: (entry: DiaryEntry) => void;
}

export const DiaryCard = ({ entry, onClick }: DiaryCardProps) => {
  
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(entry);
      }
    },
    [entry, onClick]
  );

  return (
    <article
      className="diary-entry-card"
      onClick={() => onClick(entry)}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`View entry: ${entry.topic}`}
    >
      <div className="entry-header">
        <h3 className="entry-topic">{entry.topic}</h3>
        {entry.createdAt && (
          <time className="entry-date" dateTime={entry.createdAt}>
            {formatDate(entry.createdAt)}
          </time>
        )}
      </div>
      <div className="entry-body">
        <p>{truncateText(entry.body)}</p>
      </div>
      <div className="entry-read-more">Click to read more →</div>
    </article>
  );
};



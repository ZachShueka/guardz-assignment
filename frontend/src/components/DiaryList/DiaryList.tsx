import { useState, useMemo, useCallback } from 'react';
import type { DiaryEntry } from '../../shared/types/diary';
import { EntryModal } from '../DiaryModal';
import { ErrorBanner } from '../ErrorBanner';
import { Pagination } from '../Pagination';
import { DiaryCard } from '../DiaryCard';
import { LoadingState } from '../LoadingState';
import { EmptyDiaryList } from '../EmptyDiaryList';
import { useDiariesContext } from '../../contexts';
import { usePagination } from '../../hooks/usePagination';
import { ENTRIES_PER_PAGE } from './constants';
import './DiaryList.css';

export const DiaryList = () => {
  const { entries, isLoading, error, clearError } = useDiariesContext();
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isDiaryCardModalOpen, setIsDiaryCardModalOpen] = useState(false);

  const { currentPage, totalPages, paginatedItems, handlePageChange, pageNumbers } =
    usePagination({
      totalItems: entries.length,
      itemsPerPage: ENTRIES_PER_PAGE,
    });

  const paginatedEntries = useMemo(() => {
    return entries.slice(paginatedItems.startIndex, paginatedItems.endIndex);
  }, [entries, paginatedItems]);

  const handleEntryClick = useCallback((entry: DiaryEntry) => {
    setSelectedEntry(entry);
    setIsDiaryCardModalOpen(true);
  }, []);

  const handleCloseDiaryCardModal = useCallback(() => {
    setIsDiaryCardModalOpen(false);
    setSelectedEntry(null);
  }, []);

  if (isLoading) {
    return <LoadingState />;
  }

  if (entries.length === 0) {
    return <EmptyDiaryList />;
  }

  return (
    <>
      <div className="diary-list-container">
        {error && <ErrorBanner message={error} onDismiss={clearError} />}
        <div className="list-header">
          <h2>Your Diary Entries</h2>
          <span className="entry-count">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
        </div>
        <div className="entries-grid">
          {paginatedEntries.map((entry: DiaryEntry) => (
            <DiaryCard key={entry.id || Math.random()} entry={entry} onClick={handleEntryClick} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageNumbers={pageNumbers}
        />
      </div>

      { isDiaryCardModalOpen && selectedEntry && <EntryModal
        entry={selectedEntry}
        onClose={handleCloseDiaryCardModal}
      />}
    </>
  );
};



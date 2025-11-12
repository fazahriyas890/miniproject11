import React, { useState, useMemo } from 'react';
import { SummaryResult } from '../types';
import { DeleteIcon, SearchIcon } from '../components/icons/Icons';
import SummaryResultCard from '../components/SummaryResultCard';
import { useSummaryHistory } from '../hooks/useSummaryHistory';
import Modal from '../components/Modal';

const HistoryPage: React.FC = () => {
    const { history, deleteSummary } = useSummaryHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSummary, setSelectedSummary] = useState<SummaryResult | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [summaryToDelete, setSummaryToDelete] = useState<string | null>(null);

    const filteredHistory = useMemo(() => {
        return history.filter(item => 
            item.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [history, searchTerm]);
    
    const openDeleteModal = (id: string) => {
        setSummaryToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (summaryToDelete) {
            deleteSummary(summaryToDelete);
            if(selectedSummary?.id === summaryToDelete) {
                setSelectedSummary(null);
            }
        }
        setIsModalOpen(false);
        setSummaryToDelete(null);
    };
    
    if (selectedSummary) {
        return (
            <div className="max-w-4xl mx-auto">
                <button 
                    onClick={() => setSelectedSummary(null)}
                    className="mb-6 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-100 font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-accent"
                >
                    &larr; Back to History
                </button>
                <SummaryResultCard result={selectedSummary} />
            </div>
        );
    }

  return (
    <>
    <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Summary"
        onConfirm={confirmDelete}
    >
        <p className="text-neutral-400">Are you sure you want to permanently delete this summary? This action cannot be undone.</p>
    </Modal>
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-neutral-100 mb-6">Summary History</h1>
      
      <div className="relative mb-6">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon />
        </span>
        <input
            type="text"
            placeholder="Search by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="space-y-4">
        {filteredHistory.length > 0 ? filteredHistory.map(item => (
            <div key={item.id} className="bg-neutral-800 rounded-lg flex items-center justify-between hover:bg-neutral-700/50 transition-colors border border-neutral-700">
                <div className="flex-grow cursor-pointer p-4" onClick={() => setSelectedSummary(item)}>
                    <p className="font-semibold text-neutral-100">{item.videoTitle}</p>
                    <p className="text-sm text-neutral-400 truncate pr-4">{item.summary}</p>
                    <p className="text-xs text-neutral-500 mt-1">{item.createdAt}</p>
                </div>
                <button 
                    onClick={() => openDeleteModal(item.id)}
                    className="p-3 m-2 text-neutral-400 hover:text-system-error rounded-full hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-accent"
                    aria-label="Delete summary"
                >
                    <DeleteIcon />
                </button>
            </div>
        )) : (
            <div className="text-center py-10 px-6 bg-neutral-800 rounded-lg border border-dashed border-neutral-700">
                <h3 className="text-xl font-medium text-neutral-100">No Summaries Found</h3>
                <p className="mt-2 text-neutral-400">Your generated summaries will appear here. Try summarizing a video!</p>
            </div>
        )}
      </div>
    </div>
    </>
  );
};

export default HistoryPage;
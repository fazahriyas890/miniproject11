import { useState, useEffect, useCallback } from 'react';
import { SummaryResult } from '../types';

const HISTORY_STORAGE_KEY = 'yt-summarizer-history';

export const useSummaryHistory = () => {
  const [history, setHistory] = useState<SummaryResult[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to load summary history from localStorage", error);
      setHistory([]);
    }
  }, []);

  const saveHistory = (newHistory: SummaryResult[]) => {
    try {
      const sortedHistory = newHistory.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(sortedHistory));
      setHistory(sortedHistory);
    } catch (error) {
      console.error("Failed to save summary history to localStorage", error);
    }
  };

  const addSummary = useCallback((summary: SummaryResult) => {
    setHistory(prevHistory => {
        const updatedHistory = [summary, ...prevHistory];
        saveHistory(updatedHistory);
        return updatedHistory;
    });
  }, []);


  const deleteSummary = useCallback((id: string) => {
    setHistory(prevHistory => {
        const updatedHistory = prevHistory.filter(item => item.id !== id);
        saveHistory(updatedHistory);
        return updatedHistory;
    });
  }, []);

  return { history, addSummary, deleteSummary };
};

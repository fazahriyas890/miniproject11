import React, { useState, useCallback } from 'react';
import { SummaryFormat, SummaryResult } from '../types';
import { generateSummary } from '../services/geminiService';
import { getYouTubeVideoDetails } from '../services/youtubeService';
import SummaryResultCard from '../components/SummaryResultCard';
import LoadingIndicator from '../components/LoadingIndicator';
import { useSummaryHistory } from '../hooks/useSummaryHistory';

const SummaryPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState<SummaryFormat>(SummaryFormat.KeyTopics);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const { addSummary } = useSummaryHistory();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a YouTube URL.');
      return;
    }
    
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(url)) {
        setError("Invalid YouTube URL. Please check and try again.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const videoDetails = await getYouTubeVideoDetails(url);
      const summaryText = await generateSummary(url, format);
      
      const newResult: SummaryResult = {
        id: new Date().toISOString(),
        videoUrl: url,
        videoTitle: videoDetails.title,
        videoThumbnail: videoDetails.thumbnail,
        summary: summaryText,
        format: format,
        createdAt: new Date().toLocaleDateString(),
      };
      setResult(newResult);
      addSummary(newResult);
    } catch (err: any) {
      // FIX: Fixed a syntax error by wrapping the catch block's content in curly braces.
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [url, format, addSummary]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-100">
          Unlock Knowledge, Faster
        </h1>
        <p className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto">
          Paste a YouTube lecture URL below to get a concise, AI-powered summary in seconds.
        </p>
      </div>

      <div className="mt-10 p-6 sm:p-8 bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="youtube-url" className="sr-only">
                YouTube Video URL
              </label>
              <input
                type="url"
                id="youtube-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-lg text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent transition"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>

            <div>
              <fieldset>
                <legend className="block text-sm font-medium text-neutral-300 mb-2">
                  Summary Format
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.values(SummaryFormat).map((formatOption) => (
                    <div key={formatOption}>
                       <input 
                          type="radio" 
                          id={formatOption} 
                          name="summary-format" 
                          value={formatOption}
                          checked={format === formatOption}
                          onChange={() => setFormat(formatOption)}
                          className="sr-only peer"
                        />
                        <label
                          htmlFor={formatOption}
                          className="block w-full px-4 py-3 text-sm font-medium rounded-lg transition text-left cursor-pointer bg-neutral-700 text-neutral-300 hover:bg-neutral-600 peer-checked:bg-brand-primary peer-checked:text-white peer-checked:ring-2 peer-checked:ring-accent peer-focus:ring-2 peer-focus:ring-accent"
                        >
                          {formatOption}
                        </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 bg-brand-primary hover:bg-brand-primary_hover text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-accent disabled:bg-brand-primary/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
              >
                {isLoading ? 'Generating...' : 'Generate Summary'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8">
        {isLoading ? (
          <LoadingIndicator />
        ) : error ? (
          <div className="p-4 bg-system-error/20 border border-system-error/50 text-red-300 rounded-lg text-center animate-fade-in-up">
            {error}
          </div>
        ) : result ? (
          <SummaryResultCard result={result} />
        ) : null}
      </div>
    </div>
  );
};

export default SummaryPage;
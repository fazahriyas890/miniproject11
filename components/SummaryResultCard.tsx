import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { SummaryResult } from '../types';
import { CopyIcon, ExportIcon, CheckIcon } from './icons/Icons';
import ReactMarkdown from 'react-markdown';

interface SummaryResultCardProps {
  result: SummaryResult;
}

const SummaryResultCard: React.FC<SummaryResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportTXT = () => {
    const blob = new Blob([result.summary], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${result.videoTitle.replace(/\s+/g, '_')}_summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(result.videoTitle, 10, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Source: ${result.videoUrl}`, 10, 28);
    doc.setFontSize(12);
    doc.setTextColor(40);
    const splitText = doc.splitTextToSize(result.summary, 180);
    doc.text(splitText, 10, 40);
    doc.save(`${result.videoTitle.replace(/\s+/g, '_')}_summary.pdf`);
  };


  return (
    <div className="mt-8 animate-fade-in-up bg-neutral-800 rounded-xl shadow-2xl overflow-hidden border border-neutral-700">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-64" src={result.videoThumbnail} alt="Video thumbnail" />
        </div>
        <div className="p-6 md:p-8 flex-grow">
          <div className="uppercase tracking-wide text-sm text-brand-primary font-semibold">{result.format}</div>
          <h2 className="block mt-1 text-xl leading-tight font-semibold text-neutral-100">{result.videoTitle}</h2>
          <div className="mt-4 prose prose-invert prose-sm max-w-none text-neutral-300">
            <ReactMarkdown>{result.summary}</ReactMarkdown>
          </div>
        </div>
      </div>
      <div className="bg-neutral-900/70 px-6 py-4 flex items-center justify-end gap-3 border-t border-neutral-700">
        <button 
          onClick={handleCopy} 
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-200 bg-neutral-700 rounded-lg hover:bg-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-accent">
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
         <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-primary rounded-lg hover:bg-brand-primary_hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-accent">
              <ExportIcon />
              Export
            </button>
            <div className="absolute bottom-full mb-2 w-32 right-0 bg-neutral-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
              <a onClick={handleExportPDF} className="block px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-600 rounded-t-lg cursor-pointer">as PDF</a>
              <a onClick={handleExportTXT} className="block px-4 py-2 text-sm text-neutral-200 hover:bg-neutral-600 rounded-b-lg cursor-pointer">as .txt</a>
            </div>
          </div>
      </div>
    </div>
  );
};

export default SummaryResultCard;
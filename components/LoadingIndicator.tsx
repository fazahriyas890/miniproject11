import React from 'react';
import { LogoIcon } from './icons/Icons';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="mt-8 animate-fade-in-up bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 p-8 text-center">
      <div className="flex justify-center items-center mb-4 animate-pulse">
        <LogoIcon />
      </div>
      <h3 className="text-xl font-semibold text-neutral-100">Generating Summary</h3>
      <p className="text-neutral-400 mt-2">
        Please wait while the AI analyzes the video...
      </p>
    </div>
  );
};

export default LoadingIndicator;
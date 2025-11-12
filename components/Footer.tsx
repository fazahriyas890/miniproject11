import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900/50 border-t border-neutral-800 mt-auto">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-neutral-400 text-sm">
        <p>&copy; {new Date().getFullYear()} SummarizeTube. All Rights Reserved.</p>
        <p className="mt-1">
          <Link to="/feedback" className="hover:text-accent underline transition-colors">
            Give Feedback
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
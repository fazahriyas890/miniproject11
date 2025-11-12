import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogoIcon, LogoutIcon } from './icons/Icons';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const activeLinkClass = "text-neutral-100 bg-neutral-700/50";
  const inactiveLinkClass = "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-700/50";

  return (
    <header className="bg-neutral-900/70 backdrop-blur-sm border-b border-neutral-700/50 sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/summary" className="flex-shrink-0 flex items-center gap-2 text-neutral-100 font-bold text-xl">
              <LogoIcon />
              SummarizeTube
            </NavLink>
          </div>
          {user && (
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    to="/summary"
                    className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                  >
                    Summarize
                  </NavLink>
                  <NavLink
                    to="/history"
                    className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} px-3 py-2 rounded-md text-sm font-medium transition-colors`}
                  >
                    History
                  </NavLink>
                </div>
            </div>
           )}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-neutral-300 text-sm hidden sm:block">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-accent transition-all"
                  aria-label="Logout"
                >
                  <LogoutIcon />
                </button>
              </div>
            ) : (
                 <NavLink
                  to="/login"
                  className="text-neutral-300 hover:bg-neutral-700 hover:text-neutral-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
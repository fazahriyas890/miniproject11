import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogoIcon, GoogleIcon } from '../components/icons/Icons';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/summary');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/summary');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center bg-neutral-800 rounded-xl shadow-2xl overflow-hidden border border-neutral-700">
        {/* Brand Column */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-neutral-900 h-full">
            <div className="flex items-center gap-3 mb-4">
                 <LogoIcon />
                 <h1 className="text-2xl font-bold text-neutral-100">SummarizeTube</h1>
            </div>
            <h2 className="text-3xl font-extrabold text-neutral-100 mb-2">Unlock Knowledge, Faster.</h2>
            <p className="text-neutral-400">
               Transform lengthy videos into concise summaries and save hours of watching time.
            </p>
        </div>

        {/* Form Column */}
        <div className="p-8 sm:p-12">
            <div className="text-center md:text-left mb-8">
                <h2 className="text-2xl font-bold text-neutral-100">
                    {isLogin ? 'Welcome Back' : 'Create Your Account'}
                </h2>
                <p className="text-neutral-400 mt-1">
                    {isLogin ? 'Log in to access your dashboard' : 'Get started for free'}
                </p>
            </div>
            
            <div className="space-y-4">
                <button
                    onClick={() => login('demo@google.com')} // Mock Google Login
                    className="w-full flex justify-center items-center gap-3 py-3 px-4 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-accent transition-all"
                >
                    <GoogleIcon />
                    Sign in with Google
                </button>
                <div className="relative flex py-3 items-center">
                    <div className="flex-grow border-t border-neutral-700"></div>
                    <span className="flex-shrink mx-4 text-neutral-500 text-sm">Or continue with</span>
                    <div className="flex-grow border-t border-neutral-700"></div>
                </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-neutral-300 block mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium text-neutral-300 block mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-brand-primary hover:bg-brand-primary_hover text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-accent transition-all transform hover:scale-105"
              >
                {isLogin ? 'Log In' : 'Create Account'}
              </button>

              <div className="text-center text-sm">
                <span className="text-neutral-400">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <button type="button" onClick={() => setIsLogin(!isLogin)} className="font-medium text-accent hover:text-accent-hover ml-1">
                    {isLogin ? "Sign Up" : "Log In"}
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
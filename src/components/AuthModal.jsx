import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PiggyBank, ArrowRight, Eye, EyeOff, X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [isClosing, setIsClosing] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Reset mode when opened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setIsClosing(false);
    }
  }, [isOpen, initialMode]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200); // matches the duration-200 class
  };

  const handleAuth = (e) => {
    e.preventDefault();
    handleClose();
    navigate('/app');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setShowPassword(false);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-200 ${isClosing ? 'animate-out fade-out' : ''}`} onMouseDown={handleClose}>
      
      <div 
        className={`relative w-full max-w-md clay-card bg-white !rounded-[2rem] shadow-2xl animate-in zoom-in-95 duration-200 ${isClosing ? 'animate-out zoom-out-95' : ''} overflow-hidden`}
        onMouseDown={e => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors z-20"
        >
          <X size={18} />
        </button>

        <div 
           className="flex transition-transform duration-500 ease-in-out" 
           style={{ transform: `translateX(${mode === 'login' ? '0%' : '-100%'})` }}
        >
          {/* LOGIN FORM */}
          <div className="w-full shrink-0 p-8 md:p-10 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-yellow/10 blur-[80px] rounded-full -z-10 pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col items-center mb-8 relative z-10">
              <div className="w-14 h-14 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg mb-4">
                <PiggyBank className="text-white" size={28} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center">
                Welcome Back!
              </h1>
              <p className="text-slate-500 font-medium text-center mt-2">
                Ready to pop some stonks?
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="login-email">
                  Email Address / Username
                </label>
                <input 
                  id="login-email"
                  type="text" 
                  defaultValue="trader@paisapathshala.com"
                  placeholder="trader@paisapathshala.com"
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20 transition-all font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-sm font-bold text-slate-700" htmlFor="login-password">
                    Password
                  </label>
                  <a href="#!" className="text-xs font-bold text-brand-yellow hover:text-brand-orange transition-colors">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input 
                    id="login-password"
                    type={showPassword ? "text" : "password"} 
                    defaultValue="password123"
                    placeholder="••••••••"
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20 transition-all font-medium placeholder:text-slate-400"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-2 bg-brand-yellow text-slate-900 rounded-full font-black text-lg shadow-clay hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                Login <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center relative z-10">
              <p className="text-slate-500 font-medium text-sm">
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => switchMode('signup')} 
                  className="text-brand-yellow font-bold hover:text-brand-orange transition-colors focus:outline-none"
                >
                  Sign up now
                </button>
              </p>
            </div>
          </div>


          {/* SIGNUP FORM */}
          <div className="w-full shrink-0 p-8 md:p-10 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Decorative Blurs */}
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sky-300/20 blur-[60px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-48 h-48 bg-brand-yellow/20 blur-[60px] rounded-full -z-10 pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col items-center mb-8 relative z-10">
              <div className="w-14 h-14 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg mb-4">
                <PiggyBank className="text-white" size={28} />
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center">
                Create Account
              </h1>
              <p className="text-slate-500 font-medium text-center mt-2">
                Start playing, start trading.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="name">
                  Full Name
                </label>
                <input 
                  id="name"
                  type="text" 
                  placeholder="First Last"
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20 transition-all font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="signup-email">
                  Email Address
                </label>
                <input 
                  id="signup-email"
                  type="email" 
                  placeholder="future_millionaire@paisapathshala.com"
                  className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20 transition-all font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5" htmlFor="signup-password">
                  Password
                </label>
                <div className="relative">
                  <input 
                    id="signup-password"
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create a strong password"
                    className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/20 transition-all font-medium placeholder:text-slate-400"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2 font-medium">Must be at least 8 characters</p>
              </div>

              <button 
                type="submit"
                className="w-full py-4 mt-2 bg-slate-900 text-white rounded-full font-black text-lg shadow-xl hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Create My Account
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center pt-6 border-t border-slate-100 relative z-10">
              <p className="text-slate-500 font-medium text-sm">
                Already a player?{' '}
                <button 
                  type="button"
                  onClick={() => switchMode('login')} 
                  className="text-brand-yellow font-bold hover:text-brand-orange transition-colors focus:outline-none"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

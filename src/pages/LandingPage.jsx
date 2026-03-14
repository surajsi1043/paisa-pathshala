import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, ShieldCheck, Gamepad2, PlayCircle, PiggyBank } from 'lucide-react';
import AuthModal from '../components/AuthModal';

export default function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-sky-100/30">
      
      {/* ── Top Navigation ──────────────────────────────── */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg">
            <PiggyBank className="text-white" size={20} />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Paisa Pathshala</h2>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 clay-card bg-white/70 px-8 py-2 rounded-full !border-white/40 !shadow-sm">
          <a className="text-sm font-bold hover:text-brand-yellow transition-colors" href="#how">How it Works</a>
          <a className="text-sm font-bold hover:text-brand-yellow transition-colors" href="#games">Games</a>
          <a className="text-sm font-bold hover:text-brand-yellow transition-colors" href="#trading">Real Trading</a>
        </nav>
        
        <div className="flex items-center gap-3">
          <button onClick={() => openAuth('login')} className="px-6 py-2.5 rounded-full text-sm font-bold clay-card bg-white/70 hover:scale-105 transition-all !shadow-sm">
            Login
          </button>
          <button onClick={() => openAuth('signup')} className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-brand-yellow shadow-clay hover:scale-105 transition-all">
            Sign Up
          </button>
        </div>
      </header>
      
      {/* ── Main Content ────────────────────────────────── */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-yellow/20 text-brand-yellow font-bold text-xs uppercase tracking-widest">
              New Way to Invest
            </div>
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
              Investing made <span className="text-brand-yellow">playful</span> with Paisa Pathshala
            </h1>
            <p className="text-lg text-slate-600 max-w-md font-medium leading-relaxed">
              Join the most vibrant community of traders and gamers. Start your journey with our immersive learning tools today!
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => openAuth('signup')} className="px-8 py-4 rounded-full text-lg font-black text-white bg-brand-yellow shadow-clay hover:scale-105 transition-all active:scale-95">
                Get Started Free
              </button>
              <Link to="/app" className="px-8 py-4 rounded-full text-lg font-black clay-card bg-white/70 hover:scale-105 transition-all active:scale-95 flex items-center gap-2 !shadow-sm">
                <PlayCircle size={20} className="text-brand-yellow" /> Explore App
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-300"></div>
                <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-400"></div>
                <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-500"></div>
              </div>
              <p className="text-sm font-bold text-slate-500">12k+ traders joined this week</p>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 bg-brand-yellow/20 blur-[120px] rounded-full"></div>
            <div className="relative z-10 w-full aspect-square max-w-lg clay-card bg-white/70 flex items-center justify-center overflow-hidden rounded-[4rem] !border-4 !border-white/60">
              {/* Replace with your 3D icon or illustration */}
              <PiggyBank size={180} className="text-brand-yellow transform rotate-3 drop-shadow-xl" />
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="bg-white/50 py-24" id="how">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-black mb-4 text-slate-900">Simple as Pop</h2>
              <p className="text-slate-600 font-medium">Learn how to navigate the market while having fun with our three-step process.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="clay-card bg-white/80 p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform !shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="text-brand-yellow" size={32} />
                </div>
                <h3 className="text-xl font-black mb-2 text-slate-900">Connect</h3>
                <p className="text-slate-500 font-medium">Link your favorite wallet or bank account in seconds with 256-bit encryption.</p>
              </div>

              <div className="clay-card bg-white/80 p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform !shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Gamepad2 className="text-brand-yellow" size={32} />
                </div>
                <h3 className="text-xl font-black mb-2 text-slate-900">Play</h3>
                <p className="text-slate-500 font-medium">Engage in mini-games to learn market mechanics without risking a penny.</p>
              </div>

              <div className="clay-card bg-white/80 p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform !shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-brand-yellow" size={32} />
                </div>
                <h3 className="text-xl font-black mb-2 text-slate-900">Trade</h3>
                <p className="text-slate-500 font-medium">Execute real-time trades with confidence using our simplified dashboard.</p>
              </div>

            </div>
          </div>
        </section>
        
      </main>
      
      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="bg-white py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center">
              <PiggyBank className="text-white" size={16} />
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Paisa Pathshala</h2>
          </div>
          <div className="flex gap-8 text-sm font-bold text-slate-500">
            <a className="hover:text-brand-yellow" href="#!">Privacy</a>
            <a className="hover:text-brand-yellow" href="#!">Terms</a>
            <a className="hover:text-brand-yellow" href="#!">Contact</a>
          </div>
          <p className="text-xs text-slate-400">© 2026 Paisa Pathshala Inc. Happy Learning!</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={closeAuth} initialMode={authMode} />

    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { PlayCircle, Coins, CheckCircle, ChevronDown } from 'lucide-react';

const REELS_DATA = [
  {
    id: 1,
    title: "What is a Bull Market?",
    points: [
      "Prices are rising or expected to rise.",
      "Investors have high confidence.",
      "Economy is usually strong and growing."
    ],
    bg: "from-blue-100 to-green-100",
    border: "border-green-200",
    emoji: "🐂"
  },
  {
    id: 2,
    title: "What is a Bear Market?",
    points: [
      "Prices are falling 20% or more.",
      "Pessimism and fear among investors.",
      "Economy might be slowing down."
    ],
    bg: "from-orange-100 to-red-100",
    border: "border-orange-200",
    emoji: "🐻"
  },
  {
    id: 3,
    title: "The Power of SIPs",
    points: [
      "Invest fixed amounts regularly.",
      "Benefit from Rupee Cost Averaging.",
      "Takes the emotion out of investing."
    ],
    bg: "from-purple-100 to-pink-100",
    border: "border-purple-200",
    emoji: "💰"
  },
  {
    id: 4,
    title: "Blue-Chip Stocks",
    points: [
      "Shares of large, well-established companies.",
      "Financially sound and historically stable.",
      "Often pay consistent dividends."
    ],
    bg: "from-yellow-100 to-orange-100",
    border: "border-yellow-200",
    emoji: "🏢"
  },
  {
    id: 5,
    title: "What is an IPO?",
    points: [
      "IPO = Initial Public Offering — a company goes public.",
      "Investors can buy shares before they hit the exchange.",
      "High demand IPOs can list at a big premium on Day 1."
    ],
    bg: "from-sky-100 to-indigo-100",
    border: "border-sky-200",
    emoji: "🚀"
  },
  {
    id: 6,
    title: "P/E Ratio Explained",
    points: [
      "Price-to-Earnings ratio = Stock Price ÷ Earnings per Share.",
      "Low P/E may mean undervalued; high P/E may mean overvalued.",
      "Always compare P/E within the same industry."
    ],
    bg: "from-teal-100 to-cyan-100",
    border: "border-teal-200",
    emoji: "📊"
  },
  {
    id: 7,
    title: "Mutual Funds 101",
    points: [
      "Pool money from many investors to buy a diversified basket.",
      "Managed by professional fund managers.",
      "Equity, Debt, and Hybrid are the main types."
    ],
    bg: "from-violet-100 to-fuchsia-100",
    border: "border-violet-200",
    emoji: "🧺"
  },
  {
    id: 8,
    title: "What are Dividends?",
    points: [
      "A share of a company's profits paid to shareholders.",
      "Usually distributed quarterly or annually.",
      "Reinvesting dividends accelerates compounding growth."
    ],
    bg: "from-lime-100 to-emerald-100",
    border: "border-lime-200",
    emoji: "💸"
  },
  {
    id: 9,
    title: "FD vs SIP — Which Wins?",
    points: [
      "FD offers fixed, guaranteed returns (~6-7% today).",
      "SIP in equity mutual funds can yield 12-15% long-term.",
      "SIP beats FD over 10+ years, but has short-term risk."
    ],
    bg: "from-amber-100 to-yellow-100",
    border: "border-amber-200",
    emoji: "⚔️"
  },
  {
    id: 10,
    title: "Inflation: The Silent Thief",
    points: [
      "Inflation erodes the purchasing power of your money.",
      "At 6% inflation, ₹100 today is worth ₹74 in 5 years.",
      "Investing above the inflation rate is the only escape."
    ],
    bg: "from-rose-100 to-pink-100",
    border: "border-rose-200",
    emoji: "🔥"
  },
  {
    id: 11,
    title: "Diversification: Don't put all eggs in one basket",
    points: [
      "Spread investments across stocks, bonds, gold & real estate.",
      "Reduces risk — one bad asset won't sink your portfolio.",
      "Target 8-15 stocks across different sectors for balance."
    ],
    bg: "from-orange-100 to-amber-100",
    border: "border-orange-200",
    emoji: "🥚"
  },
  {
    id: 12,
    title: "The Magic of Compounding",
    points: [
      "Compounding = earning returns on your returns.",
      "₹10,000 at 12% for 20 years grows to ₹96,000+!",
      "Start early — even 5 extra years doubles your outcome."
    ],
    bg: "from-green-100 to-teal-100",
    border: "border-green-200",
    emoji: "✨"
  },
];

export default function TradeReelsContent({ coins, setCoins }) {
  const [claimed, setClaimed] = useState({});
  const [messages, setMessages] = useState({});
  const scrollRef = useRef(null);

  // Auto-focus the scroll container so arrow keys work immediately
  useEffect(() => { scrollRef.current?.focus(); }, []);

  const handleKeyDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      el.scrollBy({ top: el.clientHeight, behavior: 'smooth' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      el.scrollBy({ top: -el.clientHeight, behavior: 'smooth' });
    }
  };

  const handleClaim = (id) => {
    if (claimed[id]) return;
    
    // Add 5 coins
    setCoins(prev => prev + 5);
    
    // Set claimed and show message
    setClaimed(prev => ({ ...prev, [id]: true }));
    setMessages(prev => ({ ...prev, [id]: "Success!" }));
    
    // Hide message after 2 seconds
    setTimeout(() => {
      setMessages(prev => ({ ...prev, [id]: null }));
    }, 2000);
  };

  return (
    <div
      ref={scrollRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="h-[calc(100vh-130px)] md:h-[calc(100vh-80px)] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar pb-20 md:pb-8 outline-none focus:outline-none"
    >
      {REELS_DATA.map((reel, index) => (
        <div 
          key={reel.id} 
          className="h-full w-full snap-start snap-always flex flex-col justify-center items-center px-4 relative"
        >
          {/* Main Card */}
          <div 
            className={`clay-card bg-gradient-to-br ${reel.bg} border-2 ${reel.border} w-full max-w-sm p-6 flex flex-col items-center justify-between mx-auto min-h-[420px] md:min-h-[520px] shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all cursor-pointer group`}
          >
            {/* Reel Header */}
            <div className="text-6xl mb-6 animate-float transition-transform group-hover:scale-110 duration-300">{reel.emoji}</div>
            
            <h2 className="text-2xl font-black text-slate-800 text-center mb-6 leading-tight drop-shadow-sm">
              {reel.title}
            </h2>
            
            {/* Learning Points */}
            <ul className="text-slate-700 text-sm space-y-4 mb-8 w-full">
              {reel.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 bg-white/60 p-3.5 rounded-xl shadow-sm border border-white/50 backdrop-blur-sm animate-pop_in" style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="text-brand-yellow shrink-0 mt-0.5"><CheckCircle size={18} /></span>
                  <span className="font-semibold leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Claim Button */}
            <button
              onClick={() => handleClaim(reel.id)}
              disabled={claimed[reel.id]}
              className={`btn-clay w-full py-3.5 justify-center text-[15px] transition-all duration-300 ${
                claimed[reel.id] 
                  ? 'bg-slate-200 text-slate-500 border-slate-300 cursor-not-allowed shadow-none transform-none' 
                  : 'bg-brand-yellow text-slate-900 border-brand-yellow/80 hover:scale-105 active:scale-95 shadow-xl shadow-brand-yellow/20'
              }`}
            >
              {messages[reel.id] ? (
                <span className="font-black flex items-center gap-2 drop-shadow-sm"><CheckCircle size={20} /> Success!</span>
              ) : claimed[reel.id] ? (
                <span className="font-bold flex items-center gap-2">Claimed <Coins size={16} /></span>
              ) : (
                <span className="font-black flex items-center gap-2 drop-shadow-sm"><Coins size={20} /> Claim 5 Coins</span>
              )}
            </button>
          </div>
          
          {/* Swipe Indicator */}
          {index < REELS_DATA.length - 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce flex flex-col items-center gap-1">
              <span className="text-xs font-bold tracking-widest uppercase">Swipe</span>
              <ChevronDown size={28} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

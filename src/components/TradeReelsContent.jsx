import React, { useState } from 'react';
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
  }
];

export default function TradeReelsContent({ coins, setCoins }) {
  const [claimed, setClaimed] = useState({});
  const [messages, setMessages] = useState({});

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
    <div className="h-[calc(100vh-130px)] md:h-[calc(100vh-80px)] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar pb-20 md:pb-8">
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

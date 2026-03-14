import { ArrowLeft, TrendingUp, ShieldCheck, BookOpen, ChevronRight, Play } from 'lucide-react'

const STEPS = [
  { emoji:'💰', title:'You get ₹12,500 Virtual Cash',   desc:'No real money involved. Trade freely without risking a rupee.' },
  { emoji:'📊', title:'Pick any Stock or Crypto',        desc:'Choose from 10 assets — AAPL, BTC, TCS, Reliance and more.' },
  { emoji:'🔀', title:'Buy fractional shares',           desc:'Can\'t afford 1 full BTC? Buy 0.1× or even 0.01× — fractions are allowed!' },
  { emoji:'📈', title:'Watch your Portfolio grow',       desc:'Live price ticks every 2 seconds. See your P&L change in real time.' },
  { emoji:'🏆', title:'Earn Coins for Good Trades',     desc:'Hit profit milestones to unlock badges and earn bonus coins.' },
]

const TIPS = [
  { title:'Never put all eggs in one basket', detail:'Spread across sectors — IT, Banking, Energy, Crypto.' },
  { title:'Buy the dip, sell the rip',        detail:'Look for assets down 3-5% on the day and buy the bounce.' },
  { title:'Set a stop-loss in your head',     detail:'Decide before buying: "I\'ll sell if it falls more than X%."' },
  { title:'Patience beats timing',            detail:'Holding TCS for 5 years beat almost every short-term trade.' },
]

export default function PaperTradeIntroPage({ setTab }) {
  return (
    <div className="pb-28 animate-fade_in">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-stonkpop-light/95 backdrop-blur-md px-4 md:px-8 py-4 flex items-center gap-3 border-b border-slate-200">
        <button onClick={() => setTab('home')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
          <ArrowLeft size={17} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900">📈 Paper Trading Guide</h1>
          <p className="text-xs text-slate-500">Learn to trade before risking real money</p>
        </div>
      </div>

      <div className="px-4 md:px-8 pt-6 flex flex-col gap-6">

        {/* Hero visual */}
        <div className="rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#0d1f4f] to-[#1a0533] p-8 flex flex-col items-center text-center">
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-brand-yellow/10 blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-brand-green/10 blur-3xl" />
          <div className="relative text-6xl mb-4 animate-float">📉📈</div>
          <h2 className="relative text-2xl md:text-3xl font-black text-white mb-2">
            Learn Trading, <span className="text-brand-yellow">Risk-Free</span>
          </h2>
          <p className="relative text-sm text-white/60 max-w-xs">
            Paper trading simulates the real stock market. You practice with virtual money so mistakes cost you nothing.
          </p>
        </div>

        {/* How it works */}
        <div>
          <p className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
            <Play size={15} className="text-brand-yellow" /> How Paper Trading Works
          </p>
          <div className="flex flex-col gap-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-600 flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">{s.emoji} {s.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pro tips */}
        <div>
          <p className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck size={15} className="text-brand-yellow" /> Pro Tips for Beginners
          </p>
          <div className="flex flex-col gap-2">
            {TIPS.map((t, i) => (
              <div key={i} className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <span className="text-amber-500 font-black text-sm mt-0.5">💡</span>
                <div>
                  <p className="text-sm font-black text-slate-800">{t.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button onClick={() => setTab('trade')}
          className="w-full py-4 rounded-2xl font-black text-slate-900 text-base
            bg-brand-yellow shadow-lg shadow-brand-yellow/25 hover:scale-[1.02] active:scale-95 transition-all
            flex items-center justify-center gap-2">
          <TrendingUp size={20} /> Start Paper Trading Now
        </button>

        <button onClick={() => setTab('learn')}
          className="w-full py-3 rounded-2xl font-bold text-slate-600 text-sm
            bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all
            flex items-center justify-center gap-2">
          <BookOpen size={16} /> Learn More Basics First
        </button>

      </div>
    </div>
  )
}

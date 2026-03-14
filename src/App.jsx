import { useState } from 'react'
import {
  Home, BookOpen, TrendingUp, User,
  Coins, Zap, Star, Trophy, ArrowRight,
  BarChart2, Flame, PlayCircle, Target,
  ChevronRight, Sparkles
} from 'lucide-react'

import TradeReelsContent from './components/TradeReelsContent'
import TradeMachineContent from './components/TradeMachineContent'
import QuestContent from './components/QuestContent'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

/* ══════════════════════════════════════════════════════
   MAIN DASHBOARD (HOME TAB)
══════════════════════════════════════════════════════ */
function DashboardPage({ setTab }) {
  const [hovered, setHovered] = useState(null)

  const POP_CARDS = [
    {
      icon: <Zap size={28} className="text-brand-yellow" />,
      title: 'Bite-Sized Lessons',
      desc:  'Learn stocks in 60-second reels. No jargon, pure fun.',
      bg:    'from-[#FF6B35] to-[#FF8C61]',
      rotate: '-rotate-1',
    },
    {
      icon: <BarChart2 size={28} className="text-brand-green" />,
      title: 'Paper Trade',
      desc:  'Practice buying & selling with virtual ₹ — zero risk.',
      bg:    'from-[#118AB2] to-[#06D6A0]',
      rotate: 'rotate-1',
    },
    {
      icon: <Trophy size={28} className="text-brand-yellow" />,
      title: 'Win Quests',
      desc:  'Complete daily quests, climb leaderboards, earn coins.',
      bg:    'from-[#7B5EA7] to-[#FF6B9D]',
      rotate: '-rotate-1',
    },
    {
      icon: <Target size={28} className="text-white" />,
      title: 'Smart Portfolio',
      desc:  'Get AI-powered suggestions tailored to your goals.',
      bg:    'from-[#FFD60A] to-[#FF6B35]',
      rotate: 'rotate-2',
    },
  ]

  const STATS = [
    { label: 'Students',  value: '2.4L+',  color: 'text-brand-yellow' },
    { label: 'Lessons',   value: '500+',   color: 'text-brand-green'  },
    { label: 'Avg Score', value: '94%',    color: 'text-brand-pink'   },
  ]

  return (
    <div className="pb-6 overflow-y-auto no-scrollbar">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden mx-4 md:mx-0 mt-4 md:mt-8 rounded-3xl p-6 md:p-12 clay-card bg-white border border-slate-200 shadow-sm">

        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-20 blur-3xl"
          style={{ background: '#FFD60A' }} />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full opacity-20 blur-3xl"
          style={{ background: '#FF6B35' }} />
        <div className="absolute top-1/2 right-4 w-24 h-24 rounded-full opacity-15 blur-2xl"
          style={{ background: '#06D6A0' }} />

        {/* Floating emoji badge */}
        <div className="absolute top-4 right-4 animate-float text-4xl select-none">📈</div>

        {/* Tagline chip */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4 text-xs font-700
          bg-white/10 border border-white/20 text-brand-yellow">
          <Sparkles size={12} /> India&apos;s #1 Stock Learning App
        </div>

        <h1 className="text-3xl font-black text-slate-900 leading-tight mb-2">
          Invest Smart,<br />
          <span className="text-brand-yellow drop-shadow-sm">
            Earn Coins!
          </span>
        </h1>

        <p className="text-slate-600 text-sm mb-5 max-w-xs">
          Master the stock market through fun reels, quizzes &amp; paper trading.
          Start with zero experience — end up a pro!
        </p>

        {/* CTA buttons */}
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setTab('learn')}
            className="btn-clay px-5 py-2.5 text-sm bg-brand-yellow text-slate-900 shadow-xl shadow-brand-yellow/20 hover:scale-105 active:scale-95 transition-all">
            <PlayCircle size={16} /> Start Learning
          </button>
          <button
            onClick={() => setTab('trade')}
            className="btn-clay px-5 py-2.5 text-sm bg-slate-100 text-slate-700 border-slate-300 hover:scale-105 active:scale-95 transition-all">
            <TrendingUp size={16} /> Try Paper Trade
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-5 mt-6 pt-5 border-t border-slate-100">
          {STATS.map(s => (
            <div key={s.label}>
              <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-slate-500 font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── "Simple as Pop" section header ──────────────── */}
      <div className="flex items-center justify-between px-5 mt-7 mb-1">
        <h2 className="text-base font-bold text-slate-900">
          Simple as <span className="text-brand-yellow drop-shadow-sm">Pop</span> 🎯
        </h2>
        <span className="text-xs text-slate-500 font-semibold">What you&apos;ll get</span>
      </div>

      {/* ── Pop Cards ──────────────────────────────────── */}
      <div className="px-4 md:px-0 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {POP_CARDS.map((c, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`clay-card bg-white border border-slate-200 shadow-sm p-4 cursor-pointer ${c.rotate}
              ${hovered === i ? 'scale-105 shadow-xl shadow-brand-yellow/10' : ''} transition-all duration-300`}
            style={hovered === i ? { borderTopColor: c.color } : {}}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3 text-white"
                 style={{ background: `linear-gradient(135deg, ${c.bg.replace('from-[', '').replace('] to-[', ', ').replace(']', '')})` }}>
              {c.icon}
            </div>
            <p className="text-slate-900 font-bold text-sm leading-snug">{c.title}</p>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Daily Challenge Banner ──────────────────────── */}
      <div
        onClick={() => setTab('learn')}
        className="mx-4 md:mx-0 mt-5 md:mt-8 clay-card p-4 md:p-6 flex items-center gap-4 cursor-pointer"
        style={{ background: 'linear-gradient(135deg,#0d1f4f, #1a0533)' }}>
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse_glow"
          style={{ background: 'linear-gradient(135deg,#FFD60A,#FF6B35)' }}>
          <Flame size={24} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-sm">Daily Challenge 🔥</p>
          <p className="text-xs text-white/50 truncate">3 questions · Earn +50 coins</p>
        </div>
        <ChevronRight size={20} className="text-brand-yellow flex-shrink-0" />
      </div>

      {/* ── Trending Topics ─────────────────────────────── */}
      <div className="flex items-center justify-between px-5 mt-6 mb-3">
        <h2 className="text-base font-bold text-slate-900">Trending Topics 📊</h2>
      </div>
      <div className="flex gap-3 px-4 md:px-0 overflow-x-auto no-scrollbar pb-1">
        {[
          { label: 'What is SIP?',      emoji: '💰', color: '#FFD60A' },
          { label: 'Bull vs Bear',      emoji: '🐂', color: '#06D6A0' },
          { label: 'Options 101',       emoji: '📉', color: '#FF6B9D' },
          { label: 'IPO Basics',        emoji: '🚀', color: '#7B5EA7' },
          { label: 'ETFs Explained',    emoji: '📦', color: '#FF6B35' },
        ].map((t, i) => (
          <button
            key={i}
            onClick={() => setTab('learn')}
            className="flex-shrink-0 btn-clay px-4 py-2 text-xs font-600 text-slate-900 bg-white shadow-sm"
            style={{ borderColor: `${t.color}55` }}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* ── Learn More CTA ──────────────────────────────── */}
      <button
        onClick={() => setTab('learn')}
        className="btn-clay mx-4 md:mx-auto mt-6 md:mt-12 w-[calc(100%-2rem)] md:w-[400px] py-3 flex justify-center text-sm md:text-base font-bold text-slate-900"
        style={{ background: 'linear-gradient(90deg,#FFD60A,#f2ad0d)' }}>
        Explore All Lessons <ArrowRight size={16} />
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   NAVIGATION & LAYOUT
══════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: 'home',    label: 'Home',    Icon: Home       },
  { id: 'learn',   label: 'Learn',   Icon: BookOpen   },
  { id: 'trade',   label: 'Trade',   Icon: TrendingUp },
  { id: 'profile', label: 'Profile', Icon: User       },
]

function TopNav({ coins, tab, setTab }) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-10 py-3 md:py-4
      border-b border-slate-200 bg-stonkpop-light/95 backdrop-blur-md">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black shadow-clay-sm bg-brand-yellow">
          ₹
        </div>
        <span className="font-black text-slate-900 text-base md:text-xl tracking-tight hidden sm:block">
          Paisa&nbsp;<span className="text-brand-yellow">Pathshala</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = tab === id
          return (
            <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${active ? 'bg-slate-200 text-brand-yellow font-bold shadow-clay-sm transform -translate-y-0.5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}>
              <Icon size={18} />
              <span className="text-sm">{label}</span>
            </button>
          )
        })}
      </nav>

      {/* Coin badge */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold
        border border-brand-yellow/30 animate-pulse_glow cursor-pointer"
        style={{ background: 'rgba(255,214,10,0.12)' }}>
        <Coins size={15} className="text-brand-yellow" />
        <span className="text-brand-yellow">{coins.toLocaleString('en-IN')}</span>
      </div>
    </header>
  )
}


function BottomNav({ tab, setTab }) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around
      px-2 py-3 border-t border-slate-200 w-full bg-stonkpop-light/95 backdrop-blur-md">
      {NAV_ITEMS.map(({ id, label, Icon }) => {
        const active = tab === id
        return (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="flex flex-col items-center gap-0.5 px-4 py-1 rounded-2xl transition-all duration-200"
            style={active ? { background: 'rgba(242, 173, 13, 0.15)' } : {}}>
            <Icon
              size={22}
              strokeWidth={active ? 2.5 : 1.8}
              className={active ? 'text-brand-yellow' : 'text-slate-400'}
            />
            <span className={`text-[10px] font-semibold ${active ? 'text-brand-yellow' : 'text-slate-400'}`}>
              {label}
            </span>
            {active && (
              <div className="w-1 h-1 rounded-full mt-0.5 bg-brand-yellow" />
            )}
          </button>
        )
      })}
    </nav>
  )
}

/* ══════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════ */
export function MainApp() {
  const [tab, setTab]     = useState('home')
  const [coins, setCoins] = useState(12500)
  const [portfolio, setPortfolio] = useState({ AAPL: 0, BTC: 0 })

  return (
    <div className="min-h-screen w-full relative flex flex-col bg-stonkpop-light transition-colors duration-300">
      <TopNav coins={coins} tab={tab} setTab={setTab} />

      {/* ── Page content ────────────────────────────── */}
      <main className="flex-1 overflow-y-auto no-scrollbar max-w-[1200px] mx-auto w-full md:pb-8" style={{ paddingBottom: '5rem' }}>

        {tab === 'home'    && <DashboardPage setTab={setTab} />}
        {tab === 'learn'   && <TradeReelsContent  coins={coins} setCoins={setCoins} />}
        {tab === 'trade'   && <TradeMachineContent coins={coins} setCoins={setCoins} portfolio={portfolio} setPortfolio={setPortfolio} />}
        {tab === 'profile' && <QuestContent        coins={coins} setCoins={setCoins} />}

      </main>

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

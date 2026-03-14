import { useState } from 'react'
import { ArrowLeft, BookOpen, Play, CheckCircle, Lock, Star, Clock, Zap } from 'lucide-react'

const LESSON_TOPICS = [
  { id:1, emoji:'🐂', title:'Bull & Bear Markets',  duration:'3 min', level:'Beginner',  done:true,  coins:10, desc:'Understand market cycles and what drives them.' },
  { id:2, emoji:'📈', title:'Reading Candlestick Charts', duration:'5 min', level:'Beginner', done:true, coins:10, desc:'Decode price action with Japanese candlestick patterns.' },
  { id:3, emoji:'💰', title:'SIPs & Mutual Funds',  duration:'4 min', level:'Beginner',  done:false, coins:15, desc:'Automate wealth building with systematic investing.' },
  { id:4, emoji:'🏢', title:'Blue-Chip Stocks',     duration:'4 min', level:'Beginner',  done:false, coins:15, desc:'Safe, stable companies that anchor your portfolio.' },
  { id:5, emoji:'🚀', title:'IPO Investing 101',    duration:'6 min', level:'Intermediate', done:false, coins:20, desc:'How to evaluate and apply for IPOs in India.' },
  { id:6, emoji:'📊', title:'P/E Ratio & Valuation', duration:'7 min', level:'Intermediate', done:false, coins:20, desc:'Is a stock cheap or expensive? This metric tells you.' },
  { id:7, emoji:'⚔️', title:'Options & Futures',    duration:'10 min', level:'Advanced',  done:false, coins:30, desc:'Leverage derivatives to hedge or amplify returns.' },
  { id:8, emoji:'🏦', title:'Banking & NBFC Stocks', duration:'6 min', level:'Intermediate', done:false, coins:20, desc:'Analyse India\'s biggest sector by market cap.' },
  { id:9, emoji:'🔥', title:'Inflation & Real Returns', duration:'4 min', level:'Beginner', done:false, coins:15, desc:'Why your savings account is losing money silently.' },
  { id:10, emoji:'✨', title:'Power of Compounding', duration:'5 min', level:'Beginner',  done:false, coins:15, desc:'The 8th wonder of the world — mathematically proven.' },
]

const LEVEL_COLOR = {
  Beginner:     { bg:'bg-green-100',  text:'text-green-700',  border:'border-green-200'  },
  Intermediate: { bg:'bg-amber-100',  text:'text-amber-700',  border:'border-amber-200'  },
  Advanced:     { bg:'bg-red-100',    text:'text-red-700',    border:'border-red-200'    },
}

export default function LessonsListPage({ setTab, coins, setCoins }) {
  const [active, setActive]   = useState(null)   // expanded lesson id
  const [claimed, setClaimed] = useState({})

  const handleClaim = (lesson) => {
    if (claimed[lesson.id]) return
    setClaimed(prev => ({ ...prev, [lesson.id]: true }))
    setCoins(c => c + lesson.coins)
  }

  const done   = LESSON_TOPICS.filter(l => l.done || claimed[l.id]).length
  const total  = LESSON_TOPICS.length
  const pct    = Math.round((done / total) * 100)

  return (
    <div className="pb-28 animate-fade_in">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-stonkpop-light/95 backdrop-blur-md px-4 md:px-8 py-4 flex items-center gap-3 border-b border-slate-200">
        <button onClick={() => setTab('home')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
          <ArrowLeft size={17} className="text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-black text-slate-900">📚 Lesson Library</h1>
          <p className="text-xs text-slate-500">{done}/{total} completed · {pct}% done</p>
        </div>
        <div className="text-xs font-bold bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30 px-3 py-1 rounded-full">
          🪙 {coins.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mx-4 md:mx-8 mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-brand-yellow rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }} />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-4 md:px-8 mt-4 overflow-x-auto no-scrollbar pb-1">
        {['All','Beginner','Intermediate','Advanced'].map(f => (
          <span key={f} className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border border-slate-200 bg-white text-slate-500 cursor-default">
            {f}
          </span>
        ))}
      </div>

      {/* Lesson list */}
      <div className="flex flex-col gap-3 px-4 md:px-8 mt-4">
        {LESSON_TOPICS.map((lesson, idx) => {
          const lc      = LEVEL_COLOR[lesson.lesson?.level] ?? LEVEL_COLOR[lesson.level]
          const isOpen  = active === lesson.id
          const isDone  = lesson.done || claimed[lesson.id]
          return (
            <div key={lesson.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden
                ${isOpen ? 'border-brand-yellow shadow-lg shadow-brand-yellow/10' : 'border-slate-200 shadow-sm'}`}>
              {/* Row */}
              <button className="w-full flex items-center gap-4 p-4 text-left"
                onClick={() => setActive(isOpen ? null : lesson.id)}>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl flex-shrink-0">
                  {isDone ? <CheckCircle size={24} className="text-green-500" /> : lesson.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`font-bold text-sm ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                      {lesson.title}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border
                      ${LEVEL_COLOR[lesson.level].bg} ${LEVEL_COLOR[lesson.level].text} ${LEVEL_COLOR[lesson.level].border}`}>
                      {lesson.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={11}/> {lesson.duration}
                    </span>
                    <span className="text-xs text-brand-yellow font-bold flex items-center gap-1">
                      +{lesson.coins} 🪙
                    </span>
                  </div>
                </div>
                <Zap size={16} className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-yellow' : 'text-slate-300'}`} />
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="px-4 pb-4 flex flex-col gap-3 border-t border-slate-100 pt-3">
                  <p className="text-sm text-slate-600">{lesson.desc}</p>
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center gap-3 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-brand-yellow/20 flex items-center justify-center flex-shrink-0">
                      <Play size={18} className="text-brand-yellow" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-700">Video Lesson · {lesson.duration}</p>
                      <p className="text-xs text-slate-400">Tap to start watching</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleClaim(lesson)}
                    disabled={isDone}
                    className={`w-full py-3 rounded-xl text-sm font-black transition-all
                      ${isDone
                        ? 'bg-green-100 text-green-600 cursor-default'
                        : 'bg-brand-yellow text-slate-900 hover:scale-[1.02] active:scale-95 shadow-lg shadow-brand-yellow/20'}`}>
                    {isDone ? `✅ Completed (+${lesson.coins} coins earned)` : `🚀 Mark Complete & Claim ${lesson.coins} Coins`}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

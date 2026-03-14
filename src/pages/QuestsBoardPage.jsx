import { useState } from 'react'
import { ArrowLeft, Trophy, Zap, Star, CheckCircle2, Clock, Lock, ChevronRight } from 'lucide-react'

const DAILY_QUESTS = [
  { id:'d1', emoji:'📖', title:'Read 2 Reels',         xp:25,  coins:10, total:2, done:2,     desc:'Head to Learn tab and scroll through any 2 reels.' },
  { id:'d2', emoji:'💹', title:'Make your first trade', xp:50,  coins:20, total:1, done:0,     desc:'Buy or sell any stock in the Trade Machine.' },
  { id:'d3', emoji:'🧠', title:'Answer a Quiz',         xp:30,  coins:15, total:1, done:0,     desc:'Complete the GST Hero Quest in your Profile.' },
  { id:'d4', emoji:'🔁', title:'Revisit the App',       xp:10,  coins:5,  total:1, done:1,     desc:'Simply open Paisa Pathshala today — done! ✅' },
]

const WEEKLY_QUESTS = [
  { id:'w1', emoji:'📚', title:'Complete 5 Lessons',    xp:100, coins:50, total:5, done:2,  desc:'Finish any 5 lessons from the Lesson Library.' },
  { id:'w2', emoji:'💰', title:'Earn 100 Coins',        xp:75,  coins:30, total:100, done:45, desc:'Accumulate 100 coins from any activities.' },
  { id:'w3', emoji:'🏆', title:'7-day Streak',          xp:200, coins:80, total:7, done:3,  desc:'Open the app for 7 consecutive days.' },
]

const ACHIEVEMENTS = [
  { id:'a1', emoji:'🥾', title:'First Step',       desc:'Completed your first lesson.',  earned:true  },
  { id:'a2', emoji:'💸', title:'First Trade',      desc:'Made your first paper trade.',  earned:false },
  { id:'a3', emoji:'🔥', title:'3-Day Streak',     desc:'Used the app 3 days in a row.', earned:true  },
  { id:'a4', emoji:'🏅', title:'Quiz Champion',    desc:'Answered 5 quizzes correctly.', earned:false },
  { id:'a5', emoji:'⭐', title:'Star Learner',     desc:'Completed all beginner reels.', earned:false },
  { id:'a6', emoji:'🚀', title:'Portfolio Builder',desc:'Added 5 assets to portfolio.',  earned:false },
]

function QuestCard({ q, onClaim, claimedSet }) {
  const progress = Math.min(1, q.done / q.total)
  const pct      = Math.round(progress * 100)
  const complete = q.done >= q.total
  const isClaimed = claimedSet.has(q.id)

  return (
    <div className={`bg-white rounded-2xl border p-4 shadow-sm transition-all
      ${complete && !isClaimed ? 'border-brand-yellow ring-1 ring-brand-yellow/30' : 'border-slate-200'}`}>
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl flex-shrink-0">
          {q.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="font-black text-slate-900 text-sm">{q.title}</p>
            <div className="flex items-center gap-1 text-xs font-bold text-brand-yellow flex-shrink-0">
              +{q.coins}🪙 <span className="text-slate-400">+{q.xp}XP</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{q.desc}</p>

          {/* Progress */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-brand-yellow rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[11px] font-bold text-slate-400">{q.done}/{q.total}</span>
          </div>
        </div>
      </div>

      {complete && (
        <button
          onClick={() => onClaim(q)}
          disabled={isClaimed}
          className={`mt-3 w-full py-2.5 rounded-xl text-xs font-black transition-all
            ${isClaimed
              ? 'bg-green-100 text-green-600 cursor-default'
              : 'bg-brand-yellow text-slate-900 hover:scale-[1.02] active:scale-95 shadow-md shadow-brand-yellow/20'}`}>
          {isClaimed ? '✅ Claimed!' : `🎉 Claim ${q.coins} Coins`}
        </button>
      )}
    </div>
  )
}

export default function QuestsBoardPage({ setTab, coins, setCoins }) {
  const [claimed, setClaimed] = useState(new Set(['d4']))  // d4 is auto-done

  const handleClaim = (q) => {
    if (claimed.has(q.id)) return
    setClaimed(prev => new Set([...prev, q.id]))
    setCoins(c => c + q.coins)
  }

  const totalXP   = 340
  const earnedXP  = 85
  const level     = 8
  const nextLevel = 400

  return (
    <div className="pb-28 animate-fade_in">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-stonkpop-light/95 backdrop-blur-md px-4 md:px-8 py-4 flex items-center gap-3 border-b border-slate-200">
        <button onClick={() => setTab('home')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
          <ArrowLeft size={17} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900">🏆 Quest Board</h1>
          <p className="text-xs text-slate-500">Complete quests · Level up · Earn coins</p>
        </div>
        <div className="ml-auto text-xs font-bold bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30 px-3 py-1 rounded-full">
          🪙 {coins.toLocaleString('en-IN')}
        </div>
      </div>

      <div className="px-4 md:px-8 pt-5 flex flex-col gap-6">

        {/* XP / Level card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Your Level</p>
              <p className="text-3xl font-black text-slate-900 flex items-center gap-2">
                Lvl {level} <Star size={20} className="text-brand-yellow fill-brand-yellow" />
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-bold">{earnedXP} / {nextLevel} XP</p>
              <p className="text-xs text-slate-400">to Level {level + 1}</p>
            </div>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-brand-yellow to-orange-400 transition-all duration-500"
              style={{ width: `${(earnedXP / nextLevel) * 100}%` }} />
          </div>
        </div>

        {/* Daily Quests */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-brand-yellow" />
            <p className="text-sm font-black text-slate-900">Daily Quests</p>
            <span className="text-xs text-slate-400 ml-auto flex items-center gap-1"><Clock size={11}/> Resets in 14h 32m</span>
          </div>
          <div className="flex flex-col gap-3">
            {DAILY_QUESTS.map(q => <QuestCard key={q.id} q={q} onClaim={handleClaim} claimedSet={claimed} />)}
          </div>
        </div>

        {/* Weekly Quests */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-brand-yellow" />
            <p className="text-sm font-black text-slate-900">Weekly Challenges</p>
          </div>
          <div className="flex flex-col gap-3">
            {WEEKLY_QUESTS.map(q => <QuestCard key={q.id} q={q} onClaim={handleClaim} claimedSet={claimed} />)}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Star size={16} className="text-brand-yellow" />
            <p className="text-sm font-black text-slate-900">Achievements</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {ACHIEVEMENTS.map(a => (
              <div key={a.id}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all
                  ${a.earned ? 'bg-brand-yellow/5 border-brand-yellow/30' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                <span className={`text-3xl mb-1 ${!a.earned ? 'grayscale' : ''}`}>{a.emoji}</span>
                <p className="text-[11px] font-black text-slate-800 leading-tight">{a.title}</p>
                <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">{a.desc}</p>
                {!a.earned && <Lock size={10} className="text-slate-300 mt-1" />}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

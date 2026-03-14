import { useState } from 'react'
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Clock, Zap, ArrowRight } from 'lucide-react'

const CHALLENGES = [
  {
    id: 1,
    question: "Which GST slab applies to Ice Cream served in a restaurant?",
    options: ['5%', '12%', '18%', '28%'],
    answer: '18%',
    explanation: "Ice cream in a restaurant falls under the 18% GST slab. At home (packaged), it's 5%!",
    emoji: '🍦', coins: 20
  },
  {
    id: 2,
    question: "What does P/E ratio stand for?",
    options: ['Price-to-Equity', 'Profit-to-Earnings', 'Price-to-Earnings', 'Performance-to-Equity'],
    answer: 'Price-to-Earnings',
    explanation: "P/E = Stock Price ÷ Earnings per Share. It tells you how much you're paying for ₹1 of earnings.",
    emoji: '📊', coins: 20
  },
  {
    id: 3,
    question: "In India, SEBI stands for?",
    options: [
      'Stock Exchange Board of India',
      'Securities and Exchange Board of India',
      'Share Evaluation Bureau of India',
      'Stock Equity Bureau of India'
    ],
    answer: 'Securities and Exchange Board of India',
    explanation: "SEBI is India's market regulator — it protects investors and regulates the securities market since 1988.",
    emoji: '⚖️', coins: 15
  },
]

export default function DailyChallengesPage({ setTab, coins, setCoins }) {
  const [current,  setCurrent]  = useState(0)
  const [picked,   setPicked]   = useState(null)   // selected option
  const [results,  setResults]  = useState([])     // 'correct'|'wrong' per q
  const [finished, setFinished] = useState(false)

  const q       = CHALLENGES[current]
  const answered = picked !== null
  const isRight  = picked === q?.answer
  const totalCoins = results.filter(r => r === 'correct').length * 20 +
                     results.filter(r => r === 'correct').length * 5   // bonus

  const handlePick = (opt) => {
    if (answered) return
    setPicked(opt)
  }

  const handleNext = () => {
    setResults(prev => [...prev, isRight ? 'correct' : 'wrong'])
    if (current + 1 < CHALLENGES.length) {
      setCurrent(c => c + 1)
      setPicked(null)
    } else {
      const earned = results.filter(r => r === 'correct').length * 20 + (isRight ? 20 : 0)
      setCoins(c => c + earned)
      setFinished(true)
    }
  }

  const score   = results.filter(r => r === 'correct').length + (finished && isRight ? 1 : 0)
  const pct     = Math.round((score / CHALLENGES.length) * 100)

  return (
    <div className="pb-28 animate-fade_in">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-stonkpop-light/95 backdrop-blur-md px-4 md:px-8 py-4 flex items-center gap-3 border-b border-slate-200">
        <button onClick={() => setTab('home')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
          <ArrowLeft size={17} className="text-slate-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-black text-slate-900">🔥 Daily Challenge</h1>
          <p className="text-xs text-slate-500">3 questions · Answer all to earn bonus coins</p>
        </div>
        <div className="text-xs font-bold bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30 px-3 py-1 rounded-full">
          🪙 {coins.toLocaleString('en-IN')}
        </div>
      </div>

      <div className="px-4 md:px-8 pt-6 max-w-xl mx-auto">

        {!finished ? (
          <>
            {/* Progress dots */}
            <div className="flex items-center gap-2 mb-6">
              {CHALLENGES.map((_, i) => (
                <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  i < current ? 'bg-brand-yellow' : i === current ? 'bg-brand-yellow/40' : 'bg-slate-200'
                }`} />
              ))}
              <span className="text-xs font-bold text-slate-400 ml-1">{current + 1}/{CHALLENGES.length}</span>
            </div>

            {/* Question card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-5">
              <div className="text-5xl text-center mb-5 animate-float">{q.emoji}</div>
              <h2 className="text-lg font-black text-slate-900 text-center leading-snug mb-6">
                {q.question}
              </h2>

              {/* Options */}
              <div className="flex flex-col gap-3">
                {q.options.map(opt => {
                  let cls = 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                  if (answered) {
                    if (opt === q.answer)  cls = 'border-green-400 bg-green-50 text-green-800'
                    else if (opt === picked) cls = 'border-red-400 bg-red-50 text-red-800'
                    else                   cls = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60'
                  }
                  return (
                    <button key={opt} onClick={() => handlePick(opt)}
                      className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 font-semibold text-sm transition-all duration-200 flex items-center justify-between ${cls}`}>
                      {opt}
                      {answered && opt === q.answer && <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />}
                      {answered && opt === picked && opt !== q.answer && <XCircle size={18} className="text-red-500 flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {answered && (
                <div className={`mt-4 p-4 rounded-2xl border text-sm font-medium leading-relaxed animate-pop_in
                  ${isRight ? 'bg-green-50 border-green-200 text-green-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                  💡 {q.explanation}
                </div>
              )}
            </div>

            {answered && (
              <button onClick={handleNext}
                className="w-full py-4 rounded-2xl font-black text-slate-900 bg-brand-yellow
                  shadow-lg shadow-brand-yellow/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                {current + 1 < CHALLENGES.length ? 'Next Question' : 'See Results'} <ArrowRight size={18} />
              </button>
            )}
          </>
        ) : (
          /* Results screen */
          <div className="flex flex-col items-center text-center gap-5 pt-4">
            <div className="text-7xl animate-float">
              {pct >= 66 ? '🏆' : pct >= 33 ? '😅' : '💪'}
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900">{pct >= 66 ? 'Brilliant!' : pct >= 33 ? 'Good Effort!' : 'Keep Practising!'}</h2>
              <p className="text-slate-500 mt-1">You got <strong>{score}/{CHALLENGES.length}</strong> correct</p>
            </div>

            {/* Score circles */}
            <div className="flex gap-3">
              {CHALLENGES.map((_, i) => (
                <div key={i} className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-black
                  ${results[i] === 'correct' ? 'bg-green-500' : 'bg-red-400'}`}>
                  {results[i] === 'correct' ? '✓' : '✗'}
                </div>
              ))}
            </div>

            <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl p-5 w-full">
              <p className="text-2xl font-black text-brand-yellow">+{score * 20} Coins Earned! 🪙</p>
              <p className="text-xs text-slate-500 mt-1">20 coins per correct answer</p>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button onClick={() => { setCurrent(0); setPicked(null); setResults([]); setFinished(false) }}
                className="w-full py-3.5 rounded-2xl font-black text-slate-900 bg-brand-yellow shadow-lg shadow-brand-yellow/25 hover:scale-[1.02] active:scale-95 transition-all">
                🔄 Try Again
              </button>
              <button onClick={() => setTab('home')}
                className="w-full py-3 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
                ← Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

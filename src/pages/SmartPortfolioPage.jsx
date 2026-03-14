import { useState } from 'react'
import { ArrowLeft, TrendingUp, TrendingDown, BookOpen, Target, Lightbulb, ShieldCheck } from 'lucide-react'

const RISK_PROFILES = [
  { id:'conservative', label:'Conservative 🛡️', desc:'Prefer safety over big returns. FD + Blue-chip stocks.',   color:'#06D6A0', allocation:{ equity:30, debt:50, gold:20 } },
  { id:'moderate',     label:'Moderate ⚖️',     desc:'Balance of growth and protection. Diversified portfolio.', color:'#118AB2', allocation:{ equity:60, debt:30, gold:10 } },
  { id:'aggressive',   label:'Aggressive 🚀',   desc:'High risk, high reward. Growth stocks and crypto.',        color:'#FF6B35', allocation:{ equity:80, debt:10, gold:10 } },
]

const AI_PICKS = {
  conservative: [
    { symbol:'HDFC',     name:'HDFC Bank',        reason:'Stable dividend payer, rock solid fundamentals.',   type:'Stock',  weight:'20%' },
    { symbol:'GOLDBEES', name:'Gold ETF',          reason:'Hedge against inflation and market downturns.',    type:'ETF',    weight:'20%' },
    { symbol:'LIQUIDBF', name:'Liquid Mutual Fund',reason:'Park idle cash safely with ~7% returns.',         type:'Fund',   weight:'30%' },
    { symbol:'GSEC10Y',  name:'Govt. Bond 10Y',   reason:'Fixed income, sovereign guarantee.',               type:'Bond',   weight:'30%' },
  ],
  moderate: [
    { symbol:'TCS',      name:'TCS',               reason:'India\'s IT bellwether, consistent compounder.',  type:'Stock',  weight:'20%' },
    { symbol:'RELIANCE', name:'Reliance Ind.',      reason:'Diversified across energy, retail & telecom.',   type:'Stock',  weight:'20%' },
    { symbol:'NIFTYBEES',name:'Nifty 50 ETF',      reason:'Instant diversification of India\'s top 50.',    type:'ETF',    weight:'30%' },
    { symbol:'HDFC',     name:'HDFC Bank',          reason:'Banking sector leader.',                         type:'Stock',  weight:'15%' },
    { symbol:'GOLDBEES', name:'Gold ETF',           reason:'Portfolio insurance.',                           type:'ETF',    weight:'15%' },
  ],
  aggressive: [
    { symbol:'BAJFIN',   name:'Bajaj Finance',      reason:'High-growth NBFC, dominant in consumer credit.', type:'Stock',  weight:'25%' },
    { symbol:'ZOMATO',   name:'Zomato',             reason:'Profitable hyper-growth platform.',              type:'Stock',  weight:'20%' },
    { symbol:'TSLA',     name:'Tesla',              reason:'EV leader with massive TAM expansion.',          type:'Stock',  weight:'20%' },
    { symbol:'BTC',      name:'Bitcoin',            reason:'Digital gold, asymmetric upside.',              type:'Crypto', weight:'15%' },
    { symbol:'ETH',      name:'Ethereum',           reason:'DeFi ecosystem backbone.',                      type:'Crypto', weight:'10%' },
    { symbol:'NIFTYBEES',name:'Nifty 50 ETF',      reason:'Core index holding for stability.',              type:'ETF',    weight:'10%' },
  ],
}

function AllocationBar({ allocation, color }) {
  const colors = { equity:'#FF6B35', debt:'#118AB2', gold:'#FFD60A' }
  return (
    <div className="w-full h-3 rounded-full overflow-hidden flex">
      {Object.entries(allocation).map(([k, v]) => (
        <div key={k} className="h-full transition-all duration-500"
          style={{ width:`${v}%`, background: colors[k] }} />
      ))}
    </div>
  )
}

export default function SmartPortfolioPage({ setTab, coins }) {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSelect = (id) => {
    setLoading(true)
    setTimeout(() => { setProfile(id); setLoading(false) }, 900)
  }

  const picks = profile ? AI_PICKS[profile] : []
  const rp    = RISK_PROFILES.find(r => r.id === profile)

  return (
    <div className="pb-28 animate-fade_in">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-stonkpop-light/95 backdrop-blur-md px-4 md:px-8 py-4 flex items-center gap-3 border-b border-slate-200">
        <button onClick={() => setTab('home')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
          <ArrowLeft size={17} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900">🤖 Smart Portfolio</h1>
          <p className="text-xs text-slate-500">AI-powered allocation just for you</p>
        </div>
      </div>

      <div className="px-4 md:px-8 pt-6 flex flex-col gap-6">

        {/* Step 1 — risk picker */}
        <div>
          <p className="text-sm font-black text-slate-700 mb-3 flex items-center gap-2">
            <Target size={16} className="text-brand-yellow" /> Step 1: Choose your risk appetite
          </p>
          <div className="flex flex-col gap-3">
            {RISK_PROFILES.map(r => (
              <button key={r.id}
                onClick={() => handleSelect(r.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200
                  ${profile === r.id ? 'border-brand-yellow shadow-lg shadow-brand-yellow/10 bg-brand-yellow/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-black text-slate-900 text-sm">{r.label}</p>
                  {profile === r.id && <span className="text-xs bg-brand-yellow text-slate-900 font-bold px-2 py-0.5 rounded-full">Selected ✓</span>}
                </div>
                <p className="text-xs text-slate-500 mb-2">{r.desc}</p>
                <AllocationBar allocation={r.allocation} color={r.color} />
                <div className="flex gap-3 mt-2">
                  {Object.entries(r.allocation).map(([k, v]) => (
                    <span key={k} className="text-[10px] font-bold text-slate-500">{k.charAt(0).toUpperCase()+k.slice(1)} {v}%</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — AI picks */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-8">
            <div className="w-12 h-12 rounded-full border-4 border-brand-yellow border-t-transparent animate-spin" />
            <p className="text-sm font-bold text-slate-500">AI is analysing your profile…</p>
          </div>
        )}

        {profile && !loading && (
          <div>
            <p className="text-sm font-black text-slate-700 mb-3 flex items-center gap-2">
              <Lightbulb size={16} className="text-brand-yellow" /> Step 2: Your personalised picks
            </p>
            <div className="flex flex-col gap-3">
              {picks.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-black text-slate-600 flex-shrink-0">
                    {p.symbol.slice(0,3)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-black text-slate-900 text-sm">{p.name}</p>
                      <span className="text-[10px] bg-sky-100 text-sky-600 border border-sky-200 font-bold px-2 py-0.5 rounded-full">{p.type}</span>
                      <span className="text-[10px] bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/30 font-bold px-2 py-0.5 rounded-full">{p.weight}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{p.reason}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <ShieldCheck size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 font-medium leading-relaxed">
                These are <strong>educational suggestions</strong> for paper trading practice only. Not financial advice. Always DYOR before investing real money.
              </p>
            </div>

            <button onClick={() => setTab('trade')}
              className="mt-4 w-full py-3.5 rounded-2xl font-black text-sm text-slate-900
                bg-brand-yellow shadow-lg shadow-brand-yellow/25 hover:scale-[1.02] active:scale-95 transition-all">
              📈 Start Paper Trading These
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

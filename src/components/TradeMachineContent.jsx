import { useState, useEffect, useRef } from 'react'
import {
  PlusCircle, MinusCircle, Wallet, TrendingUp, TrendingDown,
  Activity, Briefcase, CheckCircle2, XCircle, RefreshCw
} from 'lucide-react'

/* ══════════════════════════════════════════════════════
   10 ASSETS (Stocks + Crypto)
══════════════════════════════════════════════════════ */
const ASSETS = {
  AAPL:     { symbol:'AAPL',     name:'Apple Inc.',          type:'Stock',  basePrice: 185.92, change:'+1.24%', pos:true,  desc:'The tech giant behind iPhone, Mac and more.',           marketCap:'2.89T', peRatio:'29.41', dividend:'0.52%', volume:'54.2M',  emoji:'🍎' },
  TCS:      { symbol:'TCS',      name:'Tata Consultancy',    type:'Stock',  basePrice:3920.50, change:'+0.58%', pos:true,  desc:'India\'s largest IT services company.',                  marketCap:'14.2T', peRatio:'28.10', dividend:'1.20%', volume:'2.1M',   emoji:'💻' },
  RELIANCE: { symbol:'RELIANCE', name:'Reliance Industries', type:'Stock',  basePrice:2850.00, change:'+0.74%', pos:true,  desc:'Mega-conglomerate spanning energy to retail.',           marketCap:'19.4T', peRatio:'22.50', dividend:'0.38%', volume:'6.8M',   emoji:'⚡' },
  TSLA:     { symbol:'TSLA',     name:'Tesla Inc.',          type:'Stock',  basePrice: 175.22, change:'+3.44%', pos:true,  desc:'Accelerating the world to sustainable energy.',          marketCap:'550B',  peRatio:'42.10', dividend:'0.00%', volume:'110M',   emoji:'🚗' },
  INFY:     { symbol:'INFY',     name:'Infosys Ltd.',        type:'Stock',  basePrice:1745.30, change:'-0.31%', pos:false, desc:'Global IT consulting and services powerhouse.',          marketCap:'7.2T',  peRatio:'24.80', dividend:'2.10%', volume:'4.5M',   emoji:'🔵' },
  HDFC:     { symbol:'HDFC',     name:'HDFC Bank',           type:'Stock',  basePrice:1680.75, change:'+0.42%', pos:true,  desc:'India\'s largest private sector bank.',                  marketCap:'12.8T', peRatio:'20.30', dividend:'1.00%', volume:'8.2M',   emoji:'🏦' },
  BAJFIN:   { symbol:'BAJFIN',   name:'Bajaj Finance',       type:'Stock',  basePrice:7180.45, change:'-1.12%', pos:false, desc:'Leading NBFC with diversified financial products.',       marketCap:'4.3T',  peRatio:'28.50', dividend:'0.20%', volume:'1.9M',   emoji:'💳' },
  ZOMATO:   { symbol:'ZOMATO',   name:'Zomato Ltd.',         type:'Stock',  basePrice: 215.80, change:'+2.85%', pos:true,  desc:'India\'s favourite food delivery super-app.',            marketCap:'1.9T',  peRatio:'N/A',   dividend:'0.00%', volume:'22.4M',  emoji:'🍔' },
  BTC:      { symbol:'BTC',      name:'Bitcoin',             type:'Crypto', basePrice:64230.50,change:'-2.10%', pos:false, desc:'The original decentralised digital currency.',           marketCap:'1.2T',  peRatio:'N/A',   dividend:'0.00%', volume:'32.1B',  emoji:'₿'  },
  ETH:      { symbol:'ETH',      name:'Ethereum',            type:'Crypto', basePrice: 3420.80,change:'+1.63%', pos:true,  desc:'The world computer powering DeFi & NFTs.',              marketCap:'410B',  peRatio:'N/A',   dividend:'0.00%', volume:'18.6B',  emoji:'⬡'  },
}

/* ── Live price simulation ──────────────────────────── */
function useLivePrices() {
  const [prices, setPrices] = useState(
    () => Object.fromEntries(Object.keys(ASSETS).map(k => [k, ASSETS[k].basePrice]))
  )
  useEffect(() => {
    const id = setInterval(() => {
      setPrices(prev => {
        const next = {}
        Object.keys(ASSETS).forEach(k => {
          const drift = (Math.random() - 0.495) * ASSETS[k].basePrice * 0.007
          next[k] = Math.max(1, +(prev[k] + drift).toFixed(2))
        })
        return next
      })
    }, 2000)
    return () => clearInterval(id)
  }, [])
  return prices
}

/* ── Fractional quantity presets ─────────────────────── */
const FRAC_PRESETS = [0.1, 0.25, 0.5, 1, 2, 5, 10]

/* ── Toast ───────────────────────────────────────────── */
function Toast({ toast, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [toast, onDone])

  const ok = toast.type === 'success'
  return (
    <div className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-bounce_in
      px-5 py-3 rounded-full shadow-xl font-bold flex items-center gap-2 border-2 whitespace-nowrap
      ${ok ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
      {ok ? <CheckCircle2 size={17} /> : <XCircle size={17} />}
      {toast.msg}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */
export default function TradeMachineContent({ coins, setCoins, portfolio = {}, setPortfolio }) {
  const prices = useLivePrices()

  const [activeId,   setActiveId]   = useState('AAPL')
  const [qty,        setQty]        = useState(1)
  const [customQty,  setCustomQty]  = useState('')
  const [filterType, setFilterType] = useState('All')  // All | Stock | Crypto
  const [toast,      setToast]      = useState(null)

  const asset      = ASSETS[activeId]
  const livePrice  = prices[activeId] ?? asset.basePrice
  const effectiveQty = customQty !== '' ? (parseFloat(customQty) || 0) : qty
  const totalCost  = +(effectiveQty * livePrice).toFixed(2)

  // Safe portfolio value — only sum keys that exist in ASSETS
  const portfolioValue = Object.entries(portfolio).reduce((acc, [k, q]) => {
    if (ASSETS[k]) acc += q * (prices[k] ?? ASSETS[k].basePrice)
    return acc
  }, 0)
  const heldQty = +(portfolio[activeId] ?? 0)

  const triggerToast = (msg, type) => {
    setToast({ msg, type })
  }

  const handleBuy = () => {
    if (effectiveQty <= 0) return triggerToast('Enter a valid quantity.', 'error')
    if (totalCost > coins)  return triggerToast(`Need ₹${totalCost.toFixed(2)}, you have ₹${coins.toFixed(2)}`, 'error')
    setCoins(c => +(c - totalCost).toFixed(2))
    setPortfolio(prev => ({ ...prev, [activeId]: +((prev[activeId] || 0) + effectiveQty).toFixed(6) }))
    triggerToast(`Bought ${effectiveQty}× ${activeId} for ₹${totalCost.toFixed(2)} 🎉`, 'success')
    setQty(1); setCustomQty('')
  }

  const handleSell = () => {
    if (effectiveQty <= 0)        return triggerToast('Enter a valid quantity.', 'error')
    if (heldQty < effectiveQty)   return triggerToast(`You only hold ${heldQty.toFixed(4)}× ${activeId}`, 'error')
    const proceeds = +(effectiveQty * livePrice).toFixed(2)
    setCoins(c => +(c + proceeds).toFixed(2))
    setPortfolio(prev => {
      const newQ = +((prev[activeId] || 0) - effectiveQty).toFixed(6)
      if (newQ < 0.00001) { const { [activeId]: _, ...rest } = prev; return rest }
      return { ...prev, [activeId]: newQ }
    })
    triggerToast(`Sold ${effectiveQty}× ${activeId} for ₹${proceeds.toFixed(2)} 💰`, 'success')
    setQty(1); setCustomQty('')
  }

  const filteredKeys = Object.keys(ASSETS).filter(k =>
    filterType === 'All' || ASSETS[k].type === filterType
  )

  const isUp = livePrice >= asset.basePrice

  return (
    <div className="flex flex-col gap-5 px-4 md:px-8 py-5 pb-28 max-w-[1200px] mx-auto w-full animate-fade_in">

      {toast && <Toast toast={toast} onDone={() => setToast(null)} />}

      {/* ── Top bar ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between
        bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">

        {/* Filter chips */}
        <div className="flex gap-2">
          {['All','Stock','Crypto'].map(f => (
            <button key={f} onClick={() => setFilterType(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all
                ${filterType === f ? 'border-brand-yellow bg-brand-yellow/10 text-slate-900' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Portfolio value */}
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
          <Briefcase size={14} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-400 uppercase">Portfolio</span>
          <span className="font-black text-slate-900">₹{portfolioValue.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          <RefreshCw size={10} className="text-green-400 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
      </div>

      {/* ── Asset selector tabs ──────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {filteredKeys.map(k => {
          const a = ASSETS[k]
          const p = prices[k] ?? a.basePrice
          const up = p >= a.basePrice
          const held = portfolio[k]
          return (
            <button key={k} onClick={() => { setActiveId(k); setQty(1); setCustomQty('') }}
              className={`flex-shrink-0 flex flex-col items-start px-3.5 py-3 rounded-2xl border-2 transition-all min-w-[100px]
                ${activeId === k ? 'border-brand-yellow bg-brand-yellow/8 shadow-clay-sm' : 'border-slate-100 bg-white hover:border-slate-300'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-base">{a.emoji}</span>
                <span className="text-xs font-black text-slate-800">{k}</span>
                {held > 0 && <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />}
              </div>
              <span className={`text-[11px] font-bold ${up ? 'text-emerald-500' : 'text-rose-500'}`}>
                ₹{p.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </button>
          )
        })}
      </div>

      {/* ── Main grid: detail + trade panel ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* ── LEFT: asset detail ──────────────────────────── */}
        <div className="lg:col-span-8 flex flex-col gap-5">

          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: isUp ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)' }}>
              {asset.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-black text-slate-900">{asset.name}</h1>
                <span className="px-2 py-0.5 bg-sky-100 text-sky-600 text-xs font-bold rounded-full">{asset.type}</span>
                {heldQty > 0 && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    Holding {heldQty.toFixed(4)}×
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-sm mt-0.5">{asset.desc}</p>
            </div>
          </div>

          {/* Price + chart */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-end gap-4 mb-5">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Live Price</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-slate-900">
                    ₹{livePrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                  <div className={`flex items-center gap-0.5 text-sm font-bold pb-1 ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {isUp ? <TrendingUp size={15}/> : <TrendingDown size={15}/>}
                    {asset.change}
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated SVG chart */}
            <div className="h-40 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 160">
                <defs>
                  <linearGradient id={`g${activeId}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={isUp ? '#10b981' : '#f43f5e'} stopOpacity="0.15"/>
                    <stop offset="100%" stopColor={isUp ? '#10b981' : '#f43f5e'} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path
                  d={isUp
                    ? 'M0,130 L100,105 L200,115 L300,65 L400,80 L500,30 L600,50 L700,15 L800,30 L800,160 L0,160 Z'
                    : 'M0,30 L100,50 L200,30 L300,80 L400,60 L500,115 L600,95 L700,130 L800,120 L800,160 L0,160 Z'}
                  fill={`url(#g${activeId})`}/>
                <path
                  d={isUp
                    ? 'M0,130 L100,105 L200,115 L300,65 L400,80 L500,30 L600,50 L700,15 L800,30'
                    : 'M0,30 L100,50 L200,30 L300,80 L400,60 L500,115 L600,95 L700,130 L800,120'}
                  fill="none"
                  stroke={isUp ? '#10b981' : '#f43f5e'}
                  strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="800" cy={isUp ? '30' : '120'} r="5"
                  fill={isUp ? '#10b981' : '#f43f5e'} className="animate-pulse"/>
              </svg>
            </div>
          </div>

          {/* Fundamentals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label:'Market Cap', value: asset.marketCap },
              { label:'P/E Ratio',  value: asset.peRatio   },
              { label:'Dividend',   value: asset.dividend  },
              { label:'Volume',     value: asset.volume    },
            ].map(m => (
              <div key={m.label} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{m.label}</p>
                <p className="text-base font-black text-slate-800">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Trade panel ──────────────────────────── */}
        <div className="lg:col-span-4">
          <div className="sticky top-20 bg-white rounded-2xl border-2 border-slate-100 shadow-sm p-5 flex flex-col gap-4">

            {/* Buying power */}
            <div className="text-center pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Make a Move</h3>
              <div className="flex items-center justify-center gap-1.5 mt-1.5">
                <Wallet size={14} className="text-brand-yellow"/>
                <span className="text-sm font-bold text-slate-600">
                  Cash: <span className="text-slate-900">₹{coins.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </span>
              </div>
              {heldQty > 0 && (
                <p className="text-xs font-bold text-emerald-600 mt-1.5 bg-emerald-50 py-1 px-3 rounded-full inline-block">
                  Holding {heldQty.toFixed(4)}× {activeId}
                </p>
              )}
            </div>

            {/* ── Fractional preset buttons ───────────────── */}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quantity <span className="text-slate-300">— tap or type below (fractions ok!)</span>
              </p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {FRAC_PRESETS.map(f => (
                  <button key={f}
                    onClick={() => { setQty(f); setCustomQty('') }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-all
                      ${qty === f && customQty === ''
                        ? 'border-brand-yellow bg-brand-yellow/10 text-slate-900'
                        : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-300'}`}>
                    {f}×
                  </button>
                ))}
              </div>

              {/* Stepper (integer) */}
              <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-2 border border-slate-200 mb-2">
                <button onClick={() => { setQty(q => Math.max(0.1, +(q - 0.1).toFixed(2))); setCustomQty('') }}
                  className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                  <MinusCircle size={22}/>
                </button>
                <span className="text-2xl font-black text-slate-900">{customQty || qty}×</span>
                <button onClick={() => { setQty(q => +(q + 0.1).toFixed(2)); setCustomQty('') }}
                  className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-brand-yellow transition-all">
                  <PlusCircle size={22}/>
                </button>
              </div>

              {/* Custom free input */}
              <input
                type="number" min="0.001" step="0.001"
                placeholder="Or type a quantity e.g. 0.35"
                value={customQty}
                onChange={e => { setCustomQty(e.target.value); setQty(null) }}
                className="w-full bg-slate-50 text-slate-900 px-4 py-2.5 rounded-xl text-sm
                  border border-slate-200 focus:outline-none focus:border-brand-yellow placeholder-slate-300"
              />
            </div>

            {/* Summary */}
            <div className="flex justify-between items-center py-3 border-y border-dashed border-slate-200">
              <span className="text-sm font-bold text-slate-500">Total</span>
              <span className="text-2xl font-black text-slate-900">
                ₹{totalCost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Buy / Sell */}
            <div className="flex flex-col gap-2.5">
              <button onClick={handleBuy}
                className="w-full py-3.5 rounded-xl text-white font-black text-sm uppercase tracking-wide
                  bg-emerald-500 hover:bg-emerald-600
                  shadow-[0_4px_0_#059669] hover:shadow-[0_2px_0_#059669] hover:translate-y-[2px]
                  active:shadow-none active:translate-y-[4px] transition-all">
                ✅ Buy {effectiveQty}× {activeId}
              </button>
              <button onClick={handleSell}
                disabled={heldQty <= 0}
                className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wide transition-all
                  ${heldQty > 0
                    ? 'text-white bg-rose-500 hover:bg-rose-600 shadow-[0_4px_0_#e11d48] hover:shadow-[0_2px_0_#e11d48] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px]'
                    : 'text-slate-400 bg-slate-100 cursor-not-allowed'}`}>
                🔴 Sell {effectiveQty}× {activeId}
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
              <Activity size={12}/> Paper trades · zero real money
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

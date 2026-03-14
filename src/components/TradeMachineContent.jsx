import { useState } from 'react'
import { PlusCircle, MinusCircle, Wallet, TrendingUp, TrendingDown, Clock, Activity, Briefcase } from 'lucide-react'

// Asset Universe
const ASSETS = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'Stock',
    price: 185.92,
    change: '+1.24%',
    pos: true,
    desc: 'The tech giant making your favorite gadgets.',
    marketCap: '2.89T',
    peRatio: '29.41',
    dividend: '0.52%',
    volume: '54.2M'
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'Crypto',
    price: 64230.50,
    change: '-2.10%',
    pos: false,
    desc: 'The king of cryptocurrency.',
    marketCap: '1.2T',
    peRatio: 'N/A',
    dividend: '0.00%',
    volume: '32.1B'
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    type: 'Stock',
    price: 175.22,
    change: '+3.44%',
    pos: true,
    desc: 'Accelerating the world to sustainable energy.',
    marketCap: '550B',
    peRatio: '42.10',
    dividend: '0.00%',
    volume: '110M'
  }
}

export default function TradeMachineContent({ coins, setCoins, portfolio, setPortfolio }) {
  const [activeAssetId, setActiveAssetId] = useState('AAPL')
  const [shares, setShares] = useState(1)
  const [showToast, setShowToast] = useState(null) // { msg: '', type: 'success'|'error' }

  const asset = ASSETS[activeAssetId]
  const estimatedCost = (shares * asset.price).toFixed(2)
  const holdings = portfolio[asset.symbol] || 0
  const portfolioValue = Object.keys(portfolio).reduce((acc, key) => acc + (portfolio[key] * ASSETS[key].price), 0).toFixed(2)

  const handleBuy = () => {
    if (parseFloat(estimatedCost) <= coins) {
      setCoins(prev => parseFloat((prev - parseFloat(estimatedCost)).toFixed(2)))
      setPortfolio(prev => ({
        ...prev,
        [asset.symbol]: (prev[asset.symbol] || 0) + shares
      }))
      triggerToast(`Successfully BOUGHT ${shares} shares of ${asset.symbol}`, 'success')
      setShares(1)
    } else {
      triggerToast("NOT ENOUGH COINS for this trade!", 'error')
    }
  }

  const handleSell = () => {
    if (holdings >= shares) {
      setCoins(prev => parseFloat((prev + parseFloat(estimatedCost)).toFixed(2)))
      setPortfolio(prev => ({
        ...prev,
        [asset.symbol]: prev[asset.symbol] - shares
      }))
      triggerToast(`Successfully SOLD ${shares} shares of ${asset.symbol}`, 'success')
      setShares(1)
    } else {
      triggerToast(`You don't own ${shares} shares of ${asset.symbol}!`, 'error')
    }
  }

  const triggerToast = (msg, type) => {
    setShowToast({ msg, type })
    setTimeout(() => setShowToast(null), 3000)
  }

  return (
    <div className="flex flex-col gap-6 px-4 md:px-8 py-6 animate-fade_in pb-24 max-w-[1200px] mx-auto w-full">
      
      {/* ── Top Bar: Asset Selection & Portfolio Value ──────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {Object.keys(ASSETS).map(key => (
            <button
              key={key}
              onClick={() => { setActiveAssetId(key); setShares(1); }}
              className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all border-2 ${
                activeAssetId === key 
                  ? 'border-brand-yellow bg-brand-yellow/10 text-slate-900' 
                  : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-300'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 w-full md:w-auto justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase">
            <Briefcase size={14} /> My Portfolio
          </span>
          <span className="font-black text-slate-900 text-lg">💰 ${portfolioValue}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        
        {/* ── Left Column: Asset Detail & Charts ────────────────────────────── */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="size-16 md:size-20 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-3xl">
                {asset.type === 'Stock' ? '🏢' : '🪙'}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                  {asset.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-3 py-1 bg-sky-100 text-sky-600 text-xs font-bold rounded-full border border-sky-200">
                    ${asset.symbol}
                  </span>
                  <span className="text-slate-500 text-sm font-medium">{asset.type}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-500 font-medium text-sm md:text-base border-l-4 border-brand-yellow pl-4">
            {asset.desc}
          </p>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Current Price</p>
                <div className="flex items-end gap-3">
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-none">
                    ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                  <div className={`flex items-center gap-1 text-sm font-bold pb-1 ${asset.pos ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {asset.pos ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {asset.change}
                  </div>
                </div>
              </div>
              <div className="hidden sm:flex bg-slate-100 p-1.5 rounded-full border border-slate-200/60">
                <button className="px-4 py-1.5 text-xs font-bold rounded-full text-slate-400 hover:text-slate-600">1D</button>
                <button className="px-4 py-1.5 text-xs font-bold rounded-full text-slate-400 hover:text-slate-600">1W</button>
                <button className="px-4 py-1.5 text-xs font-bold rounded-full bg-white shadow-sm text-brand-yellow">1Y</button>
              </div>
            </div>

            {/* Simulated Chart via SVG */}
            <div className="h-48 md:h-64 w-full relative mt-2 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
                <defs>
                  <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={asset.pos ? "#10b981" : "#f43f5e"} stopOpacity="0.15" />
                    <stop offset="100%" stopColor={asset.pos ? "#10b981" : "#f43f5e"} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path 
                  d={asset.pos ? "M0,150 L100,120 L200,140 L300,80 L400,100 L500,40 L600,60 L700,20 L800,40 L800,200 L0,200 Z" : "M0,40 L100,60 L200,40 L300,100 L400,80 L500,140 L600,120 L700,160 L800,150 L800,200 L0,200 Z"} 
                  fill="url(#chartGrad)" 
                />
                <path 
                  d={asset.pos ? "M0,150 L100,120 L200,140 L300,80 L400,100 L500,40 L600,60 L700,20 L800,40" : "M0,40 L100,60 L200,40 L300,100 L400,80 L500,140 L600,120 L700,160 L800,150"} 
                  fill="none" 
                  stroke={asset.pos ? "#10b981" : "#f43f5e"} 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="4" 
                />
                <circle cx="800" cy={asset.pos ? "40" : "150"} r="6" fill={asset.pos ? "#10b981" : "#f43f5e"} className="animate-pulse" />
              </svg>
            </div>
          </div>

          {/* Real Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Market Cap</p>
              <p className="text-lg font-black text-slate-800">{asset.marketCap}</p>
            </div>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">P/E Ratio</p>
              <p className="text-lg font-black text-slate-800">{asset.peRatio}</p>
            </div>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Dividend</p>
              <p className="text-lg font-black text-slate-800">{asset.dividend}</p>
            </div>
            <div className="bg-white rounded-xl p-4 flex flex-col items-center justify-center border border-slate-200 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Volume</p>
              <p className="text-lg font-black text-slate-800">{asset.volume}</p>
            </div>
          </div>

        </div>

        {/* ── Right Column: Trading Interface ────────────────────────────── */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="sticky top-24 bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-6 border-4 border-slate-100 shadow-sm">
            
            <div className="text-center pb-6 border-b border-slate-100">
              <h3 className="text-2xl font-black text-slate-900">Make a Move</h3>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Wallet size={16} className="text-brand-yellow" />
                <p className="text-slate-600 font-bold">Buying Power: <span className="text-slate-900">${coins.toLocaleString()}</span></p>
              </div>
              <p className="text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 py-1 px-3 rounded-full inline-block">
                You own: {holdings} shares
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pl-4">How many shares?</p>
              <div className="bg-slate-50 rounded-full p-2 flex items-center justify-between border border-slate-200 shadow-inner">
                <button 
                  onClick={() => setShares(s => Math.max(1, s - 1))}
                  className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-900 hover:scale-105 transition-all"
                >
                  <MinusCircle size={24} />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-3xl font-black text-slate-900">{shares}</span>
                </div>
                <button 
                  onClick={() => setShares(s => s + 1)}
                  className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-brand-yellow hover:scale-105 transition-all"
                >
                  <PlusCircle size={24} />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center px-2 py-4 border-y border-slate-100 border-dashed">
              <span className="text-slate-500 font-bold text-sm">Estimated Total</span>
              <span className="text-2xl font-black text-slate-900">${estimatedCost}</span>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleBuy}
                className="w-full py-4 rounded-xl text-white bg-emerald-500 hover:bg-emerald-600 shadow-[0_4px_0_#059669] hover:shadow-[0_2px_0_#059669] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                Buy Shares
              </button>
              <button 
                onClick={handleSell}
                className="w-full py-4 rounded-xl text-white bg-sky-500 hover:bg-sky-600 shadow-[0_4px_0_#0284c7] hover:shadow-[0_2px_0_#0284c7] hover:translate-y-[2px] active:shadow-none active:translate-y-[4px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                Sell Shares
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase mt-2">
              <Activity size={14} /> Orders processed instantly
            </div>

          </div>
        </div>
      </div>

      {/* ── Toast Overlay ────────────────────────────── */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce_in">
          <div className={`px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 border-2 ${
            showToast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}>
            {showToast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            {showToast.msg}
          </div>
        </div>
      )}

    </div>
  )
}

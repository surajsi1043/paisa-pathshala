import { useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Share2 } from 'lucide-react'

const TOPICS = [
  {
    id: 'sip',
    label: 'What is SIP?',
    emoji: '💰',
    color: '#FFD60A',
    gradient: 'from-yellow-50 to-amber-50',
    border: 'border-amber-200',
    tagline: 'Your autopilot to wealth',
    content: [
      { heading: 'SIP = Systematic Investment Plan', body: 'A SIP lets you invest a fixed amount in a mutual fund every month—automatically. No market timing needed.' },
      { heading: 'The Rupee Cost Averaging Magic', body: 'When markets fall, your fixed SIP buys more units. When they rise, you buy fewer. Over time, this averages out your cost beautifully.' },
      { heading: 'How much should I start with?', body: 'As little as ₹500/month. Many Zerodha Coin and Groww users start with ₹1,000 and step up 10% every year.' },
      { heading: 'Real Example', body: '₹5,000/month SIP in a Nifty 50 index fund for 20 years at 12% CAGR → ~₹49 Lakhs from just ₹12L invested.' },
    ],
    relatedTab: 'learn',
  },
  {
    id: 'bullbear',
    label: 'Bull vs Bear',
    emoji: '🐂',
    color: '#06D6A0',
    gradient: 'from-green-50 to-teal-50',
    border: 'border-teal-200',
    tagline: 'Understanding market moods',
    content: [
      { heading: 'Bull Market 🐂', body: 'A market rising 20%+ from recent lows. Investor confidence is high, the economy is growing, and everyone seems to be making money.' },
      { heading: 'Bear Market 🐻', body: 'A market falling 20%+ from recent highs. Fear dominates. Many panic-sell — but pros know this is when bargains appear.' },
      { heading: 'How long do they last?', body: 'Bull markets average 6+ years. Bear markets average ~9-16 months. History says the bulls always win long-term.' },
      { heading: 'What should you do?', body: 'In a bull market: stay invested. In a bear market: keep your SIPs running and avoid panic selling—time in the market beats timing the market.' },
    ],
    relatedTab: 'learn',
  },
  {
    id: 'options',
    label: 'Options 101',
    emoji: '📉',
    color: '#FF6B9D',
    gradient: 'from-pink-50 to-rose-50',
    border: 'border-pink-200',
    tagline: 'The powerful (and risky) derivative',
    content: [
      { heading: 'What is an Option?', body: 'An option is a contract giving the buyer the right (not obligation) to buy or sell an asset at a set price before a specific date.' },
      { heading: 'Call vs Put', body: 'CALL = right to BUY. You buy calls when you expect the price to rise. PUT = right to SELL. You buy puts when you expect it to fall.' },
      { heading: 'The Risk', body: 'Options can expire worthless (losing 100% of premium). They are leveraged instruments — gains and losses are amplified.' },
      { heading: '⚠️ Beginner Warning', body: 'SEBI data shows 90% of F&O traders lose money. Options are for experienced traders, not beginners. Master stocks first.' },
    ],
    relatedTab: 'learn',
  },
  {
    id: 'ipo',
    label: 'IPO Basics',
    emoji: '🚀',
    color: '#7B5EA7',
    gradient: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    tagline: "When a company goes public",
    content: [
      { heading: 'What is an IPO?', body: 'Initial Public Offering — when a private company sells shares to the public for the first time and lists on a stock exchange.' },
      { heading: 'How to apply in India?', body: 'Through ASBA via your bank or a broker. Applications are in lots (minimum investment defined by the company).' },
      { heading: 'Grey Market Premium (GMP)', body: 'Before listing, shares trade illegally in the grey market. A high GMP suggests strong demand and a likely good listing.' },
      { heading: 'Allotment & Listing', body: 'If oversubscribed, allotment is by lottery. On listing day, the stock can open above or below the issue price — it\'s unpredictable.' },
    ],
    relatedTab: 'learn',
  },
  {
    id: 'etf',
    label: 'ETFs Explained',
    emoji: '📦',
    color: '#FF6B35',
    gradient: 'from-orange-50 to-red-50',
    border: 'border-orange-200',
    tagline: 'The lazy investor\'s best friend',
    content: [
      { heading: 'What is an ETF?', body: 'Exchange Traded Fund — a basket of securities (stocks, bonds, gold) that trades on an exchange like a single stock.' },
      { heading: 'ETF vs Mutual Fund', body: 'ETFs trade live during market hours. Mutual fund NAV is calculated once a day. ETFs usually have lower expense ratios.' },
      { heading: 'Popular Indian ETFs', body: 'Nifty BeES (tracks Nifty 50), Gold BeES (tracks gold price), Bharat Bond ETF (government bonds).' },
      { heading: 'Why beginners love ETFs', body: 'Instant diversification. Low cost. No fund manager risk. Just buy the index and let India\'s growth do the work.' },
    ],
    relatedTab: 'learn',
  },
]

function TopicCard({ topic, setTab }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`bg-gradient-to-br ${topic.gradient} rounded-3xl border-2 ${topic.border} overflow-hidden transition-all duration-300`}>
      {/* Header row */}
      <button className="w-full flex items-center gap-4 p-5 text-left" onClick={() => setOpen(o => !o)}>
        <div className="w-14 h-14 rounded-2xl bg-white/70 flex items-center justify-center text-3xl shadow-sm flex-shrink-0 border border-white/50">
          {topic.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-black text-slate-900 text-base leading-tight">{topic.label}</p>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">{topic.tagline}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center flex-shrink-0 border border-white/50">
          {open ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-5 pb-5 flex flex-col gap-4 border-t border-white/50 pt-4 animate-fade_in">
          {topic.content.map((sec, i) => (
            <div key={i} className="bg-white/60 rounded-2xl p-4 border border-white/50 backdrop-blur-sm">
              <p className="font-black text-slate-900 text-sm mb-1">{sec.heading}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{sec.body}</p>
            </div>
          ))}
          <button onClick={() => setTab(topic.relatedTab)}
            className="w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 bg-white/70 text-slate-700 border border-white/50 hover:bg-white transition-all">
            <BookOpen size={14} /> Learn more in the Reels
          </button>
        </div>
      )}
    </div>
  )
}

export default function TrendingTopicsPage({ setTab }) {
  return (
    <div className="pb-28 animate-fade_in">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-stonkpop-light/95 backdrop-blur-md px-4 md:px-8 py-4 flex items-center gap-3 border-b border-slate-200">
        <button onClick={() => setTab('home')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all">
          <ArrowLeft size={17} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-lg font-black text-slate-900">📊 Trending Topics</h1>
          <p className="text-xs text-slate-500">Tap any topic to read a quick explainer</p>
        </div>
      </div>

      <div className="px-4 md:px-8 pt-5 flex flex-col gap-4">
        {TOPICS.map(topic => (
          <TopicCard key={topic.id} topic={topic} setTab={setTab} />
        ))}
      </div>

    </div>
  )
}

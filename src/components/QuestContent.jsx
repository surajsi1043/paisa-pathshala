import { useState } from 'react'
import { 
  Trophy, Star, ChevronRight, Zap, Target, 
  CheckCircle2, XCircle, X, Camera, Coins, 
  Settings, Moon, Shield, Award, Flame
} from 'lucide-react'
import arjunAvatar from '../assets/arjun.png'
import priyaAvatar from '../assets/priya.png'

export default function QuestContent({ coins, setCoins }) {
  const [showGstModal, setShowGstModal] = useState(false)
  const [showIncomeTaxModal, setShowIncomeTaxModal] = useState(false)
  const [gstResult, setGstResult] = useState(null)
  const [taxResult, setTaxResult] = useState(null)

  const handleGstAnswer = (answer) => {
    if (answer === '18%') {
      setGstResult('success')
      setCoins(c => c + 50)
    } else {
      setGstResult('fail')
    }
  }

  const closeGstModal = () => {
    setShowGstModal(false)
    setGstResult(null)
  }

  const handleTaxAnswer = (answer) => {
    if (answer === 'New Regime') {
      setTaxResult('success')
      setCoins(c => c + 100)
    } else {
      setTaxResult('fail')
    }
  }

  const closeTaxModal = () => {
    setShowIncomeTaxModal(false)
    setTaxResult(null)
  }

  return (
    <div className="pb-6 overflow-y-auto no-scrollbar animate-pop_in">
      
      {/* ── Profile Header ──────────────────────── */}
      <section className="bg-white p-6 rounded-xl border border-brand-yellow/5 shadow-sm mb-6 mt-4">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <div className="size-28 rounded-full overflow-hidden border-4 border-brand-yellow p-1 bg-white">
              <img 
                src={arjunAvatar} 
                alt="Arjun" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-brand-yellow text-slate-900 p-2 rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-white flex items-center justify-center">
              <Camera size={16} />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
              Pro Trader
              <div className="bg-slate-900 text-brand-yellow text-xs font-black px-2 py-0.5 rounded-full shadow-md leading-none h-5 flex items-center">
                Lvl 8
              </div>
            </h1>
            <p className="text-slate-500 font-medium">trader@paisapathshala.com</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
              <button className="px-6 py-2 bg-brand-yellow text-slate-900 font-bold rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all">
                Edit Profile
              </button>
              <button className="px-6 py-2 bg-brand-yellow/10 text-brand-yellow font-bold rounded-full hover:bg-brand-yellow/20 transition-all">
                Share Stats
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Settings Grid: Stats & Quests ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        
        {/* Account & Progress Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold px-2 flex items-center gap-2 text-slate-900">
            <Settings className="text-brand-yellow" size={20} />
            Account Stats
          </h3>
          <div className="bg-white rounded-xl overflow-hidden border border-brand-yellow/5 shadow-sm">
            <div className="p-4 hover:bg-brand-yellow/5 transition-colors flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <Coins className="text-slate-400 group-hover:text-brand-yellow" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Total Coins</p>
                  <p className="text-xs text-brand-orange font-bold font-mono">🪙 {coins.toLocaleString()}</p>
                </div>
              </div>
              <ChevronRight className="text-slate-300 transform group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="p-4 hover:bg-brand-yellow/5 transition-colors border-t border-slate-100 flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <Trophy className="text-slate-400 group-hover:text-brand-yellow" size={20} />
                <div>
                  <p className="font-bold text-slate-900">Current Rank</p>
                  <p className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Star size={12} className="fill-brand-yellow text-brand-yellow" /> Rising Investor
                  </p>
                </div>
              </div>
              <ChevronRight className="text-slate-300 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Active Quests (Notifications Style) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold px-2 flex items-center gap-2 text-slate-900">
            <Flame className="text-brand-yellow" size={20} />
            Daily Quests
          </h3>
          <div className="bg-white rounded-xl overflow-hidden border border-brand-yellow/5 shadow-sm p-2 flex flex-col gap-1">

            {/* GST Hero Quest Item */}
            <div 
              onClick={() => setShowGstModal(true)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:scale-110 transition-transform text-xl">
                  🍦
                </div>
                <div>
                  <p className="font-bold text-slate-900">GST Hero</p>
                  <p className="text-xs font-semibold text-slate-500">+50 Coins • Quick Quiz</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-brand-yellow/10 text-brand-yellow text-xs font-bold rounded-full group-hover:bg-brand-yellow group-hover:text-slate-900 transition-colors">
                Play
              </button>
            </div>

            {/* Income Tax Sprint Item */}
            <div 
              onClick={() => setShowIncomeTaxModal(true)}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center group-hover:scale-110 transition-transform text-xl">
                  📄
                </div>
                <div>
                  <p className="font-bold text-slate-900">Tax Sprint</p>
                  <p className="text-xs font-semibold text-slate-500">+100 Coins • Assessment</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-brand-yellow/10 text-brand-yellow text-xs font-bold rounded-full group-hover:bg-brand-yellow group-hover:text-slate-900 transition-colors">
                Play
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ── App Preferences ───────────────────────── */}
      <section className="space-y-4 mb-6">
        <h3 className="text-lg font-bold px-2 flex items-center gap-2 text-slate-900">
          <Settings className="text-brand-yellow" size={20} />
          App Preferences
        </h3>
        <div className="bg-white rounded-xl border border-brand-yellow/5 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-brand-yellow/10 p-3 rounded-lg">
                <Moon className="text-brand-yellow" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Appearance</p>
                <p className="text-sm text-slate-500 mb-3 font-medium">Choose your visual style</p>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 rounded-full border-2 border-brand-yellow bg-brand-yellow text-slate-900 text-xs font-black shadow-sm">Light</button>
                  <button className="px-4 py-1.5 rounded-full border-2 border-slate-200 text-slate-500 text-xs font-semibold hover:border-brand-yellow transition-colors">Dark</button>
                  <button className="px-4 py-1.5 rounded-full border-2 border-slate-200 text-slate-500 text-xs font-semibold hover:border-brand-yellow transition-colors">System</button>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-brand-yellow/10 p-3 rounded-lg">
                <Shield className="text-brand-yellow" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Privacy &amp; Security</p>
                <p className="text-sm text-slate-500 mb-3 font-medium">Manage your data and login</p>
                <button className="text-brand-orange text-sm font-bold flex items-center gap-1 hover:underline group">
                  Manage Privacy <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Community Mentors ───────────────────────── */}
      <section className="space-y-4 mb-4">
        <h3 className="text-lg font-bold px-2 flex items-center gap-2 text-slate-900">
          <Award className="text-brand-yellow" size={20} />
          Your Mentors
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          
          <div className="min-w-[160px] bg-white p-4 rounded-xl text-center border border-brand-yellow/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="w-16 h-16 rounded-full mx-auto mb-3 p-0.5 border-2 border-brand-yellow">
              <img src={priyaAvatar} alt="Priya" className="w-full h-full rounded-full object-cover" />
            </div>
            <p className="font-bold text-slate-900">Priya K.</p>
            <p className="text-xs font-semibold text-brand-yellow">Equity Expert</p>
          </div>

          <div className="min-w-[160px] bg-white p-4 rounded-xl text-center border border-brand-yellow/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer relative overflow-hidden">
            <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-slate-200 flex items-center justify-center">
              <span className="text-2xl">👩‍💼</span>
            </div>
            <p className="font-bold text-slate-900">Anjali M.</p>
            <p className="text-xs font-semibold text-brand-yellow">Tax Strategist</p>
          </div>

          <div className="min-w-[160px] bg-white p-4 rounded-xl text-center border border-brand-yellow/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
            <div className="w-16 h-16 rounded-full mx-auto mb-3 bg-slate-200 flex items-center justify-center">
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <p className="font-bold text-slate-900">Vikram R.</p>
            <p className="text-xs font-semibold text-brand-yellow">Wealth Coach</p>
          </div>

        </div>
      </section>

      {/* ── Footer ───────────────────────── */}
      <div className="pt-6 pb-12 text-center space-y-4 border-t border-slate-200/60">
        <p className="text-slate-400 font-medium text-xs">Paisa Pathshala v4.2.0 • Made with ❤️ for India</p>
        <button className="text-red-500 font-bold border-2 border-red-500/20 px-8 py-2 rounded-full hover:bg-red-50 hover:border-red-500 transition-colors text-sm">
          Logout Account
        </button>
      </div>

      {showGstModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm clay-card bg-white p-8 !rounded-[2rem] shadow-2xl overflow-hidden">
            {!gstResult && (
              <button onClick={closeGstModal} className="absolute top-4 right-4 text-slate-500"><X size={18} /></button>
            )}
            {!gstResult ? (
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-4">🍦</div>
                <h3 className="text-2xl font-black mb-2">GST Check</h3>
                <p className="text-slate-500 mb-6 w-full text-center">Which slab applies to Ice Cream?</p>
                <div className="grid grid-cols-2 gap-3 w-full">
                  {['5%', '12%', '18%', '28%'].map(ans => (
                    <button key={ans} onClick={() => handleGstAnswer(ans)} className="py-3 bg-slate-50 rounded-xl font-bold border-2 border-slate-200 hover:border-brand-orange">
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            ) : gstResult === 'success' ? (
              <div className="text-center py-4">
                <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="text-3xl font-black mb-2">Correct!</h3>
                <button onClick={closeGstModal} className="w-full py-4 rounded-full font-black bg-emerald-500 text-white mt-4">Awesome</button>
              </div>
            ) : (
              <div className="text-center py-4">
                <XCircle size={40} className="text-rose-500 mx-auto mb-4" />
                <h3 className="text-3xl font-black mb-2">Oops!</h3>
                <button onClick={closeGstModal} className="w-full py-4 rounded-full font-black bg-slate-100 mt-4">Try Again</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showIncomeTaxModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm clay-card bg-white p-8 !rounded-[2rem] shadow-2xl overflow-hidden">
            {!taxResult && (
              <button onClick={closeTaxModal} className="absolute top-4 right-4 text-slate-500"><X size={18} /></button>
            )}
            {!taxResult ? (
              <div className="flex flex-col items-center">
                <div className="text-4xl mb-4">📄</div>
                <h3 className="text-2xl font-black mb-2">Tax Sprint</h3>
                <div className="grid grid-cols-1 gap-3 w-full mt-4">
                  {['Old Regime', 'New Regime'].map(ans => (
                    <button key={ans} onClick={() => handleTaxAnswer(ans)} className="py-3 px-4 bg-slate-50 rounded-xl font-bold border-2 border-slate-200 hover:border-sky-500 text-left flex justify-between">
                      {ans} <ChevronRight size={16}/>
                    </button>
                  ))}
                </div>
              </div>
            ) : taxResult === 'success' ? (
              <div className="text-center py-4">
                <CheckCircle2 size={40} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="text-3xl font-black mb-2">Spot On!</h3>
                <button onClick={closeTaxModal} className="w-full py-4 rounded-full font-black bg-emerald-500 text-white mt-4">Collect Loot</button>
              </div>
            ) : (
              <div className="text-center py-4">
                <XCircle size={40} className="text-rose-500 mx-auto mb-4" />
                <h3 className="text-3xl font-black mb-2">Not Quite</h3>
                <button onClick={closeTaxModal} className="w-full py-4 rounded-full font-black bg-slate-100 mt-4">Try Again</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

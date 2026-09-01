"use client";

import { PawPrint, LayoutDashboard, Fence, Syringe, Settings, BookOpen, Bot, Leaf, RefreshCw, X, Check, Sparkles, ShieldCheck, Maximize, AlertTriangle, Ruler } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stats, setStats] = useState({ width: 20, length: 10, totalAnimals: 0, careAnimals: 0, enclosureType: 'Grassland' });
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [activeTheme, setActiveTheme] = useState('clean');
  
  // Setup modal local state
  const [setupWidth, setSetupWidth] = useState(20);
  const [setupLength, setSetupLength] = useState(15);
  const [setupUnit, setSetupUnit] = useState('m');
  const [setupTerrain, setSetupTerrain] = useState('Grassland');
  const [setupFacing, setSetupFacing] = useState('North');

  useEffect(() => {
    const loadStats = () => {
      let totalLayout = 0;
      let totalCare = 0;
      let w = 20, l = 10;
      let eType = 'Grassland';
      
      const savedLayout = localStorage.getItem('aniplan_layout');
      if (savedLayout) {
        const data = JSON.parse(savedLayout);
        totalLayout = data.selectedAnimals?.reduce((sum: number, a: any) => sum + a.count, 0) || 0;
        w = data.width || 20;
        l = data.length || 10;
        if (data.enclosureType) eType = data.enclosureType;
      }
      
      const savedCare = localStorage.getItem('aniplan_care_guide');
      if (savedCare) {
        const data = JSON.parse(savedCare);
        totalCare = data.selectedAnimals?.reduce((sum: number, a: any) => sum + a.count, 0) || 0;
      }
      
      setStats({ width: w, length: l, totalAnimals: totalLayout, careAnimals: totalCare, enclosureType: eType });
    };
    
    loadStats();
    // Custom event listener for when page.tsx saves data
    window.addEventListener('layoutUpdated', loadStats);
    return () => window.removeEventListener('layoutUpdated', loadStats);
  }, []);

  return (
    <div className={`flex h-screen font-sans ${activeTheme === 'glow' ? 'bg-[#0f1c16] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#143627] via-[#0f1c16] to-black' : 'bg-slate-50'}`}>
      {/* Sidebar - Exact Greenplan Layout Clone */}
      <aside className={`w-72 border-r flex flex-col shadow-2xl z-20 ${activeTheme === 'glow' ? 'bg-[#0a1711] border-[#1a4231] text-white shadow-[0_0_30px_rgba(52,211,153,0.1)]' : 'bg-[#0a1f16] border-[#1a4231] text-white'}`}>
        
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 font-extrabold text-2xl">
          <div className="bg-transparent border-2 border-[#1a4231] p-1.5 rounded-lg text-emerald-500">
            <PawPrint size={24} />
          </div>
          <div className="flex flex-col">
            <Link href="/" className="tracking-wide text-emerald-50 text-xl font-black">Ani-plan</Link>
            <span className="text-[9px] text-emerald-500 uppercase tracking-widest font-bold mt-0.5">Sanctuary Planner</span>
          </div>
        </div>

        {/* Settings Button */}
        <div className="px-5 mb-8">
          <button onClick={() => {
            setSetupWidth(stats.width);
            setSetupLength(stats.length);
            setSetupTerrain(stats.enclosureType);
            setShowSetupModal(true);
          }} className="w-full bg-[#143627] border border-[#1a4231] hover:border-emerald-500/50 text-emerald-100 rounded-xl p-4 flex justify-between items-center transition shadow-inner">
            <div className="flex flex-col items-start">
              <span className="font-bold text-sm tracking-wide text-white">Enclosure Settings</span>
              <span className="text-[10px] text-emerald-400/70 mt-1">Dimensions, Terrain & Env</span>
            </div>
            <span className="bg-[#0f291e] text-emerald-500 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Edit</span>
          </button>
        </div>

        {/* Navigation Label */}
        <div className="px-6 mb-3">
          <span className="text-[10px] font-extrabold text-emerald-500/50 uppercase tracking-widest">Navigation</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className={"flex justify-between items-center p-3.5 rounded-xl transition border " + (pathname === '/dashboard' ? 'bg-[#143627] border-[#1a4231] text-white shadow-md' : 'border-transparent hover:bg-[#143627] hover:border-[#1a4231] text-emerald-100/70')}>
            <div className="flex flex-col">
              <span className="font-bold text-sm flex items-center gap-3"><Fence size={18} className={pathname === '/dashboard' ? "text-emerald-400" : "text-emerald-600"}/> Enclosure Planner</span>
              <span className="text-[10px] text-emerald-400/50 ml-7 mt-0.5 font-medium">Interactive Canvas & Mix</span>
            </div>
            {stats.totalAnimals > 0 && (
              <span className="bg-emerald-500 text-[#0a1f16] text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">{stats.totalAnimals}</span>
            )}
          </Link>
          
          <Link href="/dashboard/health" className={"flex justify-between items-center p-3.5 rounded-xl transition border " + (pathname === '/dashboard/health' ? 'bg-[#143627] border-[#1a4231] text-white shadow-md' : 'border-transparent hover:bg-[#143627] hover:border-[#1a4231] text-emerald-100/70')}>
            <div className="flex flex-col">
              <span className="font-bold text-sm flex items-center gap-3"><Syringe size={18} className={pathname === '/dashboard/health' ? "text-emerald-400" : "text-emerald-600"}/> Care Guide</span>
              <span className="text-[10px] text-emerald-400/50 ml-7 mt-0.5 font-medium">Feeding & Animal Health</span>
            </div>
            {stats.careAnimals > 0 && (
               <span className="bg-amber-500 text-[#0a1f16] text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">{stats.careAnimals}</span>
            )}
          </Link>

          <Link href="/dashboard/encyclopedia" className={"flex justify-between items-center p-3.5 rounded-xl transition border " + (pathname === '/dashboard/encyclopedia' ? 'bg-[#143627] border-[#1a4231] text-white shadow-md' : 'border-transparent hover:bg-[#143627] hover:border-[#1a4231] text-emerald-100/70')}>
            <div className="flex flex-col">
              <span className="font-bold text-sm flex items-center gap-3"><BookOpen size={18} className={pathname === '/dashboard/encyclopedia' ? "text-emerald-400" : "text-emerald-600"}/> Animal Encyclopedia</span>
              <span className="text-[10px] text-emerald-400/50 ml-7 mt-0.5 font-medium">Companion Data & Info</span>
            </div>
          </Link>
          
          <Link href="/dashboard/ai" className={"flex justify-between items-center p-3.5 rounded-xl hover:bg-[#143627] text-emerald-100/70 transition border " + (pathname === '/dashboard/ai' ? 'bg-[#143627] border-[#1a4231] text-white shadow-md' : 'border-transparent hover:border-[#1a4231]')}>
            <div className="flex flex-col">
              <span className="font-bold text-sm flex items-center gap-3"><Bot size={18} className="text-emerald-600"/> AI Vet Expert</span>
              <span className="text-[10px] text-emerald-400/50 ml-7 mt-0.5 font-medium">Gemini Assistant</span>
            </div>
            <span className="bg-[#0284c7] text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">AI</span>
          </Link>
        </nav>

        {/* Current Enclosure Widget */}
        <div className="p-6 mt-auto">
          <div className="bg-[#0f291e] border border-[#1a4231] rounded-2xl p-5 shadow-inner">
            <div className="flex justify-between items-center mb-4 border-b border-[#1a4231] pb-3">
              <span className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-widest flex items-center gap-2"><Leaf size={14}/> Current Bed</span>
              <span className="text-xs font-bold text-white bg-[#143627] px-2 py-1 rounded">{stats.width}m × {stats.length}m</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[9px] text-emerald-500/70 uppercase tracking-wider font-bold mb-0.5">Terrain Type</span>
                <span className="text-xs font-black text-emerald-100">{stats.enclosureType}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[9px] text-emerald-500/70 uppercase tracking-wider font-bold mb-0.5">Active Pop</span>
                <span className="text-xs font-black text-white">{stats.totalAnimals} Animals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-5 border-t border-[#1a4231] flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <button onClick={() => setShowSettingsModal(true)} className="flex items-center gap-2 hover:text-white text-emerald-400/70 transition font-bold text-xs">
              <Settings size={16} /> Settings & Theme
            </button>
            <span className="bg-[#143627] text-emerald-500 text-[10px] font-bold px-3 py-1 rounded-full">Pro</span>
          </div>
          <button onClick={() => setShowResetModal(true)} className="flex items-center justify-start gap-2 text-[#fb7185] hover:text-red-400 transition font-extrabold text-[10px] uppercase tracking-widest pl-1">
            <RefreshCw size={12} /> Reset All Enclosure Data
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f291e] border border-[#1a4231] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-[#143627] p-3 rounded-2xl border border-[#1a4231] text-emerald-500">
                  <Settings size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Application Settings</h2>
                  <p className="text-emerald-500/70 font-medium text-xs mt-1">Customize visual theme, typography, and sanctuary preferences</p>
                </div>
              </div>
              <button onClick={() => setShowSettingsModal(false)} className="p-2 border border-[#1a4231] hover:bg-[#143627] rounded-full text-emerald-500/50 hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            <h3 className="text-emerald-500 font-extrabold text-xs uppercase tracking-widest mb-3 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Interface Theme & Aesthetics</h3>
            <div className="space-y-3 mb-8">
              <div 
                onClick={() => setActiveTheme('clean')}
                className={`rounded-2xl p-4 flex gap-4 items-start cursor-pointer transition ${activeTheme === 'clean' ? 'border border-emerald-500/50 bg-[#143627]/50' : 'border border-[#1a4231] hover:border-emerald-500/30'}`}
              >
                <div className={`p-2 rounded-lg ${activeTheme === 'clean' ? 'bg-[#0f291e] border border-emerald-500/30 text-emerald-400' : 'bg-[#0f291e] border border-[#1a4231] text-emerald-600'}`}>
                  <ShieldCheck size={20}/>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-white text-sm">Clean & Professional (Default)</h4>
                    {activeTheme === 'clean' && (
                      <span className="bg-emerald-500 text-[#0f291e] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1"><Check size={10}/> Active</span>
                    )}
                  </div>
                  <p className="text-emerald-100/50 text-[10px] leading-relaxed">Refined botanical palette (Obsidian canvas, Sage surfaces, Spruce borders, Emerald actions, Golden accents). Flat, readable typography without noisy glows.</p>
                </div>
              </div>
              <div 
                onClick={() => setActiveTheme('glow')}
                className={`rounded-2xl p-4 flex gap-4 items-start cursor-pointer transition ${activeTheme === 'glow' ? 'border border-emerald-500/50 bg-[#143627]/50' : 'border border-[#1a4231] hover:border-emerald-500/30'}`}
              >
                <div className={`p-2 rounded-lg ${activeTheme === 'glow' ? 'bg-[#0f291e] border border-emerald-500/30 text-emerald-400' : 'bg-[#0f291e] border border-[#1a4231] text-emerald-600'}`}>
                  <Sparkles size={20}/>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-white text-sm">Sanctuary Glow (Atmospheric)</h4>
                    {activeTheme === 'glow' && (
                      <span className="bg-emerald-500 text-[#0f291e] text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1"><Check size={10}/> Active</span>
                    )}
                  </div>
                  <p className="text-emerald-100/50 text-[10px] leading-relaxed">Rich atmospheric gradients, glowing indicators, and technical specimen badges with mono specs.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1a4231] pt-6 mb-8">
              <h3 className="text-emerald-500/50 font-extrabold text-[10px] uppercase tracking-widest mb-4">Enclosure Bed & System Actions</h3>
              <div className="flex gap-4">
                <Link href="/dashboard" onClick={() => setShowSettingsModal(false)} className="flex-1 bg-transparent border border-[#1a4231] hover:border-emerald-500/50 text-white font-bold py-3 rounded-xl text-xs flex justify-center items-center gap-2 transition">
                  <Maximize size={14} /> Edit Enclosure Dimensions
                </Link>
                <button onClick={() => { setShowSettingsModal(false); setShowResetModal(true); }} className="flex-1 bg-transparent border border-[#1a4231] hover:border-red-500/50 hover:bg-red-950/20 text-[#fb7185] font-bold py-3 rounded-xl text-xs flex justify-center items-center gap-2 transition">
                  <RefreshCw size={14} /> Reset Enclosure Data
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setShowSettingsModal(false)} className="bg-emerald-500 hover:bg-emerald-400 text-[#0f291e] font-black py-3 px-8 rounded-xl text-sm transition">
                Save & Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f291e] border border-red-500/20 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_20px_60px_rgba(225,29,72,0.15)] flex flex-col p-8 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-red-950/40 p-3 rounded-2xl border border-red-500/30 text-red-500">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Reset Enclosure Data?</h2>
                  <p className="text-red-400/80 font-bold text-xs mt-1">Action cannot be undone</p>
                </div>
              </div>
              <button onClick={() => setShowResetModal(false)} className="p-2 hover:bg-[#143627] rounded-full text-emerald-500/50 hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            <div className="bg-[#143627]/30 border border-[#1a4231] rounded-2xl p-5 mb-8">
              <p className="text-emerald-100/70 text-xs leading-relaxed mb-4 font-medium">
                This will completely wipe your current enclosure bed configuration, canvas animal placements, companion setups, and care guide watering logs.
              </p>
              <p className="text-red-400 text-xs font-bold">
                You will be returned to the initial setup wizard to start fresh.
              </p>
            </div>

            <div className="flex gap-4 justify-end">
              <button onClick={() => setShowResetModal(false)} className="bg-[#143627] hover:bg-[#1a4231] border border-[#1a4231] text-white font-bold py-3 px-6 rounded-xl text-xs transition">
                Cancel
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem('aniplan_layout');
                  localStorage.removeItem('aniplan_care_guide');
                  localStorage.removeItem('aniplan_care_tracking');
                  localStorage.removeItem('aniplan_ai_history');
                  window.location.href = '/';
                }} 
                className="bg-rose-600 hover:bg-rose-500 text-white font-black py-3 px-6 rounded-xl text-xs flex items-center gap-2 transition shadow-[0_0_15px_rgba(225,29,72,0.4)]"
              >
                <RefreshCw size={14} /> Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Enclosure Bed Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#14281d] border border-[#1a4231] rounded-2xl w-full max-w-[400px] shadow-2xl flex flex-col relative overflow-hidden">
            <div className="p-6 border-b border-[#1a4231]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Ruler className="text-emerald-400" size={20}/> Enclosure Bed Setup</h2>
                <button onClick={() => setShowSetupModal(false)} className="text-slate-400 hover:text-white transition">
                  <X size={20} />
                </button>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Define your real enclosure bed dimensions. Ani-plan computes exact scale footprint diameter for every animal based on these measurements.
              </p>
            </div>

            <div className="p-6 space-y-6">
              
              <div>
                <label className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-widest block mb-2">Measurement Unit</label>
                <div className="flex bg-[#0f1c16] rounded-xl border border-[#1a4231] p-1">
                  <button onClick={() => setSetupUnit('m')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${setupUnit === 'm' ? 'bg-emerald-500 text-[#0f1c16]' : 'text-slate-400 hover:text-white'}`}>Meters (m)</button>
                  <button onClick={() => setSetupUnit('ft')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${setupUnit === 'ft' ? 'bg-emerald-500 text-[#0f1c16]' : 'text-slate-400 hover:text-white'}`}>Feet (ft)</button>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-widest block mb-2">Width ({setupUnit})</label>
                  <input type="number" value={setupWidth} onChange={(e) => setSetupWidth(Number(e.target.value))} className="w-full bg-[#0f1c16] border border-[#1a4231] text-white font-bold rounded-xl p-3 outline-none focus:border-emerald-500 text-sm"/>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-widest block mb-2">Length ({setupUnit})</label>
                  <input type="number" value={setupLength} onChange={(e) => setSetupLength(Number(e.target.value))} className="w-full bg-[#0f1c16] border border-[#1a4231] text-white font-bold rounded-xl p-3 outline-none focus:border-emerald-500 text-sm"/>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-widest block">Enclosure Terrain & Type</label>
                  <span className="text-[10px] text-emerald-400 font-bold">{setupTerrain}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setSetupTerrain('Grassland')} className={`py-3 px-2 text-xs font-bold rounded-xl border transition ${setupTerrain === 'Grassland' ? 'bg-emerald-500 border-emerald-400 text-[#0f1c16]' : 'bg-[#0f1c16] border-[#1a4231] text-slate-300 hover:border-emerald-500/50'}`}>Grassland</button>
                  <button onClick={() => setSetupTerrain('Mud/Aquatic')} className={`py-3 px-2 text-xs font-bold rounded-xl border transition ${setupTerrain === 'Mud/Aquatic' ? 'bg-emerald-500 border-emerald-400 text-[#0f1c16]' : 'bg-[#0f1c16] border-[#1a4231] text-slate-300 hover:border-emerald-500/50'}`}>Mud/Aquatic</button>
                  <button onClick={() => setSetupTerrain('Reinforced Pen')} className={`py-3 px-2 text-xs font-bold rounded-xl border transition ${setupTerrain === 'Reinforced Pen' ? 'bg-emerald-500 border-emerald-400 text-[#0f1c16]' : 'bg-[#0f1c16] border-[#1a4231] text-slate-300 hover:border-emerald-500/50'}`}>Reinforced Pen</button>
                  <button onClick={() => setSetupTerrain('Custom')} className={`py-3 px-2 text-xs font-bold rounded-xl border transition ${setupTerrain === 'Custom' ? 'bg-[#1a4231] border-[#1a4231] text-emerald-400' : 'bg-[#0f1c16] border-[#1a4231] text-slate-300 hover:border-emerald-500/50'}`}>Custom</button>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-widest block mb-2 flex items-center gap-1"><Maximize size={12}/> Bed Facing Direction ({setupFacing})</label>
                <div className="flex gap-2">
                  {['North', 'East', 'South', 'West'].map(d => (
                    <button key={d} onClick={() => setSetupFacing(d)} className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition ${setupFacing === d ? 'bg-emerald-500 border-emerald-400 text-[#0f1c16]' : 'bg-[#0f1c16] border-[#1a4231] text-slate-300 hover:border-emerald-500/50'}`}>{d}</button>
                  ))}
                </div>
                <p className="text-slate-400 text-[9px] mt-2 leading-relaxed">
                  Top of canvas faces {setupFacing}. Tall animals cast shadows away from sun position.
                </p>
              </div>

            </div>

            <div className="p-6 border-t border-[#1a4231] flex justify-between items-center bg-[#0a1f16]">
              <button onClick={() => setShowSetupModal(false)} className="text-xs font-bold text-slate-300 hover:text-white transition">Cancel</button>
              <button 
                onClick={() => {
                  const saved = localStorage.getItem('aniplan_layout');
                  if (saved) {
                    const data = JSON.parse(saved);
                    const newData = { ...data, width: setupWidth, length: setupLength, enclosureType: setupTerrain };
                    localStorage.setItem('aniplan_layout', JSON.stringify(newData));
                    localStorage.setItem('aniplan_care_guide', JSON.stringify(newData));
                    window.dispatchEvent(new Event('layoutUpdated'));
                  }
                  setShowSetupModal(false);
                }} 
                className="bg-emerald-500 hover:bg-emerald-400 text-[#14281d] font-black py-2.5 px-6 rounded-xl text-xs transition"
              >
                Update Scale Canvas
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

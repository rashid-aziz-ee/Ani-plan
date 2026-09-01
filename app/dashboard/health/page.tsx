"use client";

import { useState, useEffect } from "react";
import { Droplets, Wheat, Stethoscope, HeartPulse, Loader2, Bot, AlertCircle, CheckCircle2, Info, Search, X, Sun, Maximize, ShieldCheck } from "lucide-react";
import { speciesLibrary } from "../page";

type AnimalCareData = {
  id: string;
  count: number;
  isWatered: boolean;
  isFed: boolean;
};

export default function HealthCarePage() {
  const [symptom, setSymptom] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [infoModalId, setInfoModalId] = useState<string | null>(null);

  const [careAnimals, setCareAnimals] = useState<(AnimalCareData & { addedAt: number })[]>([]);
  const [totalAnimals, setTotalAnimals] = useState(0);
  const [filterState, setFilterState] = useState<'All'|'NeedsWater'|'Hydrated'>('All');
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    // Timer to force re-render every minute for growth/hunger updates
    const timer = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  const loadData = () => {
    const saved = localStorage.getItem('aniplan_care_guide');
    const savedTracking = localStorage.getItem('aniplan_care_tracking');
    let tracking = savedTracking ? JSON.parse(savedTracking) : {};

    if (saved) {
      const data = JSON.parse(saved);
      if (data.selectedAnimals) {
        let updatedTracking = false;
        const now = Date.now();
        data.selectedAnimals.forEach((a: any) => {
          if (!tracking[a.id]) {
            // New animal initialized as hungry/thirsty
            tracking[a.id] = { lastFed: 0, lastWatered: 0, addedAt: now };
            updatedTracking = true;
          }
        });
        if (updatedTracking) {
          localStorage.setItem('aniplan_care_tracking', JSON.stringify(tracking));
        }

        // 6 hours for food, 4 hours for water (in ms)
        const FEED_COOLDOWN = 6 * 60 * 60 * 1000; 
        const WATER_COOLDOWN = 4 * 60 * 60 * 1000;

        const initialized = data.selectedAnimals.map((a: any) => {
          const t = tracking[a.id];
          const isFed = (now - t.lastFed) < FEED_COOLDOWN;
          const isWatered = (now - t.lastWatered) < WATER_COOLDOWN;
          return {
            ...a,
            isFed,
            isWatered,
            addedAt: t.addedAt
          };
        });
        setCareAnimals(initialized);
        setTotalAnimals(data.selectedAnimals.reduce((sum: number, a: any) => sum + a.count, 0));
      }
    }
  };

  useEffect(() => {
    loadData();
    
    // Add event listener so if we switch tabs back it re-loads
    window.addEventListener('layoutUpdated', loadData);
    return () => window.removeEventListener('layoutUpdated', loadData);
  }, []);

  const updateTracking = (id: string, key: 'lastFed' | 'lastWatered') => {
    const savedTracking = localStorage.getItem('aniplan_care_tracking');
    let tracking = savedTracking ? JSON.parse(savedTracking) : {};
    if (tracking[id]) {
      tracking[id][key] = Date.now();
    }
    localStorage.setItem('aniplan_care_tracking', JSON.stringify(tracking));
    loadData(); // Re-evaluate state
  };

  const markWatered = (id: string) => updateTracking(id, 'lastWatered');
  const markFed = (id: string) => updateTracking(id, 'lastFed');

  const markAllWatered = () => {
    const savedTracking = localStorage.getItem('aniplan_care_tracking');
    let tracking = savedTracking ? JSON.parse(savedTracking) : {};
    const now = Date.now();
    careAnimals.forEach(a => {
      if (!a.isWatered && tracking[a.id]) tracking[a.id].lastWatered = now;
    });
    localStorage.setItem('aniplan_care_tracking', JSON.stringify(tracking));
    loadData();
  };

  const markAllFed = () => {
    const savedTracking = localStorage.getItem('aniplan_care_tracking');
    let tracking = savedTracking ? JSON.parse(savedTracking) : {};
    const now = Date.now();
    careAnimals.forEach(a => {
      if (!a.isFed && tracking[a.id]) tracking[a.id].lastFed = now;
    });
    localStorage.setItem('aniplan_care_tracking', JSON.stringify(tracking));
    loadData();
  };

  const wateredCount = careAnimals.filter(a => a.isWatered).length;
  const needsAttentionCount = careAnimals.filter(a => !a.isWatered).length;
  const feedDueCount = careAnimals.filter(a => !a.isFed).length;

  const filteredAnimals = careAnimals.filter(a => {
    if (filterState === 'All') return true;
    if (filterState === 'NeedsWater') return !a.isWatered;
    if (filterState === 'Hydrated') return a.isWatered;
    return true;
  }).filter(a => {
    if (!searchQuery) return true;
    const sp = speciesLibrary.find(s => s.id === a.id);
    return sp?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleAnalyze = async () => {
    if (!symptom.trim()) return;
    setIsAnalyzing(true);
    setAiResponse(null);
    setApiError(null);
    
    try {
      const animalList = careAnimals.map(a => `${a.count}x ID:${a.id}`).join(", ");
      const enclosureContext = `Current Enclosure Animals: ${animalList}. The user is asking about a symptom.`;

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptom, context: enclosureContext })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      
      setAiResponse(data.text);
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const infoSpecies = infoModalId ? speciesLibrary.find(s => s.id === infoModalId) : null;

  return (
    <div className="min-h-[calc(100vh)] bg-[#fafaf8] font-sans p-6 md:p-8 overflow-y-auto custom-scrollbar">
      
      {/* Centered Max-Width Container */}
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Banner */}
        <div className="bg-[#143627] rounded-2xl p-6 shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border border-[#1a4231]">
          <div className="flex gap-4 items-center">
            <div className="bg-[#1a4231] p-3 rounded-xl border border-emerald-500/30 shadow-inner">
              <HeartPulse size={32} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-wide">Care Guide</h1>
              <p className="text-emerald-200/70 text-sm mt-1 font-medium">Daily feeding routines & health tracking for {careAnimals.length} species ({totalAnimals} total animals)</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={markAllWatered}
              disabled={needsAttentionCount === 0}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#143627] font-bold py-2.5 px-5 rounded-full flex items-center gap-2 text-sm transition shadow-lg"
            >
              <Droplets size={16} /> Water All Due ({needsAttentionCount})
            </button>
            <button 
              onClick={markAllFed}
              disabled={feedDueCount === 0}
              className="bg-transparent border-2 border-emerald-500 disabled:opacity-50 text-emerald-400 hover:bg-emerald-500 hover:text-[#143627] font-bold py-2.5 px-5 rounded-full flex items-center gap-2 text-sm transition"
            >
              <Wheat size={16} /> Mark All Fed
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#fff9d6] border-2 border-[#e6d070] rounded-xl p-5 flex flex-col justify-center shadow-sm">
            <span className="text-[#a68a1c] text-[10px] font-extrabold uppercase tracking-widest mb-1">Water Due</span>
            <span className="text-3xl font-black text-[#594805]">{needsAttentionCount} Species</span>
          </div>
          <div className="bg-[#e0f2fe] border-2 border-[#7dd3fc] rounded-xl p-5 flex flex-col justify-center shadow-sm">
            <span className="text-[#0284c7] text-[10px] font-extrabold uppercase tracking-widest mb-1">Watered Today</span>
            <span className="text-3xl font-black text-[#0c4a6e]">{wateredCount} / {careAnimals.length}</span>
          </div>
          <div className="bg-[#fef3c7] border-2 border-[#fcd34d] rounded-xl p-5 flex flex-col justify-center shadow-sm">
            <span className="text-[#b45309] text-[10px] font-extrabold uppercase tracking-widest mb-1">Feed Due</span>
            <span className="text-3xl font-black text-[#78350f]">{feedDueCount} Species</span>
          </div>
          <div className="bg-[#dcfce7] border-2 border-[#86efac] rounded-xl p-5 flex flex-col justify-center shadow-sm">
            <span className="text-[#166534] text-[10px] font-extrabold uppercase tracking-widest mb-1">Enclosure Total</span>
            <span className="text-3xl font-black text-[#14532d]">{totalAnimals} Animals</span>
          </div>
        </div>

        {/* Gemini AI Assistant Box */}
        <div className="bg-[#f0f9ff] border-2 border-[#bae6fd] rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
            <Bot size={200} />
          </div>
          
          <div className="flex justify-between items-center mb-6 border-b border-[#bae6fd] pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-[#e0f2fe] p-2 rounded-lg text-[#0284c7]">
                <Stethoscope size={24} />
              </div>
              <h2 className="text-[#0369a1] font-extrabold text-xl">Quick AI Symptom Checker</h2>
            </div>
            <div className="flex gap-2">
              <span className="bg-[#fef08a] text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">⚠️ {needsAttentionCount} Due</span>
              <span className="bg-[#0284c7] text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1"><Droplets size={12}/> {wateredCount} Hydrated</span>
            </div>
          </div>
          
          <div className="relative z-10">
            {!aiResponse && !isAnalyzing ? (
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 w-full">
                  <textarea 
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    className="w-full bg-white border-2 border-[#bae6fd] rounded-xl p-4 text-sm focus:outline-none focus:border-[#0284c7] focus:ring-4 focus:ring-[#e0f2fe] resize-none text-slate-700 shadow-inner font-medium"
                    rows={3}
                    placeholder="Describe any unusual behavior in your animals (e.g., 'The sheep is lethargic and not eating...')"
                  ></textarea>
                  {apiError && <p className="text-red-500 text-xs mt-2 font-bold flex items-center gap-1 bg-red-50 p-2 rounded border border-red-200"><AlertCircle size={14}/> {apiError}</p>}
                </div>
                <button 
                  onClick={handleAnalyze}
                  disabled={!symptom.trim()}
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-extrabold py-4 px-8 rounded-xl disabled:opacity-50 transition shadow-lg whitespace-nowrap h-[90px]"
                >
                  Analyze Symptoms
                </button>
              </div>
            ) : isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-8 text-[#0284c7]">
                <Loader2 size={48} className="animate-spin mb-4" />
                <p className="font-bold text-lg animate-pulse">Gemini AI is analyzing symptoms...</p>
              </div>
            ) : (
              <div className="bg-white border-2 border-[#7dd3fc] rounded-xl p-6 shadow-md">
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                  <h3 className="font-extrabold text-[#0369a1] flex items-center gap-2"><Bot size={20}/> Diagnosis Report</h3>
                  <button 
                    onClick={() => { setAiResponse(null); setSymptom(""); setApiError(null); }}
                    className="text-xs font-bold text-[#0284c7] bg-[#e0f2fe] hover:bg-[#bae6fd] px-3 py-1.5 rounded-full transition"
                  >
                    Ask Another Question
                  </button>
                </div>
                <div className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed font-medium">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-2 border-b-2 border-slate-200">
          <div className="flex items-center gap-3 text-slate-400 bg-white border-2 border-slate-200 px-4 py-2 rounded-full w-full md:w-96 shadow-sm">
            <Search size={16} />
            <input 
              type="text" 
              placeholder="Search care guide..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-sm font-medium w-full" 
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setFilterState('All')}
              className={"text-[10px] font-bold px-3 py-1.5 rounded-full transition shadow-sm " + (filterState === 'All' ? 'bg-[#0284c7] text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300')}
            >
              All Animals ({careAnimals.length})
            </button>
            <button 
              onClick={() => setFilterState('NeedsWater')}
              className={"text-[10px] font-bold px-3 py-1.5 rounded-full transition shadow-sm " + (filterState === 'NeedsWater' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300')}
            >
              Needs Water ({needsAttentionCount})
            </button>
            <button 
              onClick={() => setFilterState('Hydrated')}
              className={"text-[10px] font-bold px-3 py-1.5 rounded-full transition shadow-sm " + (filterState === 'Hydrated' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300')}
            >
              Hydrated ({wateredCount})
            </button>
          </div>
        </div>

        {/* Animal Care List (2-Column Grid) */}
        {filteredAnimals.length === 0 ? (
          <div className="bg-white border-2 border-slate-200 p-10 rounded-2xl text-center shadow-sm">
             <div className="text-6xl mb-4 grayscale opacity-50">🌾</div>
             <h3 className="text-xl font-bold text-slate-700 mb-2">No Animals Found</h3>
             <p className="text-slate-500 font-medium">No animals match the current filter or search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {filteredAnimals.map((item) => {
              const species = speciesLibrary.find(s => s.id === item.id);
              if (!species) return null;
              
              const needsWater = !item.isWatered;
              const needsFeed = !item.isFed;
              const needsAttention = needsWater || needsFeed;

              return (
                <div key={item.id} className={(needsAttention ? 'bg-[#fffef0] border-[#fcd34d]' : 'bg-white border-slate-200') + " border-2 rounded-2xl p-6 shadow-md relative overflow-hidden transition-colors duration-500"}>
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-4">
                      <div className={"text-4xl rounded-xl p-2.5 shadow-sm border-2 " + (needsAttention ? 'bg-white border-[#fef08a]' : 'bg-slate-50 border-slate-100')}>{species.icon}</div>
                      <div>
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                          {species.name} 
                          <span className="bg-[#dcfce7] text-[#166534] text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#86efac]">{item.count} Head</span>
                        </h3>
                        <p className="text-slate-500 text-[10px] mt-1 font-bold uppercase tracking-widest">{species.category} • {species.feedType}</p>
                      </div>
                    </div>
                    <button onClick={() => setInfoModalId(species.id)} className="text-slate-400 hover:text-slate-800 transition p-1.5 border-2 border-slate-200 rounded-full bg-white"><Info size={16}/></button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {needsFeed ? (
                      <span className="bg-[#fff9d6] border-2 border-[#e6d070] text-[#a68a1c] text-[9px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1"><Wheat size={12}/> Feed Due</span>
                    ) : (
                      <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[9px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={12}/> Fed Today</span>
                    )}

                    {needsWater ? (
                      <span className="bg-[#fff9d6] border-2 border-[#e6d070] text-[#a68a1c] text-[9px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider shadow-sm flex items-center gap-1">⚠️ Water Due</span>
                    ) : (
                      <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[9px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1"><CheckCircle2 size={12}/> Hydrated</span>
                    )}
                  </div>

                  {(() => {
                    const isAdult = species.growthDays === 'Adult';
                    const maxDays = isAdult ? 0 : parseInt(species.growthDays);
                    const baseDays = isAdult ? 0 : Math.floor(maxDays * (species.progressPct / 100));
                    // 1 real hour = 1 game day
                    const activeDays = Math.floor((Date.now() - item.addedAt) / (1000 * 60 * 60));
                    const currentDays = isAdult ? 'Max' : Math.min(maxDays, baseDays + activeDays);
                    const progressWidth = isAdult ? 100 : Math.min(100, (currentDays as number / maxDays) * 100);

                    return (
                      <div className={"mb-6 p-3 rounded-lg border " + (needsAttention ? 'bg-white border-[#fef08a]' : 'bg-slate-50 border-slate-100')}>
                        <div className="flex justify-between text-[9px] font-extrabold text-slate-500 mb-2 uppercase tracking-widest">
                          <span>{isAdult ? 'Life Stage' : 'Days on Farm'}</span>
                          <span>{isAdult ? 'Adult' : `${maxDays} Total`}</span>
                        </div>
                        <div className={"w-full h-2 rounded-full overflow-hidden border " + (needsAttention ? 'bg-slate-100 border-slate-200' : 'bg-slate-200 border-slate-300')}>
                          <div 
                            className="bg-emerald-400 h-full shadow-inner transition-all duration-1000" 
                            style={{ width: `${progressWidth}%` }}
                          ></div>
                        </div>
                        <div className="text-right text-[10px] font-bold text-slate-600 mt-1">
                          {isAdult ? 'Fully Grown' : `${currentDays} Days Old`}
                        </div>
                      </div>
                    );
                  })()}

                  <div className={"flex gap-3 justify-end border-t-2 pt-4 " + (needsAttention ? 'border-[#fef08a]' : 'border-slate-100')}>
                    
                    {needsFeed ? (
                      <button 
                        onClick={() => markFed(item.id)}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-full text-xs flex justify-center items-center gap-2 transition shadow-md"
                      >
                        <Wheat size={14} /> Feed
                      </button>
                    ) : (
                      <button className="flex-1 bg-slate-100 border-2 border-slate-200 text-slate-400 font-bold py-2 rounded-full text-xs cursor-not-allowed flex justify-center items-center gap-2">
                        <CheckCircle2 size={14} /> Fed
                      </button>
                    )}

                    {needsWater ? (
                      <button 
                        onClick={() => markWatered(item.id)}
                        className="flex-1 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold py-2 rounded-full text-xs flex justify-center items-center gap-2 transition shadow-md"
                      >
                        <Droplets size={14} /> Water
                      </button>
                    ) : (
                      <button className="flex-1 bg-slate-100 border-2 border-slate-200 text-slate-400 font-bold py-2 rounded-full text-xs cursor-not-allowed flex justify-center items-center gap-2">
                        <CheckCircle2 size={14} /> Watered
                      </button>
                    )}

                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      {/* Image 4 Style "More Info" Modal */}
      {infoModalId && infoSpecies && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#fafaf8] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
            
            <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-white">
              <div className="flex items-center gap-5">
                <div className="text-6xl bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">{infoSpecies.icon}</div>
                <div>
                  <h2 className="text-3xl font-black text-[#143627] flex items-center gap-3">
                    {infoSpecies.name}
                    <span className="bg-emerald-100 text-[#143627] text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold">{infoSpecies.category}</span>
                  </h2>
                  <p className="text-slate-500 font-medium italic text-sm mt-1">{infoSpecies.category === 'Poultry' ? 'Gallus gallus domesticus' : 'Animalia Chordata'}</p>
                </div>
              </div>
              <button onClick={() => setInfoModalId(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto bg-[#fafaf8]">
              <p className="text-slate-700 font-medium leading-relaxed text-lg mb-8">
                {infoSpecies.description}
              </p>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <Sun size={24} className="text-amber-500 mb-2"/>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Sunlight</span>
                  <span className="font-black text-[#143627]">Full Sun</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <Droplets size={24} className="text-blue-500 mb-2"/>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Water</span>
                  <span className="font-black text-[#143627]">High Water</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <Maximize size={24} className="text-slate-500 mb-2"/>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Spacing</span>
                  <span className="font-black text-[#143627]">{infoSpecies.spaceRequired} sq.m</span>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
                  <ShieldCheck size={24} className="text-emerald-500 mb-2"/>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Health</span>
                  <span className="font-black text-[#143627]">Resilient</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}

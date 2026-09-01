"use client";

import { useState } from "react";
import { Leaf, ArrowRight, Fence, Heart, Droplets, Check, Sprout, ArrowLeft, Plus, Minus, Search, X, PawPrint, Sparkles } from "lucide-react";

// Mock species library just for the setup wizard
const speciesLibrary = [
  { id: '1', name: 'Sheep', spaceRequired: 20, icon: '🐑', category: 'Livestock' },
  { id: '2', name: 'Goat', spaceRequired: 15, icon: '🐐', category: 'Livestock' },
  { id: '3', name: 'Cow', spaceRequired: 60, icon: '🐄', category: 'Livestock' },
  { id: '4', name: 'Buffalo', spaceRequired: 70, icon: '🐃', category: 'Livestock' },
  { id: '5', name: 'Horse', spaceRequired: 80, icon: '🐎', category: 'Livestock' },
  { id: '6', name: 'Donkey', spaceRequired: 40, icon: '🫏', category: 'Working' },
  { id: '7', name: 'Chicken', spaceRequired: 4, icon: '🐔', category: 'Poultry' },
  { id: '8', name: 'Duck', spaceRequired: 6, icon: '🦆', category: 'Poultry' },
  { id: '9', name: 'Ostrich', spaceRequired: 45, icon: '🦤', category: 'Poultry' },
  { id: '10', name: 'Peacock', spaceRequired: 15, icon: '🦚', category: 'Poultry' },
  { id: '11', name: 'Guard Dog', spaceRequired: 25, icon: '🐕', category: 'Working' },
  { id: '12', name: 'Cat', spaceRequired: 10, icon: '🐈', category: 'Working' },
  { id: '13', name: 'Parrot', spaceRequired: 5, icon: '🦜', category: 'Exotic' },
  { id: '14', name: 'Camel', spaceRequired: 70, icon: '🐪', category: 'Exotic' },
  { id: '15', name: 'Wolf', spaceRequired: 100, icon: '🐺', category: 'Wild' },
  { id: '16', name: 'Deer', spaceRequired: 150, icon: '🦌', category: 'Wild' },
  { id: '17', name: 'Tiger', spaceRequired: 200, icon: '🐅', category: 'Wild' },
  { id: '18', name: 'Elephant', spaceRequired: 500, icon: '🐘', category: 'Wild' },
];

export default function OnboardingWizard() {
  const [step, setStep] = useState(0);
  
  // Step 1: Dimensions
  const [width, setWidth] = useState<number | ''>(20);
  const [length, setLength] = useState<number | ''>(20);
  const [enclosureType, setEnclosureType] = useState('Standard Pasture');
  
  // Step 2: Density
  const [density, setDensity] = useState('Standard Spacing');
  
  // Step 3: Animals
  const [selectedAnimals, setSelectedAnimals] = useState<{id: string, count: number}[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Step 4: Ratios (just uses selectedAnimals state)

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const finishSetup = () => {
    const layoutData = { width: width || 20, length: length || 20, selectedAnimals, enclosureType };
    localStorage.setItem('aniplan_layout', JSON.stringify(layoutData));
    localStorage.setItem('aniplan_care_guide', JSON.stringify(layoutData));
    localStorage.removeItem('aniplan_care_tracking');
    localStorage.removeItem('aniplan_ai_history');
    window.location.href = '/dashboard';
  };

  const totalArea = (width || 0) * (length || 0);
  const usedArea = selectedAnimals.reduce((acc, item) => {
    const sp = speciesLibrary.find(s => s.id === item.id);
    return acc + (sp ? sp.spaceRequired * item.count : 0);
  }, 0);

  const handleToggleAnimal = (id: string) => {
    if (selectedAnimals.find(a => a.id === id)) {
      setSelectedAnimals(selectedAnimals.filter(a => a.id !== id));
    } else {
      const sp = speciesLibrary.find(s => s.id === id);
      const initialCount = 1;
      if (sp && usedArea + (sp.spaceRequired * initialCount) > totalArea) {
        alert(`Error: Not enough space for ${sp.name}. Needs ${sp.spaceRequired} sq.m but only ${totalArea - usedArea} sq.m available.`);
        return;
      }
      setSelectedAnimals([...selectedAnimals, { id, count: initialCount }]);
    }
  };

  const handleUpdateCount = (id: string, delta: number) => {
    if (delta > 0) {
      const sp = speciesLibrary.find(s => s.id === id);
      if (sp && usedArea + sp.spaceRequired > totalArea) {
        alert(`Error: Not enough space to add another ${sp.name}. Needs ${sp.spaceRequired} sq.m but only ${totalArea - usedArea} sq.m available.`);
        return;
      }
    }
    setSelectedAnimals(selectedAnimals.map(a => {
      if (a.id === id) {
        return { ...a, count: Math.max(1, a.count + delta) };
      }
      return a;
    }));
  };

  const filteredSpecies = speciesLibrary.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (step === 0) {
    return (
      <main className="min-h-screen bg-[#0a1f16] flex items-center justify-center font-sans p-4">
        <div className="w-full max-w-3xl flex flex-col items-center">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-2 border border-emerald-500/30 rounded-lg text-emerald-400">
              <PawPrint size={24} />
            </div>
            <div>
              <h2 className="text-white font-bold flex items-center gap-3 text-xl">
                Ani-plan 
                <span className="bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full">
                  Enclosure Onboarding
                </span>
              </h2>
              <p className="text-emerald-500/60 text-xs">Precision Farm Canvas & Setup</p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#2e5d42] to-[#143627] border border-[#3e7354] rounded-[2rem] w-full max-w-4xl p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
              <span className="bg-[#143627]/80 backdrop-blur-md text-emerald-400 text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full font-bold flex items-center gap-2 border border-[#1a4231]"><Sparkles size={12}/> VETERINARY HERD CANVAS ENGINE</span>
            </div>

            <h1 className="text-5xl whitespace-nowrap font-serif font-black text-white mt-12 mb-6" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              Ani-plan Enclosure Planner
            </h1>
            <p className="text-emerald-50 text-base max-w-2xl mx-auto mb-14 leading-relaxed font-medium">
              Design true-to-scale farm enclosures, optimize companion animal relationships, calculate precision space requirements, and auto-arrange your ideal high-yield sanctuary.
            </p>

            <div className="flex justify-center gap-6 mb-14 w-full">
              <div className="bg-[#0a1f16]/60 backdrop-blur-sm border border-[#1a4231] p-4 rounded-xl flex items-center gap-4 text-left w-64 hover:bg-[#0a1f16]/80 transition">
                <div className="bg-[#143627] border border-[#1a4231] p-2.5 rounded-lg text-[#d9aa55] shadow-inner"><Fence size={20}/></div>
                <div>
                  <h4 className="text-white text-xs font-bold mb-0.5">True Scale Enclosures</h4>
                  <p className="text-emerald-500/70 text-[10px]">Precision meter grid</p>
                </div>
              </div>
              <div className="bg-[#0a1f16]/60 backdrop-blur-sm border border-[#1a4231] p-4 rounded-xl flex items-center gap-4 text-left w-64 hover:bg-[#0a1f16]/80 transition">
                <div className="bg-[#143627] border border-[#1a4231] p-2.5 rounded-lg text-emerald-400 shadow-inner"><Heart size={20}/></div>
                <div>
                  <h4 className="text-white text-xs font-bold mb-0.5">Herd Synergy Matrix</h4>
                  <p className="text-emerald-500/70 text-[10px]">Social & predator defense</p>
                </div>
              </div>
              <div className="bg-[#0a1f16]/60 backdrop-blur-sm border border-[#1a4231] p-4 rounded-xl flex items-center gap-4 text-left w-64 hover:bg-[#0a1f16]/80 transition">
                <div className="bg-[#143627] border border-[#1a4231] p-2.5 rounded-lg text-purple-400 shadow-inner"><Sparkles size={20}/></div>
                <div>
                  <h4 className="text-white text-xs font-bold mb-0.5">Smart Herd Layout</h4>
                  <p className="text-emerald-500/70 text-[10px]">Algorithmic animal placement</p>
                </div>
              </div>
            </div>

            <button onClick={handleNext} className="bg-[#facc15] hover:bg-[#eab308] text-[#422006] font-black text-sm px-10 py-4 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.2)] transition flex items-center justify-center gap-3 mx-auto">
              <PawPrint size={18} /> Start Planning Your Enclosure <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a1f16] flex flex-col items-center p-8 font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-10 w-full max-w-4xl">
        <div className="p-2 border border-emerald-500/30 rounded-lg text-emerald-400">
          <PawPrint size={24} />
        </div>
        <div>
          <h2 className="text-white font-bold flex items-center gap-3 text-xl">
            Ani-plan 
            <span className="bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full">
              Enclosure Onboarding
            </span>
          </h2>
          <p className="text-emerald-500/60 text-xs">Precision Farm Canvas & Setup</p>
        </div>
      </div>

      {/* Wizard Container */}
      <div className="bg-[#fafaf8] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Step Header */}
        <div className="p-8 border-b border-slate-200 flex justify-between items-start bg-white">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[#143627] text-white flex items-center justify-center font-black shrink-0">
              {step}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#143627] mb-1 font-serif">
                {step === 1 && "Step 1: Set Enclosure Dimensions"}
                {step === 2 && "Step 2: Choose Spacing & Density Profile"}
                {step === 3 && "Step 3: Pick Animals for Your Farm"}
                {step === 4 && "Step 4: Customize Target Mix Ratios (%)"}
              </h2>
              <p className="text-slate-500 text-xs font-medium">Procedural Setup Wizard • Guided Enclosure Configuration</p>
            </div>
          </div>
          <div className="flex gap-1.5 mt-2">
            {[1,2,3,4].map(i => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-[#143627]' : i < step ? 'w-2 bg-emerald-500' : 'w-2 bg-slate-200'}`}></div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-10 flex-1 overflow-y-auto">
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="font-bold text-[#143627] text-lg mb-1">What are the physical dimensions of your enclosure or plot?</h3>
              <p className="text-sm text-slate-500 mb-8">Enter the width and length in meters. We automatically scale the canvas grid and compute area.</p>

              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Popular Footprint Presets:</h4>
              <div className="grid grid-cols-4 gap-4 mb-10">
                {[[10,10], [20,20], [50,50], [100,100]].map(preset => (
                  <button 
                    key={preset.join('x')}
                    onClick={() => { setWidth(preset[0]); setLength(preset[1]); }}
                    className={`p-4 rounded-xl border-2 transition ${width === preset[0] && length === preset[1] ? 'border-[#143627] bg-[#143627] text-white' : 'border-slate-200 hover:border-emerald-300 text-slate-600 bg-white'}`}
                  >
                    <div className="font-bold text-sm mb-1">{preset[0]}' × {preset[1]}'</div>
                    <div className={width === preset[0] && length === preset[1] ? 'text-emerald-400 text-xs' : 'text-slate-400 text-xs'}>{preset[0]*preset[1]} sq m</div>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-10">
                <div className="flex-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Width (Meters)</label>
                  <input type="number" value={width} onChange={e => setWidth(e.target.value === '' ? '' : Number(e.target.value))} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-lg font-bold text-center focus:outline-none focus:border-emerald-500 shadow-sm" />
                </div>
                <X className="text-slate-300 mt-6" />
                <div className="flex-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Length (Meters)</label>
                  <input type="number" value={length} onChange={e => setLength(e.target.value === '' ? '' : Number(e.target.value))} className="w-full bg-white border border-slate-300 rounded-lg p-3 text-lg font-bold text-center focus:outline-none focus:border-emerald-500 shadow-sm" />
                </div>
                <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Total Enclosure Area</span>
                  <span className="font-bold text-[#143627] text-xl">{totalArea.toFixed(1)} sq m</span>
                </div>
              </div>
              
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Enclosure Type:</h4>
              <div className="grid grid-cols-4 gap-4">
                {['Standard Pasture', 'Reinforced Pen', 'Open Range', 'Aquatic / Mud'].map(type => (
                  <button 
                    key={type}
                    onClick={() => setEnclosureType(type)}
                    className={`p-4 rounded-xl border-2 transition ${enclosureType === type ? 'border-emerald-600 bg-emerald-50' : 'border-slate-200 hover:border-emerald-300 bg-white'}`}
                  >
                    <div className={`font-bold text-xs ${enclosureType === type ? 'text-[#143627]' : 'text-slate-600'}`}>{type}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="font-bold text-[#143627] text-lg mb-1">Select your preferred stocking density strategy</h3>
              <p className="text-sm text-slate-500 mb-8">Different farming methods use tighter or broader spacing depending on land fertility and climate.</p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { name: 'Standard Spacing', tag: '100% Footprint', desc: 'Uses recommended space distances. Great for standard enclosures with traditional grazing.' },
                  { name: 'Bio-Intensive High Yield', tag: 'High Density (-15%)', desc: 'Slightly tighter spacing. Maximizes total carrying capacity in fertile, resource-rich land.' },
                  { name: 'Spacious & Air-Flow Optimal', tag: 'Spacious Clearance', desc: 'Generous spacing (+20% footprint). Ideal for humid climates, reducing conflict risks.' }
                ].map(opt => (
                  <div 
                    key={opt.name}
                    onClick={() => setDensity(opt.name)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition ${density === opt.name ? 'border-emerald-600 bg-emerald-50 shadow-md' : 'border-slate-200 hover:border-emerald-300 bg-white'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-[#143627] text-sm w-24 leading-tight">{opt.name}</h4>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${density === opt.name ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{opt.tag}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">{opt.desc}</p>
                    {density === opt.name ? (
                      <div className="font-bold text-xs text-[#143627] flex items-center gap-1"><Check size={14}/> Selected Strategy</div>
                    ) : (
                      <div className="font-bold text-xs text-slate-400">Select Strategy</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h3 className="font-bold text-[#143627] text-lg mb-1">Pick which animals you want in your farm plot</h3>
                  <p className="text-sm text-slate-500">Click any animal to add or remove it from your selection. At least one is required.</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-[#143627]">{selectedAnimals.length} Animal(s) Selected</div>
                  <div className="text-[10px] uppercase tracking-widest font-black text-emerald-600">{usedArea} / {totalArea} sq.m Used</div>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden border border-slate-200">
                <div 
                  className={`h-full transition-all duration-300 ${usedArea > totalArea ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${Math.min(100, (usedArea / (totalArea || 1)) * 100)}%` }}
                ></div>
              </div>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search animal species..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 shadow-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                {filteredSpecies.map(sp => {
                  const isSelected = selectedAnimals.some(a => a.id === sp.id);
                  return (
                    <div 
                      key={sp.id} 
                      onClick={() => handleToggleAnimal(sp.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col ${isSelected ? 'border-emerald-600 bg-emerald-50 shadow-sm ring-1 ring-emerald-500/20' : 'border-slate-200 bg-white hover:border-emerald-300'}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-4xl">{sp.icon}</span>
                        {isSelected ? (
                          <div className="bg-[#143627] text-white rounded-full p-1"><Check size={14}/></div>
                        ) : (
                          <div className="border-2 border-slate-200 rounded-full w-6 h-6"></div>
                        )}
                      </div>
                      <div className="text-[9px] uppercase tracking-widest font-black text-slate-400 mb-1">{sp.category}</div>
                      <h4 className="font-bold text-[#143627] mb-4">{sp.name}</h4>
                      
                      <div className="mt-auto flex justify-between items-center border-t border-slate-200/60 pt-3">
                        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><Leaf size={12}/> {sp.spaceRequired} sq m</span>
                        {isSelected ? (
                          <span className="text-xs font-bold text-[#143627]">✓ Selected</span>
                        ) : (
                          <span className="text-xs font-bold text-slate-400">Select</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="font-bold text-[#143627] text-lg mb-1">Customize Target Allocation Quantities</h3>
              <p className="text-sm text-slate-500 mb-8">Adjust how many of each animal to place in the enclosure. The algorithm calculates exact layout based on footprint.</p>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-4">
                  <h4 className="font-bold text-[#143627]">Active Selection ({selectedAnimals.length})</h4>
                  <div className="text-right">
                    <div className="text-xs font-black text-[#143627] mb-1">{usedArea} / {totalArea} sq.m Used</div>
                    <div className="w-32 bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
                      <div 
                        className={`h-full transition-all duration-300 ${usedArea > totalArea ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(100, (usedArea / (totalArea || 1)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {selectedAnimals.map(item => {
                    const sp = speciesLibrary.find(s => s.id === item.id)!;
                    return (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{sp.icon}</span>
                          <div>
                            <h4 className="font-bold text-[#143627]">{sp.name}</h4>
                            <p className="text-xs text-slate-500">{sp.spaceRequired} sq m / head</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-1">
                          <button onClick={() => handleUpdateCount(item.id, -1)} disabled={item.count <= 1} className="p-2 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"><Minus size={16}/></button>
                          <span className="font-black text-[#143627] w-6 text-center">{item.count}</span>
                          <button onClick={() => handleUpdateCount(item.id, 1)} disabled={usedArea + sp.spaceRequired > totalArea} className="p-2 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"><Plus size={16}/></button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Step Footer Navigation */}
        <div className="p-6 bg-white border-t border-slate-200 flex justify-between items-center">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 font-bold text-sm px-4 py-2 hover:bg-slate-100 rounded-lg transition"
          >
            <ArrowLeft size={16} /> Previous Step
          </button>
          
          {step < 4 ? (
            <button 
              onClick={handleNext}
              disabled={step === 3 && selectedAnimals.length === 0}
              className="bg-[#143627] hover:bg-[#1a4231] text-white font-bold px-8 py-3 rounded-xl transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <button 
              onClick={finishSetup}
              className="bg-[#facc15] hover:bg-[#eab308] text-[#422006] font-black px-8 py-3 rounded-xl transition flex items-center gap-2 shadow-md"
            >
              <PawPrint size={16} /> Build & Auto-Arrange Farm Canvas
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

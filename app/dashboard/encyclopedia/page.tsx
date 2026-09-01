"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Info, Plus, Calendar, Droplets, Sun, Sprout, ArrowRight, Shield, ShieldAlert, Check, X, ShieldCheck, Heart, Leaf, Fence, AlertCircle } from "lucide-react";
import { speciesLibrary } from "../page";

export default function EncyclopediaPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedAnimal, setSelectedAnimal] = useState<any | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const handleAdd = (animalId: string, animalName: string, destination: string) => {
    // Always check space constraints against the plot
    const layoutSaved = localStorage.getItem('aniplan_layout');
    let layoutData = layoutSaved ? JSON.parse(layoutSaved) : { width: 20, length: 20, selectedAnimals: [] };
    if (!layoutData.selectedAnimals) layoutData.selectedAnimals = [];
    
    const careSaved = localStorage.getItem('aniplan_care_guide');
    let careData = careSaved ? JSON.parse(careSaved) : { width: layoutData.width, length: layoutData.length, selectedAnimals: [] };
    if (!careData.selectedAnimals) careData.selectedAnimals = [];

    const species = speciesLibrary.find(s => s.id === animalId);
    if (!species) return;

    // Enforce area limit for plot
    const totalArea = layoutData.width * layoutData.length;
    const usedArea = layoutData.selectedAnimals.reduce((sum: number, item: any) => {
      const sp = speciesLibrary.find(s => s.id === item.id);
      return sum + (sp ? sp.spaceRequired * item.count : 0);
    }, 0);

    if (usedArea + species.spaceRequired > totalArea) {
      setErrorToast(`Not enough space for ${animalName}! Needs ${species.spaceRequired} sq.m but only ${totalArea - usedArea} sq.m left.`);
      setTimeout(() => setErrorToast(null), 4000);
      return;
    }

    // Update Layout
    const existingLayout = layoutData.selectedAnimals.find((a: any) => a.id === animalId);
    if (existingLayout) {
      existingLayout.count += 1;
    } else {
      layoutData.selectedAnimals.push({ id: animalId, count: 1 });
    }
    
    // Update Care Guide
    const existingCare = careData.selectedAnimals.find((a: any) => a.id === animalId);
    if (existingCare) {
      existingCare.count += 1;
    } else {
      careData.selectedAnimals.push({ id: animalId, count: 1 });
    }
    
    localStorage.setItem('aniplan_layout', JSON.stringify(layoutData));
    localStorage.setItem('aniplan_care_guide', JSON.stringify(careData));
    window.dispatchEvent(new Event('layoutUpdated'));
    
    setAddedToast(`Added ${animalName} to Enclosure & Care Guide!`);
    setTimeout(() => {
      setAddedToast(null);
      if (destination === 'planner') router.push('/dashboard');
      if (destination === 'health') router.push('/dashboard/health');
    }, 1200);
  };

  const filteredAnimals = speciesLibrary.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || a.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#fafaf8] p-8 font-sans relative">
      
      {/* Top Search & Filter Bar - Greenplan Style */}
      <div className="max-w-6xl mx-auto mb-8 bg-[#143627] rounded-2xl p-6 shadow-xl border border-[#1a4231]">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3.5 text-emerald-500/50" size={20} />
          <input 
            type="text" 
            placeholder="Search animals, companion traits, or care needs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0a1f16] border border-[#1a4231] rounded-xl py-3 pl-12 pr-4 text-white placeholder-emerald-500/30 focus:outline-none focus:border-emerald-500 transition shadow-inner"
          />
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {['All', 'Livestock', 'Poultry', 'Working', 'Exotic', 'Wild'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={"px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition border " + (filter === f ? "bg-emerald-500 text-[#0a1f16] border-emerald-400 shadow-lg" : "bg-[#0f291e] text-emerald-400 border-[#1a4231] hover:border-emerald-500/50")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Encyclopedia Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredAnimals.map(animal => (
          <div key={animal.id} className="bg-[#143627] rounded-2xl overflow-hidden border border-[#1a4231] shadow-lg flex flex-col transition hover:border-emerald-500/30 hover:shadow-xl group">
            
            {/* Card Header */}
            <div className="p-5 flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-[#0a1f16] border border-[#1a4231] flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {animal.icon}
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-lg tracking-wide font-serif">{animal.name}</h3>
                  <div className="flex gap-2 mt-1">
                    {animal.careLevel === 'Beginner Friendly' && (
                      <span className="bg-[#b49e4d] text-[#2a1a08] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">★ Beginner</span>
                    )}
                    <span className="bg-emerald-900/50 text-emerald-400 border border-emerald-500/20 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">{animal.category}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedAnimal(animal)} className="text-emerald-500/50 hover:text-white transition flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest">
                <Info size={12}/> Details
              </button>
            </div>

            {/* Description */}
            <div className="px-5 pb-4 flex-1">
              <p className="text-emerald-100/70 text-xs leading-relaxed font-medium">
                {animal.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="px-5 pb-5">
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <Sun size={14} className="text-amber-400 mb-1"/>
                  <span className="text-[9px] text-emerald-500/70 font-bold uppercase">Exposure</span>
                  <span className="text-[10px] text-white font-bold truncate w-full">Full Sun</span>
                </div>
                <div className="flex flex-col items-center border-l border-[#1a4231]">
                  <Droplets size={14} className="text-blue-400 mb-1"/>
                  <span className="text-[9px] text-emerald-500/70 font-bold uppercase">Water</span>
                  <span className="text-[10px] text-white font-bold truncate w-full">{animal.water}</span>
                </div>
                <div className="flex flex-col items-center border-l border-[#1a4231]">
                  <Fence size={14} className="text-emerald-400 mb-1"/>
                  <span className="text-[9px] text-emerald-500/70 font-bold uppercase">Space</span>
                  <span className="text-[10px] text-white font-bold truncate w-full">{animal.spaceRequired} sq.m</span>
                </div>
                <div className="flex flex-col items-center border-l border-[#1a4231]">
                  <Calendar size={14} className="text-purple-400 mb-1"/>
                  <span className="text-[9px] text-emerald-500/70 font-bold uppercase">Growth</span>
                  <span className="text-[10px] text-white font-bold truncate w-full">{animal.growthDays}</span>
                </div>
              </div>
            </div>

            {/* Yield Line */}
            <div className="px-5 py-3 bg-[#0a1f16] border-t border-b border-[#1a4231] flex items-center gap-3">
              <Sprout size={14} className="text-emerald-500"/>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Est. Maintenance:</span>
              <span className="text-xs text-white font-black">{animal.cost}</span>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 flex gap-3">
              <button onClick={() => handleAdd(animal.id, animal.name, 'planner')} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-[#0a1f16] font-black py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition">
                <Plus size={14}/> Add to Enclosure
              </button>
              <button onClick={() => setSelectedAnimal(animal)} className="px-5 bg-[#0f291e] hover:bg-[#1a4231] border border-[#2a4d3a] text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal - Exact Image 4 Clone */}
      {selectedAnimal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111814] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar shadow-2xl border border-[#2a4d3a] relative ring-1 ring-emerald-500/20">
            
            <button onClick={() => setSelectedAnimal(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition p-2 rounded-full hover:bg-white/5 z-10">
              <X size={20} />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="flex gap-5 items-start mb-6 border-b border-slate-700/50 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#0a1f16] border border-[#2a4d3a] flex items-center justify-center text-3xl shadow-inner shrink-0">
                  {selectedAnimal.icon}
                </div>
                <div className="pt-1">
                  <h2 className="text-3xl font-bold text-white font-serif tracking-wide">{selectedAnimal.name}</h2>
                  <p className="text-emerald-500/70 italic text-sm mb-3">Animalia {selectedAnimal.name.toLowerCase()}us</p>
                  <div className="flex gap-2">
                    {selectedAnimal.careLevel === 'Beginner Friendly' && (
                      <span className="bg-[#b49e4d] text-[#2a1a08] text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider flex items-center gap-1">
                        ★ Beginner Friendly
                      </span>
                    )}
                    <span className="bg-[#0a1f16] text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {selectedAnimal.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description Box */}
              <div className="bg-[#14241b] border border-[#1a3a29] rounded-2xl p-5 mb-6 shadow-inner">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedAnimal.description} Highly valued in mixed enclosures. Keep a watchful eye during integration periods.
                </p>
              </div>

              {/* Harvest / Output Block */}
              <div className="bg-[#0f1f16] border border-emerald-900/50 rounded-2xl p-5 mb-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sprout size={64} className="text-emerald-500"/>
                </div>
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                  <ArrowRight size={12}/> Expected Output & Yield
                </p>
                <p className="text-white font-black text-lg">Continuous active contribution to sanctuary ecosystem.</p>
              </div>

              {/* Watering / Feeding Schedule */}
              <div className="bg-[#0f1f2e] border border-blue-900/50 rounded-2xl p-5 mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Droplets size={64} className="text-blue-500"/>
                </div>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Droplets size={12}/> Complete Feeding & Watering Schedule
                </p>
                <p className="text-white font-black text-lg">Daily feeding • Fresh {selectedAnimal.water.toLowerCase()} water supply</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-4 bg-[#14241b] border border-[#1a3a29] rounded-2xl p-5 mb-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Sun size={12}/> Environment</span>
                  <span className="text-sm text-white font-bold">Pasture / Shelter</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Droplets size={12}/> Diet</span>
                  <span className="text-sm text-white font-bold">{selectedAnimal.feedType || selectedAnimal.diet}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Fence size={12}/> Spacing</span>
                  <span className="text-sm text-white font-bold">{selectedAnimal.spaceRequired}m² Area</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><Calendar size={12}/> Maturation</span>
                  <span className="text-sm text-white font-bold">{selectedAnimal.growthDays}</span>
                </div>
              </div>

              {/* Care Advice */}
              <div className="bg-[#14241b] border border-[#1a3a29] rounded-2xl p-5 mb-4">
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Heart size={12}/> Veterinary Care & Advice
                </p>
                <p className="text-white text-sm font-bold">Monitor regularly for signs of lethargy. Maintain secure perimeter fencing.</p>
              </div>

              {/* Synergy */}
              <div className="bg-[#14241b] border border-[#1a3a29] rounded-2xl p-5 mb-8">
                <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                  <ShieldCheck size={12}/> Companion Guild & Matrix Benefits
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedAnimal.companionInfo}</p>
              </div>

              {/* Bottom Actions */}
              <div className="flex gap-4">
                <button onClick={() => handleAdd(selectedAnimal.id, selectedAnimal.name, 'planner')} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-[#0a1f16] font-black py-4 rounded-xl text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition">
                  <Plus size={18}/> Add to Planner Canvas
                </button>
                <button onClick={() => handleAdd(selectedAnimal.id, selectedAnimal.name, 'health')} className="px-8 bg-[#0a1f16] hover:bg-[#112a1f] border border-[#2a4d3a] text-white font-bold py-4 rounded-xl text-sm uppercase tracking-wider transition shadow-lg">
                  Add to Care Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#143627] border border-emerald-500/50 text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.2)] flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded-full">
            <Check size={20} />
          </div>
          <div>
            <p className="font-bold text-sm tracking-wide">Success!</p>
            <p className="text-emerald-100/70 text-xs font-medium">{addedToast}</p>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {errorToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2a1313] border border-red-500/50 text-white px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(239,68,68,0.2)] flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <div className="bg-red-500/20 text-red-400 p-2 rounded-full">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="font-bold text-sm tracking-wide">Cannot Add Animal</p>
            <p className="text-red-200/70 text-xs font-medium max-w-xs">{errorToast}</p>
          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import { useState } from "react";
import { Leaf, ArrowRight, Fence, Heart, Droplets, Check, Sprout, ArrowLeft, Plus, Minus, Search, X, PawPrint, Sparkles, AlertTriangle } from "lucide-react";

// Mock species library just for the setup wizard
const speciesLibrary = [
  { id: '1', name: 'Sheep', spaceRequired: 20, icon: '🐑', category: 'Livestock', sizeClass: 'w-24 h-24', iconSize: 'text-4xl', feedType: 'Pasture & Hay', growthDays: '150 Days', progressPct: 60, description: 'Provides wool and natural grazing.', companions: ['Goat', 'Guard Dog', 'Chicken', 'Llama', 'Alpaca', 'Pig', 'Collie', 'Mule', 'Donkey', 'Cow', 'Horse'], enemies: ['Wolf', 'Tiger', 'Bear', 'Lion'], careLevel: 'Beginner Friendly', cost: '$45/mo', water: 'Medium', yieldName: 'Wool', yieldValue: 60 },
  { id: '2', name: 'Goat', spaceRequired: 15, icon: '🐐', category: 'Livestock', sizeClass: 'w-20 h-20', iconSize: 'text-3xl', feedType: 'Brush & Hay', growthDays: '120 Days', progressPct: 75, description: 'Excellent at clearing brush and weeds.', companions: ['Sheep', 'Horse', 'Cow', 'Mule', 'Pig', 'Llama', 'Alpaca', 'Collie', 'Guard Dog', 'Donkey', 'Chicken'], enemies: ['Wolf', 'Tiger', 'Bear', 'Lion'], careLevel: 'Intermediate', cost: '$40/mo', water: 'Medium', yieldName: 'Milk/Dairy', yieldValue: 55 },
  { id: '3', name: 'Cow', spaceRequired: 60, icon: '🐄', category: 'Livestock', sizeClass: 'w-36 h-36', iconSize: 'text-6xl', feedType: 'Pasture & Silage', growthDays: '700 Days', progressPct: 30, description: 'Large grazing animal.', companions: ['Horse', 'Goat', 'Pig', 'Mule', 'Sheep', 'Donkey', 'Chicken', 'Guard Dog'], enemies: ['Wolf', 'Tiger', 'Bear', 'Lion'], careLevel: 'Advanced', cost: '$120/mo', water: 'High', yieldName: 'Milk/Dairy', yieldValue: 180 },
  { id: '4', name: 'Buffalo', spaceRequired: 70, icon: '🐃', category: 'Livestock', sizeClass: 'w-40 h-40', iconSize: 'text-7xl', feedType: 'Grass & Forage', growthDays: '800 Days', progressPct: 20, description: 'Requires very sturdy fencing.', companions: ['Cow', 'Elephant', 'Ostrich', 'Emu'], enemies: ['Tiger', 'Lion'], careLevel: 'Advanced', cost: '$150/mo', water: 'Very High', yieldName: 'Rich Milk', yieldValue: 220 },
  { id: '5', name: 'Horse', spaceRequired: 80, icon: '🐎', category: 'Livestock', sizeClass: 'w-36 h-36', iconSize: 'text-6xl', feedType: 'Hay & Grain', growthDays: 'Adult', progressPct: 100, description: 'Requires large running space.', companions: ['Goat', 'Cow', 'Donkey', 'Mule', 'Sheep', 'Chicken', 'Cat'], enemies: ['Wolf', 'Bear'], careLevel: 'Advanced', cost: '$200/mo', water: 'High', yieldName: 'Riding/Work', yieldValue: 100 },
  { id: '6', name: 'Donkey', spaceRequired: 40, icon: '🫏', category: 'Working', sizeClass: 'w-28 h-28', iconSize: 'text-5xl', feedType: 'Hay & Grass', growthDays: 'Adult', progressPct: 100, description: 'Excellent guard animals for livestock.', companions: ['Sheep', 'Horse', 'Alpaca', 'Cow', 'Llama', 'Mule', 'Goat', 'Chicken'], enemies: ['Wolf'], careLevel: 'Intermediate', cost: '$50/mo', water: 'Low', yieldName: 'Draft/Guard', yieldValue: 80 },
  { id: '7', name: 'Chicken', spaceRequired: 4, icon: '🐔', category: 'Poultry', sizeClass: 'w-12 h-12', iconSize: 'text-xl', feedType: 'Grain & Crumbles', growthDays: '45 Days', progressPct: 85, description: 'Provides daily eggs.', companions: ['Duck', 'Sheep', 'Goat', 'Turkey', 'Goose', 'Quail', 'Peacock', 'Cow', 'Horse', 'Donkey'], enemies: ['Cat', 'Wolf', 'Fox'], careLevel: 'Beginner Friendly', cost: '$15/mo', water: 'Low', yieldName: 'Eggs', yieldValue: 30 },
  { id: '8', name: 'Duck', spaceRequired: 6, icon: '🦆', category: 'Poultry', sizeClass: 'w-14 h-14', iconSize: 'text-2xl', feedType: 'Pellets & Greens', growthDays: '50 Days', progressPct: 65, description: 'Excellent for slug control.', companions: ['Chicken', 'Goose', 'Turkey', 'Peacock', 'Quail', 'Pig'], enemies: ['Cat', 'Wolf', 'Fox'], careLevel: 'Beginner Friendly', cost: '$20/mo', water: 'High', yieldName: 'Eggs/Feathers', yieldValue: 35 },
  { id: '9', name: 'Ostrich', spaceRequired: 45, icon: '🦤', category: 'Poultry', sizeClass: 'w-32 h-32', iconSize: 'text-6xl', feedType: 'Plants & Insects', growthDays: '365 Days', progressPct: 100, description: 'Largest living bird.', companions: ['Emu', 'Kangaroo', 'Camel', 'Buffalo'], enemies: ['Lion', 'Tiger', 'Wolf'], careLevel: 'Advanced', cost: '$80/mo', water: 'Low', yieldName: 'Eggs/Tourism', yieldValue: 120 },
  { id: '10', name: 'Peacock', spaceRequired: 15, icon: '🦚', category: 'Poultry', sizeClass: 'w-20 h-20', iconSize: 'text-4xl', feedType: 'Seeds & Insects', growthDays: '200 Days', progressPct: 90, description: 'Ornamental bird.', companions: ['Chicken', 'Turkey', 'Duck', 'Goose', 'Parrot'], enemies: ['Cat', 'Wolf'], careLevel: 'Intermediate', cost: '$30/mo', water: 'Medium', yieldName: 'Ornamental Feathers', yieldValue: 40 },
  { id: '11', name: 'Guard Dog', spaceRequired: 25, icon: '🐕', category: 'Working', sizeClass: 'w-28 h-28', iconSize: 'text-5xl', feedType: 'Meat & Kibble', growthDays: 'Adult', progressPct: 100, description: 'Protects livestock from predators.', companions: ['Sheep', 'Goat', 'Cow', 'Pig', 'Alpaca', 'Llama', 'Chicken', 'Turkey', 'Collie'], enemies: ['Wolf', 'Tiger', 'Cat', 'Bear'], careLevel: 'Intermediate', cost: '$60/mo', water: 'Medium', yieldName: 'Security/Protection', yieldValue: 90 },
  { id: '12', name: 'Cat', spaceRequired: 10, icon: '🐈', category: 'Working', sizeClass: 'w-16 h-16', iconSize: 'text-2xl', feedType: 'Meat & Fish', growthDays: 'Adult', progressPct: 100, description: 'Excellent barn cat.', companions: ['Horse', 'Cow', 'Pig', 'Mule', 'Donkey'], enemies: ['Guard Dog', 'Chicken', 'Parrot', 'Quail', 'Duck', 'Goose'], careLevel: 'Beginner Friendly', cost: '$20/mo', water: 'Low', yieldName: 'Pest Control', yieldValue: 30 },
  { id: '13', name: 'Parrot', spaceRequired: 5, icon: '🦜', category: 'Exotic', sizeClass: 'w-12 h-12', iconSize: 'text-xl', feedType: 'Seeds & Fruits', growthDays: 'Adult', progressPct: 100, description: 'Highly intelligent and vocal.', companions: ['Peacock'], enemies: ['Cat'], careLevel: 'Advanced', cost: '$40/mo', water: 'Low', yieldName: 'Tourism/Breeding', yieldValue: 50 },
  { id: '14', name: 'Camel', spaceRequired: 70, icon: '🐪', category: 'Exotic', sizeClass: 'w-40 h-40', iconSize: 'text-7xl', feedType: 'Dry Foliage', growthDays: 'Adult', progressPct: 100, description: 'Desert adapted.', companions: ['Donkey', 'Ostrich', 'Emu', 'Elephant'], enemies: ['Tiger', 'Lion'], careLevel: 'Intermediate', cost: '$90/mo', water: 'Very Low', yieldName: 'Wool/Milk', yieldValue: 140 },
  { id: '15', name: 'Wolf', spaceRequired: 100, icon: '🐺', category: 'Wild', sizeClass: 'w-32 h-32', iconSize: 'text-6xl', feedType: 'Raw Meat', growthDays: 'Adult', progressPct: 100, description: 'Apex pack predators.', companions: [], enemies: ['Guard Dog', 'Sheep', 'Goat', 'Cow', 'Buffalo', 'Horse', 'Pig', 'Llama', 'Alpaca', 'Deer', 'Mule', 'Chicken', 'Duck', 'Ostrich', 'Turkey', 'Goose', 'Quail', 'Peacock', 'Cat', 'Parrot', 'Collie', 'Kangaroo', 'Emu', 'Camel', 'Donkey'], careLevel: 'Expert', cost: '$180/mo', water: 'Medium', yieldName: 'Conservation/Eco', yieldValue: 150 },
  { id: '16', name: 'Deer', spaceRequired: 150, icon: '🦌', category: 'Wild', sizeClass: 'w-32 h-32', iconSize: 'text-6xl', feedType: 'Forage & Leaves', growthDays: 'Adult', progressPct: 100, description: 'Flighty herbivores.', companions: ['Kangaroo', 'Emu'], enemies: ['Wolf', 'Tiger', 'Bear', 'Lion'], careLevel: 'Advanced', cost: '$90/mo', water: 'Medium', yieldName: 'Eco-Tourism', yieldValue: 80 },
  { id: '17', name: 'Tiger', spaceRequired: 200, icon: '🐅', category: 'Wild', sizeClass: 'w-40 h-40', iconSize: 'text-7xl', feedType: 'Heavy Meat', growthDays: 'Adult', progressPct: 100, description: 'Massive solitary predators.', companions: [], enemies: ['Cow', 'Buffalo', 'Deer', 'Sheep', 'Goat', 'Horse', 'Pig', 'Camel', 'Elephant', 'Chicken', 'Duck', 'Ostrich', 'Turkey', 'Goose', 'Quail', 'Peacock', 'Cat', 'Parrot', 'Guard Dog', 'Collie', 'Kangaroo', 'Emu', 'Mule', 'Donkey', 'Llama', 'Alpaca'], careLevel: 'Expert', cost: '$300/mo', water: 'High', yieldName: 'Sanctuary Donor ROI', yieldValue: 400 },
  { id: '18', name: 'Elephant', spaceRequired: 500, icon: '🐘', category: 'Wild', sizeClass: 'w-56 h-56', iconSize: 'text-8xl', feedType: 'Vegetation & Hay', growthDays: 'Adult', progressPct: 100, description: 'Highly social megafauna.', companions: ['Buffalo', 'Camel'], enemies: ['Tiger', 'Lion'], careLevel: 'Expert', cost: '$800/mo', water: 'Very High', yieldName: 'Sanctuary Donor ROI', yieldValue: 1000 },
  { id: '19', name: 'Pig', spaceRequired: 25, icon: '🐖', category: 'Livestock', sizeClass: 'w-24 h-24', iconSize: 'text-4xl', feedType: 'Omnivore Mix', growthDays: '180 Days', progressPct: 50, description: 'Highly intelligent and sociable.', companions: ['Cow', 'Sheep', 'Goat', 'Chicken', 'Duck', 'Guard Dog'], enemies: ['Wolf', 'Tiger', 'Bear'], careLevel: 'Intermediate', cost: '$60/mo', water: 'High', yieldName: 'Fertilizer/Truffles', yieldValue: 90 },
  { id: '20', name: 'Alpaca', spaceRequired: 15, icon: '🦙', category: 'Livestock', sizeClass: 'w-24 h-24', iconSize: 'text-4xl', feedType: 'Pasture', growthDays: '365 Days', progressPct: 40, description: 'Produces fine fleece.', companions: ['Llama', 'Sheep', 'Donkey', 'Guard Dog', 'Collie', 'Goat'], enemies: ['Wolf', 'Bear'], careLevel: 'Intermediate', cost: '$50/mo', water: 'Medium', yieldName: 'Premium Fleece', yieldValue: 80 },
  { id: '21', name: 'Llama', spaceRequired: 25, icon: '🦙', category: 'Livestock', sizeClass: 'w-28 h-28', iconSize: 'text-5xl', feedType: 'Pasture', growthDays: '365 Days', progressPct: 40, description: 'Larger than alpacas, often guard animals.', companions: ['Alpaca', 'Sheep', 'Goat', 'Guard Dog', 'Collie', 'Donkey'], enemies: ['Wolf', 'Bear'], careLevel: 'Intermediate', cost: '$60/mo', water: 'Medium', yieldName: 'Fleece/Packing', yieldValue: 85 },
  { id: '22', name: 'Turkey', spaceRequired: 8, icon: '🦃', category: 'Poultry', sizeClass: 'w-16 h-16', iconSize: 'text-3xl', feedType: 'Poultry Feed', growthDays: '140 Days', progressPct: 70, description: 'Large poultry bird.', companions: ['Chicken', 'Peacock', 'Duck', 'Goose', 'Guard Dog'], enemies: ['Fox', 'Wolf', 'Cat'], careLevel: 'Intermediate', cost: '$25/mo', water: 'Medium', yieldName: 'Eggs/Feathers', yieldValue: 40 },
  { id: '23', name: 'Goose', spaceRequired: 10, icon: '🪿', category: 'Poultry', sizeClass: 'w-16 h-16', iconSize: 'text-3xl', feedType: 'Grass & Grain', growthDays: '120 Days', progressPct: 80, description: 'Excellent "watchdogs".', companions: ['Duck', 'Chicken', 'Turkey', 'Peacock'], enemies: ['Fox', 'Wolf', 'Cat'], careLevel: 'Intermediate', cost: '$25/mo', water: 'High', yieldName: 'Eggs/Security', yieldValue: 35 },
  { id: '24', name: 'Quail', spaceRequired: 2, icon: '🐦', category: 'Poultry', sizeClass: 'w-10 h-10', iconSize: 'text-lg', feedType: 'Gamebird Feed', growthDays: '40 Days', progressPct: 90, description: 'Small gamebirds.', companions: ['Chicken', 'Duck'], enemies: ['Cat', 'Fox', 'Snake'], careLevel: 'Beginner Friendly', cost: '$10/mo', water: 'Low', yieldName: 'Gourmet Eggs', yieldValue: 20 },
  { id: '25', name: 'Mule', spaceRequired: 60, icon: '🐴', category: 'Working', sizeClass: 'w-32 h-32', iconSize: 'text-5xl', feedType: 'Hay & Grass', growthDays: 'Adult', progressPct: 100, description: 'Strong, hardy hybrid.', companions: ['Horse', 'Donkey', 'Cow', 'Goat', 'Sheep', 'Cat'], enemies: ['Wolf', 'Bear'], careLevel: 'Intermediate', cost: '$120/mo', water: 'High', heavyWork: true, yieldName: 'Draft Power', yieldValue: 160 },
  { id: '26', name: 'Collie', spaceRequired: 30, icon: '🐶', category: 'Working', sizeClass: 'w-24 h-24', iconSize: 'text-4xl', feedType: 'High-Protein Kibble', growthDays: 'Adult', progressPct: 100, description: 'Energetic herding dog.', companions: ['Sheep', 'Goat', 'Guard Dog', 'Alpaca', 'Llama'], enemies: ['Wolf', 'Tiger'], careLevel: 'Advanced', cost: '$80/mo', water: 'Medium', yieldName: 'Herding Labor', yieldValue: 120 },
  { id: '27', name: 'Emu', spaceRequired: 40, icon: '🦤', category: 'Exotic', sizeClass: 'w-28 h-28', iconSize: 'text-5xl', feedType: 'Omnivore Pellets', growthDays: '500 Days', progressPct: 80, description: 'Curious Australian flightless bird.', companions: ['Ostrich', 'Kangaroo', 'Camel', 'Deer'], enemies: ['Tiger', 'Lion', 'Wolf'], careLevel: 'Advanced', cost: '$70/mo', water: 'Medium', yieldName: 'Oils/Tourism', yieldValue: 90 },
  { id: '28', name: 'Kangaroo', spaceRequired: 60, icon: '🦘', category: 'Exotic', sizeClass: 'w-32 h-32', iconSize: 'text-5xl', feedType: 'Grass & Shrubs', growthDays: 'Adult', progressPct: 100, description: 'Marsupial grazer.', companions: ['Emu', 'Ostrich', 'Deer'], enemies: ['Lion', 'Tiger', 'Wolf'], careLevel: 'Expert', cost: '$100/mo', water: 'Low', yieldName: 'Eco-Tourism', yieldValue: 130 },
  { id: '29', name: 'Lion', spaceRequired: 250, icon: '🦁', category: 'Wild', sizeClass: 'w-40 h-40', iconSize: 'text-7xl', feedType: 'Raw Meat', growthDays: 'Adult', progressPct: 100, description: 'Social apex predators.', companions: [], enemies: ['Buffalo', 'Elephant', 'Ostrich', 'Deer', 'Cow', 'Sheep', 'Goat', 'Horse', 'Pig', 'Camel', 'Chicken', 'Duck', 'Turkey', 'Goose', 'Quail', 'Peacock', 'Cat', 'Parrot', 'Guard Dog', 'Collie', 'Kangaroo', 'Emu', 'Mule', 'Donkey', 'Llama', 'Alpaca'], careLevel: 'Expert', cost: '$350/mo', water: 'High', yieldName: 'Conservation Grant', yieldValue: 500 },
  { id: '30', name: 'Bear', spaceRequired: 200, icon: '🐻', category: 'Wild', sizeClass: 'w-40 h-40', iconSize: 'text-7xl', feedType: 'Omnivore Diet', growthDays: 'Adult', progressPct: 100, description: 'Massive, highly intelligent omnivores.', companions: [], enemies: ['Horse', 'Cow', 'Deer', 'Sheep', 'Goat', 'Pig', 'Alpaca', 'Llama', 'Mule', 'Donkey', 'Camel', 'Chicken', 'Duck', 'Turkey', 'Goose', 'Quail', 'Peacock', 'Cat', 'Guard Dog', 'Collie', 'Kangaroo', 'Emu', 'Ostrich'], careLevel: 'Expert', cost: '$250/mo', water: 'High', yieldName: 'Conservation Grant', yieldValue: 350 }
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

  const getConflicts = () => {
    let conflicts: string[] = [];
    selectedAnimals.forEach(a1 => {
      const sp1 = speciesLibrary.find(s => s.id === a1.id);
      if (!sp1) return;
      selectedAnimals.forEach(a2 => {
        if (a1.id !== a2.id) {
          const sp2 = speciesLibrary.find(s => s.id === a2.id);
          if (sp2 && (sp1.enemies.includes(sp2.name) || sp2.enemies.includes(sp1.name))) {
            const conflictName = [sp1.name, sp2.name].sort().join(' & ');
            if (!conflicts.includes(conflictName)) conflicts.push(conflictName);
          }
        }
      });
    });
    return conflicts;
  };

  const filteredSpecies = speciesLibrary.filter(sp => sp.name.toLowerCase().includes(searchQuery.toLowerCase()) || sp.category.toLowerCase().includes(searchQuery.toLowerCase()));

  if (step === 0) {
    return (
      <main className="min-h-screen bg-[#0a1f16] flex items-center justify-center font-sans p-8">
        <div className="w-full max-w-5xl flex flex-col">
          
          <div className="flex items-center gap-3 mb-8 w-full border-b border-[#1a4231] pb-6">
            <div className="p-2 border border-emerald-500/30 rounded-lg text-emerald-400">
              <PawPrint size={24} />
            </div>
            <div>
              <h2 className="text-white font-bold flex items-center gap-3 text-2xl">
                Ani-plan 
                <span className="bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                  Enclosure Onboarding
                </span>
              </h2>
              <p className="text-emerald-500/60 text-xs mt-1">Precision Farm Canvas & Setup</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2a4531] to-[#14281d] border border-[#3a5c43] rounded-[2rem] w-full p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-4">
              <span className="bg-[#143627]/80 backdrop-blur-md text-emerald-400 text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full font-bold flex items-center gap-2 border border-[#1a4231]"><Sparkles size={12}/> VETERINARY HERD CANVAS ENGINE</span>
            </div>

            <h1 className="text-5xl font-serif font-black text-white mt-16 mb-6 tracking-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
              Ani-plan Enclosure Planner
            </h1>
            <p className="text-emerald-50 text-base max-w-3xl mx-auto mb-16 leading-relaxed font-medium">
              Design true-to-scale farm enclosures, optimize companion animal relationships, calculate precision space requirements, and auto-arrange your ideal high-yield sanctuary.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-16 w-full max-w-4xl mx-auto">
              <div className="bg-[#0a1f16]/40 backdrop-blur-sm border border-[#1a4231] p-5 rounded-xl flex items-center gap-4 text-left hover:bg-[#0a1f16]/60 transition">
                <div className="bg-[#143627] border border-[#1a4231] p-3 rounded-lg text-[#d9aa55] shadow-inner shrink-0"><Fence size={20}/></div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">True Scale Canvas</h4>
                  <p className="text-emerald-500/70 text-[10px]">Precision meter grid</p>
                </div>
              </div>
              <div className="bg-[#0a1f16]/40 backdrop-blur-sm border border-[#1a4231] p-5 rounded-xl flex items-center gap-4 text-left hover:bg-[#0a1f16]/60 transition">
                <div className="bg-[#143627] border border-[#1a4231] p-3 rounded-lg text-emerald-400 shadow-inner shrink-0"><Heart size={20}/></div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">Companion Matrix</h4>
                  <p className="text-emerald-500/70 text-[10px]">Social & predator defense</p>
                </div>
              </div>
              <div className="bg-[#0a1f16]/40 backdrop-blur-sm border border-[#1a4231] p-5 rounded-xl flex items-center gap-4 text-left hover:bg-[#0a1f16]/60 transition">
                <div className="bg-[#143627] border border-[#1a4231] p-3 rounded-lg text-purple-400 shadow-inner shrink-0"><Sparkles size={20}/></div>
                <div>
                  <h4 className="text-white text-sm font-bold mb-1">Auto-Arrange</h4>
                  <p className="text-emerald-500/70 text-[10px]">Algorithmic placement</p>
                </div>
              </div>
            </div>

            <button onClick={handleNext} className="bg-[#facc15] hover:bg-[#eab308] text-[#422006] font-black text-lg px-12 py-4 rounded-xl shadow-[0_0_20px_rgba(250,204,21,0.2)] transition flex items-center justify-center gap-3 mx-auto min-w-[350px]">
              <PawPrint size={20} /> Start Planning Your Enclosure <ArrowRight size={20} />
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
                    <div className="font-bold text-sm mb-1">{preset[0]}m × {preset[1]}m</div>
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
                  { name: 'Standard Herd Density', tag: '100% Footprint', desc: 'Uses recommended space distances. Great for standard enclosures with traditional grazing.' },
                  { name: 'High-Yield Pack Spacing', tag: 'High Density (-15%)', desc: 'Slightly tighter spacing. Maximizes herd capacity, requires intensive manure management.' },
                  { name: 'Free-Range Optimal', tag: 'Spacious Clearance', desc: 'Generous spacing (+20% footprint). Reduces predator/prey conflict risks and promotes roaming.' }
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

              {(() => {
                const conflicts = getConflicts();
                if (conflicts.length === 0) return null;
                return (
                  <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-xl p-4 flex gap-3 items-start animate-in fade-in zoom-in duration-300">
                    <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-red-700 text-sm mb-1">Ecosystem Conflict Warning</h4>
                      <p className="text-red-600/80 text-xs font-medium leading-relaxed">
                        You have selected incompatible species: <span className="font-bold">{conflicts.join(', ')}</span>. 
                        They will attack or severely stress each other. We highly recommend separating predators from prey or removing one of them from this specific plot to maintain farm sustainability.
                      </p>
                    </div>
                  </div>
                );
              })()}

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
                  const isSpaceExceeded = !isSelected && (usedArea + sp.spaceRequired > totalArea);
                  
                  return (
                    <div 
                      key={sp.id} 
                      onClick={() => !isSpaceExceeded && handleToggleAnimal(sp.id)}
                      className={`p-4 rounded-xl border-2 transition flex flex-col ${isSpaceExceeded ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed' : isSelected ? 'border-emerald-600 bg-emerald-50 shadow-sm ring-1 ring-emerald-500/20 cursor-pointer' : 'border-slate-200 bg-white hover:border-emerald-300 cursor-pointer'}`}
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
                        <span className={`text-xs font-bold flex items-center gap-1 ${isSpaceExceeded ? 'text-slate-400' : 'text-emerald-600'}`}><Leaf size={12}/> {sp.spaceRequired} sq m</span>
                        {isSelected ? (
                          <span className="text-xs font-bold text-[#143627]">✓ Selected</span>
                        ) : isSpaceExceeded ? (
                          <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest leading-tight text-right w-20">No Space</span>
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

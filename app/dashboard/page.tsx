"use client";

import { useState, useEffect, useRef } from "react";
import { Info, Waves, Minus, Plus, RefreshCw, Heart, Sun, Layers, Save, Trash2, Fence, X, Wheat, Droplets, Calendar, Maximize, AlertTriangle, ShieldCheck, PawPrint, BarChart3, Check, Clock } from "lucide-react";

type AnimalSpecies = { 
  id: string; 
  name: string; 
  spaceRequired: number; 
  icon: string; 
  category: string; 
  sizeClass: string; 
  iconSize: string;
  feedType: string;
  growthDays: string;
  progressPct: number;
  description: string;
  companions: string[];
  enemies: string[];
  careLevel?: string;
  cost?: string;
  water?: string;
  yieldName?: string;
  yieldValue?: number;
  heavyWork?: boolean;
};

export const speciesLibrary: AnimalSpecies[] = [
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

export default function PlannerPage() {
  const [width, setWidth] = useState<number | string>(20);
  const [length, setLength] = useState<number | string>(20);
  const [selectedAnimals, setSelectedAnimals] = useState<{id: string, count: number}[]>([]);
  const [infoModalId, setInfoModalId] = useState<string | null>(null);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);
  const [showConnections, setShowConnections] = useState(false);
  const [lines, setLines] = useState<{x1:number,y1:number,x2:number,y2:number}[]>([]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(50);
  const [enclosureType, setEnclosureType] = useState('Standard Pasture');
  const [weather, setWeather] = useState<{temp: number, isHot: boolean, city: string} | null>(null);
  const [locationQuery, setLocationQuery] = useState('Mianwali');
  const [locationResults, setLocationResults] = useState<any[]>([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [showVisualizerModal, setShowVisualizerModal] = useState(false);
  const [isVisualizerLoading, setIsVisualizerLoading] = useState(false);
  const [isToolkitOpen, setIsToolkitOpen] = useState(true);
  const canvasRef = useRef<HTMLDivElement>(null);

  const fetchWeatherForCoords = (lat: number, lon: number, name: string) => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
           const temp = data.current_weather.temperature;
           setWeather({ temp, isHot: temp > 35, city: name });
        }
      })
      .catch(e => console.error("Weather fetch failed", e));
  };

  const handleLocationSearch = (query: string) => {
    setLocationQuery(query);
    if (query.length < 3) {
      setLocationResults([]);
      setShowLocationDropdown(false);
      return;
    }
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`)
      .then(res => res.json())
      .then(geo => {
        if (geo.results) {
          setLocationResults(geo.results);
          setShowLocationDropdown(true);
        } else {
          setLocationResults([]);
        }
      });
  };

  const selectLocation = (result: any) => {
    setLocationQuery(result.name);
    setShowLocationDropdown(false);
    fetchWeatherForCoords(result.latitude, result.longitude, result.name);
  };

  useEffect(() => {
    fetchWeatherForCoords(32.5839, 71.537, 'Mianwali'); // Default
  }, []);

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('aniplan_layout');
      if (saved) {
        const data = JSON.parse(saved);
        setWidth(data.width || 20);
        setLength(data.length || 20);
        if (data.enclosureType) setEnclosureType(data.enclosureType);
        if (data.selectedAnimals && data.selectedAnimals.length > 0) {
          setSelectedAnimals(data.selectedAnimals);
        }
      }
    };
    
    loadData();
    window.addEventListener('layoutUpdated', loadData);
    return () => window.removeEventListener('layoutUpdated', loadData);
  }, []);

  const totalArea = Number(width) * Number(length);

  const usedArea = selectedAnimals.reduce((sum, item) => {
    const species = speciesLibrary.find(s => s.id === item.id);
    return sum + (species ? species.spaceRequired * item.count : 0);
  }, 0);
  
  const remainingArea = totalArea - usedArea;

  const selectedSpeciesNames = selectedAnimals.map(a => speciesLibrary.find(s => s.id === a.id)?.name || '');
  let conflictList: string[] = [];
  selectedAnimals.forEach(a => {
    const sp = speciesLibrary.find(s => s.id === a.id);
    if (sp) {
      sp.enemies.forEach(enemy => {
        if (selectedSpeciesNames.includes(enemy)) {
          const pair = [sp.name, enemy].sort().join(' & ');
          conflictList.push(pair);
        }
      });
    }
  });
  const uniqueConflicts = Array.from(new Set(conflictList));

  const handleAdd = (id: string) => {
    const sp = speciesLibrary.find(s => s.id === id);
    if (sp && usedArea + sp.spaceRequired > totalArea) {
      alert(`Error: Not enough space for ${sp.name}. Needs ${sp.spaceRequired} sq.m but only ${totalArea - usedArea} sq.m available.`);
      return;
    }

    if (sp) {
      const newConflicts = new Set<string>();
      const uniqueSelectedNames = Array.from(new Set(selectedSpeciesNames));
      
      sp.enemies.forEach(e => { if (uniqueSelectedNames.includes(e)) newConflicts.add(e); });
      uniqueSelectedNames.forEach(s => {
        const existingSp = speciesLibrary.find(ex => ex.name === s);
        if (existingSp && existingSp.enemies.includes(sp.name)) newConflicts.add(s);
      });
      if (newConflicts.size > 0) {
        setConflictWarning(`Warning: ${sp.name} conflicts with ${Array.from(newConflicts).join(', ')}!`);
        setTimeout(() => setConflictWarning(null), 5000);
      }
    }

    const newState = [...selectedAnimals];
    const existing = newState.find(a => a.id === id);
    if (existing) {
      existing.count += 1;
    } else {
      newState.push({ id, count: 1 });
    }
    setSelectedAnimals(newState);
    
    const layoutData = { width, length, enclosureType, selectedAnimals: newState };
    localStorage.setItem('aniplan_layout', JSON.stringify(layoutData));
    localStorage.setItem('aniplan_care_guide', JSON.stringify(layoutData));
    window.dispatchEvent(new Event('layoutUpdated'));
  };

  const handleIncrement = (id: string) => {
    const sp = speciesLibrary.find(s => s.id === id);
    if (sp && usedArea + sp.spaceRequired > totalArea) {
      alert(`Error: Not enough space for ${sp.name}.`);
      return;
    }
    const newState = selectedAnimals.map(a => a.id === id ? { ...a, count: a.count + 1 } : a);
    setSelectedAnimals(newState);
    
    const layoutData = { width, length, enclosureType, selectedAnimals: newState };
    localStorage.setItem('aniplan_layout', JSON.stringify(layoutData));
    localStorage.setItem('aniplan_care_guide', JSON.stringify(layoutData));
    window.dispatchEvent(new Event('layoutUpdated'));
  };

  const handleDecrement = (id: string) => {
    let newState = [...selectedAnimals];
    const existing = newState.find(a => a.id === id);
    if (existing && existing.count > 1) {
      newState = newState.map(a => a.id === id ? { ...a, count: a.count - 1 } : a);
    } else {
      newState = newState.filter(a => a.id !== id);
    }
    setSelectedAnimals(newState);
    
    const layoutData = { width, length, enclosureType, selectedAnimals: newState };
    localStorage.setItem('aniplan_layout', JSON.stringify(layoutData));
    localStorage.setItem('aniplan_care_guide', JSON.stringify(layoutData));
    window.dispatchEvent(new Event('layoutUpdated'));
  };

  const handleClearLayout = () => {
    localStorage.removeItem('aniplan_layout');
    localStorage.removeItem('aniplan_care_guide');
    localStorage.removeItem('aniplan_care_tracking');
    localStorage.removeItem('aniplan_ai_history');
    window.location.href = '/';
  };

  useEffect(() => {
    const handleResize = () => {};
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!showConnections || !canvasRef.current) {
      setLines([]);
      return;
    }
    
    const timer = setTimeout(() => {
      if (!canvasRef.current) return;
      const containerRect = canvasRef.current.getBoundingClientRect();
      const nodes = Array.from(canvasRef.current.querySelectorAll('.animal-node')) as HTMLElement[];
      
      const newLines: {x1:number,y1:number,x2:number,y2:number}[] = [];
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nameA = nodes[i].dataset.name;
          const nameB = nodes[j].dataset.name;
          if (!nameA || !nameB || nameA === nameB) continue; // Don't draw lines between same species to keep it clean

          try {
            const companionsA = JSON.parse(nodes[i].dataset.companions || "[]") as string[];
            const companionsB = JSON.parse(nodes[j].dataset.companions || "[]") as string[];
            
            // Connect if either considers the other a companion (using Name)
            if (companionsA.includes(nameB) || companionsB.includes(nameA)) {
              const rect1 = nodes[i].getBoundingClientRect();
              const rect2 = nodes[j].getBoundingClientRect();
              
              const x1 = rect1.left + rect1.width / 2 - containerRect.left;
              const y1 = rect1.top + rect1.height / 2 - containerRect.top;
              const x2 = rect2.left + rect2.width / 2 - containerRect.left;
              const y2 = rect2.top + rect2.height / 2 - containerRect.top;
              
              newLines.push({ x1, y1, x2, y2 });
            }
          } catch (e) {
            console.error("Error parsing companions data", e);
          }
        }
      }
      
      setLines(newLines);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [showConnections, selectedAnimals, width, length]);

  const generateAutoLayout = () => {
    const layoutData = { width, length, enclosureType, selectedAnimals };
    localStorage.setItem('aniplan_layout', JSON.stringify(layoutData));
    localStorage.setItem('aniplan_care_guide', JSON.stringify(layoutData));
    window.dispatchEvent(new Event('layoutUpdated'));
    alert("Layout & Care Guide Saved Successfully!");
  };

  const totalAnimalsPlaced = selectedAnimals.reduce((sum, item) => sum + item.count, 0);
  const categories = Array.from(new Set(speciesLibrary.map(s => s.category)));

  const validWidth = Number(width) > 0 ? Number(width) : 1;
  const validLength = Number(length) > 0 ? Number(length) : 1;
  const canvasRatio = `${validWidth} / ${validLength}`;

  const infoSpecies = infoModalId ? speciesLibrary.find(s => s.id === infoModalId) : null;

  const estMonthlyCost = selectedAnimals.reduce((total, item) => {
    const sp = speciesLibrary.find(s => s.id === item.id);
    if (!sp || !sp.cost) return total;
    const costNum = parseInt(sp.cost.replace(/[^0-9]/g, '')) || 0;
    return total + (costNum * item.count);
  }, 0);

  const estMonthlyRevenue = selectedAnimals.reduce((total, item) => {
    const sp = speciesLibrary.find(s => s.id === item.id);
    if (!sp || !sp.yieldValue || sp.category === 'Wild' || sp.category === 'Exotic') return total;
    return total + (sp.yieldValue * item.count);
  }, 0);

  const conservationImpact = selectedAnimals.reduce((total, item) => {
    const sp = speciesLibrary.find(s => s.id === item.id);
    if (!sp || !sp.yieldValue || (sp.category !== 'Wild' && sp.category !== 'Exotic')) return total;
    return total + (sp.yieldValue * item.count);
  }, 0);

  return (
    <div className="flex h-[calc(100vh)] overflow-hidden bg-[#0a1f16] font-sans relative">
      
      {conflictWarning && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-red-900/90 border border-red-500 text-white px-6 py-3 rounded-2xl shadow-[0_10px_40px_rgba(239,68,68,0.4)] flex items-center gap-3 animate-in slide-in-from-top-5">
          <AlertTriangle size={20} className="text-amber-400" />
          <p className="font-bold text-sm">{conflictWarning}</p>
        </div>
      )}
      
      <div className={`bg-[#0f291e] border-[#1a4231] flex flex-col h-full z-20 shadow-2xl relative transition-all duration-300 shrink-0 ${isToolkitOpen ? 'w-[450px] border-r' : 'w-0 overflow-hidden'}`}>
        <div className="w-[450px] flex flex-col h-full">
          <div className="p-6 border-b border-[#1a4231] bg-[#0f291e] sticky top-0 z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Enclosure Toolkit</h2>
                <p className="text-xs text-emerald-200/60">Add, remove, or modify animals in your farm</p>
              </div>
            </div>
            <div className="mb-4 relative z-50">
            <span className="text-[10px] text-emerald-200/70 mb-1 block uppercase tracking-wider">Location (City)</span>
            <input 
              type="text" 
              value={locationQuery}
              onChange={(e) => handleLocationSearch(e.target.value)}
              className="w-full bg-[#143627] border border-[#1a4231] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 transition text-sm shadow-inner"
              placeholder="Search city..."
            />
            {showLocationDropdown && locationResults.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-1 bg-[#0f291e] border border-[#1a4231] rounded-lg shadow-2xl overflow-hidden z-50">
                {locationResults.map((res: any, idx: number) => (
                  <button 
                    key={idx}
                    onClick={() => selectLocation(res)}
                    className="w-full text-left px-3 py-2 text-sm text-emerald-100 hover:bg-[#143627] transition border-b border-[#1a4231]/50 last:border-0"
                  >
                    {res.name}{res.admin1 ? `, ${res.admin1}` : ''}{res.country ? `, ${res.country}` : ''}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-4 mb-4 z-40 relative">
            <div className="flex-1 bg-[#143627] p-3 rounded-xl border border-[#1a4231] shadow-inner">
              <span className="text-[10px] text-emerald-200/70 mb-1 block uppercase tracking-wider">Width (m)</span>
              <input 
                type="number" 
                value={width}
                onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-[#0a1f16] border border-[#1a4231] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 transition text-sm" 
              />
            </div>
            <div className="flex-1 bg-[#143627] p-3 rounded-xl border border-[#1a4231] shadow-inner">
              <span className="text-[10px] text-emerald-200/70 mb-1 block uppercase tracking-wider">Length (m)</span>
              <input 
                type="number" 
                value={length}
                onChange={(e) => setLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-[#0a1f16] border border-[#1a4231] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 transition text-sm" 
              />
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">
            <span>Space Used: {usedArea} sq.m</span>
            <span>Max: {totalArea} sq.m</span>
          </div>
          <div className="w-full bg-[#0a1f16] h-2 rounded-full overflow-hidden border border-[#1a4231]">
            <div 
              className={`h-full transition-all duration-300 ${usedArea > totalArea ? 'bg-red-500' : 'bg-emerald-500'}`}
              style={{ width: `${Math.min(100, (usedArea / (totalArea || 1)) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-[#fafaf8] custom-scrollbar">
          {categories.map(category => (
            <div key={category} className="mb-8">
              <h3 className="text-xs font-black text-[#143627] uppercase tracking-widest mb-4 border-b-2 border-slate-200 pb-2 flex items-center justify-between">
                {category}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {speciesLibrary.filter(s => s.category === category).map((species) => {
                  const selectedData = selectedAnimals.find(a => a.id === species.id);
                  const isSelected = !!selectedData;
                  const canAddMore = species.spaceRequired <= remainingArea;
                  return (
                    <div key={species.id} className={"bg-white rounded-2xl border-2 transition-all flex flex-col overflow-hidden shadow-sm " + (isSelected ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-slate-200 hover:border-emerald-300')}>
                      <div className="p-4 flex gap-4">
                        <div className={"w-16 h-16 rounded-xl flex items-center justify-center text-4xl shrink-0 " + (isSelected ? 'bg-emerald-50' : 'bg-slate-50')}>
                          {species.icon}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                          <h4 className="font-extrabold text-[#143627] text-lg">{species.name}</h4>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{species.spaceRequired} sq.m</p>
                        </div>
                      </div>
                      <div className="bg-slate-50 border-t border-slate-100 p-3 flex justify-between items-center">
                        <button onClick={() => setInfoModalId(species.id)} className="text-xs font-bold text-slate-500 hover:text-[#143627]">More Info</button>
                        {isSelected ? (
                          <div className={`flex items-center bg-white rounded-lg border-2 shadow-sm ${!canAddMore ? 'border-slate-300' : 'border-emerald-600'}`}>
                            <button onClick={() => handleDecrement(species.id)} className="p-2 hover:bg-emerald-50 text-[#143627]"><Minus size={14} /></button>
                            <span className="text-sm font-black w-8 text-center text-[#143627]">{selectedData.count}</span>
                            <button onClick={() => handleIncrement(species.id)} disabled={!canAddMore} className="p-2 hover:bg-emerald-50 text-[#143627] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"><Plus size={14} /></button>
                          </div>
                        ) : (
                          <button onClick={() => handleAdd(species.id)} disabled={!canAddMore} className="bg-white border-2 border-slate-200 hover:border-[#143627] px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest disabled:opacity-30 disabled:hover:border-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100">Add</button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 bg-white border-t border-slate-200">
          <button onClick={generateAutoLayout} disabled={selectedAnimals.length === 0} className="w-full bg-[#143627] text-white font-extrabold py-4 rounded-xl text-sm uppercase tracking-widest hover:bg-[#1a4231] transition">GENERATE ENCLOSURE</button>
        </div>
      </div>
    </div>

      <button 
        onClick={() => setIsToolkitOpen(!isToolkitOpen)}
        className="absolute top-8 z-[100] bg-[#143627] hover:bg-[#1a4231] text-emerald-400 font-bold border border-[#1a4231] border-l-0 rounded-r-xl p-2.5 shadow-[5px_0_15px_rgba(0,0,0,0.3)] transition-all duration-300 flex items-center justify-center text-xs"
        style={{ left: isToolkitOpen ? '450px' : '0px' }}
      >
        {isToolkitOpen ? '<<' : '>>'}
      </button>

      <div className="flex-1 flex flex-col items-center justify-center p-0 bg-[#f4f5f0] h-full overflow-hidden shadow-inner">
        
        <div className="flex-1 px-8 pt-6 pb-4 flex flex-col items-center justify-start max-h-[100vh] overflow-hidden gap-4 w-full max-w-5xl">
            
            {/* Top Stats Bar */}
            <div className="bg-[#14281d] rounded-2xl px-4 py-3 shadow-xl flex flex-wrap justify-between items-center w-full shrink-0 gap-3">
              
              <div className="flex items-center flex-wrap gap-2">
                <div className="bg-[#1b3627] border border-[#234733] text-emerald-100 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-2 shadow-inner whitespace-nowrap">
                  <Fence size={14} className="text-emerald-500 shrink-0" /> Plot: {validWidth}m × {validLength}m
                </div>
                <div className="bg-[#1b3627] border border-[#234733] text-emerald-100 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-2 shadow-inner whitespace-nowrap">
                  <PawPrint size={14} className="text-emerald-500 shrink-0" /> {totalAnimalsPlaced} Placed
                </div>
                <div className="bg-[#1b3627] border border-[#234733] text-emerald-100 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-2 shadow-inner whitespace-nowrap">
                  <Heart size={14} className="text-emerald-500 shrink-0" /> {uniqueConflicts.length > 0 ? `${uniqueConflicts.length} Conflicts` : '100% Synergy'}
                </div>
                {weather && (
                  <div className={`border font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-2 shadow-inner whitespace-nowrap ${weather.isHot ? 'bg-red-900/30 border-red-500/50 text-red-200' : 'bg-[#1b3627] border-[#234733] text-emerald-100'}`}>
                    <Sun size={14} className={`shrink-0 ${weather.isHot ? 'text-red-400' : 'text-amber-400'}`} /> {weather.temp}°C {weather.isHot ? '(Hot)' : ''}
                  </div>
                )}
              </div>
              
              <div className="flex items-center flex-wrap gap-2">
                <button 
                  onClick={() => setShowConnections(!showConnections)}
                  className={`p-2 rounded-xl transition ${showConnections ? 'bg-emerald-400 text-[#14281d] shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'bg-[#1b3627] hover:bg-[#234733] text-emerald-400'}`}
                >
                  <Heart size={16}/>
                </button>
                <button className="bg-[#1b3627] hover:bg-[#234733] p-2 rounded-xl text-emerald-400 transition"><Layers size={16}/></button>
                
                <button onClick={() => { setShowVisualizerModal(true); setIsVisualizerLoading(true); }} className="bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.3)] whitespace-nowrap ml-1">
                  <Maximize size={16} className="shrink-0"/> Visualize 3D
                </button>

                <button onClick={generateAutoLayout} className="bg-transparent border border-emerald-500/50 hover:bg-emerald-500 hover:border-emerald-500 text-emerald-400 hover:text-[#0a1f16] font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-2 whitespace-nowrap">
                  <Save size={16} className="shrink-0"/> Save
                </button>
                <button onClick={() => setShowDeleteModal(true)} className="bg-[#2a1b1b] border border-red-900/50 hover:bg-red-900 hover:text-white text-red-400 p-2 rounded-xl transition"><Trash2 size={16}/></button>
              </div>
            </div>

            {/* Growth Timeline Bar */}
            {showTimeline && (
              <div className="w-full bg-[#14281d] rounded-xl p-4 shadow-xl border border-[#1a4231] animate-in fade-in slide-in-from-bottom-2 shrink-0">
                <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                  <Calendar size={14} /> Growth Timeline: <span className="text-white">{timelineProgress < 30 ? 'Newborn / Setup Phase' : timelineProgress < 70 ? 'Juvenile / Growth Phase' : 'Adult / Full Maturity'}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={timelineProgress} 
                  onChange={(e) => setTimelineProgress(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-[#1a4231] rounded-lg appearance-none cursor-pointer outline-none"
                />
              </div>
            )}

            <div className="flex-1 h-full min-h-0 relative bg-[#e8ecdf] rounded-2xl border border-[#d2d6c9] shadow-sm overflow-hidden w-full">
              <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#143627 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              
              {/* Animal Legend positioned in outer static container */}
              {selectedAnimals.length > 0 && (
                <div className="absolute top-4 right-4 bg-[#f0f4eb] border-2 border-[#143627] rounded-xl shadow-2xl p-4 w-56 z-30">
                  <div className="flex justify-between items-center border-b border-[#143627] pb-2 mb-3">
                    <h4 className="font-extrabold text-[#143627] text-[10px] uppercase tracking-widest">Animal Legend</h4>
                    <span className="text-xs font-bold text-[#143627]">({totalAnimalsPlaced})</span>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {selectedAnimals.map(item => {
                      const species = speciesLibrary.find(s => s.id === item.id)!;
                      return (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{species.icon}</span>
                            <span className="font-bold text-[#143627] text-xs">{species.name}</span>
                          </div>
                          <span className="bg-[#143627] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">x{item.count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Reliable Absolute Bounding Box for the Plot to fix Flex height collapse */}
              <div className="absolute inset-8 md:inset-12 lg:inset-16 flex items-center justify-center pointer-events-none">
                {/* Inner dynamic plot box */}
                <div 
                  ref={canvasRef}
                  className={`relative overflow-hidden rounded-lg border-[4px] border-[#283618] shadow-[0_10px_30px_rgba(0,0,0,0.2)] z-10 pointer-events-auto flex items-center justify-center max-w-full max-h-full ${
                    enclosureType === 'Reinforced Pen' ? 'bg-[#d4d4d8]' :
                    enclosureType === 'Mud/Aquatic' ? 'bg-[#b9d9eb]' :
                    enclosureType === 'Custom' ? 'bg-[#e6e0d4]' : 'bg-[#dce1d1]'
                  }`}
                >
                  {/* SVG Intrinsic Sizing Hack: This physically forces the parent div to adopt the exact aspect ratio while respecting the grand-parent's flex constraints (max-width/max-height) */}
                  <svg viewBox={`0 0 ${validWidth} ${validLength}`} style={{ width: '100vw', height: '100vh', opacity: 0, pointerEvents: 'none' }} />

                {showConnections && lines.length > 0 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <style>
                      {`
                        @keyframes flowLine {
                          from { stroke-dashoffset: 16; }
                          to { stroke-dashoffset: 0; }
                        }
                        .animated-connection {
                          animation: flowLine 1s linear infinite;
                        }
                      `}
                    </style>
                    {lines.map((line, idx) => {
                      const midX = (line.x1 + line.x2) / 2;
                      // Curve it upwards like a rainbow
                      const cpY = Math.min(line.y1, line.y2) - 60;
                      return (
                        <path 
                          key={idx}
                          d={`M ${line.x1} ${line.y1} Q ${midX} ${cpY} ${line.x2} ${line.y2}`}
                          stroke="#34d399" 
                          strokeWidth="3"
                          fill="none" 
                          strokeDasharray="8 8" 
                          strokeLinecap="round"
                          className="opacity-60 animated-connection"
                        />
                      );
                    })}
                  </svg>
                )}

                {selectedAnimals.length === 0 ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center text-[#132a13]">
                     <Waves size={50} className="mb-4 opacity-30" />
                     <p className="font-black text-xl mb-1 uppercase tracking-widest text-[#132a13]/50">Empty Plot</p>
                   </div>
                ) : (
                  <div className="absolute inset-0 p-4 flex flex-wrap place-content-center gap-4 overflow-y-auto custom-scrollbar z-10">
                    {selectedAnimals.map(group => {
                      const species = speciesLibrary.find(s => s.id === group.id)!;
                      return Array.from({ length: group.count }).map((_, index) => (
                        <div 
                          key={`${group.id}-${index}`} 
                          className={"animal-node relative group bg-[#8a9a5b] rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.3)] border-[3px] border-[#3a4f29] animate-in zoom-in duration-500 hover:scale-105 transition-transform cursor-pointer hover:border-[#283618] hover:shadow-2xl " + species.sizeClass}
                          data-name={species.name}
                          data-companions={JSON.stringify(species.companions)}
                          style={{
                            animationDelay: ((index % 10) * 0.05) + 's',
                            transform: showTimeline ? `scale(${0.5 + (timelineProgress / 200)})` : 'scale(1)'
                          }}
                        >
                          {/* Close X button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrement(species.id);
                            }}
                            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md border-2 border-[#132a13] hover:bg-red-600 z-20"
                          >
                            <X size={14} strokeWidth={3} />
                          </button>
                          
                          <span className={"drop-shadow-md " + species.iconSize}>{species.icon}</span>
                        </div>
                      ));
                    })}
                  </div>
                )}
              </div>
              </div> {/* Close Absolute Bounding Box */}
            </div>

          {/* Bottom Toolbar inside the main area like Greenplan */}
          <div className="bg-[#14281d] rounded-2xl px-8 py-5 shadow-xl flex justify-center gap-12 items-center w-full shrink-0">
             <button onClick={() => setShowSetupModal(true)} className="flex items-center gap-3 text-emerald-400 font-bold text-sm hover:text-white transition group">
                <Fence size={18} className="group-hover:text-emerald-300"/> Enclosure Setup
             </button>
             <button onClick={() => setShowAnalyticsModal(true)} className="flex items-center gap-3 text-white font-bold text-sm hover:text-emerald-100 transition group">
                <BarChart3 size={18} className="text-emerald-400 group-hover:text-emerald-300"/> Animal Analytics
             </button>
             <button onClick={() => setShowTasksModal(true)} className="flex items-center gap-3 text-white font-bold text-sm hover:text-emerald-100 transition group">
                <Check size={18} className="text-amber-400 group-hover:text-amber-300"/> Daily Routine
             </button>
             <button onClick={() => setShowTimeline(!showTimeline)} className={"flex items-center gap-3 font-bold text-sm transition group px-4 py-2 rounded-xl " + (showTimeline ? 'bg-emerald-500 text-[#14281d] shadow-[0_0_15px_rgba(52,211,153,0.3)]' : 'text-white hover:text-emerald-100')}>
                <Clock size={18} className={showTimeline ? "text-[#14281d]" : "text-emerald-400 group-hover:text-emerald-300"}/> Timeline
             </button>
          </div>

        </div>
      </div>

      {/* Analytics Modal (Image 4 Style) */}
      {showAnalyticsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#143627] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#1a4231] flex flex-col">
            
            <div className="p-6 border-b border-[#1a4231] flex justify-between items-center bg-[#0f291e]">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="text-emerald-400" size={24}/> Animal Analytics & Habitat Insights
              </h2>
              <button onClick={() => setShowAnalyticsModal(false)} className="p-2 hover:bg-[#1a4231] rounded-full text-slate-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-4">
               
               <div className="bg-[#0f291e] border border-[#1a4231] rounded-xl p-4 flex justify-between items-center">
                 <div>
                   <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Total Enclosure Area</p>
                   <p className="text-white font-black text-xl">{totalArea} sq.m</p>
                 </div>
                 <div className="text-right">
                   <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Space Utilized</p>
                   <p className="text-white font-black text-xl">{usedArea} sq.m</p>
                 </div>
               </div>

               <div className="bg-[#0f291e] border border-emerald-500/30 rounded-xl p-4">
                 <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-2">Companion Synergy</p>
                 <div className="flex justify-between items-end">
                   <p className={uniqueConflicts.length > 0 ? "text-red-400 font-black text-2xl" : "text-emerald-400 font-black text-2xl"}>
                     {uniqueConflicts.length > 0 ? "Critical Conflict" : "100% Compatibility"}
                   </p>
                   <p className={uniqueConflicts.length > 0 ? "text-red-200/80 text-sm font-bold" : "text-emerald-200/50 text-sm font-bold"}>
                     {uniqueConflicts.length} Conflicts Detected
                   </p>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#0f291e] border border-[#1a4231] rounded-xl p-4">
                   <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-2">Care Effort Level</p>
                   <p className="text-white font-bold text-sm flex items-center gap-2"><Heart size={16} className="text-amber-400"/> Beginner Friendly</p>
                 </div>
                 <div className="bg-[#0f291e] border border-[#1a4231] rounded-xl p-4">
                   <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-2">Watering Routine</p>
                   <p className="text-blue-400 font-bold text-sm flex items-center gap-2"><Droplets size={16}/> Daily Trough Refill</p>
                 </div>
               </div>

               <div className="bg-[#0f291e] border border-[#1a4231] rounded-xl p-4 flex flex-col gap-4">
                 <div className="flex justify-between items-center pb-4 border-b border-[#1a4231]/50">
                   <div>
                     <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Est. Monthly Feed Cost</p>
                     <p className="text-red-400 font-black text-xl">-${estMonthlyCost}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">Est. Monthly Revenue (Yield)</p>
                     <p className="text-emerald-400 font-black text-xl">+${estMonthlyRevenue}</p>
                   </div>
                 </div>
                 <div className="flex justify-between items-center">
                   <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Net Profitability</p>
                   <p className={`font-black text-2xl ${estMonthlyRevenue - estMonthlyCost >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                     {estMonthlyRevenue - estMonthlyCost >= 0 ? '+' : ''}${estMonthlyRevenue - estMonthlyCost}
                   </p>
                 </div>
                 {conservationImpact > 0 && (
                   <div className="flex justify-between items-center pt-4 mt-2 border-t border-[#1a4231]/50">
                     <p className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Conservation & Enrichment Score</p>
                     <p className="font-black text-xl text-blue-400">
                       +{conservationImpact} Impact Pts
                     </p>
                   </div>
                 )}
               </div>

            </div>
          </div>
        </div>
      )}

      {/* Daily Tasks Modal */}
      {showTasksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#143627] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#1a4231] flex flex-col">
            <div className="p-6 border-b border-[#1a4231] flex justify-between items-center bg-[#0f291e]">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Check className="text-emerald-400" size={24}/> Generated Daily Routine
              </h2>
              <button onClick={() => setShowTasksModal(false)} className="p-2 hover:bg-[#1a4231] rounded-full text-slate-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {selectedAnimals.length === 0 ? (
                <p className="text-emerald-200/60 text-center py-10">Add animals to your farm to generate a daily routine.</p>
              ) : (
                <div className="space-y-6">
                  {/* Morning Tasks */}
                  <div>
                    <h3 className="text-emerald-400 font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2"><Sun size={16}/> Morning (06:00 - 09:00)</h3>
                    <div className="space-y-2">
                      {selectedAnimals.map(a => {
                        const s = speciesLibrary.find(sp => sp.id === a.id);
                        if (!s) return null;
                        return (
                          <div key={a.id + '-m'} className="bg-[#0f291e] border border-[#1a4231] p-3 rounded-lg flex gap-3 text-emerald-50">
                            <input type="checkbox" className="mt-1 accent-emerald-500" />
                            <span>Feed {s.feedType} to {s.name}(s) and clean the {s.category === 'Poultry' ? 'coop' : 'pasture'}.</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Afternoon Tasks */}
                  <div>
                    <h3 className="text-amber-400 font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2"><Sun size={16}/> Afternoon (12:00 - 15:00)</h3>
                    <div className="space-y-2">
                      {selectedAnimals.map(a => {
                        const s = speciesLibrary.find(sp => sp.id === a.id);
                        if (!s || (s.water !== 'High' && s.water !== 'Very High')) return null;
                        return (
                          <div key={a.id + '-a'} className="bg-[#0f291e] border border-[#1a4231] p-3 rounded-lg flex gap-3 text-emerald-50">
                            <input type="checkbox" className="mt-1 accent-emerald-500" />
                            <span>Refill water troughs for {s.name}(s) (High water needs).</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Evening Tasks */}
                  <div>
                    <h3 className="text-blue-400 font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2"><Layers size={16}/> Evening (17:00 - 19:00)</h3>
                    <div className="space-y-2">
                      {selectedAnimals.map(a => {
                        const s = speciesLibrary.find(sp => sp.id === a.id);
                        if (!s) return null;
                        return (
                          <div key={a.id + '-e'} className="bg-[#0f291e] border border-[#1a4231] p-3 rounded-lg flex gap-3 text-emerald-50">
                            <input type="checkbox" className="mt-1 accent-emerald-500" />
                            <span>{s.yieldName ? `Collect ${s.yieldName} from ${s.name}(s) and ` : ''}Secure {s.name}(s) against predators.</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3D Visualizer Modal */}
      {showVisualizerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#143627] rounded-3xl w-full max-w-4xl overflow-hidden shadow-[0_0_50px_rgba(52,211,153,0.2)] border border-emerald-500/30 flex flex-col">
            <div className="p-6 border-b border-[#1a4231] flex justify-between items-center bg-[#0f291e]">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <button 
                  onClick={() => {
                    const img = document.getElementById('visualizer-img');
                    if (img && img.requestFullscreen) {
                      img.requestFullscreen();
                    }
                  }} 
                  className="hover:scale-110 transition p-1"
                  title="Fullscreen Image"
                >
                  <Maximize className="text-emerald-400" size={24}/>
                </button>
                AI Farm Visualizer
              </h2>
              <button onClick={() => setShowVisualizerModal(false)} className="p-2 hover:bg-[#1a4231] rounded-full text-slate-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 flex flex-col items-center justify-center min-h-[500px]">
              {selectedAnimals.length === 0 ? (
                <p className="text-emerald-200/60 text-center py-10">Add animals to your farm to visualize it.</p>
              ) : (
                <div className="w-full h-full flex flex-col items-center gap-4">
                  <img 
                    id="visualizer-img"
                    src={`https://image.pollinations.ai/prompt/${encodeURIComponent(`A photorealistic wide-angle shot of an animal sanctuary. EXACTLY THESE ANIMALS MUST BE PRESENT: ${selectedAnimals.map(a => { const s = speciesLibrary.find(sp => sp.id === a.id); return s ? `${a.count} ${s.name}(s)` : '' }).filter(Boolean).join(' AND ')}. The animals are clearly visible and separated in their respective habitats. Natural lighting, realistic photography, highly detailed, nature documentary style`)}?width=1024&height=576&nologo=true`}
                    alt="AI Generated Farm"
                    className="w-full h-auto rounded-xl shadow-2xl border border-emerald-500/20 cursor-pointer"
                    onClick={(e) => e.currentTarget.requestFullscreen()}
                    onLoad={() => setIsVisualizerLoading(false)}
                    onError={() => setIsVisualizerLoading(false)}
                    style={isVisualizerLoading ? { display: 'none' } : {}}
                  />
                  {isVisualizerLoading && (
                    <div className="flex flex-col items-center gap-4 text-emerald-400 my-auto">
                      <RefreshCw className="animate-spin" size={40} />
                      <p className="font-bold tracking-widest uppercase">Generating 3D Render...</p>
                    </div>
                  )}
                  <p className="text-xs text-emerald-200/40 text-center">Powered by Pollinations AI</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
                  <Calendar size={24} className="text-emerald-500 mb-2"/>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-1">Maturity</span>
                  <span className="font-black text-[#143627]">{infoSpecies.growthDays}</span>
                </div>
              </div>

              <div className="bg-[#143627] rounded-2xl p-6 text-emerald-50 shadow-inner mb-8 border border-[#1a4231]">
                <h4 className="flex items-center gap-2 font-black text-emerald-400 mb-2">
                  <Droplets size={18}/> Care & Feeding Schedule:
                </h4>
                <p className="text-sm leading-relaxed mb-4">Provide {infoSpecies.feedType} daily in the morning. Ensure clean, fresh water is available at all times. Deep soak water troughs every 2 days.</p>
                <p className="text-sm leading-relaxed italic text-emerald-200/70 border-t border-[#1a4231] pt-3">
                  <span className="font-bold">Care Tip:</span> Observe social behavior closely during feeding to prevent aggression.
                </p>
              </div>

              {infoSpecies.companions.length > 0 && (
                <div className="mb-6">
                  <h4 className="flex items-center gap-2 font-bold text-emerald-600 mb-3 text-sm">
                    <ShieldCheck size={18}/> Beneficial Companions:
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {infoSpecies.companions.map(c => (
                      <span key={c} className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              {infoSpecies.enemies.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-red-500 mb-3 text-sm">
                    <AlertTriangle size={18}/> Avoid Housing Near:
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {infoSpecies.enemies.map(c => (
                      <span key={c} className="bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 bg-white border-t border-slate-200 flex justify-between">
               <button onClick={() => setInfoModalId(null)} className="px-6 py-2.5 rounded-xl text-slate-500 font-bold hover:bg-slate-100 transition">Close</button>
               {selectedAnimals.some(a => a.id === infoSpecies.id) ? (
                 <button onClick={() => { handleDecrement(infoSpecies.id); setInfoModalId(null); }} className="px-6 py-2.5 rounded-xl text-red-500 font-bold hover:bg-red-50 border border-red-200 flex items-center gap-2 transition">
                   <Minus size={16}/> Remove from Selection
                 </button>
               ) : (
                 <button onClick={() => { handleAdd(infoSpecies.id); setInfoModalId(null); }} className="px-6 py-2.5 rounded-xl bg-[#143627] text-white font-bold hover:bg-[#1a4231] shadow-md flex items-center gap-2 transition">
                   <Plus size={16}/> Add to Selection
                 </button>
               )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (Greenplan Style) */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#111814] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-red-900/50 flex flex-col p-6 relative ring-1 ring-red-500/20">
            
            <button onClick={() => setShowDeleteModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition">
              <X size={20} />
            </button>

            <div className="flex gap-4 items-start mb-6">
              <div className="p-3 border border-red-500/30 rounded-xl text-red-500 bg-red-500/10 shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white font-serif mb-1">Reset Enclosure Data?</h2>
                <p className="text-red-400 text-xs font-bold">Action cannot be undone</p>
              </div>
            </div>

            <div className="bg-[#18261e] border border-slate-700/50 rounded-xl p-5 mb-6">
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                This will completely wipe your current enclosure layout configuration, canvas animal placements, companion synergy setups, and Care Guide feeding routines.
              </p>
              <p className="text-red-400 text-xs font-bold">
                You will be returned to the initial setup wizard to start fresh.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="px-5 py-2.5 rounded-xl text-slate-300 font-bold hover:bg-slate-800 border border-slate-700 transition text-sm"
              >
                Cancel
              </button>
              <button 
                onClick={handleClearLayout} 
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-md flex items-center gap-2 transition text-sm"
              >
                <RefreshCw size={14}/> Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Image 5 Style Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0f291e] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#1a4231] flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[#1a4231] flex justify-between items-center bg-[#0a1f16]">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <Fence className="text-emerald-400" size={24}/> Enclosure & Environment Configuration
              </h2>
              <button onClick={() => setShowSetupModal(false)} className="p-2 hover:bg-[#143627] rounded-full text-slate-400 hover:text-white transition">
                <X size={24} />
              </button>
            </div>
            <div className="p-8 overflow-y-auto">
              
              <div className="border border-[#1a4231] rounded-xl p-5 bg-[#143627]/30 mb-6">
                <h3 className="text-emerald-500 font-extrabold text-[10px] uppercase tracking-widest mb-4">1. Enclosure Footprint</h3>
                <div className="flex gap-4 items-center">
                  <div className="flex-1">
                    <label className="text-white text-xs font-bold block mb-1">Width (m)</label>
                    <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="w-full bg-[#0a1f16] border border-[#1a4231] text-emerald-400 font-bold rounded-lg p-3 outline-none focus:border-emerald-500"/>
                  </div>
                  <div className="flex-1">
                    <label className="text-white text-xs font-bold block mb-1">Length (m)</label>
                    <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="w-full bg-[#0a1f16] border border-[#1a4231] text-emerald-400 font-bold rounded-lg p-3 outline-none focus:border-emerald-500"/>
                  </div>
                  <div className="flex-1 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex flex-col justify-center items-center mt-5">
                    <span className="text-emerald-400 text-xs font-bold">{Number(width) * Number(length)} sq.m Area</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-[#1a4231] rounded-xl p-5 bg-[#143627]/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-emerald-500 font-extrabold text-[10px] uppercase tracking-widest">2. Active Animal Population</h3>
                  <span className="bg-emerald-500 text-[#0f291e] px-2 py-1 rounded text-[10px] font-bold">{totalAnimalsPlaced} Animals Placed</span>
                </div>
                <div className="space-y-2">
                  {selectedAnimals.length === 0 ? (
                    <p className="text-emerald-100/50 text-sm">No animals placed yet. Use the sidebar wizard to add animals.</p>
                  ) : (
                    selectedAnimals.map(item => {
                      const sp = speciesLibrary.find(s => s.id === item.id)!;
                      return (
                        <div key={item.id} className="bg-[#0a1f16] border border-[#1a4231] p-3 rounded-xl flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl bg-[#143627] p-2 rounded-lg">{sp.icon}</span>
                            <div>
                              <p className="text-white font-bold text-sm">{sp.name}</p>
                              <p className="text-emerald-500/70 text-[10px] uppercase">{sp.spaceRequired} sq.m / head</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 bg-[#143627] rounded-lg p-1 border border-[#1a4231]">
                            <button onClick={() => handleDecrement(item.id)} className="w-8 h-8 flex items-center justify-center text-emerald-400 hover:bg-[#1a4231] rounded-md transition"><Minus size={14}/></button>
                            <span className="text-white font-black w-4 text-center">{item.count}</span>
                            <button onClick={() => handleAdd(item.id)} className="w-8 h-8 flex items-center justify-center text-emerald-400 hover:bg-[#1a4231] rounded-md transition"><Plus size={14}/></button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#1a4231] bg-[#0a1f16] flex justify-end">
               <button onClick={() => { generateAutoLayout(); setShowSetupModal(false); }} className="bg-emerald-500 hover:bg-emerald-400 text-[#0f291e] font-black py-3 px-8 rounded-xl text-sm transition shadow-[0_0_15px_rgba(52,211,153,0.3)] flex items-center gap-2">
                  <Save size={16}/> Apply Configuration
               </button>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #143627; border-radius: 4px; }
      `}</style>
    </div>
  );
}

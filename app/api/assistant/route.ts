import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const speciesLibrary = [
  { id: '1', name: 'Sheep', spaceRequired: 20, icon: '🐑', category: 'Livestock', sizeClass: 'w-24 h-24', iconSize: 'text-4xl', feedType: 'Pasture & Hay', growthDays: '150 Days', progressPct: 60, description: 'Provides wool and natural grazing. Excellent for pasture management.', companions: ['Goat', 'Guard Dog', 'Chicken'], enemies: ['Wolf', 'Tiger'], careLevel: 'Beginner Friendly', cost: '$45/mo', water: 'Medium' },
  { id: '2', name: 'Goat', spaceRequired: 15, icon: '🐐', category: 'Livestock', sizeClass: 'w-20 h-20', iconSize: 'text-3xl', feedType: 'Brush & Hay', growthDays: '120 Days', progressPct: 75, description: 'Excellent at clearing brush and weeds. Very curious and active.', companions: ['Sheep', 'Horse', 'Cow'], enemies: ['Wolf', 'Tiger'], careLevel: 'Intermediate', cost: '$40/mo', water: 'Medium' },
  { id: '3', name: 'Cow', spaceRequired: 60, icon: '🐄', category: 'Livestock', sizeClass: 'w-36 h-36', iconSize: 'text-6xl', feedType: 'Pasture & Silage', growthDays: '700 Days', progressPct: 30, description: 'Large grazing animal. Requires substantial pasture and fencing.', companions: ['Horse', 'Goat'], enemies: ['Wolf', 'Tiger'], careLevel: 'Advanced', cost: '$120/mo', water: 'High' },
  { id: '4', name: 'Buffalo', spaceRequired: 70, icon: '🐃', category: 'Livestock', sizeClass: 'w-40 h-40', iconSize: 'text-7xl', feedType: 'Grass & Forage', growthDays: '800 Days', progressPct: 20, description: 'Requires very sturdy fencing and access to mud wallows/water.', companions: ['Cow', 'Elephant'], enemies: ['Tiger'], careLevel: 'Advanced', cost: '$150/mo', water: 'Very High' },
  { id: '5', name: 'Horse', spaceRequired: 80, icon: '🐎', category: 'Livestock', sizeClass: 'w-36 h-36', iconSize: 'text-6xl', feedType: 'Hay & Grain', growthDays: 'Adult', progressPct: 100, description: 'Requires large running space, strong fencing, and daily grooming.', companions: ['Goat', 'Cow', 'Donkey'], enemies: ['Wolf'], careLevel: 'Advanced', cost: '$200/mo', water: 'High' },
  { id: '6', name: 'Donkey', spaceRequired: 40, icon: '🫏', category: 'Working', sizeClass: 'w-28 h-28', iconSize: 'text-5xl', feedType: 'Hay & Grass', growthDays: 'Adult', progressPct: 100, description: 'Excellent guard animals for livestock. Highly intelligent and hardy.', companions: ['Sheep', 'Horse'], enemies: ['Wolf'], careLevel: 'Intermediate', cost: '$50/mo', water: 'Low' },
  { id: '7', name: 'Chicken', spaceRequired: 4, icon: '🐔', category: 'Poultry', sizeClass: 'w-12 h-12', iconSize: 'text-xl', feedType: 'Grain & Crumbles', growthDays: '45 Days', progressPct: 85, description: 'Provides daily eggs and pest control. Needs a secure coop.', companions: ['Duck', 'Sheep', 'Goat'], enemies: ['Cat', 'Wolf'], careLevel: 'Beginner Friendly', cost: '$15/mo', water: 'Low' },
  { id: '8', name: 'Duck', spaceRequired: 6, icon: '🦆', category: 'Poultry', sizeClass: 'w-14 h-14', iconSize: 'text-2xl', feedType: 'Pellets & Greens', growthDays: '50 Days', progressPct: 65, description: 'Excellent for slug control. Requires a water source for bathing.', companions: ['Chicken'], enemies: ['Cat', 'Wolf'], careLevel: 'Beginner Friendly', cost: '$20/mo', water: 'High' },
  { id: '9', name: 'Ostrich', spaceRequired: 45, icon: '🦤', category: 'Poultry', sizeClass: 'w-32 h-32', iconSize: 'text-6xl', feedType: 'Plants & Insects', growthDays: '365 Days', progressPct: 100, description: 'Largest living bird. Very fast, requires strong, tall fencing.', companions: ['Zebra'], enemies: ['Lion', 'Tiger'], careLevel: 'Advanced', cost: '$80/mo', water: 'Low' },
  { id: '10', name: 'Peacock', spaceRequired: 15, icon: '🦚', category: 'Poultry', sizeClass: 'w-20 h-20', iconSize: 'text-4xl', feedType: 'Seeds & Insects', growthDays: '200 Days', progressPct: 90, description: 'Ornamental bird. Needs roosting trees and large aviaries.', companions: ['Chicken'], enemies: ['Cat', 'Wolf'], careLevel: 'Intermediate', cost: '$30/mo', water: 'Medium' },
  { id: '11', name: 'Guard Dog', spaceRequired: 25, icon: '🐕', category: 'Working', sizeClass: 'w-28 h-28', iconSize: 'text-5xl', feedType: 'Meat & Kibble', growthDays: 'Adult', progressPct: 100, description: 'Protects livestock from predators. Highly loyal and alert.', companions: ['Sheep', 'Goat', 'Cow'], enemies: ['Wolf', 'Tiger', 'Cat'], careLevel: 'Intermediate', cost: '$60/mo', water: 'Medium' },
  { id: '12', name: 'Cat', spaceRequired: 10, icon: '🐈', category: 'Working', sizeClass: 'w-16 h-16', iconSize: 'text-2xl', feedType: 'Meat & Fish', growthDays: 'Adult', progressPct: 100, description: 'Excellent barn cat for rodent control. Very independent.', companions: ['Horse', 'Cow'], enemies: ['Guard Dog', 'Chicken', 'Parrot'], careLevel: 'Beginner Friendly', cost: '$20/mo', water: 'Low' },
  { id: '13', name: 'Parrot', spaceRequired: 5, icon: '🦜', category: 'Exotic', sizeClass: 'w-12 h-12', iconSize: 'text-xl', feedType: 'Seeds & Fruits', growthDays: 'Adult', progressPct: 100, description: 'Highly intelligent and vocal. Needs extensive enrichment.', companions: [], enemies: ['Cat'], careLevel: 'Advanced', cost: '$40/mo', water: 'Low' },
  { id: '14', name: 'Camel', spaceRequired: 70, icon: '🐪', category: 'Exotic', sizeClass: 'w-40 h-40', iconSize: 'text-7xl', feedType: 'Dry Foliage', growthDays: 'Adult', progressPct: 100, description: 'Desert adapted. Requires specialized dry environments.', companions: ['Donkey'], enemies: ['Tiger'], careLevel: 'Intermediate', cost: '$90/mo', water: 'Very Low' },
  { id: '15', name: 'Wolf', spaceRequired: 100, icon: '🐺', category: 'Wild', sizeClass: 'w-32 h-32', iconSize: 'text-6xl', feedType: 'Raw Meat', growthDays: 'Adult', progressPct: 100, description: 'Apex pack predators. Requires highly specialized, fortified enclosures with anti-digging perimeters.', companions: [], enemies: ['Guard Dog', 'Sheep', 'Goat', 'Cow', 'Buffalo', 'Horse'], careLevel: 'Expert', cost: '$180/mo', water: 'Medium' },
  { id: '16', name: 'Deer', spaceRequired: 150, icon: '🦌', category: 'Wild', sizeClass: 'w-32 h-32', iconSize: 'text-6xl', feedType: 'Forage & Leaves', growthDays: 'Adult', progressPct: 100, description: 'Flighty herbivores that can jump extremely high. Requires 8ft+ fencing and forest cover.', companions: [], enemies: ['Wolf', 'Tiger'], careLevel: 'Advanced', cost: '$90/mo', water: 'Medium' },
  { id: '17', name: 'Tiger', spaceRequired: 200, icon: '🐅', category: 'Wild', sizeClass: 'w-40 h-40', iconSize: 'text-7xl', feedType: 'Heavy Meat', growthDays: 'Adult', progressPct: 100, description: 'Massive solitary predators. Extreme containment protocols and vast space required.', companions: [], enemies: ['Cow', 'Buffalo', 'Deer', 'Sheep', 'Goat'], careLevel: 'Expert', cost: '$300/mo', water: 'High' },
  { id: '18', name: 'Elephant', spaceRequired: 500, icon: '🐘', category: 'Wild', sizeClass: 'w-56 h-56', iconSize: 'text-8xl', feedType: 'Vegetation & Hay', growthDays: 'Adult', progressPct: 100, description: 'Highly social megafauna. Needs reinforced containment, massive dietary intake, and social enrichment.', companions: ['Buffalo'], enemies: ['Tiger'], careLevel: 'Expert', cost: '$800/mo', water: 'Very High' },
];

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is missing. Please add GEMINI_API_KEY to your .env.local file." }, { status: 500 });
    }
    
    const { symptom, context = "No specific context provided." } = await req.json();
    
    // 1. Fetch available models for this specific API key
    const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (!modelsResponse.ok) {
      throw new Error(`Failed to fetch models list: ${modelsResponse.statusText}`);
    }
    const modelsData = await modelsResponse.json();
    
    // 2. Find the best available Gemini model that supports generateContent
    let targetModel = "gemini-1.5-pro"; // Use pro model as default for stability
    if (modelsData && modelsData.models) {
      const validModels = modelsData.models.filter((m: any) => 
        m.supportedGenerationMethods?.includes("generateContent") && 
        m.name.includes("gemini")
      );
      
      if (validModels.length > 0) {
        const bestModel = validModels.find((m: any) => m.name.includes("1.5-pro")) 
                       || validModels.find((m: any) => m.name.includes("1.5-flash"))
                       || validModels[0];
        targetModel = bestModel.name.replace("models/", "");
      }
    }

    // The model is now initialized dynamically inside the fallback loop below
    const speciesDataInfo = speciesLibrary.map(s => 
      `- ID ${s.id}: ${s.name} (${s.category}, Needs ${s.spaceRequired} sq.m, Eats ${s.feedType}, Growth Period: ${s.growthDays}, Default Progress: ${s.progressPct}%, Companions: ${s.companions?.join(', ')}, Enemies: ${s.enemies?.join(', ')}). Description: ${s.description}`
    ).join('\n');

    const prompt = `You are an expert veterinary AI assistant and enclosure planner for the "Ani-Plan" software (AnimalHack 2026).
    
USER'S LIVE ENCLOSURE CONTEXT:
${context}

SPECIES DICTIONARY:
${speciesDataInfo}

The user asks or reports: "${symptom}". 
Using the live context of their actual enclosure and the species dictionary, provide a highly specific, personalized, and 100% accurate response. Do not ask them for basic information like what species they have, because you already know their context!
Format your response professionally using bullet points. Do not use markdown backticks. Keep it concise and direct.`;

    // Try a few fallback models in case of 503 or 429
    const modelsToTry = [targetModel, "gemini-1.5-flash", "gemini-1.5-flash-8b", "gemini-1.0-pro"];
    let responseText = null;
    let finalModel = targetModel;
    let lastError = null;

    for (const mName of modelsToTry) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const fallbackModel = genAI.getGenerativeModel({ model: mName });
        const result = await fallbackModel.generateContent(prompt);
        const response = await result.response;
        responseText = response.text();
        finalModel = mName;
        break; // Success!
      } catch (err: any) {
        lastError = err;
        // Only retry if it's a 503 or 429 (high demand / quota)
        if (!err.message?.includes("503") && !err.message?.includes("429")) {
          throw err;
        }
      }
    }

    if (!responseText) {
      throw lastError || new Error("All model fallbacks failed due to high demand.");
    }

    return NextResponse.json({ text: responseText, usedModel: finalModel });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate AI response." }, { status: 500 });
  }
}

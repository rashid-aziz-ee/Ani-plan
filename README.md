<div align="center">
  <img src="https://img.shields.io/badge/Status-Live_on_Vercel-success?style=for-the-badge&logo=vercel" alt="Deployed on Vercel" />
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/AI-Gemini_1.5_Pro-blue?style=for-the-badge&logo=google" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/AI-Pollinations.ai-purple?style=for-the-badge&logo=openai" alt="Pollinations AI" />
  
  <br />
  <br />
  
  <h1>🐾 Ani-plan Enclosure Planner</h1>
  <p><strong>Design true-to-scale farm enclosures, optimize companion animal relationships, calculate precision space requirements, and auto-arrange your ideal high-yield sanctuary.</strong></p>
  <p><i>Built for AnimalHack 2026</i></p>
  
  <h3><a href="https://ani-plan-rouge.vercel.app" target="_blank">🌟 View Live Demo Here</a></h3>
</div>

<br />

## 🚨 The Problem
Overcrowding and incorrect species combinations (putting predators near prey or incompatible animals together) cause real welfare, safety, and health issues on small farms and animal sanctuaries. Most farmers rely on guesswork or basic calculators to determine how much space their herd actually needs.

## 💡 The Solution: Ani-plan
Ani-plan is a next-generation **Veterinary Herd Canvas Engine**. We transformed the concept of a botanical garden planner into a precise, mathematically accurate animal sanctuary management tool. It calculates exact space requirements per animal (sq.m), warns you about dangerous herd combinations, and provides a context-aware AI Vet Expert that actually *knows* what's currently in your farm.

---

## ✨ Key Features & New Updates

### 1. True-Scale Canvas Engine 📏
Unlike standard drag-and-drop builders, Ani-plan's canvas is a **proportional mathematical grid**. 
- Enclosure dimensions are set in meters (e.g., 20x20m = 400 sq.m). 
- Animal nodes (SVG circles) are sized strictly proportional to their real-world footprint requirements (a 15 sq.m Goat circle is visually much smaller than an 80 sq.m Horse circle).
- **Smart Space Limiting:** The onboarding wizard calculates remaining space in real-time, automatically blocking/disabling the selection of larger animals if the plot runs out of room.

### 2. Herd Synergy & Ecosystem Matrix 🐺🐑
The engine calculates relationships dynamically. Placed animals are connected by animated SVG trace lines. If you attempt to place a predator (like a Lion or Wolf) next to livestock (like a Sheep or Duck), the **Conflict Defense** engine immediately triggers a critical warning, preventing dangerous sanctuary layouts and optimizing for 100% synergy.

### 3. AI Farm Visualizer (New) 🎨
Powered by the Pollinations.ai API, the dashboard features a one-click 3D visualization tool. It reads your exact animal selections (e.g., 5 Sheep, 2 Horses) and generates a breathtaking, photorealistic 8K render of your specific animals coexisting in a vibrant sanctuary field.

### 4. Real-time Weather & Environment Awareness 🌡️
The dashboard integrates simulated environmental factors, tracking local temperatures and warning the user when conditions become hazardous (e.g., Extreme Heat warnings), empowering better watering and shelter decisions.

### 5. Context-Aware AI Vet Expert 🧠
Powered by Google's Gemini 1.5 Pro, the AI Assistant isn't just a generic chatbot. We engineered it to silently ingest the **Live Farm State** (total area, current animals placed, their ages in game-days, terrain type, weather, and active conflicts). When you ask for advice, the AI gives highly specific veterinary guidance tailored precisely to your current digital farm.

### 6. Animal Encyclopedia & Conservation Yields 🌱
An immersive database UI detailing care schedules, required sunlight/water, and companion benefits. Wild and exotic animals calculate their return in "Conservation Impact Scores" rather than standard profit ROI, pushing the core values of animal rescue and sustainable ecosystems.

---

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), React 18, TypeScript.
- **Styling & UI:** Tailwind CSS (Rich Emerald Glassmorphism theme), Lucide React (Dynamic animal iconography).
- **State Persistence:** Deep `localStorage` integration paired with custom window events to sync state instantly between isolated React components (like Sidebar Modals and the Main Canvas).
- **AI Engines:** Google Gemini API (`gemini-1.5-pro`) for veterinary intelligence, Pollinations.ai for photorealistic 3D rendering.

---

## 🚧 Challenges We Overcame
Building Ani-plan pushed our technical limits. Here are the top challenges we solved:

1. **State Synchronization Across Layouts:** Passing data between Next.js `layout.tsx` (the Enclosure Setup Modal) and `page.tsx` (the Canvas) without a global state manager (like Redux). We engineered a custom `window.dispatchEvent` system that listens for changes in `localStorage` and forces immediate React re-renders.
2. **Proportional SVG Math:** Calculating the exact relative pixel radius for each animal based on their required sq.m, and ensuring they fit perfectly within the boundaries of the absolute grid without overflowing.
3. **AI Prompt Engineering for Image Generation:** Structuring dynamic prompts for Pollinations.ai that accurately enforce the exact count and species of animals on the canvas without causing the AI to hallucinate standard farm templates.
4. **AI Rate Limiting (503 Errors):** During heavy testing, the Gemini API sometimes returned 503 Overloaded errors. We built a robust **Fallback Chain Array** that automatically attempts to fetch from `1.5-flash-8b` if the Pro model is overwhelmed.

---

## 🏃 Getting Started (Local Development)

First, install the dependencies:
```bash
npm install
```

Create a `.env.local` file in the root directory and add your Gemini API Key:
```env
GEMINI_API_KEY="your_api_key_here"
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
*Created with ❤️ for AnimalHack 2026.*

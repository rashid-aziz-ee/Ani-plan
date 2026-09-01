"use client";

import { useState, useEffect } from "react";
import { Bot, Send, User, Sparkles, LayoutGrid, Syringe } from "lucide-react";

export default function AIVetExpertPage() {
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your Ani-plan AI Assistant. I have live, real-time access to your enclosure layout and active animal populations. Ask me anything about spacing, companion compatibility, feed needs, disease prevention, or custom care advice!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({ width: 0, length: 0, animals: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('aniplan_layout');
    if (saved) {
      const data = JSON.parse(saved);
      const total = data.selectedAnimals?.reduce((sum: number, a: any) => sum + a.count, 0) || 0;
      setStats({ width: data.width, length: data.length, animals: total });
    }
    const history = localStorage.getItem('aniplan_ai_history');
    if (history) {
      setMessages(JSON.parse(history));
    }
  }, []);

  const saveMessages = (newMessages: {role: 'user'|'assistant', content: string}[]) => {
    setMessages(newMessages);
    localStorage.setItem('aniplan_ai_history', JSON.stringify(newMessages));
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = text;
    const newMsgs = [...messages, { role: 'user' as const, content: userMsg }];
    saveMessages(newMsgs);
    setInput("");
    setIsLoading(true);

    try {
      // Get the full context to send to the AI
      const saved = localStorage.getItem('aniplan_layout');
      let enclosureContext = "No animals placed yet.";
      if (saved) {
        const data = JSON.parse(saved);
        const animalList = data.selectedAnimals?.map((a: any) => `${a.count}x ID:${a.id}`).join(", ") || "None";
        enclosureContext = `Enclosure Size: ${data.width}m x ${data.length}m. Total Area: ${data.width * data.length} sq.m. Animals currently placed: ${animalList}. (Note: IDs correspond to the species dictionary).`;
      }

      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          symptom: userMsg,
          context: enclosureContext 
        })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      
      saveMessages([...newMsgs, { role: 'assistant', content: data.text }]);
    } catch (err: any) {
      saveMessages([...newMsgs, { role: 'assistant', content: "Error: " + err.message }]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Are my current animals compatible?",
    "What diseases match my current animals?",
    "Generate a feeding schedule for this week",
    "How can I prevent predators naturally?",
    "When will my poultry be fully grown?"
  ];

  return (
    <div className="min-h-[calc(100vh)] bg-[#fafaf8] font-sans p-6 md:p-10 flex items-center justify-center">
      
      {/* Main Chat Container - Wider and shorter like Greenplan */}
      <div className="w-full max-w-[1100px] h-[65vh] min-h-[550px] flex flex-col bg-white border border-slate-200 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden">
        
        {/* Top Header - Exact Greenplan Header Color */}
        <div className="bg-[#2a4332] p-5 flex flex-col">
          <div className="flex items-center gap-4 px-2">
            <div className="bg-[#8c7b39] p-2 rounded-xl text-white shadow-sm">
              <Bot size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white flex items-center gap-3 font-serif">
                Ani-plan AI Assistant 
                <span className="bg-[#1b2b20] border border-[#3e634a] text-[#86efac] text-[9px] font-black px-2 py-0.5 rounded-full tracking-widest uppercase">Gemini Pro</span>
              </h1>
              <p className="text-[#a4b5aa] text-[10px] mt-1 font-bold tracking-widest uppercase">
                Live Enclosure Context: {stats.width}m × {stats.length}m Plot • {stats.animals} Animals in Guide
              </p>
            </div>
          </div>
        </div>

        {/* Chat History - White background, no bubbles for AI */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-white">
          {messages.map((msg, idx) => (
            <div key={idx} className={"flex gap-4 max-w-4xl " + (msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
              <div className={"w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 " + (msg.role === 'user' ? "bg-emerald-600 text-white" : "bg-[#2a4332] text-white")}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              {msg.role === 'user' ? (
                 <div className="p-4 rounded-2xl rounded-tr-none bg-[#f1f5f9] text-slate-700 text-sm leading-relaxed font-medium">
                   {msg.content}
                 </div>
              ) : (
                 <div className="pt-1 text-slate-700 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                   {msg.content}
                 </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-4xl">
              <div className="w-8 h-8 rounded-full bg-[#2a4332] text-white flex items-center justify-center flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="pt-3 flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-white border-t border-slate-100">
          
          <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pb-4 mb-2 px-1">
            <span className="text-[10px] font-black text-[#d4b759] uppercase tracking-widest flex items-center gap-1 shrink-0 mr-2"><Sparkles size={12}/> Suggestions:</span>
            {suggestions.map((sug, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(sug)}
                className="shrink-0 bg-white hover:bg-slate-50 text-slate-500 text-[10px] font-bold px-4 py-2 rounded-full border border-slate-200 transition"
              >
                {sug}
              </button>
            ))}
          </div>

          <div className="relative flex items-center px-1">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Ask anything about your enclosure layout or companion animals..."
              className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl py-4 pl-5 pr-24 text-sm focus:outline-none focus:border-slate-300 focus:bg-white transition text-slate-700 font-medium"
            />
            <button 
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isLoading}
              className="absolute right-3 bg-[#94a3b8] hover:bg-[#64748b] text-white px-5 py-2 rounded-lg text-xs font-bold disabled:opacity-50 transition flex items-center gap-1 uppercase tracking-wider"
            >
              <Send size={14} className="mr-1"/> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

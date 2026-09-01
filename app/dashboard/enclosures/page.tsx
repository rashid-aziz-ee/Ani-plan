import { Plus, Search } from "lucide-react";

export default function EnclosuresPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Enclosures & Habitats</h1>
          <p className="text-slate-500 mt-1">Manage your nursery zones, aviaries, and pastures.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-emerald-700 flex items-center gap-2 transition shadow-sm">
          <Plus size={20} /> Add New Enclosure
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search enclosures by name..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select className="border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-600 bg-white">
            <option>All Types</option>
            <option>Aviary (Birds)</option>
            <option>Pasture (Livestock)</option>
            <option>Aquarium (Fish)</option>
            <option>Kennel (Pets)</option>
          </select>
          <select className="border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-600 bg-white">
            <option>Status: All</option>
            <option>Status: Optimal</option>
            <option>Status: Needs Attention</option>
          </select>
        </div>

        {/* Dummy Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border border-slate-200 rounded-lg p-5 hover:border-emerald-500 hover:shadow-md transition cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition">North Pasture</h3>
              <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-bold">Optimal</span>
            </div>
            <p className="text-slate-500 text-sm mb-4">Type: Open Pasture (Sheep & Goats)</p>
            <div className="bg-slate-50 p-3 rounded-md mb-4">
              <div className="flex justify-between text-sm text-slate-700 mb-2">
                <span className="font-medium">Population:</span>
                <span>24 / 50</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span className="flex items-center gap-1">🌡️ Temp: 22°C</span>
              <span className="flex items-center gap-1">💧 Humidity: 45%</span>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="border border-slate-200 rounded-lg p-5 hover:border-emerald-500 hover:shadow-md transition cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition">Main Aviary</h3>
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full font-bold">Cleaning Due</span>
            </div>
            <p className="text-slate-500 text-sm mb-4">Type: Large Aviary (Exotic Birds)</p>
            <div className="bg-slate-50 p-3 rounded-md mb-4">
              <div className="flex justify-between text-sm text-slate-700 mb-2">
                <span className="font-medium">Population:</span>
                <span className="text-amber-600 font-bold">140 / 150</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '93%' }}></div>
              </div>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span className="flex items-center gap-1">🌡️ Temp: 26°C</span>
              <span className="flex items-center gap-1">💧 Humidity: 60%</span>
            </div>
          </div>

          {/* Card 3 (Empty State) */}
          <div className="border-2 border-dashed border-slate-200 rounded-lg p-5 flex flex-col items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 transition cursor-pointer h-full min-h-[220px]">
            <Plus size={32} className="mb-2" />
            <span className="font-medium">Create New Enclosure</span>
          </div>
        </div>
      </div>
    </div>
  );
}

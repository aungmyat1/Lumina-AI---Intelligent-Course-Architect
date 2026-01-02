import React from 'react';
import { ICONS } from '@/src/constants';
import { View } from '@/src/types';

interface NavbarProps {
  view: View;
  setView: (v: View) => void;
  isPro: boolean;
  onUpgrade: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ view, setView, isPro, onUpgrade }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => setView('LANDING')}
        >
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <ICONS.Brain className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">Lumina <span className="text-blue-500">AI</span></span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView('DASHBOARD')}
            className={`text-sm font-medium transition-colors ${view === 'DASHBOARD' ? 'text-blue-500' : 'text-gray-400 hover:text-white'}`}
          >
            Dashboard
          </button>
          
          {!isPro ? (
            <button 
              onClick={() => setView('PRICING')}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <ICONS.Zap className="w-4 h-4 fill-white" />
              Go Pro
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs font-bold text-blue-400">
              <ICONS.Zap className="w-3 h-3 fill-blue-400" />
              PRO PLAN
            </div>
          )}
          
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center overflow-hidden">
             <img src="https://picsum.photos/seed/user/32/32" alt="Avatar" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
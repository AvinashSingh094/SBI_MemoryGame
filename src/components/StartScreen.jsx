import React from 'react';
import { Play } from 'lucide-react';

export default function StartScreen({ onStartGame }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* Start Button CTA */}
      <button
        onClick={onStartGame}
        id="start-game-btn"
        className="group relative inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-5 rounded-2xl text-xl sm:text-2xl font-bold text-slate-900 bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 shadow-[0_0_35px_rgba(34,211,238,0.6)] hover:shadow-[0_0_55px_rgba(34,211,238,0.9)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        <Play className="w-7 h-7 fill-slate-900 text-slate-900 transition-transform group-hover:scale-110" />
        <span className="relative z-10 tracking-wide font-sans">Start Game</span>
      </button>
    </div>
  );
}



import React from 'react';
import { Timer } from 'lucide-react';

export default function GameHeader({
  timeLeft,
  isPreviewing = false
}) {
  const isWarning = timeLeft <= 20 && timeLeft > 10;
  const isCritical = timeLeft <= 10;

  return (
    <header className="w-full max-w-xl mx-auto my-1 sm:my-2 px-2 shrink-0 text-center flex flex-col items-center justify-center select-none">
      {/* Title with decorative dashes */}
      <div className="flex items-center justify-center gap-3 mb-1">
        <span className="w-6 sm:w-10 h-[2px] bg-gradient-to-r from-transparent to-cyan-400 opacity-80" />
        <h2 className="text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-indigo-200 font-sans drop-shadow-sm">
          MATCH THE CARD
        </h2>
        <span className="w-6 sm:w-10 h-[2px] bg-gradient-to-l from-transparent to-purple-400 opacity-80" />
      </div>

      {/* Centered Timer Section */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Timer
            className={`w-4 h-4 sm:w-5 sm:h-5 ${
              isPreviewing
                ? 'text-amber-400 animate-spin'
                : isCritical
                ? 'text-red-400 animate-spin'
                : isWarning
                ? 'text-amber-400'
                : 'text-cyan-400'
            }`}
          />
          <span
            className={`text-xl sm:text-2xl font-black font-mono tracking-wider leading-none ${
              isPreviewing
                ? 'text-amber-300 text-lg'
                : isCritical
                ? 'text-red-400 animate-pulse'
                : isWarning
                ? 'text-amber-300'
                : 'text-cyan-300 text-glow-cyan'
            }`}
          >
            {isPreviewing ? 'MEMORIZE' : `00:${timeLeft.toString().padStart(2, '0')}`}
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5 leading-tight">
          {isPreviewing ? 'PREVIEW (2S)' : 'TIME LEFT'}
        </span>
      </div>
    </header>
  );
}



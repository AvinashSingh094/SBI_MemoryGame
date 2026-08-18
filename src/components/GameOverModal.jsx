import React from 'react';
import { Clock, RotateCcw } from 'lucide-react';

export default function GameOverModal({
  timeTaken,
  timeLeft,
  isVictory,
  onPlayAgain
}) {
  const displayTime = isVictory ? timeTaken : 60 - timeLeft;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-pop">
      <div className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#0e2752] to-[#07142a] border border-cyan-500/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(0,180,216,0.3)] text-center overflow-hidden">
        {/* Background subtle glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl bg-cyan-400/20 pointer-events-none" />

        {/* Thank You Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-sky-300 mb-6 font-sans">
          Thank you for playing!
        </h2>

        {/* Time Taken Display */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-sbi-dark/80 border border-cyan-500/30 mb-6">
          <div className="flex items-center gap-2 mb-1 text-cyan-400">
            <Clock className="w-5 h-5" />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              Time Taken
            </span>
          </div>
          <span className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono tracking-wider">
            {displayTime}s
          </span>
        </div>

        {/* Play Again Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={onPlayAgain}
            id="modal-play-again-btn"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-300 hover:from-cyan-300 hover:to-amber-200 text-slate-950 font-bold text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_35px_rgba(34,211,238,0.8)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}


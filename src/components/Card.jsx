import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function Card({ card, onCardClick, isDisabled }) {
  const { isFlipped, isMatched, image, title, tag } = card;

  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled) {
      onCardClick(card);
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={isMatched || isFlipped || isDisabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={isFlipped || isMatched ? `${title}` : 'Hidden memory card'}
      className={`relative w-full aspect-[3/3.9] cursor-pointer perspective-1000 select-none group transition-transform duration-200 ${
        isMatched
          ? 'cursor-default opacity-90 scale-[0.98]'
          : isDisabled
          ? 'cursor-wait'
          : 'hover:-translate-y-0.5 active:scale-95'
      }`}
    >
      <div
        className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-lg sm:rounded-xl shadow-md ${
          isFlipped || isMatched ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARD BACK (Shown when face-down) */}
        <div
          className={`absolute inset-0 w-full h-full backface-hidden rounded-lg sm:rounded-xl p-[1.5px] ${
            isDisabled ? 'opacity-85' : 'group-hover:shadow-[0_0_12px_rgba(0,180,216,0.45)]'
          } transition-all duration-300`}
        >
          {/* Outer gradient border */}
          <div className="w-full h-full rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-400 via-sbi-blue to-indigo-800 p-[1.5px] shadow-sm">
            {/* Card inner face */}
            <div className="w-full h-full rounded-[6px] sm:rounded-[9px] bg-gradient-to-br from-[#0c244d] to-[#071329] flex flex-col items-center justify-center relative overflow-hidden border border-cyan-500/20">
              {/* Background decorative watermark */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:10px_10px]" />
              
              {/* Geometric SBI-like Ring Pattern */}
              <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-cyan-400/40 flex items-center justify-center bg-sbi-navy/60 backdrop-blur-sm shadow-inner group-hover:scale-105 transition-transform duration-300">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-cyan-400 to-sbi-lightBlue shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-sbi-dark" />
                </div>
                {/* Keyhole accent */}
                <div className="absolute bottom-1 w-1 h-2 bg-sbi-dark rounded-sm" />
              </div>

              {/* Card Back Text */}
              <span className="relative z-10 mt-1 text-[8px] sm:text-[9px] font-bold tracking-widest text-cyan-200/80 uppercase font-sans">
                SBI LIFE
              </span>

              {/* Shimmer sweep effect on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform pointer-events-none" />
            </div>
          </div>
        </div>

        {/* CARD FRONT (Shown when face-up / matched) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-lg sm:rounded-xl bg-white p-[1.5px] shadow-lg overflow-hidden">
          <div
            className={`w-full h-full rounded-[6px] sm:rounded-[9px] bg-gradient-to-b from-white to-slate-50 flex flex-col items-center justify-between p-1 sm:p-1.5 relative overflow-hidden border ${
              isMatched
                ? 'border-emerald-400 ring-1 ring-emerald-400/50 bg-emerald-50/20'
                : 'border-cyan-300'
            }`}
          >
            {/* Tag Badge */}
            <div className="w-full flex items-center justify-between z-10 px-0.5">
              <span className="text-[7px] sm:text-[8px] font-semibold text-sbi-blue uppercase tracking-wider bg-blue-50 px-1 py-0.2 rounded border border-blue-100 truncate">
                {tag}
              </span>
              {isMatched && (
                <span className="flex items-center gap-0.5 text-[7px] sm:text-[8px] font-bold text-emerald-600 bg-emerald-100 px-1 py-0.2 rounded-full">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">Matched</span>
                </span>
              )}
            </div>

            {/* Illustration */}
            <div className="flex-1 w-full flex items-center justify-center my-0.5 overflow-hidden">
              <img
                src={image}
                alt={title}
                loading="eager"
                className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Title */}
            <div className="w-full text-center pb-0.5 z-10">
              <p className="text-[8px] sm:text-[10px] font-bold text-slate-800 truncate leading-tight">
                {title}
              </p>
            </div>

            {/* Matched Sparkle Burst */}
            {isMatched && (
              <div className="absolute inset-0 pointer-events-none bg-emerald-500/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-400 animate-wiggle opacity-80" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


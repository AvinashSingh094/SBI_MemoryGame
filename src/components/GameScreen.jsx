import React from 'react';
import Card from './Card';
import GameHeader from './GameHeader';
import { Brain, Sparkles } from 'lucide-react';

export default function GameScreen({
  cards,
  flippedIds = [],
  onCardClick,
  isLocked,
  isPreviewing,
  timeLeft
}) {
  return (
    <div className="w-full h-full flex-1 overflow-hidden flex flex-col justify-between px-2 sm:px-4 pb-1 select-none">
      {/* Game status and controls header */}
      <GameHeader
        timeLeft={timeLeft}
        isPreviewing={isPreviewing}
      />

      {/* 20-Card Grid (5 columns x 4 rows) - Sized to fit screen perfectly */}
      <main className="w-full flex-1 flex flex-col items-center justify-center min-h-0 my-1 relative">
        {/* Floating preview banner during initial 2 seconds */}
        {isPreviewing && (
          <div className="absolute top-0 z-30 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.8)] animate-bounce">
            <Brain className="w-3.5 h-3.5" />
            <span>Memorize the cards! Game starts in 2s...</span>
          </div>
        )}

        <div className="w-full max-w-[540px] sm:max-w-[600px] md:max-w-[660px] grid grid-cols-5 gap-1.5 sm:gap-2.5">
          {cards.map((card) => {
            const isFlipped = isPreviewing || card.isMatched || flippedIds.includes(card.id);
            const isDisabled = isLocked || isPreviewing || card.isMatched || flippedIds.includes(card.id);
            return (
              <Card
                key={card.id}
                card={{ ...card, isFlipped }}
                onCardClick={onCardClick}
                isDisabled={isDisabled}
              />
            );
          })}
        </div>
      </main>

      {/* Footer subtle tip */}
      <footer className="text-center py-0.5 shrink-0">
        <p className="text-[10px] text-slate-500">
          {isPreviewing
            ? '💡 Take a quick look! Cards will flip back face down in 2 seconds.'
            : 'Match all 10 financial plan pairs before 60 seconds expire!'}
        </p>
      </footer>
    </div>
  );
}



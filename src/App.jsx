import React, { useState, useEffect, useCallback } from 'react';
import { generateDeck } from './data/cardsData';
import { sounds, setMuted } from './utils/sound';
import { fireCelebrationConfetti } from './utils/confetti';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverModal from './components/GameOverModal';

const TOTAL_TIME = 60; // 60 seconds game timer
const TOTAL_PAIRS = 10;

export default function App() {
  // Game state: 'start' | 'playing' | 'gameover'
  const [gameState, setGameState] = useState('start');
  const [cards, setCards] = useState([]);
  const [flippedIds, setFlippedIds] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  // Stats
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [moves, setMoves] = useState(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [isVictory, setIsVictory] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  // Settings & Storage
  const [soundMuted, setSoundMutedState] = useState(() => {
    const saved = localStorage.getItem('sbi_memory_sound_muted');
    return saved === 'true';
  });

  const [bestTime, setBestTime] = useState(() => {
    const saved = localStorage.getItem('sbi_memory_best_time');
    return saved ? parseInt(saved, 10) : null;
  });

  const [bestMoves, setBestMoves] = useState(() => {
    const saved = localStorage.getItem('sbi_memory_best_moves');
    return saved ? parseInt(saved, 10) : null;
  });

  // Sync mute setting with sound engine
  useEffect(() => {
    setMuted(soundMuted);
    localStorage.setItem('sbi_memory_sound_muted', soundMuted.toString());
  }, [soundMuted]);

  const toggleSound = () => {
    setSoundMutedState((prev) => !prev);
  };

  // Start new game with 2-second preview of all cards
  const startGame = useCallback(() => {
    const newDeck = generateDeck();
    setCards(newDeck);
    setFlippedIds([]);
    setIsLocked(true);
    setIsPreviewing(true);
    setMoves(0);
    setMatchedPairsCount(0);
    setTimeLeft(TOTAL_TIME);
    setIsVictory(false);
    setIsNewBest(false);
    setGameState('playing');
  }, []);

  // Return to welcome screen
  const returnHome = useCallback(() => {
    setFlippedIds([]);
    setIsPreviewing(false);
    setIsLocked(false);
    setGameState('start');
  }, []);

  // Dedicated 2-Second Preview Effect
  useEffect(() => {
    if (gameState === 'playing' && isPreviewing) {
      const previewTimer = setTimeout(() => {
        setIsPreviewing(false);
        setIsLocked(false);
        sounds.playFlip();
      }, 2000);

      return () => clearTimeout(previewTimer);
    }
  }, [gameState, isPreviewing]);

  // Timer countdown management (starts after preview completes)
  useEffect(() => {
    if (gameState === 'playing' && !isPreviewing) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // Time out -> Game Over
            sounds.playGameOver();
            setIsVictory(false);
            setGameState('gameover');
            return 0;
          }

          // Tick sound when time is critical (<= 10 seconds)
          if (prev <= 11 && prev > 1) {
            sounds.playTick();
          }

          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState, isPreviewing]);

  // Deterministic Card Click Handler
  const handleCardClick = useCallback((cardOrId) => {
    const cardId = typeof cardOrId === 'object' && cardOrId !== null ? cardOrId.id : cardOrId;
    if (isLocked || isPreviewing) return;
    if (flippedIds.includes(cardId)) return;

    const clickedCard = cards.find((c) => c.id === cardId);
    if (!clickedCard || clickedCard.isMatched) return;

    sounds.playFlip();

    if (flippedIds.length === 0) {
      // First card flipped
      setFlippedIds([cardId]);
    } else if (flippedIds.length === 1) {
      // Second card flipped
      const firstId = flippedIds[0];
      const firstCard = cards.find((c) => c.id === firstId);
      const newFlipped = [firstId, cardId];
      setFlippedIds(newFlipped);
      setMoves((m) => m + 1);

      if (firstCard && firstCard.type === clickedCard.type) {
        // MATCH!
        sounds.playMatch();
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === firstId || c.id === cardId ? { ...c, isMatched: true } : c
          )
        );
        setFlippedIds([]);

        setMatchedPairsCount((prev) => {
          const nextCount = prev + 1;
          if (nextCount === TOTAL_PAIRS) {
            const timeTaken = TOTAL_TIME - timeLeft;
            let recordBroken = false;

            if (bestTime === null || timeTaken < bestTime) {
              localStorage.setItem('sbi_memory_best_time', timeTaken.toString());
              setBestTime(timeTaken);
              recordBroken = true;
            }
            if (bestMoves === null || (moves + 1) < bestMoves) {
              localStorage.setItem('sbi_memory_best_moves', (moves + 1).toString());
              setBestMoves(moves + 1);
            }

            setIsNewBest(recordBroken);
            setIsVictory(true);
            sounds.playVictory();
            fireCelebrationConfetti();

            setTimeout(() => {
              setGameState('gameover');
            }, 600);
          }
          return nextCount;
        });
      } else {
        // MISMATCH - lock temporarily and flip back
        setIsLocked(true);
        sounds.playMismatch();
        setTimeout(() => {
          setFlippedIds([]);
          setIsLocked(false);
        }, 750);
      }
    }
  }, [isLocked, isPreviewing, flippedIds, cards, timeLeft, moves, matchedPairsCount, bestTime, bestMoves]);

  const timeTaken = TOTAL_TIME - timeLeft;

  return (
    <div className="h-screen max-h-screen bg-sbi-dark flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic ambient gradient orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-blue-700/15 blur-[120px] pointer-events-none" />

      {/* Persistent Top SBI Logo Header for Every Page */}
      <header className="relative z-20 w-full pt-3 sm:pt-4 pb-1.5 flex items-center justify-center shrink-0">
        <div className="bg-white/95 backdrop-blur-sm px-6 sm:px-8 py-2 sm:py-3 rounded-2xl sm:rounded-3xl shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-cyan-400/40 flex items-center justify-center hover:scale-105 transition-transform duration-300">
          <img
            src="/sbi-life.png"
            alt="SBI Life"
            className="h-11 sm:h-14 md:h-16 w-auto object-contain"
          />
        </div>
      </header>

      {/* Main Screen Router */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center overflow-hidden">
        {gameState === 'start' && (
          <StartScreen onStartGame={startGame} />
        )}

        {(gameState === 'playing' || (gameState === 'gameover' && cards.length > 0)) && (
          <GameScreen
            cards={cards}
            flippedIds={flippedIds}
            onCardClick={handleCardClick}
            isLocked={isLocked}
            isPreviewing={isPreviewing}
            timeLeft={timeLeft}
          />
        )}
      </div>

      {/* Game Over / Victory Modal */}
      {gameState === 'gameover' && (
        <GameOverModal
          isVictory={isVictory}
          timeTaken={timeTaken}
          timeLeft={timeLeft}
          onPlayAgain={returnHome}
        />
      )}
    </div>
  );
}

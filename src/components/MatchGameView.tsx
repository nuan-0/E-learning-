import { useState, useEffect, useMemo } from 'react';
import { WORDS } from '../data';
import { tapVibrate } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Word } from '../types';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function MatchGameView() {
  const [roundWords, setRoundWords] = useState<Word[]>([]);
  const [leftCol, setLeftCol] = useState<Word[]>([]);
  const [rightCol, setRightCol] = useState<Word[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  
  const [shakeLeft, setShakeLeft] = useState<string | null>(null);
  const [shakeRight, setShakeRight] = useState<string | null>(null);

  const initGame = () => {
    // Pick 3 random words
    const shuffledAll = shuffleArray(WORDS);
    const chosen = shuffledAll.slice(0, 3);
    setRoundWords(chosen);
    setLeftCol(shuffleArray(chosen));
    setRightCol(shuffleArray(chosen));
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handlePlayAgain = () => {
    tapVibrate();
    initGame();
  };

  const handleSelectLeft = (id: string) => {
    if (matchedIds.includes(id)) return;
    tapVibrate();
    setSelectedLeft(id === selectedLeft ? null : id);
  };

  const handleSelectRight = (id: string) => {
    if (matchedIds.includes(id)) return;
    tapVibrate();
    setSelectedRight(id === selectedRight ? null : id);
  };

  useEffect(() => {
    if (selectedLeft && selectedRight) {
      if (selectedLeft === selectedRight) {
        // Match!
        tapVibrate();
        tapVibrate(); // Double vibrate for win
        setMatchedIds((prev) => [...prev, selectedLeft]);
        setSelectedLeft(null);
        setSelectedRight(null);
        
        // Check if all matched
        if (matchedIds.length + 1 === 3) {
          setTimeout(() => {
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#E0B0FF', '#ffffff', '#a855f7']
            });
          }, 400);
        }
      } else {
        // Mismatch!
        setShakeLeft(selectedLeft);
        setShakeRight(selectedRight);
        
        setTimeout(() => {
          setShakeLeft(null);
          setShakeRight(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 600);
      }
    }
  }, [selectedLeft, selectedRight, matchedIds]);

  const isGameOver = matchedIds.length === 3;

  return (
    <div className="flex flex-col h-full w-full pb-[90px] sm:pb-[110px] px-2 sm:px-4 items-center justify-center">
      {isGameOver ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center space-y-12"
        >
          <div className="text-[80px] sm:text-[100px]">🎉</div>
          <button
            onClick={handlePlayAgain}
            className="bg-[#E0B0FF] text-[#121212] font-bold text-[36px] sm:text-[48px] py-6 sm:py-8 px-8 sm:px-12 rounded-[40px] active:bg-[#C991E8] transition-colors"
          >
            Play Again
          </button>
        </motion.div>
      ) : (
        <div className="flex flex-row w-full max-w-2xl justify-between gap-2 sm:gap-4 h-full py-4 sm:py-8">
          {/* Left Column (English words) */}
          <div className="flex flex-col space-y-4 sm:space-y-6 flex-1 w-1/2">
            <AnimatePresence>
              {leftCol.map((word) => {
                if (matchedIds.includes(word.id)) return null;
                const isSelected = selectedLeft === word.id;
                const isShaking = shakeLeft === word.id;
                
                return (
                  <motion.button
                    key={`l-${word.id}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      x: isShaking ? [-5, 5, -5, 5, 0] : 0 
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: isShaking ? 0.4 : 0.2 }}
                    onClick={() => handleSelectLeft(word.id)}
                    className={`flex-1 flex items-center justify-center rounded-[24px] sm:rounded-[32px] border-[3px] sm:border-[4px] py-2 sm:py-4 px-1 sm:px-2 text-[20px] sm:text-[28px] font-bold transition-colors break-words max-w-full select-none ${
                      isSelected 
                        ? 'border-[#E0B0FF] bg-[#E0B0FF]/20 text-[#E0B0FF]' 
                        : 'border-gray-700 bg-gray-800 text-white active:border-gray-500'
                    }`}
                  >
                    <span className="break-words line-clamp-2 max-w-full text-center">
                      {word.englishWord}
                    </span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Column (Hindi + Emoji) */}
          <div className="flex flex-col space-y-4 sm:space-y-6 flex-1 w-1/2">
            <AnimatePresence>
              {rightCol.map((word) => {
                if (matchedIds.includes(word.id)) return null;
                const isSelected = selectedRight === word.id;
                const isShaking = shakeRight === word.id;
                
                return (
                  <motion.button
                    key={`r-${word.id}`}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      x: isShaking ? [-5, 5, -5, 5, 0] : 0 
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: isShaking ? 0.4 : 0.2 }}
                    onClick={() => handleSelectRight(word.id)}
                    className={`flex-1 flex flex-col items-center justify-center rounded-[24px] sm:rounded-[32px] border-[3px] sm:border-[4px] py-2 sm:py-4 px-1 sm:px-2 transition-colors select-none ${
                      isSelected 
                        ? 'border-[#E0B0FF] bg-[#E0B0FF]/20' 
                        : 'border-gray-700 bg-gray-800 active:border-gray-500'
                    }`}
                  >
                    <span className="text-[20px] sm:text-[28px] font-bold text-white text-center leading-tight mb-1 sm:mb-2 break-words line-clamp-2 max-w-full">
                      {word.hindiMeaning}
                    </span>
                    <span className="text-[36px] sm:text-[46px] leading-none">
                      {word.emoji}
                    </span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

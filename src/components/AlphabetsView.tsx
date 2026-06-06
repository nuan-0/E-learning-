import { useState } from 'react';
import { ALPHABETS } from '../data';
import { tapVibrate } from '../utils';

export function AlphabetsView() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentAlphabet = ALPHABETS[currentIndex];

  const handleNext = () => {
    tapVibrate();
    setCurrentIndex((prev) => (prev + 1) % ALPHABETS.length);
  };

  const handlePrev = () => {
    tapVibrate();
    setCurrentIndex((prev) => (prev - 1 + ALPHABETS.length) % ALPHABETS.length);
  };

  return (
    <div className="flex flex-col h-full w-full items-center px-2 sm:px-4 pt-4 pb-[90px] sm:pb-[110px]">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg min-h-0">
        {/* Flashcard style item */}
        <div className="flex flex-col items-center justify-center space-y-6 w-full py-10">
          <div className="text-[70px] sm:text-[100px] font-bold text-[#E0B0FF] leading-none whitespace-nowrap">
            {currentAlphabet.letter}
          </div>
          <div className="text-[48px] sm:text-[60px] font-bold text-white leading-tight text-center">
            {currentAlphabet.hindiPronunciation}
          </div>
          <div className="text-[80px] sm:text-[100px] leading-none">
            {currentAlphabet.emoji}
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-lg gap-3 sm:gap-4 shrink-0 mt-4 px-1 sm:px-2">
        <button
          onClick={handlePrev}
          className="flex-1 bg-transparent border-[4px] border-[#E0B0FF] text-[#E0B0FF] font-bold text-[28px] sm:text-[32px] py-6 sm:py-8 rounded-[32px] active:bg-[#E0B0FF]/10 transition-colors"
        >
          पिछला
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-[#E0B0FF] text-[#121212] font-bold text-[28px] sm:text-[32px] py-6 sm:py-8 rounded-[32px] active:bg-[#C991E8] transition-colors"
        >
          अगला
        </button>
      </div>
    </div>
  );
}

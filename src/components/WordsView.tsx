import { useState } from 'react';
import { WORDS } from '../data';
import { tapVibrate } from '../utils';

export function WordsView() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWord = WORDS[currentIndex];

  const handleNext = () => {
    tapVibrate();
    setCurrentIndex((prev) => (prev + 1) % WORDS.length);
  };

  const handlePrev = () => {
    tapVibrate();
    setCurrentIndex((prev) => (prev - 1 + WORDS.length) % WORDS.length);
  };

  return (
    <div className="flex flex-col h-full w-full items-center px-2 sm:px-4 pt-4 pb-[90px] sm:pb-[110px]">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg min-h-0">
        {/* 3-Layer Flashcard view */}
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 w-full px-2">
          {/* English Word (Top) */}
          <div className="text-[40px] sm:text-[52px] font-bold text-[#E0B0FF] leading-none text-center break-words max-w-full">
            {currentWord.englishWord}
          </div>
          
          {/* Hindi Transliteration (Middle) */}
          <div className="text-[32px] sm:text-[44px] font-bold text-gray-300 leading-tight text-center break-words max-w-full">
            {currentWord.hindiTransliteration}
          </div>
          
          {/* Hindi Meaning + Emoji (Bottom) */}
          <div className="flex flex-col items-center space-y-2 sm:space-y-4 pt-4 border-t-[4px] border-[#E0B0FF]/30 w-11/12 sm:w-4/5">
            <div className="text-[36px] sm:text-[44px] font-bold text-white text-center break-words max-w-full">
              {currentWord.hindiMeaning}
            </div>
            <div className="text-[70px] sm:text-[80px] leading-none">
              {currentWord.emoji}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-lg gap-3 sm:gap-4 shrink-0 mt-4 px-1 sm:px-2">
        <button
          onClick={handlePrev}
          className="flex-1 bg-transparent border-[4px] border-[#E0B0FF] text-[#E0B0FF] font-bold text-[28px] sm:text-[32px] py-6 sm:py-8 rounded-[32px] active:bg-[#E0B0FF]/10 transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-[#E0B0FF] text-[#121212] font-bold text-[28px] sm:text-[32px] py-6 sm:py-8 rounded-[32px] active:bg-[#C991E8] transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

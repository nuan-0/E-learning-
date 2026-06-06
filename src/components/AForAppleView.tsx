import { useState } from 'react';
import { A_FOR_APPLE } from '../data';
import { tapVibrate } from '../utils';

export function AForAppleView() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = A_FOR_APPLE[currentIndex];

  const handleNext = () => {
    tapVibrate();
    setCurrentIndex((prev) => (prev + 1) % A_FOR_APPLE.length);
  };

  const handlePrev = () => {
    tapVibrate();
    setCurrentIndex((prev) => (prev - 1 + A_FOR_APPLE.length) % A_FOR_APPLE.length);
  };

  return (
    <div className="flex flex-col h-full w-full items-center px-2 sm:px-4 pt-4 pb-[90px] sm:pb-[110px]">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg text-center min-h-0">
        
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 w-full">
          <div className="text-[38px] sm:text-[58px] font-bold text-[#E0B0FF] leading-tight px-2 break-words max-w-full">
            {currentItem.letter.split(' ')[0]} for <br/> {currentItem.word}
          </div>
          
          <div className="text-[24px] sm:text-[32px] font-bold text-gray-300 leading-tight px-2 break-words max-w-full">
            {currentItem.hindiPronunciation} फॉर <br/> {currentItem.hindiTransliteration}
          </div>
          
          <div className="flex flex-col items-center space-y-2 sm:space-y-4 pt-4 border-t-[4px] border-[#E0B0FF]/30 w-11/12 sm:w-4/5">
            <div className="text-[32px] sm:text-[48px] font-bold text-white px-2 break-words max-w-full">
              {currentItem.hindiMeaning}
            </div>
            <div className="text-[68px] sm:text-[88px] leading-none">
              {currentItem.emoji}
            </div>
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

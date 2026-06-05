import { Tab } from '../types';
import { tapVibrate } from '../utils';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const handleTabChange = (tab: Tab) => {
    tapVibrate();
    onTabChange(tab);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-24 bg-[#121212] border-t-[3px] border-gray-800 flex justify-around items-center px-1 z-50">
      <button
        onClick={() => handleTabChange('alphabets')}
        className={`flex-1 h-full flex flex-col items-center justify-center font-bold text-[16px] sm:text-[20px] px-1 text-center leading-tight ${
          currentTab === 'alphabets' ? 'text-[#E0B0FF] border-t-[4px] border-[#E0B0FF]' : 'text-gray-500 border-t-[4px] border-transparent'
        }`}
      >
        A (a)
      </button>
      <button
        onClick={() => handleTabChange('aForApple')}
        className={`flex-1 h-full flex flex-col items-center justify-center font-bold text-[16px] sm:text-[20px] px-1 text-center leading-tight ${
          currentTab === 'aForApple' ? 'text-[#E0B0FF] border-t-[4px] border-[#E0B0FF]' : 'text-gray-500 border-t-[4px] border-transparent'
        }`}
      >
        A=🍎
      </button>
      <button
        onClick={() => handleTabChange('words')}
        className={`flex-1 h-full flex flex-col items-center justify-center font-bold text-[16px] sm:text-[20px] px-1 text-center leading-tight ${
          currentTab === 'words' ? 'text-[#E0B0FF] border-t-[4px] border-[#E0B0FF]' : 'text-gray-500 border-t-[4px] border-transparent'
        }`}
      >
        Words
      </button>
      <button
        onClick={() => handleTabChange('match')}
        className={`flex-1 h-full flex flex-col items-center justify-center font-bold text-[16px] sm:text-[20px] px-1 text-center leading-tight ${
          currentTab === 'match' ? 'text-[#E0B0FF] border-t-[4px] border-[#E0B0FF]' : 'text-gray-500 border-t-[4px] border-transparent'
        }`}
      >
        Game
      </button>
    </div>
  );
}

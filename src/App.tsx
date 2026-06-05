/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Tab } from './types';
import { AlphabetsView } from './components/AlphabetsView';
import { AForAppleView } from './components/AForAppleView';
import { WordsView } from './components/WordsView';
import { MatchGameView } from './components/MatchGameView';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('alphabets');

  return (
    <div className="bg-[#121212] min-h-screen text-[#E0B0FF] flex flex-col font-sans select-none overflow-hidden touch-none">
      {/* Header */}
      <header className="flex items-center justify-center py-4 sm:py-6 border-b-[3px] border-gray-800 shrink-0 px-2">
        <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4 shrink-0" strokeWidth={2.5} />
        <h1 className="text-[32px] sm:text-[40px] font-bold leading-none tracking-tight truncate">English</h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {currentTab === 'alphabets' && <AlphabetsView />}
        {currentTab === 'aForApple' && <AForAppleView />}
        {currentTab === 'words' && <WordsView />}
        {currentTab === 'match' && <MatchGameView />}
      </main>

      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}

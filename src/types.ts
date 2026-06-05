export interface Alphabet {
  id: string;
  letter: string;
  hindiPronunciation: string;
  emoji: string;
}

export interface AForApple {
  id: string;
  letter: string;
  word: string;
  hindiPronunciation: string;
  hindiTransliteration: string;
  hindiMeaning: string;
  emoji: string;
}

export interface Word {
  id: string;
  englishWord: string;
  hindiTransliteration: string;
  hindiMeaning: string;
  emoji: string;
}

export type Tab = 'alphabets' | 'aForApple' | 'words' | 'match';

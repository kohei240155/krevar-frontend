import { ColorResult } from "react-color";

export interface Word {
  id: number;
  originalText: string;
  translatedText: string;
}

export interface WordItemProps {
  word: Word;
  onEditClick: (wordId: number) => void;
}

export interface ColorPickerProps {
  highlightColor: string;
  displayColorPicker: boolean;
  onColorChange: (color: ColorResult) => void;
  onApplyHighlight: () => void;
  onReset: () => void;
  onTogglePicker: () => void;
}

export interface WordEditProps {
  wordId: string;
}

export interface WordFormProps {
  wordRef: React.RefObject<HTMLElement>;
  word: string;
  setWord: (value: string) => void;
  meaning: string;
  setMeaning: (value: string) => void;
  nuance: string;
  setNuance: (value: string) => void;
  imageUrl: string;
}

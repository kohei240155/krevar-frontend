import { ColorResult } from "react-color";

export interface Word {
  id: number;
  originalText: string;
  translatedText: string;
  nuanceText: string;
  imageUrl: string;
  deckId: number;
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
  handleSubmit: (event: React.FormEvent) => void;
}

export interface ImageDisplayProps {
  imageUrl: string;
}

export interface MeaningInputProps {
  meaning: string;
  setMeaning: (value: string) => void;
}

export interface NuanceInputProps {
  nuance: string;
  setNuance: (value: string) => void;
}

export interface WordEditFormProps {
  userId: number;
  wordId: string;
}

export interface WordInputProps {
  wordRef: React.RefObject<HTMLElement>;
  word: string;
  setWord: (value: string) => void;
  highlightColor: string;
  displayColorPicker: boolean;
  handleHighlight: () => void;
  handleReset: () => void;
  handleColorChange: (color: ColorResult) => void;
  setDisplayColorPicker: (value: boolean) => void;
  disabled: boolean;
}

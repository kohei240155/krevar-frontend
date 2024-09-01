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
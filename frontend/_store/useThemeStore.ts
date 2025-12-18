// store/useThemeStore.ts
import { create } from 'zustand';

type ThemeState = {
  colors: string[]; 
  colorBttn: string[];
  selectedColorIndex: number;       // index of color screen   
  selectedBtnColorIndex: number;    // index of color button screen 
  setColor: (index: number, newColor: string) => void;
  setBtnColor: (index: number, newColor: string) => void;
  setSelectedColorIndex: (index: number) => void;       // select color of screen
  setSelectedBtnColorIndex: (index: number) => void;   // select color of button
};

export const useThemeStore = create<ThemeState>((set) => ({
  // array color for screen app
  colors: [
    '#FFFFFF',
    '#BADFDB',
    '#FFC4C4',
    '#8CE4FF',
    '#D7D7D7',
    '#FFCF9D',
    '#E9B3FB',
  ],

  // array color for button of app
  colorBttn: [
    '#6dc8f5ff',
    '#269c90ff',
    '#c51790ff',
    '#0a8fd2ff',
    '#CD2C58',
    '#e58d2eff',
    '#d40dd4ff',
  ],

  // default indices
  selectedColorIndex: 0,
  selectedBtnColorIndex: 0,

  // update screen colors
  setColor: (index, newColor) =>
    set((state) => {
      const updated = [...state.colors];
      updated[index] = newColor;
      return { colors: updated };
    }),

  // update button colors
  setBtnColor: (index, newColor) =>
    set((state) => {
      const updated = [...state.colorBttn];
      updated[index] = newColor;  
      return { colorBttn: updated };
    }),

  // set selected color index for screen
  setSelectedColorIndex: (index) => set({ selectedColorIndex: index }),

  // set selected color index for button
  setSelectedBtnColorIndex: (index) => set({ selectedBtnColorIndex: index }),
}));

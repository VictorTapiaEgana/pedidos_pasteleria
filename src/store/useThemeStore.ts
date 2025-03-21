import { create } from 'zustand';
import { createTheme, Theme } from '@mui/material/styles';

// Tipo para los modos de tema
type ThemeMode = 'light' | 'dark';

// Interfaz para el estado global del tema
interface ThemeStore {
  mode: ThemeMode;
  theme: Theme;
  toggleMode: () => void;
}

// Función que retorna el diseño del tema según el modo
const getDesignTokens = (mode: ThemeMode) => ({
  palette: {
    mode,
    background: {
      default: mode === 'dark' ? '#1e1e1e' : '#ffcbed',
      paper: mode === 'dark' ? '#2c2c2c' : '#ffe3f1',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#2c2c2c',
    },
    primary: {
      main: mode === 'dark' ? '#ff5ca3' : '#a8216c',
    },
    secondary: {
      main: mode === 'dark' ? '#a8216c' : '#ff5ca3',
    }
  }
});

// Creamos el store con Zustand y los tipos definidos
const useThemeStore = create<ThemeStore>((set) => ({
  mode: 'light',
  theme: createTheme(getDesignTokens('light')),

  toggleMode: () =>
    set((state) => {
      const newMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
      return { mode: newMode, theme: createTheme(getDesignTokens(newMode)) };
    }),
}));

export default useThemeStore;

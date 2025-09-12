import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { darkTheme, lightTheme } from '../theme/themes';
import { ThemeProvider } from '@mui/material';

interface ThemeContextType {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

export const CustomThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => { },
});

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const theme = useMemo(() => (mode === "light" ? lightTheme : darkTheme), [mode]);

  return (
    <CustomThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a CustomThemeProvider");
  }
  return context;
};
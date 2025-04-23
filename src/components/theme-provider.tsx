
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = "system", 
  storageKey = "vite-ui-theme",
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

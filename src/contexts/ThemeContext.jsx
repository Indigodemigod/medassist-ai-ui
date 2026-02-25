import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeModeContext = createContext()

export function ThemeModeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('ma:dark') === '1')

  useEffect(() => {
    localStorage.setItem('ma:dark', dark ? '1' : '0')
  }, [dark])

  return <ThemeModeContext.Provider value={{ dark, setDark }}>{children}</ThemeModeContext.Provider>
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext)
  if (!ctx) throw new Error('useThemeMode must be used within ThemeModeProvider')
  return ctx
}

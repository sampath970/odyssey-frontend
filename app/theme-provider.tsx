'use client'
 
import { createContext } from 'react'
 
export const ThemeContext = createContext({})
 
export function ThemeProvider({ children }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>
}
'use client'
 
import { ThemeProvider } from './theme-provider'

// import { AuthProvider } from 'acme-auth'
// Nest other providers inside ThemeProvider
// e.g.      <AuthProvider>{children}</AuthProvider>
 
export function Providers({ children }) {
  return (
    <ThemeProvider>
        {children}
    </ThemeProvider>
  )
}
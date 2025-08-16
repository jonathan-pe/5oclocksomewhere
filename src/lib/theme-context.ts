import { createContext } from 'react'
import type { Theme } from '@/types'

interface ThemeProviderContext {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderContext = {
  theme: 'system',
  setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderContext>(initialState)

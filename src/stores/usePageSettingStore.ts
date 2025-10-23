import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type ThemeMode = 'light' | 'dark'

interface PageSettingState {
  theme: string
  themeMode: ThemeMode
  setTheme: (theme: string) => void
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

export const usePageSettingStore = create<PageSettingState>()(
  persist(
    (set, get) => ({
      theme: '#1677ff',
      themeMode: 'light',
      setTheme: theme => set({ theme }),
      setThemeMode: mode => set({ themeMode: mode }),
      toggleTheme: () => {
        const currentMode = get().themeMode
        set({ themeMode: currentMode === 'light' ? 'dark' : 'light' })
      },
    }),
    {
      name: 'page-setting-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

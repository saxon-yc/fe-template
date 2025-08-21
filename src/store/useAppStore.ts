import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AppState {
  count: number
  user: {
    name: string
    email: string
  } | null
  increment: () => void
  decrement: () => void
  setUser: (user: { name: string; email: string }) => void
  clearUser: () => void
}

export const useAppStore = create<AppState>()(
  devtools(
    set => ({
      count: 0,
      user: null,
      increment: () => set(state => ({ count: state.count + 1 })),
      decrement: () => set(state => ({ count: state.count - 1 })),
      setUser: user => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'app-store',
    }
  )
)

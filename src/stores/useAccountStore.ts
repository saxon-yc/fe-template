import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AppState {
  token: string
  isLogged: boolean
  permissions: string[]
  login: (permissions: string[]) => void
  logout: () => void
  addPermission: (permission: string) => void
}

export const useAccountStore = create<AppState>()(
  persist(
    set => ({
      token: '',
      isLogged: false,
      permissions: [],

      login: (permissions: string[]) =>
        set(() => ({
          isLogged: true,
          permissions,
        })),

      logout: () =>
        set(() => ({
          isLogged: false,
          permissions: [],
        })),

      addPermission: (permission: string) =>
        set(state => ({
          permissions: [...state.permissions, permission],
        })),
    }),
    {
      name: 'account-store',
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

declare namespace GlobalType {
  interface InitialState {
    name: string
    userInfo?: Record<string, any>
    isLogged?: boolean
  }
  type ModalSetedType = 'add' | 'editor'

  interface RouteTabItem {
    key: string
    path: string
    label: string
    keepAlive: boolean
    icon?: string
    closable?: boolean
  }
}

declare namespace GlobalType {
  interface InitialState {
    name: string
    userInfo?: Record<string, any>
    isLogged?: boolean
  }
  type ModalSetedType = 'add' | 'editor'
}

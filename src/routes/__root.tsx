import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

export interface RouterContext {
  isLogged: boolean
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return <Outlet />
  },
})

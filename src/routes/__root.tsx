import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export interface RouterContext {
  isLogged: boolean
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        {/* 开发调试使用 */}
        {import.meta.env.DEV && (
          <div className='fixed bottom-0 right-0'>
            <TanStackRouterDevtools position='bottom-right' />
          </div>
        )}
      </>
    )
  },
})

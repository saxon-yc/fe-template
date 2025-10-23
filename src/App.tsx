import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { Helmet } from 'react-helmet-async'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { useAccountStore } from './stores/useAccountStore'
import { usePageSettingStore } from './stores/usePageSettingStore'
import './App.css'

// Create a new router instance
const router = createRouter({ routeTree, context: { isLogged: false } })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
export default function App() {
  const { isLogged } = useAccountStore()
  const { theme: primaryColor, themeMode } = usePageSettingStore()

  return (
    <>
      <Helmet>
        <title>前端框架模板</title>
        <meta name='author' content='前端框架模板 Team' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='canonical' href={window.location.href} />
        {/* 主题色相关的meta标签 */}
        <meta name='theme-color' content={primaryColor} />
        <meta name='msapplication-TileColor' content={primaryColor} />
      </Helmet>

      <ConfigProvider
        theme={{
          algorithm:
            themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: primaryColor,
          },
        }}
      >
        <AntdApp>
          <RouterProvider router={router} context={{ isLogged }} />
          {/* 开发调试使用 */}
          {import.meta.env.DEV && (
            <div className='fixed bottom-0 right-0'>
              <TanStackRouterDevtools position='bottom-right' router={router} />
            </div>
          )}
        </AntdApp>
      </ConfigProvider>
    </>
  )
}

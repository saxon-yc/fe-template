import { PAGE_TITLE, SIDE_MENUS } from '@/constants/menus'
import { findMenuItem } from '@/utils'
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import Exception from '@/components/exception'
import NotFoundSvg from '@/assets/svg-icon/not-found.svg'

export interface RouterContext {
  isLogged: boolean
}

const getPageTitle = () => {
  const siteTitle = import.meta.env.VITE_APP_TITLE
  const menuItem = findMenuItem(SIDE_MENUS, location.pathname)
  const elsePageTitle = PAGE_TITLE[location.pathname] || ''

  if (elsePageTitle) {
    return `${siteTitle} - ${elsePageTitle}`
  }

  const pageTitle = menuItem?.label
    ? `${siteTitle} - ${menuItem.label}`
    : siteTitle
  return pageTitle
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
  notFoundComponent: () => {
    // 对于根路由的404，重定向到404页面
    throw redirect({ to: '/exception/404' })
  },
  errorComponent: ({ error }) => {
    // 处理根路由的错误
    if (
      error?.message?.includes('404') ||
      error?.message?.includes('Not Found')
    ) {
      throw redirect({ to: '/exception/404' })
    }
    // 其他错误显示通用错误页面
    return <Exception src={NotFoundSvg} />
  },
  head: () => ({
    meta: [
      {
        name: 'description',
        content: import.meta.env.VITE_APP_DESCRIPTION,
      },
      {
        title: getPageTitle(),
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/logo.jpg',
      },
    ],
    styles: [
      {
        media: 'all and (max-width: 500px)',
        children: `p {
                  color: blue;
                  background-color: yellow;
                }`,
      },
    ],
    scripts: [],
  }),
})

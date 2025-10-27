/* 除侧边栏包含的页面，其他页面标题 */
export const PAGE_TITLE: Record<string, string> = {
  '/login': '登录',
  '/register': '注册',
}

export const SIDE_MENUS = [
  {
    key: '/',
    path: '/',
    label: '首页',
    icon: 'mdi:monitor-dashboard',
    keepAlive: false,
  },
  {
    key: '/about',
    path: '/about',
    label: '关于',
    icon: 'mdi:about-circle-outline',
    keepAlive: false,
  },
  {
    key: '/exception',
    path: '/exception',
    label: '异常页',
    icon: 'mdi:file-document-error',
    children: [
      {
        key: '/exception/404',
        path: '/exception/404',
        label: '404',
        icon: 'mdi:square-off-outline',
        keepAlive: false,
      },
      {
        key: '/exception/500',
        path: '/exception/500',
        label: '500',
        icon: 'ic:round-wifi-off',
        keepAlive: false,
      },
    ],
  },
]

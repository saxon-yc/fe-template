import { SIDE_MENUS } from '@/constants/menus'

export const findMenuItem = (
  menus: typeof SIDE_MENUS,
  path: string
): GlobalType.RouteTabItem | undefined => {
  for (const menu of menus) {
    if (menu.path === path) return menu as GlobalType.RouteTabItem
    if (menu.children) {
      const found = findMenuItem(menu.children, path)
      if (found) return found
    }
  }
  return undefined
}

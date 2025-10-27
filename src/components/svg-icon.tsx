import { Icon } from '@iconify/react'
import type { CSSProperties } from 'react'

interface Props {
  readonly className?: string
  /** Iconify icon name */
  readonly icon?: string
  /** Local svg icon name */
  readonly localIcon?: string
  readonly style?: CSSProperties
}

const defaultLocalIcon = 'no-icon'
const symbolId = (localIcon: string = defaultLocalIcon) => {
  const iconName = localIcon || defaultLocalIcon

  return `#icon-local-${iconName}`
}

/**
 * Props
 *
 * - Support iconify and local svg icon
 * - If icon and localIcon are passed at the same time, localIcon will be rendered first
 */
export default function SvgIcon({ icon, localIcon, ...props }: Props) {
  /** If localIcon is passed, render localIcon first */
  return localIcon || !icon ? (
    <svg height='1em' width='1em' {...props} aria-hidden='true'>
      <use fill='currentColor' href={symbolId(localIcon)} />
    </svg>
  ) : (
    <Icon icon={icon} {...props} />
  )
}

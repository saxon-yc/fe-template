import { createFileRoute } from '@tanstack/react-router'

import ServerErrorIcon from '@/assets/svg-icon/service-error.svg'
import Exception from '@/components/exception'

function ServerErrorPage() {
  return <Exception src={ServerErrorIcon} />
}

export const Route = createFileRoute('/_auth/exception/500')({
  component: ServerErrorPage,
})

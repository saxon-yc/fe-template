import { createFileRoute } from '@tanstack/react-router'

import NotFoundIcon from '@/assets/svg-icon/not-found.svg'
import Exception from '@/components/exception'

function NotFoundPage() {
  return <Exception src={NotFoundIcon} />
}

export const Route = createFileRoute('/_auth/exception/404')({
  component: NotFoundPage,
})

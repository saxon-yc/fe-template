import { createFileRoute, redirect } from '@tanstack/react-router'
import { KeepAliveOutlet, KeepAliveProvider } from 'tanstack-router-keepalive'
import AdminLayout from '@/layouts/index'
function AuthLayout() {
  return (
    <AdminLayout>
      <KeepAliveProvider>
        <KeepAliveOutlet />
      </KeepAliveProvider>
    </AdminLayout>
  )
}

export const Route = createFileRoute('/_auth')({
  staticData: { keepAlive: true },
  beforeLoad: async ({ context }) => {
    if (!context.isLogged) {
      throw redirect({ to: '/login' })
    }
  },

  component: AuthLayout,
})

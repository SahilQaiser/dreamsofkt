import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const valid = await verifySession()
  if (!valid) redirect('/admin')
  return <>{children}</>
}

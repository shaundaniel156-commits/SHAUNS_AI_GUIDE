import { CloudOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useConnectivity } from '../../context/ConnectivityContext'
import { useSession } from '../../context/SessionContext'
import { cn } from '../../lib/cn'
import { Drawer } from '../ui/Modal'
import { MobileNav } from './MobileNav'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

/** Application shell: sidebar + top bar + routed content. */
export function AppShell() {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const { role } = useSession()
  const { status, pendingItems } = useConnectivity()
  const portal = role === 'parent' || role === 'student'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-dvh">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:shadow">
        Skip to content
      </a>
      <aside className="no-print fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line lg:block">
        <Sidebar />
      </aside>
      <Drawer open={navOpen} onClose={() => setNavOpen(false)} title="Navigation" side="left" bare>
        <Sidebar onNavigate={() => setNavOpen(false)} />
      </Drawer>
      <div className="lg:pl-64">
        <Topbar onOpenNav={() => setNavOpen(true)} />
        {status === 'offline' && (
          <div role="status" className="no-print flex items-center gap-2 border-b border-line bg-surface-3 px-4 py-2 text-sm text-ink-2 sm:px-6">
            <CloudOff className="size-4 shrink-0" aria-hidden />
            <span>
              You’re offline. Your work is saved on this device and will sync when a connection is available
              {pendingItems > 0 && ` (${pendingItems} changes waiting)`}.
            </span>
          </div>
        )}
        <main id="main" className={cn('mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8', portal && 'pb-24 lg:pb-8')}>
          <Outlet />
        </main>
      </div>
      {portal && <MobileNav />}
    </div>
  )
}

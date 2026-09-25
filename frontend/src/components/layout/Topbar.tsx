import { Menu, Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSession } from '../../context/SessionContext'
import { titleForPath } from '../../routes/navigation'
import { ConnectivityIndicator } from './ConnectivityIndicator'
import { NotificationMenu } from './NotificationMenu'
import { UserMenu } from './UserMenu'

export function Topbar({ onOpenNav }: { onOpenNav: () => void }) {
  const { role } = useSession()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const staff = role === 'teacher' || role === 'admin'

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/students?q=${encodeURIComponent(q)}` : '/students')
  }

  return (
    <header className="no-print sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-surface/95 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onOpenNav}
        className="grid size-9 place-items-center rounded-lg text-ink-2 hover:bg-surface-3 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" aria-hidden />
      </button>
      <p className="min-w-0 truncate text-base font-semibold text-ink">{titleForPath(role, pathname)}</p>
      <span className="hidden whitespace-nowrap rounded-full border border-dashed border-line-strong px-2 py-0.5 text-[11px] font-medium text-ink-3 xl:inline">
        Prototype · demo data
      </span>
      <div className="ml-auto flex items-center gap-2">
        {staff && (
          <form onSubmit={onSearch} role="search" className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" aria-hidden />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search students…"
              aria-label="Search students"
              className="h-9 w-56 rounded-lg border border-line bg-surface-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-3 focus:border-brand-500 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand-500/20 lg:w-64"
            />
          </form>
        )}
        <ConnectivityIndicator compact={!staff} />
        <NotificationMenu />
        <UserMenu />
      </div>
    </header>
  )
}

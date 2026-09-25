import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface StatCardProps {
  label: string
  value: ReactNode
  icon: LucideIcon
  hint?: ReactNode
  delta?: { value: string; direction: 'up' | 'down'; good: boolean }
  to?: string
  tone?: 'brand' | 'bad' | 'warn' | 'accent'
}

const ICON_TONE = {
  brand: 'bg-brand-soft text-brand-ink',
  bad: 'bg-bad-soft text-bad-ink',
  warn: 'bg-warn-soft text-warn-ink',
  accent: 'bg-accent-50 text-accent-700 dark:bg-[#10302a] dark:text-[#7fd9c4]',
}

export function StatCard({ label, value, icon: Icon, hint, delta, to, tone = 'brand' }: StatCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-ink-2">{label}</p>
        <span className={cn('hidden size-9 shrink-0 place-items-center rounded-lg sm:grid', ICON_TONE[tone])}>
          <Icon className="size-[18px]" aria-hidden />
        </span>
      </div>
      <p className="tabular mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{value}</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {delta && (
          <span className={cn('inline-flex items-center gap-0.5 font-medium', delta.good ? 'text-good-ink' : 'text-bad-ink')}>
            {delta.direction === 'up' ? <ArrowUpRight className="size-4" aria-hidden /> : <ArrowDownRight className="size-4" aria-hidden />}
            {delta.value}
          </span>
        )}
        {hint && <span className="text-ink-3">{hint}</span>}
      </div>
    </>
  )
  const base = 'block rounded-xl border border-line bg-surface p-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:p-5'
  return to ? (
    <Link to={to} className={cn(base, 'transition-colors hover:border-brand-300')}>
      {content}
    </Link>
  ) : (
    <div className={base}>{content}</div>
  )
}

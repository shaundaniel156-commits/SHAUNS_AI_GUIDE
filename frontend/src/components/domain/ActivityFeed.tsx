import { ClipboardList, PencilRuler, RefreshCw, Sparkles, Stethoscope } from 'lucide-react'
import type { ActivityItem } from '../../types'

const ICONS = {
  assessment: ClipboardList,
  guidance: Sparkles,
  diagnostic: Stethoscope,
  sync: RefreshCw,
  practice: PencilRuler,
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ol className="px-5 py-4">
      {items.map((item, i) => {
        const Icon = ICONS[item.kind]
        return (
          <li key={item.id} className="relative flex gap-3 pb-5 last:pb-0">
            {i < items.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-line" aria-hidden />}
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface-2 text-ink-3">
              <Icon className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 pt-1">
              <p className="text-sm text-ink">{item.text}</p>
              <p className="mt-0.5 text-xs text-ink-3">{item.time}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

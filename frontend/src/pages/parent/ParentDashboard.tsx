import { Award, Bell, ChevronRight, HeartHandshake, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from '../../components/ui/Avatar'
import { ButtonLink } from '../../components/ui/Button'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { LevelBadge } from '../../components/ui/StatusBadge'
import { useSession } from '../../context/SessionContext'
import { RECENT_ACHIEVEMENTS } from '../../data/practice'
import { formatDate } from '../../lib/format'
import { ChildSwitcher } from './components/ChildSwitcher'
import { getChildSummary } from './components/childSummary'
import { TopicList } from './components/TopicList'
import { useSelectedChild } from './components/useSelectedChild'

export function ParentDashboard() {
  const { user } = useSession()
  const { children, child, setChildId } = useSelectedChild()
  const summary = getChildSummary(child)
  const firstTip = summary.tips[0]

  return (
    <>
      <PageHeader
        title={`Hello, ${user.name}`}
        description="A simple summary of how your child is getting on at school."
        actions={<ChildSwitcher childList={children} value={child.id} onChange={setChildId} />}
      />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardBody className="flex items-center gap-4">
            <Avatar initials={child.initials} size="lg" />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-ink">{child.name}</p>
              <p className="truncate text-sm text-ink-3">{summary.className}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <LevelBadge level={summary.overallLevel} friendly />
                <span className="inline-flex items-center gap-1 text-xs text-ink-2">
                  <TrendingUp className="size-3.5" aria-hidden />
                  {summary.progressWords}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardBody>
            <div className="flex items-start gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-ink">
                <Target className="size-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm text-ink-3">Current Learning Focus</p>
                <p className="text-lg font-semibold text-ink">{summary.focus}</p>
              </div>
            </div>
            {firstTip && (
              <div className="mt-4 rounded-lg bg-surface-2 p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <HeartHandshake className="size-4 text-accent-600" aria-hidden />
                  How you can help
                </p>
                <p className="mt-1 text-sm text-ink-2">{firstTip.tip}</p>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <ButtonLink to="/parent/focus" variant="secondary" size="sm">
                About this focus
              </ButtonLink>
              <ButtonLink to="/parent/home-support" size="sm">
                More ways to help
              </ButtonLink>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader title="Doing well" description="Areas where your child is doing well" icon={<Sparkles className="size-5" aria-hidden />} />
          <CardBody>
            <TopicList topics={summary.strengths} empty="Strengths will appear here as your child completes more classwork." />
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="Needs more practice" description="Areas where your child needs more practice" icon={<Target className="size-5" aria-hidden />} />
          <CardBody>
            <TopicList topics={summary.needsPractice} empty="No areas need extra practice right now." />
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader title="Recent achievements" icon={<Award className="size-5" aria-hidden />} />
          <ul className="divide-y divide-line">
            {RECENT_ACHIEVEMENTS.map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-3 px-5 py-3">
                <span className="text-sm text-ink">{a.title}</span>
                <span className="shrink-0 text-xs text-ink-3">{formatDate(a.date)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Keep up to date" icon={<Bell className="size-5" aria-hidden />} />
          <nav aria-label="Parent quick links" className="divide-y divide-line">
            <QuickLink to="/parent/progress" title="See progress" text="How your child is doing in each subject" />
            <QuickLink to="/notifications" title="Messages from school" text="Updates from your child's teacher" />
            <QuickLink to="/parent/children" title="My children" text="Switch between your children" />
          </nav>
        </Card>
      </div>
    </>
  )
}

function QuickLink({ to, title, text }: { to: string; title: string; text: string }) {
  return (
    <Link to={to} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-surface-2">
      <span className="min-w-0">
        <span className="block text-sm font-medium text-ink">{title}</span>
        <span className="block text-xs text-ink-3">{text}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-ink-3" aria-hidden />
    </Link>
  )
}

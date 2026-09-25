import { Award, CalendarClock, MessageSquareText, Target } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '../../components/ui/Button'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { PRACTICE_ACTIVITIES, RECENT_ACHIEVEMENTS, STUDENT_FEEDBACK } from '../../data/practice'
import { formatShortDate } from '../../lib/format'
import type { PracticeActivity } from '../../types'
import { FeedbackControl } from './components/FeedbackControl'
import { PracticeActivityCard } from './components/PracticeActivityCard'
import { SamplePracticeModal } from './components/SamplePracticeModal'
import { getCurrentStudent, getLearningSequence } from './components/studentData'

export function StudentDashboard() {
  const student = getCurrentStudent()
  const [open, setOpen] = useState<PracticeActivity | null>(null)
  const steps = getLearningSequence(student)
  const done = steps.filter((s) => s.state === 'completed').length
  const current = PRACTICE_ACTIVITIES.find((a) => a.status === 'in_progress')
  const upNext = PRACTICE_ACTIVITIES.filter((a) => a.status === 'not_started').slice(0, 2)
  const lastCompleted = PRACTICE_ACTIVITIES.filter((a) => a.status === 'completed').sort((a, b) => (b.completedOn ?? '').localeCompare(a.completedOn ?? ''))[0]
  const latestMessage = STUDENT_FEEDBACK[0]

  return (
    <>
      <PageHeader title={`Hi, ${student.name}`} description="Here’s what you’re learning right now. Keep going — every bit of practice helps!" />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardBody>
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-ink">
                <Target className="size-5" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-ink-3">Current Focus</p>
                <p className="text-xl font-semibold text-ink">{student.currentFocus}</p>
                {steps.length > 0 && (
                  <>
                    <ProgressBar className="mt-3" value={done} max={steps.length} srLabel="Steps finished in your current focus" />
                    <p className="mt-1.5 text-sm text-ink-2">
                      {done} of {steps.length} steps finished
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <ButtonLink to="/student/learning" size="sm">
                Go to My Learning
              </ButtonLink>
              <ButtonLink to="/student/progress" variant="secondary" size="sm">
                See my progress
              </ButtonLink>
            </div>
          </CardBody>
        </Card>

        {current && (
          <div>
            <h2 className="mb-2 text-sm font-semibold text-ink">Keep going</h2>
            <PracticeActivityCard activity={current} onOpen={setOpen} />
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader
            title="Up next"
            icon={<CalendarClock className="size-5" aria-hidden />}
            action={
              <Link to="/student/practice" className="text-sm font-medium text-brand-ink hover:underline">
                All practice
              </Link>
            }
          />
          <ul className="divide-y divide-line">
            {upNext.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink">{a.title}</span>
                  <span className="block text-xs text-ink-3">{a.focus}</span>
                </span>
                {a.dueLabel && <span className="shrink-0 text-xs text-ink-3">{a.dueLabel}</span>}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Well done!" icon={<Award className="size-5" aria-hidden />} />
          <ul className="divide-y divide-line">
            {RECENT_ACHIEVEMENTS.map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-3 px-5 py-3">
                <span className="text-sm text-ink">{a.title}</span>
                <span className="shrink-0 text-xs text-ink-3">{formatShortDate(a.date)}</span>
              </li>
            ))}
          </ul>
        </Card>

        {lastCompleted && (
          <Card>
            <CardHeader title="How did it go?" description={lastCompleted.title} />
            <CardBody>
              <FeedbackControl activityTitle={lastCompleted.title} initialDifficulty={lastCompleted.feedback} />
            </CardBody>
          </Card>
        )}
      </div>

      {latestMessage && (
        <Card className="mt-4 sm:mt-6">
          <CardHeader
            title="Latest message from your teacher"
            icon={<MessageSquareText className="size-5" aria-hidden />}
            action={
              <Link to="/student/feedback" className="text-sm font-medium text-brand-ink hover:underline">
                All feedback
              </Link>
            }
          />
          <CardBody>
            <p className="text-sm font-medium text-ink">{latestMessage.title}</p>
            <p className="mt-1 text-sm text-ink-2">{latestMessage.message}</p>
            <p className="mt-2 text-xs text-ink-3">
              {latestMessage.from} · {formatShortDate(latestMessage.date)}
            </p>
          </CardBody>
        </Card>
      )}

      <SamplePracticeModal activity={open} onClose={() => setOpen(null)} />
    </>
  )
}

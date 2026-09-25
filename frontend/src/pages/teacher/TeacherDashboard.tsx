import { ClipboardList, GraduationCap, LifeBuoy, Plus, Sparkles, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BarList } from '../../components/charts/BarList'
import { ChartContainer } from '../../components/charts/ChartContainer'
import { LineChart } from '../../components/charts/LineChart'
import { ActivityFeed } from '../../components/domain/ActivityFeed'
import { AssessmentCard } from '../../components/domain/AssessmentCard'
import { GuidanceCard } from '../../components/domain/GuidanceCard'
import { StudentCard } from '../../components/domain/StudentCard'
import { ButtonLink } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { StatCard } from '../../components/ui/StatCard'
import { useSession } from '../../context/SessionContext'
import { TEACHER_ACTIVITY } from '../../data/activity'
import { getClassTrend } from '../../data/performance'
import { DEMO_SCHOOL } from '../../data/school'
import {
  assessmentsInScope,
  classesInScope,
  commonGapsInScope,
  guidanceInScope,
  studentsInScope,
} from '../../data/selectors'
import { ClassOverviewTable } from '../../components/domain/ClassOverviewTable'

const SERIES_COLORS = ['var(--color-series-1)', 'var(--color-series-2)', 'var(--color-series-3)']

export function TeacherDashboard() {
  const { user } = useSession()
  const classes = classesInScope('teacher')
  const students = studentsInScope('teacher')
  const needingSupport = students.filter((s) => s.needsSupport)
  const assessments = assessmentsInScope('teacher')
  const awaitingScores = assessments.filter((a) => a.status === 'awaiting_scores').length
  const pendingGuidance = guidanceInScope('teacher').filter((g) => g.status === 'pending_review')
  const gaps = commonGapsInScope('teacher').slice(0, 5)
  const recentAssessments = [...assessments].filter((a) => a.status !== 'draft').sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4)
  const attention = [...needingSupport].sort((a, b) => a.average - b.average).slice(0, 5)

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user.name}`}
        description={`Here is an overview of your classes for ${DEMO_SCHOOL.currentTerm}, ${DEMO_SCHOOL.academicYear}.`}
        actions={
          <>
            <ButtonLink to="/guidance" variant="secondary" icon={<Sparkles className="size-4" aria-hidden />}>
              Review guidance
            </ButtonLink>
            <ButtonLink to="/assessments/new" icon={<Plus className="size-4" aria-hidden />}>
              New assessment
            </ButtonLink>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard label="Total students" value={students.length} icon={GraduationCap} hint={`Across ${classes.length} classes`} to="/students" />
        <StatCard
          label="Students needing support"
          value={needingSupport.length}
          icon={LifeBuoy}
          tone="bad"
          hint="At least one area requiring support"
          to="/diagnostics"
        />
        <StatCard label="Active classes" value={classes.length} icon={Users} hint="Mathematics" to="/classes" />
        <StatCard
          label="Assessments this term"
          value={assessments.length}
          icon={ClipboardList}
          tone="warn"
          hint={`${awaitingScores} awaiting scores`}
          to="/assessments"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartContainer
          className="xl:col-span-2"
          title="Recent performance"
          description="Class average across recent assessments (%)"
          table={{
            headers: ['Month', ...classes.map((c) => c.name)],
            rows: getClassTrend(classes[0]!.id).map((p, i) => [p.label, ...classes.map((c) => `${getClassTrend(c.id)[i]?.value ?? '—'}%`)]),
          }}
        >
          <LineChart
            ariaLabel="Line chart of class averages over recent months"
            min={40}
            max={80}
            series={classes.map((c, i) => ({ name: c.name, points: getClassTrend(c.id), color: SERIES_COLORS[i % SERIES_COLORS.length]! }))}
          />
        </ChartContainer>

        <Card className="flex flex-col">
          <CardHeader
            title="AI guidance awaiting review"
            description={`${pendingGuidance.length} plans need your decision`}
            action={
              <Link to="/guidance" className="text-sm font-medium text-brand-ink hover:underline">
                View all
              </Link>
            }
          />
          <div className="flex-1 divide-y divide-line px-2 py-1">
            {pendingGuidance.slice(0, 4).map((g) => (
              <GuidanceCard key={g.id} plan={g} showMethod={false} />
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader title="Common learning gaps" description="Students with an area requiring support, all your classes" />
          <div className="p-5">
            <BarList
              valueSuffix=""
              max={students.length}
              items={gaps.map((g) => ({
                id: g.competency,
                label: g.competency,
                meta: g.subject,
                value: g.studentsAffected,
                tone: 'bad',
              }))}
            />
            <p className="mt-4 text-xs text-ink-3">Number of students · demo data</p>
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Students requiring attention"
            description="Lowest recent averages"
            action={
              <Link to="/students?support=1" className="text-sm font-medium text-brand-ink hover:underline">
                View all
              </Link>
            }
          />
          <div className="divide-y divide-line px-2 py-1">
            {attention.map((s) => (
              <StudentCard key={s.id} student={s} />
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader
            title="Recent assessments"
            action={
              <Link to="/assessments" className="text-sm font-medium text-brand-ink hover:underline">
                View all
              </Link>
            }
          />
          <div className="divide-y divide-line px-2 py-1">
            {recentAssessments.map((a) => (
              <AssessmentCard key={a.id} assessment={a} />
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Class performance overview" description="Average across recent assessments and change since last term" />
          <ClassOverviewTable classes={classes} />
        </Card>
        <Card>
          <CardHeader title="Recent activity" />
          <ActivityFeed items={TEACHER_ACTIVITY} />
        </Card>
      </div>
    </>
  )
}

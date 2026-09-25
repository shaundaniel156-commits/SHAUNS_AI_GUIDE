import { BookOpenCheck, Eye, GraduationCap, PencilRuler, School, Sparkles, UserCheck, UserPlus, Users } from 'lucide-react'
import { BarList } from '../../components/charts/BarList'
import { ChartContainer } from '../../components/charts/ChartContainer'
import { ColumnChart } from '../../components/charts/ColumnChart'
import { LineChart } from '../../components/charts/LineChart'
import { ActivityFeed } from '../../components/domain/ActivityFeed'
import { ClassOverviewTable } from '../../components/domain/ClassOverviewTable'
import { ButtonLink } from '../../components/ui/Button'
import { Card, CardHeader } from '../../components/ui/Card'
import { PageHeader } from '../../components/ui/PageHeader'
import { StatCard } from '../../components/ui/StatCard'
import { StatusBadge } from '../../components/ui/StatusBadge'
import { useSession } from '../../context/SessionContext'
import { ADMIN_ACTIVITY } from '../../data/activity'
import { CLASSES } from '../../data/classes'
import { FRAMEWORK_LABEL } from '../../data/curriculum'
import { SCHOOL_TREND, SUBJECT_AVERAGES, USAGE_INDICATORS } from '../../data/performance'
import { DEMO_SCHOOL } from '../../data/school'
import { STUDENTS } from '../../data/students'
import { TEACHERS } from '../../data/teachers'
import { DataQualityCard } from './components/DataQualityCard'
import { FrameworkSummaryCard } from './components/FrameworkSummaryCard'

export function AdminDashboard() {
  const { user } = useSession()
  const activeTeachers = TEACHERS.filter((t) => t.status === 'active').length
  const invitedTeachers = TEACHERS.filter((t) => t.status === 'invited').length
  const cambridgeClasses = CLASSES.filter((c) => c.framework === 'cambridge').length
  const usage = USAGE_INDICATORS

  return (
    <>
      <PageHeader
        title={`Welcome back, ${user.name}`}
        description={`School-wide overview for ${DEMO_SCHOOL.name} · ${DEMO_SCHOOL.currentTerm}, ${DEMO_SCHOOL.academicYear}.`}
        meta={<StatusBadge tone="info">Primary framework: {FRAMEWORK_LABEL[DEMO_SCHOOL.primaryFramework]}</StatusBadge>}
        actions={
          <>
            <ButtonLink to="/admin/structure" variant="secondary" icon={<BookOpenCheck className="size-4" aria-hidden />}>
              Academic structure
            </ButtonLink>
            <ButtonLink to="/admin/users" icon={<UserPlus className="size-4" aria-hidden />}>
              Manage users
            </ButtonLink>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatCard label="Total students" value={STUDENTS.length} icon={GraduationCap} hint={`Across ${CLASSES.length} classes`} to="/students" />
        <StatCard
          label="Teachers"
          value={TEACHERS.length}
          icon={School}
          hint={`${activeTeachers} active · ${invitedTeachers} invited`}
          to="/admin/teachers"
        />
        <StatCard label="Classes" value={CLASSES.length} icon={Users} hint="All levels" to="/classes" />
        <StatCard
          label="Frameworks in use"
          value={new Set(CLASSES.map((c) => c.framework)).size}
          icon={BookOpenCheck}
          tone="accent"
          hint={`${CLASSES.length - cambridgeClasses} National · ${cambridgeClasses} Cambridge`}
          to="/admin/structure"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartContainer
          className="xl:col-span-2"
          title="School performance trend"
          description="School-wide average across terms (%)"
          table={{ headers: ['Term', 'Average'], rows: SCHOOL_TREND.map((p) => [p.label, `${p.value}%`]) }}
        >
          <LineChart
            ariaLabel="Line chart of the school-wide average by term"
            min={40}
            max={80}
            series={[{ name: 'School average', points: SCHOOL_TREND, color: 'var(--color-series-1)' }]}
          />
        </ChartContainer>
        <ChartContainer
          title="Subject averages"
          description="Current term, all classes"
          table={{ headers: ['Subject', 'Average'], rows: SUBJECT_AVERAGES.map((s) => [s.subject, `${s.value}%`]) }}
        >
          <BarList items={SUBJECT_AVERAGES.map((s) => ({ id: s.subject, label: s.subject, value: s.value }))} />
        </ChartContainer>
      </div>

      <section aria-labelledby="usage-heading" className="mt-6">
        <h2 id="usage-heading" className="mb-3 text-[15px] font-semibold text-ink">
          System usage <span className="font-normal text-ink-3">· this week</span>
        </h2>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <StatCard
              label="Active teachers"
              value={`${usage.weeklyActiveTeachers.value}/${usage.weeklyActiveTeachers.total}`}
              icon={UserCheck}
              hint="Signed in this week"
            />
            <StatCard label="Parent views" value={usage.parentViews.value} icon={Eye} hint={`of ${usage.parentViews.total} learners`} />
            <StatCard label="Guidance reviewed" value={usage.guidanceReviewed} icon={Sparkles} tone="accent" hint="By teachers" />
            <StatCard label="Practice completed" value={usage.practiceCompleted} icon={PencilRuler} hint="Student activities" />
          </div>
          <ChartContainer
            className="xl:col-span-2"
            title="Weekly activity"
            description="Platform sessions per school day"
            table={{ headers: ['Day', 'Sessions'], rows: usage.weeklyActivity.map((d) => [d.label, d.value]) }}
          >
            <ColumnChart data={usage.weeklyActivity} ariaLabel="Column chart of sessions per weekday" height={180} />
          </ChartContainer>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FrameworkSummaryCard classes={CLASSES} />
        <DataQualityCard />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader title="Class performance overview" description="Average across recent assessments and change since last term" />
          <ClassOverviewTable classes={CLASSES} showTeacher />
        </Card>
        <Card>
          <CardHeader title="Recent activity" />
          <ActivityFeed items={ADMIN_ACTIVITY} />
        </Card>
      </div>
    </>
  )
}

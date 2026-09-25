import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { useSession } from './context/SessionContext'
import { ROLE_HOME } from './data/users'
import { LoginPage } from './pages/auth/LoginPage'
import { DashboardPage } from './pages/shared/DashboardPage'
import { NotFoundPage } from './pages/shared/NotFoundPage'
import { PagePlaceholder } from './pages/shared/PagePlaceholder'
import { AcademicStructurePage } from './pages/admin/AcademicStructurePage'
import { UsersPage } from './pages/admin/UsersPage'
import { TeachersPage } from './pages/admin/TeachersPage'
import { NotificationsPage } from './pages/shared/NotificationsPage'
import { SettingsPage } from './pages/shared/SettingsPage'
import { ParentDashboard } from './pages/parent/ParentDashboard'
import { ParentChildrenPage } from './pages/parent/ParentChildrenPage'
import { ParentProgressPage } from './pages/parent/ParentProgressPage'
import { ParentFocusPage } from './pages/parent/ParentFocusPage'
import { ParentHomeSupportPage } from './pages/parent/ParentHomeSupportPage'
import { StudentDashboard } from './pages/student/StudentDashboard'
import { StudentLearningPage } from './pages/student/StudentLearningPage'
import { StudentPracticePage } from './pages/student/StudentPracticePage'
import { StudentProgressPage } from './pages/student/StudentProgressPage'
import { StudentFeedbackPage } from './pages/student/StudentFeedbackPage'
import { AssessmentDetailPage } from './pages/staff/AssessmentDetailPage'
import { AssessmentsPage } from './pages/staff/AssessmentsPage'
import { ClassDetailPage } from './pages/staff/ClassDetailPage'
import { ClassesPage } from './pages/staff/ClassesPage'
import { CreateAssessmentPage } from './pages/staff/CreateAssessmentPage'
import { ImportResultsPage } from './pages/staff/ImportResultsPage'
import { StudentProfilePage } from './pages/staff/StudentProfilePage'
import { StudentsPage } from './pages/staff/StudentsPage'

/**
 * Application routes. No authentication guards exist yet (prototype phase);
 * the demo session only decides which role's navigation and dashboards show.
 */
function RootRedirect() {
  const { signedIn, role } = useSession()
  return <Navigate to={signedIn ? ROLE_HOME[role] : '/login'} replace />
}

const PLACEHOLDERS: { path: string; title: string }[] = [
  { path: '/performance', title: 'Performance' },
  { path: '/diagnostics', title: 'Diagnostics' },
  { path: '/diagnostics/:id', title: 'Diagnostic Report' },
  { path: '/guidance', title: 'AI Guidance' },
  { path: '/guidance/:id', title: 'Guidance Review' },
  { path: '/curriculum', title: 'Curriculum' },
  { path: '/reports', title: 'Reports' },
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:id" element={<StudentProfilePage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/classes/:id" element={<ClassDetailPage />} />
        <Route path="/assessments" element={<AssessmentsPage />} />
        <Route path="/assessments/new" element={<CreateAssessmentPage />} />
        <Route path="/assessments/import" element={<ImportResultsPage />} />
        <Route path="/assessments/:id" element={<AssessmentDetailPage />} />
        <Route path="/admin/structure" element={<AcademicStructurePage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route path="/admin/teachers" element={<TeachersPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/children" element={<ParentChildrenPage />} />
        <Route path="/parent/progress" element={<ParentProgressPage />} />
        <Route path="/parent/focus" element={<ParentFocusPage />} />
        <Route path="/parent/home-support" element={<ParentHomeSupportPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/learning" element={<StudentLearningPage />} />
        <Route path="/student/practice" element={<StudentPracticePage />} />
        <Route path="/student/progress" element={<StudentProgressPage />} />
        <Route path="/student/feedback" element={<StudentFeedbackPage />} />
        {PLACEHOLDERS.map((p) => (
          <Route key={p.path} path={p.path} element={<PagePlaceholder title={p.title} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { useSession } from './context/SessionContext'
import { ROLE_HOME } from './data/users'
import { LoginPage } from './pages/auth/LoginPage'
import { DashboardPage } from './pages/shared/DashboardPage'
import { NotFoundPage } from './pages/shared/NotFoundPage'
import { PagePlaceholder } from './pages/shared/PagePlaceholder'

/**
 * Application routes. No authentication guards exist yet (prototype phase);
 * the demo session only decides which role's navigation and dashboards show.
 */
function RootRedirect() {
  const { signedIn, role } = useSession()
  return <Navigate to={signedIn ? ROLE_HOME[role] : '/login'} replace />
}

const PLACEHOLDERS: { path: string; title: string }[] = [
  { path: '/students', title: 'Students' },
  { path: '/students/:id', title: 'Student Profile' },
  { path: '/classes', title: 'Classes' },
  { path: '/classes/:id', title: 'Class Details' },
  { path: '/assessments', title: 'Assessments' },
  { path: '/assessments/new', title: 'Create Assessment' },
  { path: '/assessments/import', title: 'Import Results' },
  { path: '/assessments/:id', title: 'Assessment Details' },
  { path: '/performance', title: 'Performance' },
  { path: '/diagnostics', title: 'Diagnostics' },
  { path: '/diagnostics/:id', title: 'Diagnostic Report' },
  { path: '/guidance', title: 'AI Guidance' },
  { path: '/guidance/:id', title: 'Guidance Review' },
  { path: '/curriculum', title: 'Curriculum' },
  { path: '/reports', title: 'Reports' },
  { path: '/notifications', title: 'Notifications' },
  { path: '/settings', title: 'Settings' },
  { path: '/admin/structure', title: 'Academic Structure' },
  { path: '/admin/users', title: 'Users' },
  { path: '/admin/teachers', title: 'Teachers' },
  { path: '/parent/dashboard', title: 'Parent Dashboard' },
  { path: '/parent/children', title: 'My Children' },
  { path: '/parent/progress', title: 'Progress' },
  { path: '/parent/focus', title: 'Current Learning Focus' },
  { path: '/parent/home-support', title: 'Home Support' },
  { path: '/student/dashboard', title: 'Student Dashboard' },
  { path: '/student/learning', title: 'My Learning' },
  { path: '/student/practice', title: 'Practice' },
  { path: '/student/progress', title: 'Progress' },
  { path: '/student/feedback', title: 'Feedback' },
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        {PLACEHOLDERS.map((p) => (
          <Route key={p.path} path={p.path} element={<PagePlaceholder title={p.title} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

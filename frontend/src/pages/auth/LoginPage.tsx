import { BookOpenCheck, GraduationCap, HeartHandshake, Presentation, School, Stethoscope, WifiOff } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/layout/Logo'
import { Button } from '../../components/ui/Button'
import { TextField } from '../../components/ui/Field'
import { Modal } from '../../components/ui/Modal'
import { useSession } from '../../context/SessionContext'
import { DEMO_USERS, ROLE_HOME, ROLE_LABEL } from '../../data/users'
import { cn } from '../../lib/cn'
import type { Role } from '../../types'

const ROLE_OPTIONS: { role: Role; icon: typeof School; heading: string; blurb: string }[] = [
  { role: 'teacher', icon: Presentation, heading: 'Sign in to your teaching workspace', blurb: 'Review diagnostics, approve guidance and track your classes.' },
  { role: 'admin', icon: School, heading: 'Sign in to school administration', blurb: 'Manage users, classes and curriculum configuration.' },
  { role: 'parent', icon: HeartHandshake, heading: 'Welcome, parent or guardian', blurb: 'See how your child is doing and how you can help at home.' },
  { role: 'student', icon: GraduationCap, heading: 'Hi there! Ready to learn?', blurb: 'Continue your practice and see your progress.' },
]

const HIGHLIGHTS = [
  { icon: Stethoscope, text: 'Competency-level diagnosis from student performance' },
  { icon: BookOpenCheck, text: 'Curriculum-aligned teaching guidance, reviewed by teachers' },
  { icon: WifiOff, text: 'Designed for offline-first, low-bandwidth schools' },
]

export function LoginPage() {
  const { signIn } = useSession()
  const navigate = useNavigate()
  const [role, setRole] = useState<Role>('teacher')
  const [email, setEmail] = useState(DEMO_USERS.teacher.email)
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [forgotOpen, setForgotOpen] = useState(false)
  const current = ROLE_OPTIONS.find((r) => r.role === role)!

  const chooseRole = (r: Role) => {
    setRole(r)
    setEmail(DEMO_USERS[r].email)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Demo only: no credentials are checked. Selecting a role opens that interface.
    signIn(role)
    navigate(ROLE_HOME[role])
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-brand-900 p-10 text-white lg:flex xl:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '22px 22px' }}
          aria-hidden
        />
        <Logo inverted className="relative" />
        <div className="relative max-w-md">
          <p className="text-sm font-medium uppercase tracking-wider text-accent-100/80">AI-Guided Adaptive Education System</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight xl:text-4xl">
            Performance-Driven Curriculum &amp; Teaching Guidance Platform
          </h1>
          <ul className="mt-8 space-y-4">
            {HIGHLIGHTS.map((h) => (
              <li key={h.text} className="flex items-start gap-3 text-[15px] text-white/85">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10">
                  <h.icon className="size-4" aria-hidden />
                </span>
                <span className="pt-1">{h.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-white/60">Uganda National Curriculum · Cambridge International Curriculum</p>
      </aside>

      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Logo className="mb-8 lg:hidden" />
          <h2 className="text-2xl font-semibold tracking-tight text-ink">{current.heading}</h2>
          <p className="mt-1.5 text-sm text-ink-2">{current.blurb}</p>

          <fieldset className="mt-6">
            <legend className="mb-2 text-sm font-medium text-ink">I am a…</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ROLE_OPTIONS.map((o) => {
                const active = o.role === role
                return (
                  <button
                    key={o.role}
                    type="button"
                    onClick={() => chooseRole(o.role)}
                    aria-pressed={active}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-colors',
                      active ? 'border-brand-500 bg-brand-soft text-brand-ink ring-1 ring-brand-500' : 'border-line bg-surface text-ink-2 hover:border-line-strong',
                    )}
                  >
                    <o.icon className="size-5" aria-hidden />
                    {o.role === 'admin' ? 'Administrator' : ROLE_LABEL[o.role]}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <TextField
              label={role === 'student' ? 'Username or email' : 'Email or username'}
              type="text"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-sm text-ink-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded border-line-strong accent-brand-600"
                />
                Remember me
              </label>
              <button type="button" onClick={() => setForgotOpen(true)} className="text-sm font-medium text-brand-ink hover:underline">
                Forgot password?
              </button>
            </div>
            <Button type="submit" size="lg" className="w-full">
              Sign in
            </Button>
          </form>

          <p className="mt-6 rounded-lg border border-dashed border-line-strong bg-surface-2 px-3.5 py-2.5 text-center text-xs text-ink-3">
            Prototype demo — sign-in is not connected. Choose a role and select <span className="font-medium text-ink-2">Sign in</span> to preview that interface.
          </p>
        </div>
      </main>

      <Modal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        title="Reset your password"
        description="Enter the email linked to your account."
        footer={
          <>
            <Button variant="secondary" onClick={() => setForgotOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setForgotOpen(false)}>Send reset link</Button>
          </>
        }
      >
        <TextField label="Email" type="email" defaultValue={email} />
        <p className="mt-3 text-xs text-ink-3">Prototype: password reset will be available once authentication is connected. No email is sent.</p>
      </Modal>
    </div>
  )
}

import { useState } from 'react'
import { useToast } from '../../../context/ToastContext'
import {
  CONFIDENCE_OPTIONS,
  DIFFICULTY_OPTIONS,
  type ConfidenceChoice,
  type DifficultyChoice,
} from '../../../data/practice'
import { cn } from '../../../lib/cn'

interface FeedbackControlProps {
  activityTitle: string
  initialDifficulty?: DifficultyChoice
}

/** Difficulty + confidence self-report. Local state only — not saved in this prototype. */
export function FeedbackControl({ activityTitle, initialDifficulty }: FeedbackControlProps) {
  const { notify } = useToast()
  const [difficulty, setDifficulty] = useState<DifficultyChoice | undefined>(initialDifficulty)
  const [confidence, setConfidence] = useState<ConfidenceChoice | undefined>()

  const thank = () => notify('Thanks! Your teacher will see this.', { description: 'Feedback is not saved in this prototype.' })

  return (
    <div className="space-y-4">
      <ChoiceGroup
        question="How difficult was this activity?"
        context={activityTitle}
        options={DIFFICULTY_OPTIONS}
        value={difficulty}
        onChange={(v) => {
          setDifficulty(v)
          thank()
        }}
      />
      <ChoiceGroup
        question="How confident do you feel?"
        context={activityTitle}
        options={CONFIDENCE_OPTIONS}
        value={confidence}
        onChange={(v) => {
          setConfidence(v)
          thank()
        }}
      />
      <p className="text-xs text-ink-3">Your answers help your teacher plan what comes next. Not saved in this prototype.</p>
    </div>
  )
}

interface ChoiceGroupProps<T extends string> {
  question: string
  context: string
  options: readonly { id: T; label: string }[]
  value: T | undefined
  onChange: (v: T) => void
}

function ChoiceGroup<T extends string>({ question, context, options, value, onChange }: ChoiceGroupProps<T>) {
  return (
    <div role="radiogroup" aria-label={`${question} (${context})`}>
      <p className="text-sm font-medium text-ink">{question}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.id
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.id)}
              className={cn(
                'min-h-10 rounded-full border px-4 text-sm font-medium transition-colors',
                active ? 'border-brand-500 bg-brand-soft text-brand-ink' : 'border-line-strong bg-surface text-ink-2 hover:bg-surface-2 hover:text-ink',
              )}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

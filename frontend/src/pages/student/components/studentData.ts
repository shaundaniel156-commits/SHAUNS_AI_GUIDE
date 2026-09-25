import { getGuidanceForStudent } from '../../../data/guidance'
import { PRACTICE_ACTIVITIES } from '../../../data/practice'
import { getStudent } from '../../../data/students'
import { DEMO_USERS } from '../../../data/users'
import type { PracticeActivity, PracticeStatus, Student } from '../../../types'

/** The demo student account (DEMO_USERS.student). */
export function getCurrentStudent(): Student {
  return getStudent(DEMO_USERS.student.id)!
}

export type StepState = 'completed' | 'current' | 'upcoming'

export interface LearningStep {
  title: string
  state: StepState
  activity?: PracticeActivity
}

/**
 * Guided steps for the student's current focus. Uses the teacher-approved plan
 * when there is one; otherwise the practice activities set for that focus.
 */
export function getLearningSequence(student: Student): LearningStep[] {
  const guidance = getGuidanceForStudent(student.id)
  const titles =
    guidance?.status === 'approved' && guidance.competencyGap === student.currentFocus
      ? guidance.outputs.studentSequence
      : PRACTICE_ACTIVITIES.filter((a) => a.focus === student.currentFocus).map((a) => a.title)

  let currentFound = false
  return titles.map((title) => {
    const activity = PRACTICE_ACTIVITIES.find((a) => a.title === title)
    const status: PracticeStatus = activity?.status ?? 'not_started'
    let state: StepState = 'upcoming'
    if (status === 'completed') state = 'completed'
    else if (!currentFound) {
      state = 'current'
      currentFound = true
    }
    return { title, state, activity }
  })
}

export const PRACTICE_STATUS_LABEL: Record<PracticeStatus, string> = {
  in_progress: 'In Progress',
  not_started: 'Up next',
  completed: 'Completed',
}

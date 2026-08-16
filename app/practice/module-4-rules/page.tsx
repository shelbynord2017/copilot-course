'use client'

import { ChangeEvent, FormEvent, ReactNode, useState } from 'react'

/**
 * MODULE 4: Project Rules (Teaching Copilot Your Style)
 *
 * This page helps you define, test, and refine your Copilot rules.
 * Copilot reads `.github/copilot-instructions.md` and follows your preferred coding patterns automatically.
 *
 * This module is RULES-FOCUSED and uses AGENT MODE tasks (bigger, goal-driven prompts).
 * No "suggestions" training here — you'll direct Copilot to scaffold real components/features that must follow your rules.
 */

type LoginFormValues = {
  email: string
  password: string
}

type LoginFormErrors = {
  email?: string
  password?: string
}

const LoginForm = () => {
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})

  const validate = (): LoginFormErrors => {
    const nextErrors: LoginFormErrors = {}

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!values.password.trim()) {
      nextErrors.password = 'Password is required.'
    } else if (values.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    return nextErrors
  }

  const handleChange = (field: keyof LoginFormValues) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues(current => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      alert('Login submitted')
    }
  }

  return (
    <form
      className="space-y-4 p-4 rounded-lg bg-white shadow-sm"
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-describedby="login-email-error"
        />
        {errors.email && (
          <p id="login-email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          aria-describedby="login-password-error"
        />
        {errors.password && (
          <p id="login-password-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.password}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        Sign in
      </button>
    </form>
  )
}

type NotificationBadgeProps = {
  count: number
  maxCount?: number
}

const NotificationBadge = ({ count, maxCount = 99 }: NotificationBadgeProps) => {
  const displayCount = maxCount != null && count > maxCount ? `${maxCount}+` : String(count)

  return (
    <span
      className="inline-flex items-center rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white"
      role="status"
      aria-label={`Notifications: ${displayCount}`}
    >
      {displayCount}
    </span>
  )
}

type ProgressBarProps = {
  value: number
  label?: string
}

const ProgressBar = ({ value, label }: ProgressBarProps) => {
  const safeValue = Math.min(100, Math.max(0, Math.round(value)))

  return (
    <div>
      {label && <span className="sr-only">{label}: {safeValue}%</span>}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
        aria-label={label ?? `Progress: ${safeValue}%`}
        className="h-3 w-full overflow-hidden rounded bg-gray-200"
      >
        <div
          className="h-full bg-blue-600"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  )
}

type ModalDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const ModalDialog = ({ open, onClose, title, children }: ModalDialogProps) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

const Module4Practice = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">Module 4: Project Rules</h1>
          <p className="text-gray-600">
            Teach Copilot to follow your coding voice and style (Agent Mode)
          </p>
        </header>

        {/* LESSON 4.1 — Create Rules File */}
        <section className="mb-10 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">Lesson 4.1 — Setting Up Your Rules File</h2>
          <p className="mb-4 text-gray-700">
            Your project rules live in <code>.github/copilot-instructions.md</code>. Once created,
            Copilot automatically uses these instructions whenever you write or edit code in this
            repo.
          </p>

          <div className="mb-4 rounded border bg-gray-50 p-4 text-sm text-gray-800">
            <p className="mb-2 font-semibold">Recommended rules:</p>
            <pre className="overflow-x-auto rounded border bg-white p-4 text-sm text-gray-800">
              {`# Copilot Instructions

- Use React functional components with arrow functions.
- Write TypeScript types or interfaces for component props and state.
- Style with Tailwind CSS; avoid inline styles.
- Keep components small, clean, and modular; extract helpers if a function grows large.
- Add concise comments for non-obvious logic.
- Prefer accessibility-first HTML (semantic elements; label interactive controls).
`}
            </pre>
          </div>

          <p className="text-gray-700">
            Save your rules file, then move on to the next section to validate that Copilot follows
            them in Agent Mode.
          </p>
        </section>

        {/* LESSON 4.2 — Test Rules with Agent Mode */}
        <section className="mb-10 border-l-4 border-blue-400 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">
            Lesson 4.2 — Testing Your Rules (Agent Mode)
          </h2>
          <p className="mb-4 text-gray-700">
            Use the practice area below to <strong>direct Copilot (Agent Mode)</strong> to scaffold real
            features. Each task should naturally follow your rules: arrow functions, TypeScript
            types, Tailwind classes, and minimal, purposeful comments.
          </p>

          <div className="rounded border-2 border-blue-400 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-gray-800">Practice Area — Agent Tasks</h3>
            <p className="mb-4 text-sm text-gray-600">
              Add a comment below and run the task with Copilot (Agent Mode):
            </p>

            <ul className="mb-4 space-y-1 text-sm text-gray-700">
              <li>
                • Client-side validation, Tailwind styling, accessible labels.
              </li>
              <li>
                • Build a ProfileCard with avatar image, name, bio, and a "Contact" button. Keep
                layout responsive and concise.
              </li>
              <li>
                • Create a PrimaryButton component (props: children, onClick, type?). Apply standard Tailwind button style.
              </li>
              <li>
                • Implement a simple SearchBar with input, clear button, and debounced onChange
                callback (300ms).
              </li>
            </ul>

            <p className="mb-2 text-sm text-gray-600">Expected (based on your rules):</p>
            <ul className="mb-4 text-sm text-gray-700">
              <li>• Arrow-function components</li>
              <li>• TypeScript props/interfaces</li>
              <li>• Tailwind classes (no inline styles)</li>
              <li>• Small, focused structure + brief comments for non-obvious logic</li>
              <li>• Accessible markup for inputs and controls</li>
            </ul>

            <LoginForm />
          </div>
        </section>

        {/* LESSON 4.3 — Consistency Across Multiple Components */}
        <section className="mb-10 border-l-4 border-green-400 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">
            Lesson 4.3 — Consistency Across Components
          </h2>
          <p className="mb-4 text-gray-700">
            Generate multiple components and verify that Copilot keeps your rules consistent across
            different feature shapes.
          </p>

          <div className="rounded border-2 border-green-400 bg-green-50 p-4">
            <p className="mb-4 text-sm text-gray-700">Agent tasks to try one-by-one:</p>
            <ul className="mb-4 space-y-2 text-sm text-gray-700">
              <li>• Create a NotificationBadge component with a count and maxCount (e.g. "99+")</li>
              <li>• Create a ProgressBar with value (0-100) and label prop</li>
              <li>• Create a ModalDialog (props: open, onClose, title). Include a close button and focus trap note in comments.</li>
              <li>• Create a DataTable shell (columns prop, rows prop). Responsive table layout with Tailwind utilities.</li>
            </ul>

            <p className="text-sm text-gray-700">
              After each generation, check for rule adherence (arrow functions, typed props,
              Tailwind rhythm, minimal comments). If anything drifts, adjust{' '}
              <code>.github/copilot-instructions.md</code> and retry the task.
            </p>
          </div>
        </section>

        {/* LESSON 4.4 — Refining and Expanding Rules */}
        <section className="mb-10 border-l-4 border-purple-400 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">Lesson 4.4 — Refining and Expanding Rules</h2>
          <p className="mb-4 text-gray-700">
            As your project grows, evolve your rules with specific, reusable patterns so Agent Mode
            drafts match your voice without reminders.
          </p>

          <p className="mb-4 text-gray-700">Examples you can add to your rules file:</p>
          <pre className="mb-4 overflow-x-auto rounded border bg-gray-50 p-4 text-sm text-gray-800">
            {`- Primary button style: 'px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60'.
- Form inputs: use label + id + aria-describedby; include error text with role="alert".
- Components over ~25 lines: extract helpers; keep render paths simple and readable.
- Prefer composition over prop drilling; create small utilities/hooks for repeated logic.
`}
          </pre>

          <p className="text-gray-700">
            Keep the file updated as your standards change. Copilot will follow the latest version
            across all Agent Mode tasks.
          </p>
        </section>

        {/* SUMMARY */}
        <section className="mt-10 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Key Takeaways</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Define once, follow everywhere.</strong> Copilot reads your rules
              automatically.
            </li>
            <li>
              <strong>Direct with Agent Mode.</strong> Use bigger tasks to see your rules applied in
              realistic code.
            </li>
            <li>
              <strong>Refine as you go.</strong> When you see drift, clarify the rule and retry.
            </li>
            <li>
              <strong>Keep it modular.</strong> Small components + typed props + Tailwind rhythm =
              consistent output.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Module4Practice
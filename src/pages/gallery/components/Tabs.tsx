import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/gallery', label: 'Overview & Agenda', end: true },
  { to: '/gallery/setup', label: 'Setup & Tools', end: false },
  { to: '/gallery/first-pr', label: 'Your First PR', end: false },
  { to: '/gallery/warm-up', label: 'Warm-up Challenge', end: false },
]

export function Tabs() {
  return (
    <nav className="border-b border-(--color-edge)">
      <ul className="-mb-px flex gap-1 overflow-x-auto">
        {tabs.map((t) => (
          <li key={t.to}>
            <NavLink
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                [
                  'inline-block whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-(--color-accent) text-(--color-accent)'
                    : 'border-transparent text-(--color-ink-soft) hover:text-(--color-ink)',
                ].join(' ')
              }
            >
              {t.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

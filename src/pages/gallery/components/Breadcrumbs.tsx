import { Link } from 'react-router-dom'

export function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-(--color-ink-muted)">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-(--color-ink)">
            Home
          </Link>
        </li>
        <li aria-hidden>›</li>
        <li className="text-(--color-ink)">GM2 ALT Training</li>
      </ol>
    </nav>
  )
}

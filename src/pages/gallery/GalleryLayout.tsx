import { Outlet } from 'react-router-dom'
import { AuthorChip } from './components/AuthorChip'
import { Breadcrumbs } from './components/Breadcrumbs'
import { Cover } from './components/Cover'
import { Tabs } from './components/Tabs'

export default function GalleryLayout() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">
      <Cover />

      <header className="mt-10 flex flex-col gap-5">
        <Breadcrumbs />
        <h1 className="text-4xl font-semibold tracking-tight text-(--color-ink) md:text-5xl">
          GM2 ALT Training Workshop
        </h1>
        <div>
          <AuthorChip name="Juan I. Vilaplana" avatar="/juan.png" />
        </div>
      </header>

      <div className="mt-8">
        <Tabs />
      </div>

      <section className="mt-8 md:mt-10">
        <Outlet />
      </section>
    </main>
  )
}

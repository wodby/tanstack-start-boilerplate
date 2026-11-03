import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'

// Runs on the server only. The browser calls it over HTTP, so process.env and
// other server-side resources stay out of the client bundle.
const getServerInfo = createServerFn({ method: 'GET' }).handler(() => ({
  node: process.version,
  environment: process.env.WODBY_ENV_TYPE || 'local',
  renderedAt: new Date().toISOString(),
}))

export const Route = createFileRoute('/')({
  loader: () => getServerInfo(),
  component: Home,
})

function Home() {
  const initial = Route.useLoaderData()
  const [info, setInfo] = useState(initial)

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight">TanStack Start on Wodby</h1>
      <p className="mt-4 text-lg text-slate-600">
        Edit <code className="rounded bg-slate-200 px-1.5 py-0.5 text-base">src/routes/index.tsx</code> to
        start building.
      </p>

      <dl className="mt-10 grid grid-cols-[max-content_1fr] gap-x-6 gap-y-2 rounded-lg border border-slate-200 bg-white p-6">
        <dt className="text-slate-500">Node.js</dt>
        <dd className="font-mono">{info.node}</dd>
        <dt className="text-slate-500">Environment</dt>
        <dd className="font-mono">{info.environment}</dd>
        <dt className="text-slate-500">Server time</dt>
        <dd className="font-mono">{info.renderedAt}</dd>
      </dl>

      <button
        type="button"
        className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
        onClick={async () => setInfo(await getServerInfo())}
      >
        Call the server function again
      </button>
    </main>
  )
}

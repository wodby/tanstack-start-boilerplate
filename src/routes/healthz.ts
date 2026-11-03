import { createFileRoute } from '@tanstack/react-router'

// Lightweight health endpoint for deployment checks. It touches no external
// services, so it reports whether the server itself answers requests.
export const Route = createFileRoute('/healthz')({
  server: {
    handlers: {
      GET: () =>
        new Response('ok', {
          headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
        }),
    },
  },
})

"use client"

import { useEffect } from "react"
// global-error replaces the ENTIRE root layout when it renders, so it does
// not inherit the styles loaded by app/layout.tsx. Import them explicitly
// or the CSS variables used below (--accent, --foreground, etc.) won't exist.
import "./globals.css"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Report to your error tracking service (Sentry, Datadog, etc.).
    // error.digest is the server-generated id useful for correlating
    // this client report with the corresponding server log entry.
    console.error("[GlobalError]", error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div
          role="alert"
          aria-live="assertive"
          className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 py-12 text-center"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Something went wrong</p>
            <p className="text-xs text-muted-foreground">
              {error.message || "An unexpected error occurred."}
            </p>
            {error.digest && (
              <p className="text-[10px] text-muted-foreground/60">Error ID: {error.digest}</p>
            )}
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground outline-none transition-colors hover:bg-accent/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

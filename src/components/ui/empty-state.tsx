"use client"

import type { ReactNode } from "react"

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 px-6 py-12 text-center ${className}`}
    >
      {icon && (
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border bg-muted text-muted-foreground"
          aria-hidden="true"
        >
          {icon}
        </div>
      )}

      <div className="space-y-2 max-w-sm">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h3>

        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}

"use client"

import { Toaster as Sonner } from "sonner"
import { useTheme } from "@/components/theme-provider"

export function Toaster() {
  const { resolvedTheme } = useTheme()

  return (
    <Sonner
      theme={resolvedTheme ?? "system"}
      position="bottom-right"
      richColors
      closeButton
      expand
      visibleToasts={4}
      toastOptions={{
        duration: 4000,
        classNames: {
          toast: "rounded-xl border shadow-lg",
        },
      }}
    />
  )
}

Toaster.displayName = "Toaster"

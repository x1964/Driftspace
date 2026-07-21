"use client"

import { useMemo, useRef } from "react"
import { useStore } from "@/store"
import { EmptyState } from "@/components/ui/empty-state"
import { ZoomControls } from "./zoom-controls"
import { CanvasWidget } from "./canvas-widget"
import { MarqueeOverlay } from "./marquee-overlay"
import { SnapGuides } from "./snap-guides"
import { FlexBoxDragOverlay } from "@/components/widgets/flexbox-drag-overlay"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useCanvasGestures } from "@/hooks/use-canvas-gestures"
import { LayoutTemplate } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { resolveBackgroundColor } from "@/lib/backgrounds"

export function Canvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  const currentSheetId = useStore((s) => s.currentSheetId)
  const widgetOrder = useStore((s) => s.sheets.find((sh) => sh.id === s.currentSheetId)?.widgetOrder)
  const canvasState = useStore((s) => s.canvasState)
  const canvasBackground = useStore((s) => s.canvasBackground)
  const sheetBackground = useStore((s) => s.sheets.find((sh) => sh.id === s.currentSheetId)?.background)
  const canvasAnimating = useStore((s) => s.canvasAnimating)
  const { resolvedTheme } = useTheme()

  useKeyboardShortcuts()
  const { onPointerDown, onPointerMove, onPointerUp, onPointerCancel } = useCanvasGestures(containerRef)

  const effectiveBackground = useMemo(
    () => ({ ...canvasBackground, ...sheetBackground }),
    [canvasBackground, sheetBackground]
  )

  const spacing = canvasState.gridSize * canvasState.scale
  const showPattern = effectiveBackground.pattern !== "none" && spacing >= 4

  const patternStyle = useMemo(() => {
    if (!showPattern) return undefined
    const base = {
      position: "absolute" as const,
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none" as const,
      backgroundSize: `${spacing}px ${spacing}px`,
      backgroundPosition: `${canvasState.offsetX % spacing}px ${canvasState.offsetY % spacing}px`,
    }
    if (effectiveBackground.pattern === "dots") {
      return {
        ...base,
        backgroundImage: "radial-gradient(circle, hsl(var(--border) / 0.7) 1.25px, transparent 1.25px)",
      } satisfies React.CSSProperties
    }
    return {
      ...base,
      backgroundImage: [
        "linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px)",
        "linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px)",
      ].join(", "),
    } satisfies React.CSSProperties
  }, [showPattern, spacing, canvasState.offsetX, canvasState.offsetY, effectiveBackground.pattern])

  const isDefaultColor = effectiveBackground.color === "default" || !effectiveBackground.color

  return (
    <div
      ref={containerRef}
      className={`h-full overflow-hidden relative select-none ${isDefaultColor ? "bg-background" : ""}`}
      data-container="canvas"
      style={{
        touchAction: "none",
        ...(isDefaultColor
          ? {}
          : { backgroundColor: resolveBackgroundColor(effectiveBackground.color, resolvedTheme === "dark") }),
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      {patternStyle && <div style={patternStyle} />}

      {/* Soft vignette so widgets near the viewport edge don't feel visually cut off */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 120px 20px hsl(var(--background) / 0.35)" }}
      />

      <div
        className="absolute left-0 top-0"
        style={{
          transform: `translate(${canvasState.offsetX}px, ${canvasState.offsetY}px) scale(${canvasState.scale})`,
          transformOrigin: "0 0",
          willChange: "transform",
          transition:
            canvasAnimating && !(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
              ? "transform 200ms var(--ease-in-out)"
              : "none",
        }}
      >
        {widgetOrder?.map((id) => (
          <CanvasWidget key={id} widgetId={id} />
        ))}
        <MarqueeOverlay />
        <SnapGuides />
      </div>

      {widgetOrder?.length === 0 && currentSheetId && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <EmptyState
            icon={<LayoutTemplate className="h-6 w-6" />}
            title="This sheet is empty"
            description="Add a widget to start building"
          />
        </div>
      )}

      {!currentSheetId && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <EmptyState
            icon={<LayoutTemplate className="h-6 w-6" />}
            title="No sheet selected"
            description="Create or pick a sheet from the sidebar to begin"
          />
        </div>
      )}

      <ZoomControls />
      <FlexBoxDragOverlay />
    </div>
  )
}

"use client"

import { memo, useCallback, useEffect, useId, useRef, useState } from "react"
import { useStore } from "@/store"
import { IconButton } from "@/components/ui/icon-button"
import { quantize } from "@/lib/geometry"
import { Plus } from "lucide-react"
import type { WidgetType } from "@/types"
import { WIDGET_DEFS } from "@/components/widgets/widget-registry"

function stopPropagation(e: React.PointerEvent) {
  e.stopPropagation()
}

export const AddWidgetButton = memo(function AddWidgetButton() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()

  const addWidget = useStore((s) => s.addWidget)
  const createList = useStore((s) => s.createList)
  const recordSnapshot = useStore((s) => s.recordSnapshot)
  const currentSheetId = useStore((s) => s.currentSheetId)
  const canvasState = useStore((s) => s.canvasState)
  const gridSize = useStore((s) => s.canvasState.gridSize)

  const widgetDefs = Object.values(WIDGET_DEFS)

  const handleAddWidget = useCallback(
    (type: WidgetType) => {
      if (!currentSheetId) return
      const def = WIDGET_DEFS[type]
      if (!def) return

      const id = crypto.randomUUID()
      const container = document.querySelector<HTMLElement>('[data-container="canvas"]')
      const rect = container?.getBoundingClientRect()
      const cx = (rect?.width ?? window.innerWidth) / 2
      const cy = (rect?.height ?? window.innerHeight) / 2
      const centerX = (cx - canvasState.offsetX) / canvasState.scale
      const centerY = (cy - canvasState.offsetY) / canvasState.scale

      const isTodo = type === "todo"

      // Creating a todo widget also creates its backing list - both must
      // land as a single undo entry, matching every other single-action
      // widget-add. recordSnapshot() + two mutations collapses to one
      // history entry (same two-phase pattern drag/resize use).
      if (isTodo) recordSnapshot()
      const listId = isTodo ? createList(def.defaultTitle) : null

      addWidget(currentSheetId, {
        id,
        type,
        title: def.defaultTitle,
        x: quantize(centerX - def.defaultSize.width / 2, gridSize),
        y: quantize(centerY - def.defaultSize.height / 2, gridSize),
        width: quantize(def.defaultSize.width, gridSize),
        height: quantize(def.defaultSize.height, gridSize),
        zIndex: Date.now(),
        collapsed: false,
        data: listId ? { view: { source: { listId } } } : def.defaultData,
      })

      setOpen(false)
      triggerRef.current?.focus()
    },
    [addWidget, createList, recordSnapshot, currentSheetId, canvasState, gridSize]
  )

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  // Close on Escape, return focus to trigger
  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open])

  // Focus the first menu item when the menu opens
  useEffect(() => {
    if (!open) return
    const firstItem = menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]')
    firstItem?.focus()
  }, [open])

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? []
    )
    if (items.length === 0) return
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement)

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault()
        const next = items[(currentIndex + 1) % items.length]
        next.focus()
        break
      }
      case "ArrowUp": {
        e.preventDefault()
        const prev = items[(currentIndex - 1 + items.length) % items.length]
        prev.focus()
        break
      }
      case "Home": {
        e.preventDefault()
        items[0].focus()
        break
      }
      case "End": {
        e.preventDefault()
        items[items.length - 1].focus()
        break
      }
      default:
        break
    }
  }, [])

  return (
    <div className="relative" onPointerDown={stopPropagation}>
      <IconButton
        ref={triggerRef}
        label="Add widget"
        size="md"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <Plus className="h-4 w-4" />
      </IconButton>

      {open && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label="Add widget"
          className="absolute bottom-full right-0 mb-2 rounded-lg border bg-popover text-popover-foreground shadow-md p-1 min-w-40 menu-enter origin-bottom-right"
          onPointerDown={stopPropagation}
          onKeyDown={handleMenuKeyDown}
        >
          {widgetDefs.map((def) => {
            const Icon = def.icon
            return (
              <button
                key={def.type}
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddWidget(def.type)
                }}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {def.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
})

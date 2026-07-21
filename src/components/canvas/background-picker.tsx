"use client";

import * as Popover from "@radix-ui/react-popover";
import {
  Check,
  Grid3x3,
  Circle,
  Ban,
  Square,
  EyeOff,
  CornerUpLeft,
  Grid,
  Download,
  Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BACKGROUND_PRESETS } from "@/lib/backgrounds";
import type {
  BackgroundPattern,
  CanvasBackground,
  ResizeHandleStyle,
} from "@/types";
import { useTheme } from "@/components/theme-provider";

const PATTERNS: {
  id: BackgroundPattern;
  label: string;
  icon: typeof Grid3x3;
}[] = [
  { id: "grid", label: "Grid", icon: Grid3x3 },
  { id: "dots", label: "Dots", icon: Circle },
  { id: "none", label: "None", icon: Ban },
];

const HANDLE_STYLES: {
  id: ResizeHandleStyle;
  label: string;
  icon: typeof Square;
}[] = [
  { id: "corners", label: "Corners", icon: Square },
  { id: "invisible", label: "Invisible", icon: EyeOff },
  { id: "brackets", label: "Brackets", icon: CornerUpLeft },
];

interface BackgroundPickerProps {
  value: CanvasBackground;
  onChange: (partial: Partial<CanvasBackground>) => void;
  onReset?: () => void;
  resizeHandleStyle?: ResizeHandleStyle;
  onResizeHandleStyleChange?: (style: ResizeHandleStyle) => void;
  snapToGrid?: boolean;
  onSnapToGridToggle?: () => void;
  onExport?: () => void;
  onImport?: () => void;
  trigger: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function BackgroundPicker({
  value,
  onChange,
  onReset,
  resizeHandleStyle,
  onResizeHandleStyleChange,
  snapToGrid,
  onSnapToGridToggle,
  onExport,
  onImport,
  trigger,
  side = "top",
  align = "end",
}: BackgroundPickerProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Popover.Root>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side={side}
          align={align}
          sideOffset={8}
          collisionPadding={12}
          data-background-picker=""
          className="z-9999 w-60 rounded-lg border bg-popover p-3 shadow-xl outline-none
      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=closed]:fade-out-0
      data-[state=open]:fade-in-0
      data-[side=bottom]:slide-in-from-top-1
      data-[side=top]:slide-in-from-bottom-1
      data-[side=left]:slide-in-from-right-1
      data-[side=right]:slide-in-from-left-1"
        >
          <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80 mb-2">
            Color
          </div>
          <div className="flex flex-wrap gap-2">
            {BACKGROUND_PRESETS.map((preset) => {
              const color = isDark ? preset.dark : preset.light;
              const isSelected = value.color === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  aria-label={preset.name}
                  title={preset.name}
                  onClick={() => onChange({ color: preset.id })}
                  className={cn(
                    "relative flex size-7 items-center justify-center rounded-full border transition-all duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-popover",
                    isSelected
                      ? "ring-2 ring-ring ring-offset-1 ring-offset-popover"
                      : "hover:border-foreground/30",
                  )}
                  style={{
                    backgroundColor: color,
                    borderColor: "hsl(var(--border))",
                  }}
                >
                  {isSelected && (
                    <Check
                      className="size-3.5 animate-in zoom-in-50 duration-150"
                      style={{
                        color: isDark ? "white" : "black",
                        mixBlendMode: "difference",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80 mt-3.5 mb-2">
            Pattern
          </div>
          <div className="flex gap-1 rounded-md bg-muted p-0.5">
            {PATTERNS.map((pattern) => {
              const Icon = pattern.icon;
              const isSelected = value.pattern === pattern.id;
              return (
                <button
                  key={pattern.id}
                  type="button"
                  onClick={() => onChange({ pattern: pattern.id })}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-1 rounded-sm py-1 text-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                  )}
                >
                  <Icon className="size-3.5" />
                  {pattern.label}
                </button>
              );
            })}
          </div>

          {resizeHandleStyle && onResizeHandleStyleChange && (
            <>
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80 mt-3.5 mb-2">
                Resize handles
              </div>
              <div className="flex gap-1 rounded-md bg-muted p-0.5">
                {HANDLE_STYLES.map((handle) => {
                  const Icon = handle.icon;
                  const isSelected = resizeHandleStyle === handle.id;
                  return (
                    <button
                      key={handle.id}
                      type="button"
                      onClick={() => onResizeHandleStyleChange(handle.id)}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-1 rounded-sm py-1 text-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isSelected
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                      )}
                    >
                      <Icon className="size-3.5" />
                      {handle.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {onSnapToGridToggle && (
            <>
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80 mt-3.5 mb-2">
                Snap to grid
              </div>
              <div className="flex gap-1 rounded-md bg-muted p-0.5">
                {[
                  { label: "On", value: true },
                  { label: "Off", value: false },
                ].map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => {
                      if (snapToGrid !== option.value) onSnapToGridToggle();
                    }}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-1 rounded-sm py-1 text-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      snapToGrid === option.value
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50",
                    )}
                  >
                    <Grid className="size-3.5" />
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {(onExport || onImport) && (
            <>
              <div className="h-px bg-border my-3" />
              <div className="flex gap-2">
                {onExport && (
                  <button
                    type="button"
                    onClick={onExport}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-input py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                  >
                    <Download className="size-3.5" />
                    Export
                  </button>
                )}
                {onImport && (
                  <button
                    type="button"
                    onClick={onImport}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-input py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                  >
                    <Upload className="size-3.5" />
                    Import
                  </button>
                )}
              </div>
            </>
          )}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="mt-3 w-full rounded-md border border-input py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
            >
              Use default
            </button>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

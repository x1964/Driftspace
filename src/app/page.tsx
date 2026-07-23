"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import {
  StickyNote,
  CheckSquare,
  Timer,
  Clock,
  Calendar,
  Target,
  Link as LinkIcon,
  Type,
  Calculator,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  Layers,
  Palette,
  Undo2,
  Move,
  Pin,
} from "lucide-react"

/**
 * Design direction: a drafting table, not a corkboard.
 * Driftspace is an infinite canvas made of "sheets" — so the visual
 * language borrows from blueprint paper, ruler ticks, and sheet
 * numbering instead of the warm-cream/terracotta "sticky note" look.
 *
 * Ink blue does the talking. A single red pin marks where something
 * is fastened to the page — never decorative, always literal.
 */

const INK = "#232A31" // primary text / lines
const ACCENT = "#3A5A85" // steel ink-blue — links, CTAs, headers
const PIN = "#B5432E" // drafting-pin red — used sparingly, only as pins

const widgets = [
  { icon: StickyNote, label: "Notes", desc: "Free-form rich text" },
  { icon: CheckSquare, label: "Todos", desc: "Track progress with states" },
  { icon: Timer, label: "Timer", desc: "Countdown & stopwatch" },
  { icon: Clock, label: "Stopwatch", desc: "Lap timing" },
  { icon: Calendar, label: "Calendar", desc: "Monthly notes" },
  { icon: Target, label: "Habits", desc: "Streak tracking" },
  { icon: LinkIcon, label: "Quick Links", desc: "Bookmark with favicon" },
  { icon: Type, label: "Labels", desc: "Inline editable text" },
  { icon: Calculator, label: "Counter", desc: "Configurable increments" },
]

const features = [
  {
    icon: LayoutGrid,
    title: "Infinite Canvas",
    desc: "Pan, zoom, and snap. An endless space for your thoughts.",
  },
  {
    icon: Layers,
    title: "Sheets",
    desc: "Multiple named canvases. Organize by project or topic.",
  },
  {
    icon: Palette,
    title: "12 Color Themes",
    desc: "Personalize every widget with a palette of accents.",
  },
  {
    icon: Undo2,
    title: "Undo / Redo",
    desc: "50-step history stack. Mistakes are temporary.",
  },
  {
    icon: Move,
    title: "Drag & Resize",
    desc: "Free-form positioning with 8 resize handles.",
  },
  {
    icon: Sparkles,
    title: "Keyboard Shortcuts",
    desc: "Space to pan, Ctrl+Z to undo, Ctrl+D to duplicate.",
  },
]

const previewCards = [
  { icon: StickyNote, label: "Notes" },
  { icon: CheckSquare, label: "Todos" },
  { icon: Timer, label: "Timer" },
]

/** A ruler strip — ticks are real measurement marks, not ornament. */
function RulerTicks({ count = 40 }: { count?: number }) {
  return (
    <div className="flex items-end h-4 w-full overflow-hidden select-none" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex-1 border-l border-border/60"
          style={{ height: i % 5 === 0 ? "100%" : "45%" }}
        />
      ))}
    </div>
  )
}

/** Sheet-numbered eyebrow — the app's own vocabulary (Sheets), reused as a label. */
function SheetLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      <span
        className="px-1.5 py-0.5 rounded-sm border"
        style={{ borderColor: ACCENT, color: ACCENT }}
      >
        Sheet {n}
      </span>
      <span>{title}</span>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 h-14 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <div
              className="size-7 rounded-sm flex items-center justify-center relative"
              style={{ backgroundColor: INK }}
            >
              <Pin className="size-3.5" style={{ color: PIN }} fill="currentColor" />
            </div>
            <span className="font-serif text-[17px] tracking-tight">Driftspace</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:inline"
            >
              Launch App
            </Link>
            <ThemeToggle />
          </div>
        </div>
        <RulerTicks />
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center relative overflow-hidden">
        {/* Blueprint grid, not scatter-dots — this is a drafting surface */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--foreground) / 0.5) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-8"
            style={{ borderColor: ACCENT }}
          >
            <span className="size-1.5 rounded-full" style={{ backgroundColor: PIN }} />
            Sheet 00 &mdash; v0.2.0
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1]">
            Every sheet of your mind,
            <br />
            drawn to scale
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Notes, todos, timers, habits, and links &mdash; fastened to one
            infinite canvas. Laid out across sheets, styled your way, and
            kept entirely on your machine.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="group inline-flex items-center gap-2 h-11 px-6 rounded-sm text-white text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: ACCENT }}
            >
              Enter Driftspace
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => {
                document.getElementById("widgets")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-sm border border-border text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
            >
              Explore Widgets
            </button>
          </div>

          {/* Pinned preview cards — drafting-pin red marks the fastening point */}
          <div className="mt-16 flex items-center justify-center gap-5 sm:gap-8">
            {previewCards.map((c, i) => (
              <div
                key={c.label}
                className="relative hover:-translate-y-1 transition-transform duration-300 w-24 sm:w-28 aspect-square rounded-sm border border-border bg-card shadow-sm flex flex-col items-center justify-center gap-2"
                style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -2 : 2}deg)` }}
              >
                <span
                  className="absolute -top-1.5 size-2.5 rounded-full border-2 border-background"
                  style={{ backgroundColor: PIN }}
                />
                <c.icon className="size-5" style={{ color: ACCENT }} />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widgets Showcase */}
      <section id="widgets" className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <SheetLabel n="01" title="The board" />
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl tracking-tight">
              9 widgets, endless combinations
            </h2>
            <p className="mt-2 text-muted-foreground">
              Mix and match to build your perfect dashboard.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-border border border-border rounded-sm overflow-hidden">
            {widgets.map((w) => (
              <div
                key={w.label}
                className="relative group hover:bg-accent/40 transition-colors flex flex-col items-center gap-2 p-5 bg-card text-center"
              >
                <span
                  className="absolute top-2 left-2 size-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: PIN }}
                />
                <w.icon className="size-5" style={{ color: ACCENT }} />
                <span className="text-sm font-medium">{w.label}</span>
                <span className="text-xs text-muted-foreground">{w.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <SheetLabel n="02" title="Under the hood" />
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl tracking-tight">
              Built for flow
            </h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need to capture, organize, and track.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden border border-border">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 p-6 bg-background hover:bg-accent/40 transition-colors">
                <div
                  className="size-9 shrink-0 rounded-sm flex items-center justify-center"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <f.icon className="size-4" style={{ color: ACCENT }} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 border-t border-border text-center">
        <div className="max-w-md mx-auto relative">
          <div className="rounded-sm border border-border bg-card shadow-sm p-10">
            <span
              className="absolute left-1/2 -top-2 -translate-x-1/2 size-3 rounded-full border-2 border-background"
              style={{ backgroundColor: PIN }}
            />
            <SheetLabel n="03" title="Get started" />
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl tracking-tight">
              Start mapping your mind
            </h2>
            <p className="mt-3 text-muted-foreground">
              No sign-up. No servers. Just you and your canvas.
            </p>
            <Link
              href="/app"
              className="group mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-sm text-white text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: ACCENT }}
            >
              Get Started
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>Driftspace &mdash; a personal mind organizer</span>
          <span>v0.2.0</span>
        </div>
      </footer>
    </div>
  )
}

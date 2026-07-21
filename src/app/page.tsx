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

const ACCENT = "#C08A4A"

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

const rotations = [
  "-rotate-2",
  "rotate-1",
  "-rotate-1",
  "rotate-2",
  "-rotate-3",
  "rotate-1",
  "-rotate-1",
  "rotate-3",
  "-rotate-2",
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
  { icon: StickyNote, label: "Notes", rotate: "-rotate-6", offset: "translate-y-1" },
  { icon: CheckSquare, label: "Todos", rotate: "rotate-3", offset: "-translate-y-2" },
  { icon: Timer, label: "Timer", rotate: "-rotate-2", offset: "translate-y-2" },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 h-14 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2.5">
            <div
              className="size-7 rounded-md flex items-center justify-center rotate-[-4deg]"
              style={{ backgroundColor: ACCENT }}
            >
              <Pin className="size-3.5 text-background" fill="currentColor" />
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
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.5] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_35%,black,transparent)]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--foreground) / 0.4) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-8">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
            v0.2.0 &mdash; your mind, mapped
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.1]">
            A canvas for everything
            <br />
            on your mind
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Notes, todos, timers, habits, and links &mdash; pinned side by
            side on one infinite canvas. Organized into sheets, styled your
            way, and kept entirely on your machine.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="group inline-flex items-center gap-2 h-11 px-6 rounded-lg text-background text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: ACCENT }}
            >
              Enter Driftspace
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => {
                document.getElementById("widgets")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-flex items-center gap-2 h-11 px-6 rounded-lg border border-border text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
            >
              Explore Widgets
            </button>
          </div>

          {/* Pinned preview cards — a literal glimpse of the canvas */}
          <div className="mt-16 flex items-center justify-center gap-5 sm:gap-8">
            {previewCards.map((c) => (
              <div
                key={c.label}
                className={`relative ${c.rotate} ${c.offset} hover:rotate-0 hover:-translate-y-1 transition-transform duration-300 w-24 sm:w-28 aspect-square rounded-lg border border-border bg-card shadow-sm flex flex-col items-center justify-center gap-2`}
              >
                <span
                  className="absolute -top-1.5 size-2.5 rounded-full border border-background"
                  style={{ backgroundColor: ACCENT }}
                />
                <c.icon className="size-5 text-muted-foreground" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widgets Showcase */}
      <section id="widgets" className="px-6 py-24 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: ACCENT }}>
              The board
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl tracking-tight">
              9 widgets, endless combinations
            </h2>
            <p className="mt-2 text-muted-foreground">
              Mix and match to build your perfect dashboard.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            {widgets.map((w, i) => (
              <div
                key={w.label}
                className={`relative ${rotations[i]} hover:rotate-0 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col items-center gap-2 p-5 rounded-lg border border-border bg-card shadow-sm text-center`}
              >
                <span
                  className="absolute -top-1.5 size-2 rounded-full border border-background"
                  style={{ backgroundColor: ACCENT }}
                />
                <w.icon className="size-5 text-muted-foreground" />
                <span className="text-sm font-medium">{w.label}</span>
                <span className="text-xs text-muted-foreground">{w.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: ACCENT }}>
              Under the hood
            </span>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl tracking-tight">
              Built for flow
            </h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need to capture, organize, and track.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 p-6 bg-background hover:bg-accent/40 transition-colors">
                <div
                  className="size-9 shrink-0 rounded-md flex items-center justify-center"
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
      <section className="px-6 py-24 border-t border-border/50 text-center">
        <div className="max-w-md mx-auto relative">
          <div className="rotate-[-1.5deg] rounded-xl border border-border bg-card shadow-sm p-10">
            <span
              className="absolute left-1/2 -top-2 -translate-x-1/2 size-3 rounded-full border-2 border-background"
              style={{ backgroundColor: ACCENT }}
            />
            <h2 className="font-serif text-2xl sm:text-3xl tracking-tight">
              Start mapping your mind
            </h2>
            <p className="mt-3 text-muted-foreground">
              No sign-up. No servers. Just you and your canvas.
            </p>
            <Link
              href="/app"
              className="group mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-lg text-background text-sm font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: ACCENT }}
            >
              Get Started
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>Driftspace &mdash; a personal mind organizer</span>
          <span>v0.2.0</span>
        </div>
      </footer>
    </div>
  )
}

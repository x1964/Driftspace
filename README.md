<div align="center">

<p align="center">
  <img src="public/logo.png" alt="Driftspace Logo" width="96">
</p>
# Driftspace

**A freestyle canvas dashboard for notes, todos, timers, and habits — all in one infinite, zoomable space.**

[Live Demo](#) · [Documentation](#) · [Report Issue](https://github.com/x1964/Driftspace/issues)

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/github/license/x1964/Driftspace?style=flat-square)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/x1964/Driftspace?style=flat-square)](https://github.com/x1964/Driftspace/stargazers)
[![Forks](https://img.shields.io/github/forks/x1964/Driftspace?style=flat-square)](https://github.com/x1964/Driftspace/network/members)
[![Issues](https://img.shields.io/github/issues/x1964/Driftspace?style=flat-square)](https://github.com/x1964/Driftspace/issues)
[![Last Commit](https://img.shields.io/github/last-commit/x1964/Driftspace?style=flat-square)](https://github.com/x1964/Driftspace/commits/main)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Why Driftspace](#why-driftspace)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

Driftspace is a personal mind organizer built as a freestyle canvas dashboard. It gives you an infinite, zoomable surface where notes, todos, timers, habit trackers, and other widgets can be arranged freely across multiple named sheets. There are no accounts, no servers, and no cloud — everything runs and persists entirely on your device.

## Why Driftspace

Most productivity tools force your thoughts into rigid lists, boards, or documents. Driftspace instead gives you an open canvas — closer to a whiteboard than a spreadsheet — where structure emerges from how you place things, not from a predefined template.

- **Spatial, not linear.** Arrange information the way your mind actually works, not top-to-bottom.
- **Local-first by design.** No accounts, no servers, no network dependency — your data stays on your machine.
- **Composable widgets.** Mix notes, todos, timers, and trackers freely on the same canvas.
- **Zero setup.** Clone, install, and run — there is no backend to configure.

## Screenshots

## Dashboard

![Dashboard](./docs/dashboard.png)

## Canvas

![Canvas](./docs/canvas.png)

## Widgets

![Widgets](./docs/widgets.png)

## Features

### Infinite Workspace
- Infinite canvas with pan, zoom, and snap-to-grid
- Navigate via drag, scroll wheel, or Space+drag
- Multiple named sheets organized in a tab bar — add, rename, duplicate, reorder, and delete

### Widgets
- **Note** — rich text notes
- **Label** — editable freeform text
- **Todo List** — todo / in-progress / done workflow
- **Counter** — configurable step increments
- **Timer** — countdown timer
- **Stopwatch** — with lap recording
- **Calendar** — monthly view with per-day notes
- **Habit Tracker** — emoji-labeled, monthly grid with streak tracking
- **Quick Link** — bookmark with favicon

### Interaction
- Drag, resize, and collapse every widget via 8 resize handles
- Multi-select with Shift+click for batch operations
- Copy and paste widgets across sheets and canvases
- Undo / redo with a 50-step history stack

### Appearance
- 12 accent color themes per widget
- Light, dark, and system theme modes

### Persistence
- All data saved to `localStorage`
- Debounced writes with flush on tab close

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| State Management | [Zustand](https://github.com/pmndrs/zustand) (with persist middleware) |
| UI Primitives | [Radix UI](https://www.radix-ui.com/) |
| Icons | [Lucide](https://lucide.dev/) |
| Emoji Picker | [Frimousse](https://github.com/penx/frimousse) |
| Storage | Browser `localStorage` |
| Deployment | Static / client-side hosting (e.g. Vercel) |

## Architecture

Driftspace is a fully client-side single-page application. There is no backend, no database, and no API routes. All application state is managed by a Zustand store persisted to `localStorage`.

```
page.tsx
├── SheetSidebar (tab bar for sheet management)
└── Canvas (infinite pan/zoom canvas)
    ├── ZoomControls (zoom, theme, add widget)
    └── Widgets (for active sheet)
        └── BaseWidget (drag, resize, select, context menu, color)
            ├── SelectionOutline (resize handles)
            ├── WidgetToolbar (title, collapse, menu)
            └── WidgetComponent (NoteWidget | TodoWidget | ...)
```

**Data flow**

```
User Interaction → Component Event Handler → Zustand Store Action
        → State Update → Debounced Persist → localStorage
```

## Installation

```bash
git clone https://github.com/x1964/Driftspace.git
cd Driftspace
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

```bash
npm run build
npm run start
```

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
driftspace/
├── app/
│   └── page.tsx              # Application entry point
├── components/
│   ├── canvas/
│   │   ├── Canvas.tsx         # Infinite pan/zoom canvas
│   │   └── ZoomControls.tsx   # Zoom, theme, add-widget controls
│   ├── sidebar/
│   │   └── SheetSidebar.tsx   # Sheet tab bar
│   └── widgets/
│       ├── BaseWidget.tsx     # Drag, resize, select, context menu, color
│       ├── SelectionOutline.tsx
│       ├── WidgetToolbar.tsx
│       ├── NoteWidget.tsx
│       ├── LabelWidget.tsx
│       ├── TodoWidget.tsx
│       ├── CounterWidget.tsx
│       ├── TimerWidget.tsx
│       ├── StopwatchWidget.tsx
│       ├── CalendarWidget.tsx
│       ├── HabitTrackerWidget.tsx
│       └── QuickLinkWidget.tsx
├── store/
│   └── useDriftspaceStore.ts  # Zustand store (state + persist)
├── docs/
│   ├── logo.png
│   ├── dashboard.png
│   ├── canvas.png
│   └── widgets.png
├── public/
├── package.json
└── README.md
```

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| Scroll wheel | Zoom in / out |
| Drag | Pan the canvas |
| Space + Drag | Pan the canvas (alternative) |
| Shift + Click | Multi-select widgets |
| Ctrl / Cmd + C | Copy selected widget(s) |
| Ctrl / Cmd + V | Paste widget(s) |
| Ctrl / Cmd + Z | Undo |
| Ctrl / Cmd + Shift + Z | Redo |

## Roadmap

- [x] Infinite canvas with pan, zoom, and snap-to-grid
- [x] Multi-sheet workspace management
- [x] Core widget library (Note, Label, Todo, Counter, Timer, Stopwatch, Calendar, Habit Tracker, Quick Link)
- [x] Multi-select and batch operations
- [x] Undo / redo history
- [x] Light, dark, and system themes
- [ ] Import / export sheets as JSON
- [ ] Keyboard-driven widget creation
- [ ] Additional widget types
- [ ] Optional end-to-end encrypted sync
- [ ] Mobile-optimized canvas interactions

## Contributing

Contributions are welcome. To propose a change:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and ensure `npm run lint` passes.
4. Commit using clear, descriptive messages.
5. Push to your fork and open a pull request against `main`.

Please open an issue first to discuss significant changes before submitting a pull request.

## License

Distributed under the [MIT License](./LICENSE).

## Author

<div align="center">

**Made with ❤️ by Kareem Ibrahem**

[GitHub](https://github.com/x1964)

</div>

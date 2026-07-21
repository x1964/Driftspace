import { SheetSidebar } from "@/components/sheets/sheet-sidebar";
import { Canvas } from "@/components/canvas";


export default function Home() {
  return (
    <div className="flex flex-col h-dvh bg-background overflow-hidden">
      {/* Canvas area */}
      <div className="flex-1 relative min-h-0 animate-in fade-in duration-300">
        <Canvas />
      </div>

      {/* Sidebar with subtle top divider for visual separation */}
      <div className="shrink-0 border-t border-border/60 shadow-[0_-1px_6px_rgba(0,0,0,0.04)]">
        <SheetSidebar />
      </div>
    </div>
  )
}

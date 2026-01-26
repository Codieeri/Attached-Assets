import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Calendar, 
  BarChart2, 
  Image as ImageIcon, 
  BookOpen, 
  User,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Doubt Solver", icon: MessageSquare, path: "/doubt-solver" },
    { label: "Timetable", icon: Calendar, path: "/timetable" },
    { label: "Progress", icon: BarChart2, path: "/progress" },
    { label: "Diagrams", icon: ImageIcon, path: "/diagram-generator" },
    { label: "Notes", icon: BookOpen, path: "/notes" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col glass-panel z-20 h-screen sticky top-0 border-r border-white/5">
        <div className="p-6 flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          <h1 className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Study Buddy AI
          </h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer",
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_-5px_var(--color-primary)]" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive && "animate-pulse")} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_var(--color-primary)]" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="glass-card p-4 rounded-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Plan</h3>
              <p className="font-display font-bold text-lg mb-2">Pro Student</p>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-gradient-to-r from-primary to-secondary w-[75%] h-full" />
              </div>
              <p className="text-xs text-muted-foreground">75% tokens used</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 glass z-50 flex items-center justify-between px-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-display font-bold text-lg">Study Buddy AI</span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-6">
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div 
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border border-white/5",
                    location === item.path ? "bg-primary/10 text-primary border-primary/20" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-lg font-medium">{item.label}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative z-10 pt-16 md:pt-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}

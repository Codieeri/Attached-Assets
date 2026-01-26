import Layout from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar, BarChart2, Image as ImageIcon, Sparkles, BookOpen, Clock, Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Dashboard() {
  const features = [
    { 
      title: "Ask a Doubt", 
      icon: MessageSquare, 
      color: "text-primary", 
      bg: "bg-primary/10",
      desc: "Get instant AI explanations",
      link: "/doubt-solver"
    },
    { 
      title: "Generate Timetable", 
      icon: Calendar, 
      color: "text-secondary", 
      bg: "bg-secondary/10",
      desc: "Optimize your study schedule",
      link: "/timetable"
    },
    { 
      title: "Progress Graphs", 
      icon: BarChart2, 
      color: "text-green-400", 
      bg: "bg-green-400/10",
      desc: "Track your learning curve",
      link: "/progress"
    },
    { 
      title: "AI Diagrams", 
      icon: ImageIcon, 
      color: "text-pink-400", 
      bg: "bg-pink-400/10",
      desc: "Visualize complex concepts",
      link: "/diagram-generator"
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Hi, Alex! 👋</h1>
            <p className="text-muted-foreground mt-1">Ready to crush your goals today?</p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-lg border border-orange-500/20 text-orange-400 font-bold">
              <Flame size={18} className="fill-orange-400/20" />
              <span>12 Day Streak</span>
            </div>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="px-3 text-sm text-muted-foreground">
              Level 5 Scholar
            </div>
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, idx) => (
            <Link key={idx} href={feature.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group h-full flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{feature.desc}</p>
                <div className="flex items-center text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                  <span>Open</span>
                  <ArrowRight size={12} className="ml-1" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Main Dashboard Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Plan */}
          <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5">
              <Calendar size={120} />
            </div>
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Clock className="text-primary" size={20} />
                Today's Plan
              </h2>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">View Full Schedule</Button>
            </div>

            <div className="space-y-3 relative z-10">
              {[
                { time: "09:00 AM", subject: "Physics - Quantum Mechanics", type: "Lecture", status: "Done" },
                { time: "11:30 AM", subject: "Mathematics - Calculus II", type: "Practice", status: "In Progress" },
                { time: "02:00 PM", subject: "Chemistry - Organic Compounds", type: "Revision", status: "Upcoming" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-xs font-mono text-muted-foreground w-16">{item.time}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.subject}</h4>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-md font-medium border ${
                    item.status === "Done" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                    item.status === "In Progress" ? "bg-primary/10 text-primary border-primary/20 animate-pulse" :
                    "bg-white/5 text-muted-foreground border-white/10"
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insight / Flashcards */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="text-secondary" size={20} />
                AI Insight
              </h2>
            </div>
            
            <div className="flex-1 flex flex-col justify-center text-center p-4 bg-black/20 rounded-xl border border-white/5 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Based on your recent tests</p>
              <p className="font-display font-bold text-lg leading-tight text-white mb-4">
                "You're struggling with <span className="text-secondary">Thermodynamics</span>. Review the laws of entropy."
              </p>
              <Button size="sm" className="w-full bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/50">
                Start Review Session
              </Button>
            </div>

            <div className="mt-auto">
               <h3 className="text-sm font-medium mb-3 flex items-center gap-2 text-muted-foreground">
                 <BookOpen size={14} /> Continue Reading
               </h3>
               <div className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer transition-colors flex gap-3 items-center">
                 <div className="w-10 h-10 rounded-md bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs">PHY</div>
                 <div className="overflow-hidden">
                   <p className="text-sm font-bold truncate">Chapter 4: Rotational Motion</p>
                   <div className="w-full bg-white/10 h-1 mt-1.5 rounded-full">
                     <div className="bg-blue-500 w-[65%] h-full rounded-full" />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

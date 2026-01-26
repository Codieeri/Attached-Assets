import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, RotateCcw, Download, Calendar as CalendarIcon, MoreHorizontal } from "lucide-react";

export default function Timetable() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  // Mock data for schedule
  const schedule = [
    { day: "Mon", time: "09:00", subject: "Math", color: "bg-blue-500/20 border-blue-500/50 text-blue-300", duration: 2 },
    { day: "Mon", time: "14:00", subject: "Physics", color: "bg-purple-500/20 border-purple-500/50 text-purple-300", duration: 1 },
    { day: "Tue", time: "10:00", subject: "Chemistry", color: "bg-green-500/20 border-green-500/50 text-green-300", duration: 2 },
    { day: "Wed", time: "09:00", subject: "Biology", color: "bg-pink-500/20 border-pink-500/50 text-pink-300", duration: 1 },
    { day: "Thu", time: "11:00", subject: "History", color: "bg-orange-500/20 border-orange-500/50 text-orange-300", duration: 1 },
    { day: "Fri", time: "15:00", subject: "CS", color: "bg-cyan-500/20 border-cyan-500/50 text-cyan-300", duration: 2 },
  ];

  const getEvent = (day: string, time: string) => {
    return schedule.find(s => s.day === day && s.time === time);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Smart Timetable</h1>
            <p className="text-muted-foreground mt-1">AI-optimized schedule for your upcoming exams.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              <RotateCcw className="w-4 h-4 mr-2" /> Regenerate
            </Button>
            <Button className="bg-primary text-black hover:bg-primary/90 shadow-[0_0_15px_-5px_var(--color-primary)]">
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-8 gap-4 mb-4 border-b border-white/5 pb-4">
              <div className="text-center font-medium text-muted-foreground pt-2">Time</div>
              {days.map(day => (
                <div key={day} className="text-center font-bold text-lg">{day}</div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="space-y-4">
              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-8 gap-4 min-h-[80px]">
                  <div className="text-center text-xs text-muted-foreground font-mono pt-2 -mt-2.5">
                    {time}
                  </div>
                  {days.map(day => {
                    const event = getEvent(day, time);
                    return (
                      <div key={`${day}-${time}`} className="relative group">
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />
                        
                        {event && (
                          <div 
                            className={`absolute inset-x-0 top-0 p-3 m-1 rounded-xl border backdrop-blur-md cursor-pointer transition-transform hover:scale-[1.02] hover:z-10 ${event.color}`}
                            style={{ height: `calc(${event.duration * 100}% + ${event.duration * 16}px - 8px)` }}
                          >
                            <div className="font-bold text-sm">{event.subject}</div>
                            <div className="text-xs opacity-70 mt-1">{event.duration} hrs</div>
                          </div>
                        )}
                        
                        {/* Hover add button for empty slots */}
                        {!event && (
                          <div className="absolute inset-0 m-1 rounded-xl border border-dashed border-white/5 hover:border-white/20 hover:bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                            <Plus className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

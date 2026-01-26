import Layout from "@/components/layout";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line } from "recharts";
import { TrendingUp, Award, Target, Clock } from "lucide-react";

export default function Progress() {
  const weeklyData = [
    { name: "Mon", hours: 4 },
    { name: "Tue", hours: 6 },
    { name: "Wed", hours: 3 },
    { name: "Thu", hours: 8 },
    { name: "Fri", hours: 5 },
    { name: "Sat", hours: 9 },
    { name: "Sun", hours: 2 },
  ];

  const subjectData = [
    { name: "Physics", value: 35, color: "#38bdf8" }, // Sky 400
    { name: "Math", value: 25, color: "#a855f7" },    // Purple 500
    { name: "Chem", value: 20, color: "#f472b6" },    // Pink 400
    { name: "Bio", value: 20, color: "#34d399" },     // Emerald 400
  ];

  const accuracyData = [
    { name: "Week 1", score: 65 },
    { name: "Week 2", score: 72 },
    { name: "Week 3", score: 68 },
    { name: "Week 4", score: 85 },
    { name: "Week 5", score: 92 },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-display font-bold">Your Progress</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Study Hours", value: "42h", icon: Clock, color: "text-blue-400" },
            { label: "Questions Solved", value: "1,240", icon: Target, color: "text-purple-400" },
            { label: "Current Streak", value: "12 Days", icon: TrendingUp, color: "text-green-400" },
            { label: "Achievements", value: "8", icon: Award, color: "text-yellow-400" },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
              <div className={`p-3 rounded-full bg-white/5 mb-2 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Hours Bar Chart */}
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <h3 className="font-bold mb-6">Weekly Study Activity</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#52525b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  />
                  <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                    {weeklyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.hours > 7 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Distribution Pie Chart */}
          <div className="glass-card p-6 rounded-2xl border border-white/5">
            <h3 className="font-bold mb-6">Subject Focus</h3>
            <div className="h-[300px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {subjectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-2xl font-bold">Total</div>
                  <div className="text-xs text-muted-foreground">100%</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              {subjectData.map((subject, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }} />
                  {subject.name}
                </div>
              ))}
            </div>
          </div>

          {/* Accuracy Line Chart */}
          <div className="glass-card p-6 rounded-2xl border border-white/5 lg:col-span-2">
            <h3 className="font-bold mb-6">Performance Trend</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={accuracyData}>
                  <XAxis 
                    dataKey="name" 
                    stroke="#52525b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 8, fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

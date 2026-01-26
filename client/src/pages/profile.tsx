import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Moon, LogOut, Zap } from "lucide-react";

export default function Profile() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8 pb-10">
        <h1 className="text-3xl font-display font-bold">Settings</h1>

        {/* Profile Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 flex items-center gap-6">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-primary">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-black rounded-full" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Alex Doe</h2>
            <p className="text-muted-foreground">alex.doe@university.edu</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-md font-medium border border-primary/20">Pro Plan</span>
              <span className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded-md font-medium border border-white/10">Student</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">Edit</Button>
        </div>

        {/* AI Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Zap size={18} className="text-secondary" /> AI Persona
          </h3>
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Strict Mode</Label>
                <p className="text-sm text-muted-foreground">AI will be more direct and less conversational</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exam Focus</Label>
                <p className="text-sm text-muted-foreground">Prioritize key terms and exam-likely questions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bell size={18} className="text-primary" /> Notifications
          </h3>
          <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Study Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified for scheduled sessions</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Summary</Label>
                <p className="text-sm text-muted-foreground">Receive a progress report every evening</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="space-y-4 pt-4">
          <Button variant="outline" className="w-full justify-start text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-300 h-12">
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
          <div className="text-center text-xs text-muted-foreground">
            Study Buddy AI v1.0.2
          </div>
        </div>
      </div>
    </Layout>
  );
}

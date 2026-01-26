import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Splash from "@/pages/splash";
import Onboarding from "@/pages/onboarding";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import DoubtSolver from "@/pages/doubt-solver";
import Timetable from "@/pages/timetable";
import Progress from "@/pages/progress";
import DiagramGenerator from "@/pages/diagram-generator";
import Notes from "@/pages/notes";
import Profile from "@/pages/profile";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/auth" component={Auth} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/doubt-solver" component={DoubtSolver} />
      <Route path="/timetable" component={Timetable} />
      <Route path="/progress" component={Progress} />
      <Route path="/diagram-generator" component={DiagramGenerator} />
      <Route path="/notes" component={Notes} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

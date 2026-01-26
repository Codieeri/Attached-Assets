import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Brain, CalendarDays, BarChart3, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Solve Doubts Instantly",
    description: "Ask anything and get step-by-step answers like a pro tutor.",
    icon: Brain,
    color: "text-primary",
    glow: "shadow-[0_0_30px_-5px_var(--color-primary)]"
  },
  {
    title: "Auto Timetable Generator",
    description: "Get a smart study plan based on your subjects and free time.",
    icon: CalendarDays,
    color: "text-secondary",
    glow: "shadow-[0_0_30px_-5px_var(--color-secondary)]"
  },
  {
    title: "Track Progress with Graphs",
    description: "See your weekly study progress, accuracy and performance.",
    icon: BarChart3,
    color: "text-pink-500",
    glow: "shadow-[0_0_30px_-5px_pink]"
  },
  {
    title: "Generate Diagrams & Images",
    description: "Create mindmaps, flowcharts and labelled diagrams using AI.",
    icon: Sparkles,
    color: "text-cyan-400",
    glow: "shadow-[0_0_30px_-5px_var(--color-neon-cyan)]"
  }
];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
    } else {
      setLocation("/auth");
    }
  };

  return (
    <div className="h-screen w-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[100px] rounded-full" />

      <div className="w-full max-w-md z-10 flex flex-col items-center h-[80vh]">
        <div className="flex-1 flex flex-col items-center justify-center w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col items-center text-center w-full"
            >
              <div className={`w-64 h-64 mb-12 rounded-3xl glass-card flex items-center justify-center relative ${steps[currentStep].glow}`}>
                {/* Simulated Holographic Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                <steps[currentStep].icon className={`w-32 h-32 ${steps[currentStep].color}`} strokeWidth={1} />
              </div>

              <h2 className="text-3xl font-display font-bold mb-4 leading-tight">
                {steps[currentStep].title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed px-4">
                {steps[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="w-full mt-auto">
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep ? "w-8 bg-primary shadow-[0_0_8px_var(--color-primary)]" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>

          <Button 
            className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-cyan-400 text-black hover:opacity-90 shadow-[0_0_20px_-5px_var(--color-primary)] transition-all transform hover:scale-[1.02]"
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            {currentStep !== steps.length - 1 && <ChevronRight className="ml-2 w-5 h-5" />}
          </Button>

          {currentStep !== steps.length - 1 && (
            <button 
              onClick={() => setLocation("/auth")}
              className="w-full mt-4 text-sm text-muted-foreground hover:text-white transition-colors"
            >
              Skip Intro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

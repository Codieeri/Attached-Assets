import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Github, Chrome, ArrowRight } from "lucide-react";

export default function Auth() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login/signup logic
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative p-4">
      {/* Background Graphic */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-primary/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-secondary/5 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/background-abstract.png')] bg-cover opacity-10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-secondary" />

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4 shadow-inner">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            </div>
            <h1 className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin ? "Enter your details to access your study space." : "Start your AI-powered learning journey today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white/80">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-11" 
                  required
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="student@university.edu" 
                className="bg-white/5 border-white/10 focus:border-primary/50 text-white h-11" 
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  className="bg-white/5 border-white/10 focus:border-primary/50 text-white pr-10 h-11" 
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-black" />
                  <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 shadow-[0_0_20px_-5px_var(--color-primary)] rounded-xl mt-2 group">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background/50 px-2 text-muted-foreground backdrop-blur-sm">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-colors">
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="h-11 bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-colors">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          <div className="mt-8 text-center text-sm">
            <p className="text-muted-foreground">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="font-bold text-white hover:underline underline-offset-4"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

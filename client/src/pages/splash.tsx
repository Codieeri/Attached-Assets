import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('/background-abstract.png')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-32 h-32 md:w-48 md:h-48 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" 
          />
        </div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 font-display font-bold text-4xl md:text-6xl text-center bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent"
        >
          Study Buddy AI
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-4 text-muted-foreground text-lg md:text-xl font-light tracking-wide"
        >
          Your AI Study Partner
        </motion.p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 z-10"
      >
        <div className="w-12 h-12 border-t-2 border-r-2 border-primary rounded-full animate-spin" />
      </motion.div>
    </div>
  );
}

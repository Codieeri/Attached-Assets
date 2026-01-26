import Layout from "@/components/layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Plus, MoreVertical, Search, Zap, RotateCw } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Notes() {
  const [activeTab, setActiveTab] = useState<'notes' | 'flashcards'>('notes');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mock Flashcards
  const flashcards = [
    { question: "What is the powerhouse of the cell?", answer: "Mitochondria" },
    { question: "What is Newton's Second Law?", answer: "F = ma (Force equals mass times acceleration)" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "William Shakespeare" },
    { question: "What is the capital of France?", answer: "Paris" },
  ];

  const handleNextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  const folders = [
    { name: "Physics", count: 12, color: "bg-blue-500" },
    { name: "Chemistry", count: 8, color: "bg-purple-500" },
    { name: "History", count: 5, color: "bg-orange-500" },
    { name: "Math", count: 24, color: "bg-red-500" },
  ];

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-display font-bold">Library</h1>
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/5">
            <button 
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'notes' ? 'bg-primary/20 text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Notes
            </button>
            <button 
              onClick={() => setActiveTab('flashcards')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'flashcards' ? 'bg-primary/20 text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Flashcards
            </button>
          </div>
        </div>

        {activeTab === 'notes' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {folders.map((folder, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6 rounded-2xl border border-white/5 hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${folder.color}`} />
                <div className="flex justify-between items-start mb-8">
                  <Folder className="text-muted-foreground group-hover:text-primary transition-colors" size={28} />
                  <MoreVertical size={16} className="text-muted-foreground" />
                </div>
                <h3 className="font-bold text-lg">{folder.name}</h3>
                <p className="text-sm text-muted-foreground">{folder.count} files</p>
              </motion.div>
            ))}
            <div className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground">
              <Plus size={32} className="mb-2" />
              <span className="font-medium">New Folder</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
             <div className="w-full max-w-md perspective-1000">
               <motion.div
                 className="relative w-full h-[400px] cursor-pointer preserve-3d transition-all duration-500"
                 onClick={() => setIsFlipped(!isFlipped)}
                 animate={{ rotateY: isFlipped ? 180 : 0 }}
                 style={{ transformStyle: 'preserve-3d' }}
               >
                 {/* Front */}
                 <div className="absolute inset-0 backface-hidden">
                    <div className="w-full h-full glass-card border border-white/10 rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-[0_0_50px_-20px_rgba(6,182,212,0.3)]">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Question</span>
                      <h3 className="text-2xl font-bold leading-relaxed">{flashcards[currentCardIndex].question}</h3>
                      <p className="absolute bottom-8 text-muted-foreground text-sm flex items-center gap-2">
                        <RotateCw size={14} /> Tap to flip
                      </p>
                    </div>
                 </div>

                 {/* Back */}
                 <div 
                   className="absolute inset-0 backface-hidden"
                   style={{ transform: 'rotateY(180deg)' }}
                 >
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center p-8 text-center shadow-[0_0_50px_-20px_rgba(168,85,247,0.3)]">
                      <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">Answer</span>
                      <h3 className="text-2xl font-bold leading-relaxed">{flashcards[currentCardIndex].answer}</h3>
                    </div>
                 </div>
               </motion.div>
             </div>

             <div className="flex gap-4 mt-12">
               <Button variant="outline" className="w-32 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300" onClick={handleNextCard}>
                 Hard
               </Button>
               <Button variant="outline" className="w-32 border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300" onClick={handleNextCard}>
                 Easy
               </Button>
             </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

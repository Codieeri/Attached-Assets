import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Send, Image as ImageIcon, Mic, Paperclip, Bot, User, Sparkles, FileText, Download } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  type?: 'text' | 'solution';
}

export default function DoubtSolver() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hello! I'm your AI Study Buddy. Upload a photo of a problem or type your doubt here.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { text: "What is kinetic energy?", icon: "⚡" },
    { text: "Explain photosynthesis", icon: "🌱" },
    { text: "Solve: 2x + 5 = 15", icon: "🔢" },
    { text: "Write a summary of Romeo & Juliet", icon: "📚" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      let responseContent = "Here's a step-by-step breakdown of that concept. In quantum mechanics, the wave function describes the quantum state of an isolated quantum system...";
      
      const query = inputValue.toLowerCase();
      if (query.includes("kinetic energy")) {
        responseContent = "Kinetic energy is the energy an object possesses due to its motion. It's defined as the work needed to accelerate a body of a given mass from rest to its stated velocity. \n\nFormula: KE = ½mv² \nWhere: \n- m = mass of the object \n- v = velocity of the object";
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: responseContent,
        timestamp: new Date(),
        type: 'solution'
      }]);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] flex flex-col glass-card rounded-2xl border border-white/5 overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/5 bg-white/5 backdrop-blur-xl flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Bot className="text-primary" size={20} />
            </div>
            <div>
              <h2 className="font-bold">AI Doubt Solver</h2>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Online & Ready</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex gap-2">
            <FileText size={14} /> Export Chat
          </Button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'ai' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-secondary/20 text-secondary border border-secondary/30'
              }`}>
                {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
              </div>
              
              <div className={`max-w-[80%] space-y-2`}>
                <div className={`p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-secondary/10 border border-secondary/20 text-foreground rounded-tr-sm' 
                    : 'bg-white/5 border border-white/10 text-foreground rounded-tl-sm'
                }`}>
                  <p className="leading-relaxed whitespace-pre-wrap text-sm md:text-base">{msg.content}</p>
                </div>
                
                {msg.type === 'solution' && (
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="h-8 text-xs bg-transparent border-primary/30 text-primary hover:bg-primary/10">
                      <Sparkles size={12} className="mr-1" /> Explain simpler
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-xs bg-transparent border-white/10 hover:bg-white/5">
                      <Download size={12} className="mr-1" /> Save to Notes
                    </Button>
                  </div>
                )}
                
                <span className="text-[10px] text-muted-foreground block px-1">
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </div>
            </motion.div>
          ))}

          {messages.length === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto pt-8">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setInputValue(suggestion.text);
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all text-left group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{suggestion.icon}</span>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">
                    {suggestion.text}
                  </span>
                </motion.button>
              ))}
            </div>
          )}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30">
                <Bot size={16} className="text-primary" />
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-sm flex gap-1 items-center h-12">
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background/50 backdrop-blur-lg border-t border-white/5">
          <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground shrink-0">
              <Paperclip size={20} />
            </Button>
            <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-foreground shrink-0">
              <ImageIcon size={20} />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything or upload a problem..." 
                className="pr-12 bg-white/5 border-white/10 focus-visible:ring-primary/50 h-12 rounded-xl"
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-1 top-1 text-muted-foreground hover:text-primary"
              >
                <Mic size={18} />
              </Button>
            </div>

            <Button 
              onClick={handleSend}
              size="icon" 
              className={`rounded-xl shrink-0 transition-all ${
                inputValue.trim() 
                  ? 'bg-primary text-primary-foreground shadow-[0_0_15px_-5px_var(--color-primary)]' 
                  : 'bg-white/10 text-muted-foreground'
              }`}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

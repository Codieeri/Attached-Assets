import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Image as ImageIcon,
  Mic,
  Paperclip,
  Bot,
  User,
  Sparkles,
  FileText,
  Download,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  type?: "text" | "solution";
}

export default function DoubtSolver() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Hello! I'm your AI Study Buddy. Upload a photo of a problem or type your doubt here.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    {
      text: "What is kinetic energy?",
      answer: "",
    },
    {
      text: "Explain photosynthesis",
      answer: "",
    },
    {
      text: "Solve: 2x + 5 = 15",
      answer: "",
    },
    {
      text: "Write a summary of Romeo & Juliet",
      answer: "",
    },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      let responseContent =
        "Here's a step-by-step breakdown of that concept. In quantum mechanics, the wave function describes the quantum state of an isolated quantum system...";

      const query = userMessage.content.toLowerCase();

      if (
        query.includes("kinetic energy") ||
        query.includes("what is kinetic") ||
        query.includes("ke")
      ) {
        responseContent =
          "Kinetic energy is the energy an object possesses due to its motion.\n\nFormula:\nKE = ½mv²\n\nWhere:\n- m = mass\n- v = velocity";
      } else if (
        query.includes("photosynthesis") ||
        query.includes("photo synthesis")
      ) {
        responseContent =
          "Photosynthesis is the process by which green plants make their own food using sunlight, carbon dioxide, and water.\n\nIt produces glucose and oxygen.";
      } else if (query.includes("2x + 5 = 15") || query.includes("solve 2x")) {
        responseContent =
          "To solve 2x + 5 = 15:\n\nStep 1: Subtract 5 from both sides → 2x = 10\nStep 2: Divide by 2 → x = 5";
      } else if (query.includes("romeo") || query.includes("juliet")) {
        responseContent =
          "Romeo and Juliet is a tragedy by William Shakespeare about two young lovers from rival families whose love leads to misunderstandings and tragic consequences.";
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: responseContent,
        timestamp: new Date(),
        type: "solution",
      };

      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)] flex flex-col glass-card rounded-2xl border border-white/5 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Bot size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="font-bold">AI Doubt Solver</h2>
              <p className="text-xs text-muted-foreground">Online & Ready</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex gap-2">
            <FileText size={14} /> Export Chat
          </Button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/20 border border-primary/30">
                {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
              </div>

              <div className="max-w-[80%] space-y-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>

                {msg.type === "solution" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Sparkles size={12} className="mr-1" /> Explain simpler
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download size={12} className="mr-1" /> Save
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto pt-8">
              {suggestions.map((s, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setInputValue(s.text)}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
                >
                  <span className="text-sm text-muted-foreground">
                    {s.text}
                  </span>
                </motion.button>
              ))}
            </div>
          )}

          {isTyping && (
            <p className="text-sm text-muted-foreground">AI is typing…</p>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5 bg-background/50">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <Button size="icon" variant="ghost">
              <Paperclip size={20} />
            </Button>
            <Button size="icon" variant="ghost">
              <ImageIcon size={20} />
            </Button>

            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="flex-1"
            />

            <Button onClick={handleSend} size="icon">
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

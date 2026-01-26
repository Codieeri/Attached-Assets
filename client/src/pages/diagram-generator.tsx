import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon, Sparkles, Download, Share2, Wand2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DiagramGenerator() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    // Mock generation delay
    setTimeout(() => {
      setIsGenerating(false);
      // Use the abstract background as a placeholder for the "generated" diagram
      setGeneratedImage("/background-abstract.png"); 
    }, 2000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-bold">AI Visualizer</h1>
          <p className="text-muted-foreground">Turn your study notes into diagrams, mind maps, and charts instantly.</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-white/5 space-y-6">
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {["Mind Map", "Flowchart", "Process Diagram", "Scientific Illustration", "Timeline"].map((type) => (
                <Badge 
                  key={type} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/20 hover:text-primary hover:border-primary/50 px-3 py-1.5 transition-colors"
                >
                  {type}
                </Badge>
              ))}
            </div>
            
            <div className="relative">
              <Textarea 
                placeholder="Describe the diagram you need (e.g., 'A flow chart showing the process of photosynthesis' or 'Mind map of World War II causes')..." 
                className="min-h-[120px] bg-black/20 border-white/10 focus:border-primary/50 text-lg p-4 resize-none rounded-xl"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button 
                className="absolute bottom-4 right-4 bg-primary text-black hover:bg-primary/90 shadow-[0_0_15px_-5px_var(--color-primary)]"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
              >
                {isGenerating ? (
                  <>
                    <Wand2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Generate Diagram
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Output Area */}
        {generatedImage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-2 rounded-2xl border border-white/5 overflow-hidden"
          >
            <div className="bg-black/40 rounded-xl overflow-hidden relative aspect-video group">
              <img 
                src={generatedImage} 
                alt="Generated Diagram" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <Button variant="outline" className="border-white/20 hover:bg-white/20 text-white">
                  <Download className="mr-2 h-4 w-4" /> Download HD
                </Button>
                <Button variant="outline" className="border-white/20 hover:bg-white/20 text-white">
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

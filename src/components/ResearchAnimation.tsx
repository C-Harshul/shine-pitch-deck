import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Database, Search, MessageSquare, Brain, BookOpen, Monitor, PenLine } from "lucide-react";
import { useEffect, useState } from "react";

interface ResearchAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResearchAnimation = ({ isOpen, onClose }: ResearchAnimationProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      return;
    }

    const runAnimation = () => {
      setPhase(1); // Show ingestion pipeline
      
      const timers: NodeJS.Timeout[] = [];
      
      timers.push(setTimeout(() => setPhase(2), 1500)); // Show RAG section
      timers.push(setTimeout(() => setPhase(3), 3000)); // Show query pipeline
      timers.push(setTimeout(() => setPhase(4), 4500)); // Query flows to LLM
      timers.push(setTimeout(() => setPhase(5), 6000)); // Answer appears
      timers.push(setTimeout(() => {
        setPhase(0);
        setTimeout(runAnimation, 500);
      }, 9000));

      return timers;
    };

    const timers = runAnimation();
    
    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [isOpen]);

  const ingestionSteps = [
    { icon: FileText, label: "Tax Docs", sublabel: "PDFs" },
    { icon: Database, label: "Storage", sublabel: "Archive" },
    { icon: BookOpen, label: "Chunking", sublabel: "Split" },
    { icon: Brain, label: "Embed", sublabel: "Vectors" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-[800px] h-[450px] bg-card border border-border rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Main animation container */}
            <div className="relative w-full h-full flex flex-col px-8 py-6">
              
              {/* INGESTION PIPELINE */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : -10 }}
                transition={{ duration: 0.5 }}
                className="border border-sky-500/30 rounded-lg p-3 bg-sky-500/5"
              >
                <span className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  Ingestion Pipeline
                </span>
                
                <div className="flex items-center justify-around">
                  {ingestionSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ 
                          scale: phase >= 1 ? 1 : 0.8, 
                          opacity: phase >= 1 ? 1 : 0 
                        }}
                        transition={{ delay: i * 0.15, duration: 0.3 }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-10 h-10 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-center">
                          <step.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-[10px] text-foreground font-medium mt-1">{step.label}</span>
                        <span className="text-[8px] text-muted-foreground">{step.sublabel}</span>
                      </motion.div>
                      
                      {i < ingestionSteps.length - 1 && (
                        <motion.svg
                          width="24"
                          height="16"
                          viewBox="0 0 24 16"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: phase >= 1 ? 0.5 : 0 }}
                          transition={{ delay: i * 0.15 + 0.2, duration: 0.3 }}
                        >
                          <path d="M0 8 L16 8 M10 3 L18 8 L10 13" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Arrow from Ingestion to RAG */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center py-1"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M10 0 L10 14 M5 10 L10 16 L15 10" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* RAG SECTION */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: phase >= 2 ? 1 : 0, scale: phase >= 2 ? 1 : 0.95 }}
                transition={{ duration: 0.5 }}
                className="border border-primary/30 rounded-lg p-3 bg-primary/5 flex-1"
              >
                <span className="text-[10px] text-primary font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-2 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  RAG Knowledge Base
                </span>
                
                <div className="flex items-center justify-center gap-6">
                  {/* Vector DB */}
                  <motion.div
                    animate={{
                      boxShadow: phase >= 3 ? ['0 0 0px hsl(var(--primary) / 0)', '0 0 15px hsl(var(--primary) / 0.4)', '0 0 0px hsl(var(--primary) / 0)'] : 'none'
                    }}
                    transition={{ duration: 1.5, repeat: phase >= 3 && phase < 5 ? Infinity : 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-lg bg-muted/40 border-2 border-primary/40 flex items-center justify-center">
                      <Database className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs text-foreground font-medium mt-1">VectorDB</span>
                    <span className="text-[8px] text-muted-foreground">Tax Knowledge</span>
                  </motion.div>

                  {/* Arrow */}
                  <motion.svg 
                    width="36" height="16" 
                    viewBox="0 0 36 16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 3 ? 1 : 0.3 }}
                  >
                    <path d="M0 8 L28 8 M20 2 L30 8 L20 14" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>

                  {/* Retriever */}
                  <motion.div
                    animate={{
                      scale: phase >= 3 && phase < 5 ? [1, 1.05, 1] : 1
                    }}
                    transition={{ duration: 1, repeat: phase >= 3 && phase < 5 ? Infinity : 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-lg bg-muted/40 border-2 border-primary/40 flex items-center justify-center">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xs text-foreground font-medium mt-1">Retriever</span>
                    <span className="text-[8px] text-muted-foreground">Semantic Search</span>
                  </motion.div>
                </div>

                {/* Context output label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phase >= 4 ? 1 : 0 }}
                  className="text-[10px] text-primary/70 text-center mt-2"
                >
                  Prompt + Context →
                </motion.div>
              </motion.div>

              {/* Arrow from RAG to Query */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase >= 3 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center py-1"
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M10 0 L10 14 M5 10 L10 16 L15 10" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>

              {/* QUERY PIPELINE */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
                transition={{ duration: 0.5 }}
                className="border border-emerald-500/30 rounded-lg p-3 bg-emerald-500/5"
              >
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Query Pipeline
                </span>
                
                <div className="flex items-center justify-center gap-4">
                  {/* Query */}
                  <motion.div
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: phase >= 3 ? 0 : -10, opacity: phase >= 3 ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-center">
                      <PenLine className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] text-foreground font-medium mt-1">Query</span>
                  </motion.div>

                  {/* Arrow */}
                  <motion.svg 
                    width="24" height="16" 
                    viewBox="0 0 24 16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 4 ? 1 : 0.3 }}
                  >
                    <path d="M0 8 L16 8 M10 3 L18 8 L10 13" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>

                  {/* Web App */}
                  <motion.div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-center">
                      <Monitor className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="text-[10px] text-foreground font-medium mt-1">Web App</span>
                  </motion.div>

                  {/* Bidirectional arrows */}
                  <motion.svg 
                    width="36" height="16" 
                    viewBox="0 0 36 16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 4 ? 1 : 0.3 }}
                  >
                    <path d="M0 8 L28 8" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M6 3 L0 8 L6 13" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 3 L28 8 L22 13" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>

                  {/* LLM */}
                  <motion.div
                    animate={{
                      scale: phase >= 4 && phase < 5 ? [1, 1.08, 1] : 1,
                      boxShadow: phase >= 4 && phase < 5 
                        ? ['0 0 0px hsl(var(--primary) / 0)', '0 0 15px hsl(var(--primary) / 0.4)', '0 0 0px hsl(var(--primary) / 0)']
                        : 'none'
                    }}
                    transition={{ duration: 1, repeat: phase >= 4 && phase < 5 ? Infinity : 0 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/50 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-primary mt-1">Numina</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
              Click anywhere outside to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResearchAnimation;

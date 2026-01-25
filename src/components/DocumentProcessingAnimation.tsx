import { motion, AnimatePresence } from "framer-motion";
import { FileText, Receipt, ClipboardList, CheckCircle2, X, Mail, MessageSquare, Globe, Brain } from "lucide-react";
import { useEffect, useState } from "react";

interface DocumentProcessingAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentProcessingAnimation = ({ isOpen, onClose }: DocumentProcessingAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const [processedDocs, setProcessedDocs] = useState<number[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      setProcessedDocs([]);
      return;
    }

    // Animation loop
    const runAnimation = () => {
      setPhase(1); // Documents flowing
      
      const timers: NodeJS.Timeout[] = [];
      
      timers.push(setTimeout(() => setPhase(2), 2500)); // Enter brain
      timers.push(setTimeout(() => setPhase(3), 5000)); // Processing
      timers.push(setTimeout(() => setProcessedDocs([0]), 6000));
      timers.push(setTimeout(() => setProcessedDocs([0, 1]), 7000));
      timers.push(setTimeout(() => setProcessedDocs([0, 1, 2]), 8000));
      timers.push(setTimeout(() => setPhase(4), 8500)); // Ledger output
      timers.push(setTimeout(() => {
        // Reset for loop
        setPhase(0);
        setProcessedDocs([]);
        setTimeout(runAnimation, 500);
      }, 11000));

      return timers;
    };

    const timers = runAnimation();
    
    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [isOpen]);

  const documentSources = [
    { sourceIcon: Mail, sourceName: "Email", docIcon: FileText, docLabel: "Invoice", sourceColor: "text-red-400", docColor: "text-blue-400" },
    { sourceIcon: MessageSquare, sourceName: "Slack", docIcon: Receipt, docLabel: "Receipt", sourceColor: "text-purple-400", docColor: "text-emerald-400" },
    { sourceIcon: Globe, sourceName: "Web Portal", docIcon: ClipboardList, docLabel: "PO", sourceColor: "text-sky-400", docColor: "text-cyan-400" },
  ];

  const ledgerEntries = [
    { vendor: "Acme Corp", amount: "$12,450.00", status: "Matched" },
    { vendor: "TechSupply", amount: "$8,320.50", status: "Verified" },
    { vendor: "OfficeMax", amount: "$2,180.00", status: "Reconciled" },
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

            {/* Labels */}
            <div className="absolute top-6 left-8 text-xs text-muted-foreground font-medium tracking-wider uppercase">
              Invoices & Receipts
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs text-primary font-medium tracking-wider uppercase">
              Numina AI – Processing
            </div>
            <div className="absolute top-6 right-8 text-xs text-muted-foreground font-medium tracking-wider uppercase">
              Clean Ledger Entries
            </div>

            {/* Main animation container */}
            <div className="relative w-full h-full flex items-center justify-between px-12 pt-8">
              
              {/* Left: Incoming Documents from Sources */}
              <div className="flex flex-col gap-3 w-[180px]">
                {documentSources.map((source, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -120, opacity: 0 }}
                    animate={{
                      x: phase >= 1 ? 0 : -120,
                      opacity: phase >= 1 ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                    className="flex items-center gap-2 p-2.5 bg-muted/30 border border-border/50 rounded-lg"
                  >
                    <div className={`p-1.5 rounded bg-muted/50 ${source.sourceColor}`}>
                      <source.sourceIcon className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-1">
                      <source.docIcon className={`w-4 h-4 ${source.docColor}`} />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium">{source.docLabel}</span>
                        <span className="text-[10px] text-muted-foreground">via {source.sourceName}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Simple Arrows flowing to brain */}
              <div className="flex flex-col gap-6 items-center justify-center w-[60px]">
                {[0, 1, 2].map((i) => (
                  <motion.svg
                    key={i}
                    width="50"
                    height="16"
                    viewBox="0 0 50 16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: phase >= 2 ? 1 : 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                  >
                    <path
                      d="M0 8 L40 8 M32 2 L42 8 L32 14"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ))}
              </div>

              {/* Center: AI Brain */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: phase >= 2 && phase < 4 ? [1, 1.05, 1] : 1,
                    boxShadow: phase >= 2 && phase < 4 
                      ? ['0 0 20px hsl(var(--primary) / 0.3)', '0 0 40px hsl(var(--primary) / 0.5)', '0 0 20px hsl(var(--primary) / 0.3)']
                      : '0 0 20px hsl(var(--primary) / 0.2)'
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: phase >= 2 && phase < 4 ? Infinity : 0,
                    ease: "easeInOut"
                  }}
                  className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/50 flex items-center justify-center"
                >
                  {/* Neural network visualization */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
                    {/* Outer ring */}
                    <motion.circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="hsl(var(--primary) / 0.3)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{ transformOrigin: "center" }}
                    />
                    
                    {/* Inner connections */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <motion.line
                        key={i}
                        x1="80"
                        y1="80"
                        x2={80 + 50 * Math.cos((angle * Math.PI) / 180)}
                        y2={80 + 50 * Math.sin((angle * Math.PI) / 180)}
                        stroke="hsl(var(--primary) / 0.4)"
                        strokeWidth="1"
                        animate={{
                          opacity: phase >= 2 ? [0.3, 1, 0.3] : 0.3
                        }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1,
                          repeat: phase >= 2 && phase < 4 ? Infinity : 0
                        }}
                      />
                    ))}
                    
                    {/* Nodes */}
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <motion.circle
                        key={i}
                        cx={80 + 50 * Math.cos((angle * Math.PI) / 180)}
                        cy={80 + 50 * Math.sin((angle * Math.PI) / 180)}
                        r="6"
                        fill="hsl(var(--primary))"
                        animate={{
                          scale: phase >= 2 ? [1, 1.3, 1] : 1,
                          opacity: phase >= 2 ? [0.5, 1, 0.5] : 0.5
                        }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.15,
                          repeat: phase >= 2 && phase < 4 ? Infinity : 0
                        }}
                      />
                    ))}
                  </svg>

                  {/* Center core with Brain and Numina */}
                  <motion.div
                    animate={{
                      scale: phase >= 2 && phase < 4 ? [1, 1.15, 1] : 1
                    }}
                    transition={{
                      duration: 1,
                      repeat: phase >= 2 && phase < 4 ? Infinity : 0
                    }}
                    className="flex flex-col items-center justify-center gap-1"
                  >
                    <Brain className="w-10 h-10 text-primary" />
                    <span className="text-primary font-bold text-sm tracking-wide">Numina</span>
                  </motion.div>

                  {/* Processing indicator */}
                  {phase >= 2 && phase < 4 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -bottom-8 text-xs text-primary font-medium"
                    >
                      Processing...
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Right: Ledger Output */}
              <div className="w-[200px] bg-muted/20 border border-border/50 rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-3 py-2 border-b border-border/50">
                  <span className="text-xs font-semibold text-foreground">General Ledger</span>
                </div>
                <div className="p-2 space-y-1">
                  {ledgerEntries.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: processedDocs.includes(i) ? 1 : 0.3,
                        x: processedDocs.includes(i) ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center justify-between p-2 rounded bg-muted/20 border border-border/30"
                    >
                      <div className="flex-1">
                        <p className="text-xs font-medium text-foreground">{entry.vendor}</p>
                        <p className="text-[10px] text-muted-foreground">{entry.amount}</p>
                      </div>
                      {processedDocs.includes(i) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3 text-green-400" />
                          <span className="text-[10px] text-green-400">{entry.status}</span>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
              Click anywhere outside to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DocumentProcessingAnimation;

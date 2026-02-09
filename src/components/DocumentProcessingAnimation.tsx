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
      // Start arrows from Numina to ledger only after processing is complete (phase 3 ends)
      timers.push(setTimeout(() => setPhase(4), 6500)); // Start arrows after processing phase completes
      // Update ledger entries after arrows animate (each arrow takes ~1.2s + delay)
      timers.push(setTimeout(() => setProcessedDocs([0]), 8000)); // After first arrow completes (~6500 + 1200 + 300)
      timers.push(setTimeout(() => setProcessedDocs([0, 1]), 9000)); // After second arrow completes
      timers.push(setTimeout(() => setProcessedDocs([0, 1, 2]), 10000)); // After third arrow completes
      timers.push(setTimeout(() => {
        // Wait 10 seconds after all ledger entries are updated, then reset and restart
        setPhase(0);
        setProcessedDocs([]);
        setTimeout(runAnimation, 0); // Restart immediately after reset
      }, 20000)); // 10000ms (last ledger update) + 10000ms (10 seconds pause) = 20000ms

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
            className="relative w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] max-w-full max-h-full bg-card border border-border rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Labels */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xl text-primary font-medium tracking-wider uppercase">
              Numina - Reconcile
            </div>

            {/* Main animation container */}
            <div className="relative w-full h-full flex items-center justify-center px-12 pt-8 gap-10">
              
              {/* Left: Incoming Documents from Sources */}
              <div className="flex flex-col gap-5 w-[260px]">
                {documentSources.map((source, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 p-4 bg-muted/30 border border-border/50 rounded-lg"
                  >
                    <div className={`p-2.5 rounded bg-muted/50 ${source.sourceColor}`}>
                      <source.sourceIcon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2.5 flex-1">
                      <source.docIcon className={`w-6 h-6 ${source.docColor}`} />
                      <div className="flex flex-col">
                        <span className="text-base font-medium">{source.docLabel}</span>
                        <span className="text-sm text-muted-foreground">via {source.sourceName}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Animated Arrows flowing to brain */}
              <div className="flex flex-col gap-9 items-center justify-center w-[150px]">
                {[0, 1, 2].map((i) => (
                  <motion.svg
                    key={i}
                    width="150"
                    height="22"
                    viewBox="0 0 150 22"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: phase >= 1 ? 1 : 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                  >
                    {/* Static arrow line */}
                    <path
                      d="M0 11 L140 11 M132 5 L142 11 L132 17"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Animated traveling dot */}
                    {phase === 1 && (
                      <motion.circle
                        r="4.5"
                        cy="11"
                        fill="hsl(var(--primary))"
                        initial={{ cx: 0, opacity: 0 }}
                        animate={{ cx: [0, 140], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.3,
                          repeat: 0,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.svg>
                ))}
              </div>

              {/* Center: AI Brain */}
              <div className="relative flex items-center justify-center mx-8">
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
                  className="relative w-56 h-56 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/50 flex items-center justify-center"
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
                      animate={{ rotate: phase >= 2 && phase < 4 ? 360 : 0 }}
                      transition={{ duration: 20, repeat: phase >= 2 && phase < 4 ? Infinity : 0, ease: "linear" }}
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
                          opacity: phase >= 2 && phase < 4 ? [0.3, 1, 0.3] : 0.3
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
                          scale: phase >= 2 && phase < 4 ? [1, 1.3, 1] : 1,
                          opacity: phase >= 2 && phase < 4 ? [0.5, 1, 0.5] : 0.5
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
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <Brain className="w-16 h-16 text-primary" />
                    <span className="text-primary font-bold text-lg tracking-wide">Numina</span>
                  </motion.div>

                  {/* Processing indicator */}
                  {phase >= 2 && phase < 4 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -bottom-12 text-base text-primary font-medium"
                    >
                      Processing...
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Animated Arrows flowing from brain */}
              <div className="flex flex-col gap-9 items-center justify-center w-[160px] -ml-4">
                {[0, 1, 2].map((i) => (
                  <motion.svg
                    key={i}
                    width="160"
                    height="22"
                    viewBox="0 0 160 22"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: phase >= 4 ? 1 : 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                  >
                    {/* Static arrow line */}
                    <path
                      d="M0 11 L155 11 M147 5 L157 11 L147 17"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Animated traveling dot */}
                    {phase === 4 && (
                      <motion.circle
                        r="4.5"
                        cy="11"
                        fill="hsl(var(--primary))"
                        initial={{ cx: 0, opacity: 0 }}
                        animate={{ cx: [0, 155], opacity: [0, 1, 1, 0] }}
                        transition={{
                          duration: 1.2,
                          delay: i * 0.3,
                          repeat: 0,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.svg>
                ))}
              </div>

              {/* Right: Ledger Output */}
              <div className="w-[260px] bg-muted/20 border border-border/50 rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-3 border-b border-border/50">
                  <span className="text-base font-semibold text-foreground">General Ledger</span>
                </div>
                <div className="p-3 space-y-2.5">
                  {ledgerEntries.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: processedDocs.includes(i) ? 1 : 0.3,
                        x: processedDocs.includes(i) ? 0 : 20
                      }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center justify-between p-3 rounded bg-muted/20 border border-border/30"
                    >
                      <div className="flex-1">
                        <p className="text-base font-medium text-foreground">{entry.vendor}</p>
                        <p className="text-sm text-muted-foreground">{entry.amount}</p>
                      </div>
                      {processedDocs.includes(i) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span className="text-sm text-green-400">{entry.status}</span>
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

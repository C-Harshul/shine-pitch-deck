import { motion, AnimatePresence } from "framer-motion";
import { X, Monitor, Brain, Database, FileText, AlertTriangle, CheckCircle2, XCircle, Bell, Shield, Zap, BookOpen } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface FlaggingAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

// Horizontal arrow with traveling dot
const AnimatedArrow = ({ active, delay = 0, width = 40, label, repeat = Infinity }: { active: boolean; delay?: number; width?: number; label?: string; repeat?: number }) => (
  <div className="flex flex-col items-center justify-center" style={{ minWidth: width }}>
    <svg width={width} height="16" viewBox={`0 0 ${width} 16`} className="overflow-visible">
      <path
        d={`M0 8 L${width - 8} 8 M${width - 14} 3 L${width - 6} 8 L${width - 14} 13`}
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {active && (
        <motion.circle
          r="2.5"
          cy="8"
          fill="hsl(var(--primary))"
          initial={{ cx: 0, opacity: 0 }}
          animate={{ cx: [0, width - 8], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, delay, repeat, ease: "easeInOut" }}
        />
      )}
    </svg>
    {label && (
      <span className="text-[8px] text-primary/60 mt-0.5 whitespace-nowrap">{label}</span>
    )}
  </div>
);

// Vertical arrow (top to bottom)
const AnimatedVerticalArrow = ({ active, height = 24, repeat = Infinity }: { active: boolean; height?: number; repeat?: number }) => (
  <div className="flex items-center justify-center">
    <svg width="20" height={height} viewBox={`0 0 20 ${height}`}>
      <path
        d={`M10 0 L10 ${height - 8} M5 ${height - 12} L10 ${height - 4} L15 ${height - 12}`}
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {active && (
        <motion.circle
          r="2.5"
          cx="10"
          fill="hsl(var(--primary))"
          initial={{ cy: 0, opacity: 0 }}
          animate={{ cy: [0, height - 8], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat, ease: "easeInOut" }}
        />
      )}
    </svg>
  </div>
);

// Reverse vertical arrow (bottom to top)
const AnimatedReverseVerticalArrow = ({ active, height = 24, repeat = Infinity }: { active: boolean; height?: number; repeat?: number }) => (
  <div className="flex items-center justify-center">
    <svg width="20" height={height} viewBox={`0 0 20 ${height}`}>
      <path
        d={`M10 ${height} L10 8 M5 12 L10 4 L15 12`}
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {active && (
        <motion.circle
          r="2.5"
          cx="10"
          fill="hsl(var(--primary))"
          initial={{ cy: height, opacity: 0 }}
          animate={{ cy: [height, 8], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat, ease: "easeInOut" }}
        />
      )}
    </svg>
  </div>
);

// Stationary card component
const Card = ({ icon: Icon, label, sublabel, highlighted = false, color = "primary", alert = false }: {
  icon: any;
  label: string;
  sublabel?: string;
  highlighted?: boolean;
  color?: string;
  alert?: boolean;
}) => {
  const borderColor = highlighted
    ? color === "red" ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
    : color === "green" ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]"
    : color === "amber" ? "border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
    : "border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
    : "border-transparent";

  return (
    <div className={`flex flex-col items-center`}>
      <div className={`w-14 h-14 rounded-lg bg-muted/40 flex items-center justify-center border-2 transition-all duration-300 ${borderColor} relative`}>
        <Icon className={`w-5 h-5 ${highlighted && color === "red" ? "text-red-400" : highlighted && color === "green" ? "text-green-400" : highlighted && color === "amber" ? "text-amber-400" : "text-muted-foreground"}`} />
        {alert && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
          >
            <span className="text-[8px] text-white font-bold">!</span>
          </motion.div>
        )}
      </div>
      <span className="text-[11px] text-foreground font-medium mt-1">{label}</span>
      {sublabel && <span className="text-[9px] text-muted-foreground">{sublabel}</span>}
    </div>
  );
};

const FlaggingAnimation = ({ isOpen, onClose }: FlaggingAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
      return;
    }

    const runAnimation = () => {
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
      setPhase(0);

      // Phase 1: Rule Creation (0-10s)
      timersRef.current.push(setTimeout(() => setPhase(1), 500));    // Accountant types rule
      timersRef.current.push(setTimeout(() => setPhase(2), 2500));   // Rule → LLM + QB context → LLM
      timersRef.current.push(setTimeout(() => setPhase(3), 5000));   // LLM processing
      timersRef.current.push(setTimeout(() => setPhase(4), 7000));   // JSON rule → Rules DB

      // Phase 2: Transaction Monitoring (10-20s)
      timersRef.current.push(setTimeout(() => setPhase(5), 9500));   // QB → Transaction Queue
      timersRef.current.push(setTimeout(() => setPhase(6), 12000));  // Queue → Rule Engine + Engine pulls rules
      timersRef.current.push(setTimeout(() => setPhase(7), 14500));  // Evaluation results

      // Phase 3: Flagging & Notification (20-30s)
      timersRef.current.push(setTimeout(() => setPhase(8), 17000));  // Flagged → Flagging Service
      timersRef.current.push(setTimeout(() => setPhase(9), 19500));  // → Flagged DB + Notification
      timersRef.current.push(setTimeout(() => setPhase(10), 22000)); // → Auditor Dashboard

      // Loop
      timersRef.current.push(setTimeout(() => {
        setPhase(0);
        setTimeout(runAnimation, 800);
      }, 25000));
    };

    runAnimation();

    return () => {
      timersRef.current.forEach(t => clearTimeout(t));
      timersRef.current = [];
    };
  }, [isOpen]);

  // Transaction items for phase 2
  const transactions = [
    { desc: "Office Supplies", amount: "$320", compliant: true },
    { desc: "Consulting Fee", amount: "$7,500", compliant: false },
    { desc: "Software License", amount: "$1,200", compliant: true },
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
            className="relative w-[min(960px,calc(100vw-2rem))] h-[min(640px,calc(100vh-3rem))] bg-card border border-border rounded-2xl overflow-hidden"
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

            {/* Title */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center">
              <h3 className="text-sm font-bold text-foreground">Numina — Automatic Flagging</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {phase <= 4 ? "Phase 1: Rule Creation" : phase <= 7 ? "Phase 2: Transaction Monitoring" : "Phase 3: Flagging & Notification"}
              </p>
            </div>

            <div className="relative w-full h-full flex flex-col justify-center items-center px-6 pt-10 pb-8 gap-6">

              {/* ===== ROW 1: RULE CREATION ===== */}
              <div className="border-2 border-emerald-500/30 rounded-lg p-3 bg-emerald-500/5 w-full max-w-[860px]">
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Rule Creation Pipeline
                </span>

                <div className="flex items-center justify-center gap-1">
                  {/* Accountant */}
                  <Card icon={Monitor} label="Accountant" sublabel="Plain English" highlighted={phase >= 1 && phase <= 4} color="green" />

                  <AnimatedArrow active={phase >= 1 && phase <= 4} width={36} label={phase >= 1 ? '"Flag >$5k"' : undefined} repeat={phase >= 2 ? 0 : Infinity} />

                  {/* LLM */}
                  <div className="relative">
                    <Card icon={Brain} label="LLM" sublabel="Parse Rule" highlighted={phase >= 3 && phase <= 4} color="amber" />
                    {phase >= 3 && phase < 4 && (
                      <motion.div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <span className="text-[8px] text-amber-400">Processing...</span>
                      </motion.div>
                    )}
                  </div>

                  <AnimatedArrow active={phase >= 4} width={36} label="JSON Rule" repeat={0} />

                  {/* Rules Database */}
                  <Card icon={Database} label="Rules DB" sublabel={phase >= 4 ? "+1 Rule" : "Storage"} highlighted={phase >= 4} color="green" alert={phase >= 4} />
                </div>

                {/* QuickBooks context arrow (diagonal into LLM) */}
                <div className="flex items-center justify-center mt-2">
                  <div className="flex items-center gap-1">
                    <Card icon={BookOpen} label="QuickBooks" sublabel="OAuth Context" highlighted={phase >= 2 && phase <= 3} />
                    <AnimatedArrow active={phase >= 2 && phase <= 3} width={36} label="Chart of Accts" repeat={Infinity} />
                    <span className="text-[9px] text-muted-foreground">→ LLM Context</span>
                  </div>
                </div>
              </div>

              {/* ===== ROW 2: TRANSACTION MONITORING ===== */}
              <div className="border-2 border-sky-500/30 rounded-lg p-3 bg-sky-500/5 w-full max-w-[860px]">
                <span className="text-[10px] text-sky-400 font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  Transaction Monitoring
                </span>

                <div className="flex items-center justify-center gap-1">
                  {/* QuickBooks Feed */}
                  <Card icon={BookOpen} label="QuickBooks" sublabel="Txn Feed" highlighted={phase >= 5} color="primary" />

                  <AnimatedArrow active={phase >= 5 && phase <= 7} width={36} label="Transactions" />

                  {/* Transaction Queue */}
                  <Card icon={FileText} label="Txn Queue" sublabel="Buffer" highlighted={phase >= 5} />

                  <AnimatedArrow active={phase >= 6} width={36} />

                  {/* Rule Enforcement Engine */}
                  <div className="relative">
                    <Card icon={Shield} label="Rule Engine" sublabel="Enforce" highlighted={phase >= 6} color="amber" />
                    {/* Arrow from Rules DB (visual indication) */}
                    {phase >= 6 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -top-5 left-1/2 -translate-x-1/2"
                      >
                        <span className="text-[8px] text-amber-400">← Rules DB</span>
                      </motion.div>
                    )}
                  </div>

                  <AnimatedArrow active={phase >= 7} width={36} />

                  {/* Evaluation Results */}
                  <div className="flex flex-col gap-1 min-w-[100px]">
                    {transactions.map((txn, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0.3 }}
                        animate={{
                          opacity: phase >= 7 ? 1 : 0.3,
                          borderColor: phase >= 7 && !txn.compliant ? "rgba(239,68,68,0.6)" : "transparent",
                        }}
                        transition={{ duration: 0.4, delay: i * 0.3 }}
                        className={`flex items-center gap-1.5 px-2 py-1 rounded text-[9px] border bg-muted/30 ${phase >= 7 && !txn.compliant ? "bg-red-500/10" : ""}`}
                      >
                        {phase >= 7 && (
                          txn.compliant
                            ? <CheckCircle2 className="w-3 h-3 text-green-400 shrink-0" />
                            : <XCircle className="w-3 h-3 text-red-400 shrink-0" />
                        )}
                        <span className="text-foreground">{txn.desc}</span>
                        <span className="text-muted-foreground ml-auto">{txn.amount}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ===== ROW 3: FLAGGING & NOTIFICATION ===== */}
              <div className="border-2 border-red-500/30 rounded-lg p-3 bg-red-500/5 w-full max-w-[860px]">
                <span className="text-[10px] text-red-400 font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Flagging & Notification
                </span>

                <div className="flex items-center justify-center gap-1">
                  {/* Flagged Transaction */}
                  <Card icon={AlertTriangle} label="Flagged Txn" sublabel="$7,500" highlighted={phase >= 8} color="red" />

                  <AnimatedArrow active={phase >= 8} width={36} repeat={0} />

                  {/* Flagging Service */}
                  <Card icon={Zap} label="Flag Service" sublabel="Process" highlighted={phase >= 8} color="red" />

                  <AnimatedArrow active={phase >= 9} width={36} repeat={0} />

                  {/* Flagged DB */}
                  <Card icon={Database} label="Flagged DB" sublabel="Stored" highlighted={phase >= 9} color="red" />

                  <AnimatedArrow active={phase >= 9} width={36} label="Notify" repeat={0} />

                  {/* Notification System */}
                  <Card icon={Bell} label="Notifications" sublabel="Alert" highlighted={phase >= 9} color="amber" alert={phase >= 9} />

                  <AnimatedArrow active={phase >= 10} width={36} repeat={0} />

                  {/* Auditor Dashboard */}
                  <div className="relative">
                    <Card icon={Monitor} label="Auditor" sublabel="Dashboard" highlighted={phase >= 10} color="amber" />
                    {phase >= 10 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                      >
                        <span className="text-[8px] text-white font-bold">1</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
              Click anywhere outside to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlaggingAnimation;

import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Database, Filter, Brain, Monitor, PenLine, Zap, HardDrive, Scissors, Cpu } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ResearchAnimationProps {
  isOpen: boolean;
  onClose: () => void;
}

// Reusable horizontal arrow with traveling dot - centered between icons
const AnimatedArrow = ({ active, delay = 0, width = 36, label, repeat = Infinity }: { active: boolean; delay?: number; width?: number; label?: string; repeat?: number }) => (
  <div className="flex items-center justify-center" style={{ height: '48px' }}>
    <svg width={width} height="16" viewBox={`0 0 ${width} 16`} className="overflow-visible">
      <path
        d={`M0 8 L${width - 8} 8 M${width - 14} 3 L${width - 6} 8 L${width - 14} 13`}
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={1}
      />
      {active && (
        <motion.circle
          key="arrow-dot"
          r="2.5"
          cy="8"
          fill="hsl(var(--primary))"
          initial={{ cx: 0, opacity: 0 }}
          animate={{ cx: [0, width - 8], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            delay,
            repeat,
            ease: "easeInOut"
          }}
        />
      )}
    </svg>
    {label && (
      <span className="text-[8px] text-primary/60 mt-0.5 whitespace-nowrap">{label}</span>
    )}
  </div>
);

// Reusable vertical arrow with traveling dot
const AnimatedVerticalArrow = ({ active, height = 24 }: { active: boolean; height?: number }) => (
  <svg width="20" height={height} viewBox={`0 0 20 ${height}`}>
    <path
      d={`M10 0 L10 ${height - 8} M5 ${height - 12} L10 ${height - 4} L15 ${height - 12}`}
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={1}
    />
    {active && (
      <motion.circle
        key="vertical-arrow-dot"
        r="2.5"
        cx="10"
        fill="hsl(var(--primary))"
        initial={{ cy: 0, opacity: 0 }}
        animate={{ cy: [0, height - 8], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    )}
  </svg>
);

// Reverse horizontal arrow (right to left) with traveling dot - centered between icons
const AnimatedReverseArrow = ({ active, width = 36, repeat = 0 }: { active: boolean; width?: number; repeat?: number }) => (
  <div className="flex items-center justify-center" style={{ height: '48px' }}>
    <svg width={width} height="16" viewBox={`0 0 ${width} 16`} className="overflow-visible">
      <path
        d={`M${width} 8 L8 8 M14 3 L6 8 L14 13`}
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={1}
      />
      {active && (
        <motion.circle
          key="reverse-arrow-dot"
          r="2.5"
          cy="8"
          fill="hsl(var(--primary))"
          initial={{ cx: width, opacity: 0 }}
          animate={{ cx: [width, 8], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            repeat,
            ease: "easeInOut"
          }}
        />
      )}
    </svg>
  </div>
);

// Reverse vertical arrow (bottom to top) with traveling dot - for Web App → Retriever
const AnimatedReverseVerticalArrow = ({ active, height = 32, repeat = 0 }: { active: boolean; height?: number; repeat?: number }) => (
  <div className="flex items-center justify-center">
    <svg width="20" height={height} viewBox={`0 0 20 ${height}`}>
      <path
        d={`M10 ${height} L10 8 M5 12 L10 4 L15 12`}
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={1}
      />
      {active && (
        <motion.circle
          key="reverse-vertical-arrow-dot"
          r="2.5"
          cx="10"
          fill="hsl(var(--primary))"
          initial={{ cy: height, opacity: 0 }}
          animate={{ cy: [height, 8], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            repeat,
            ease: "easeInOut"
          }}
        />
      )}
    </svg>
  </div>
);

const ResearchAnimation = ({ isOpen, onClose }: ResearchAnimationProps) => {
  const [phase, setPhase] = useState(0);
  const [queryPipelineHighlighted, setQueryPipelineHighlighted] = useState(false);
  const [ingestionPhase, setIngestionPhase] = useState(0);
  const [ingestionPipelineHighlighted, setIngestionPipelineHighlighted] = useState(false);
  const [continuousPlayback, setContinuousPlayback] = useState(false);
  const prevContinuousPlaybackRef = useRef(false);
  const animationTimersRef = useRef<NodeJS.Timeout[]>([]);
  const ingestionTimersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      setQueryPipelineHighlighted(false);
      setIngestionPhase(0);
      setIngestionPipelineHighlighted(false);
      setContinuousPlayback(false);
      // Clear any running animations
      animationTimersRef.current.forEach(t => clearTimeout(t));
      animationTimersRef.current = [];
      ingestionTimersRef.current.forEach(t => clearTimeout(t));
      ingestionTimersRef.current = [];
      return;
    }
  }, [isOpen]);

  // Start/stop continuous playback when toggle is changed
  useEffect(() => {
    // Only act when continuousPlayback actually changes, not on every state update
    const wasOn = prevContinuousPlaybackRef.current;
    const isOn = continuousPlayback;
    
    if (isOn && !wasOn && isOpen) {
      // Toggle was just turned ON - start both animations
      const timer = setTimeout(() => {
        if (!queryPipelineHighlighted) {
          startQueryAnimation();
        }
        if (!ingestionPipelineHighlighted) {
          startIngestionAnimation();
        }
      }, 100);
      prevContinuousPlaybackRef.current = isOn;
      return () => clearTimeout(timer);
    } else if (!isOn && wasOn) {
      // Toggle was just turned OFF - stop animations immediately
      animationTimersRef.current.forEach(t => clearTimeout(t));
      animationTimersRef.current = [];
      ingestionTimersRef.current.forEach(t => clearTimeout(t));
      ingestionTimersRef.current = [];
      setPhase(0);
      setQueryPipelineHighlighted(false);
      setIngestionPhase(0);
      setIngestionPipelineHighlighted(false);
      prevContinuousPlaybackRef.current = isOn;
    } else {
      prevContinuousPlaybackRef.current = isOn;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continuousPlayback, isOpen]);

  const startQueryAnimation = () => {
    // Always allow clicking to start/restart animation
    // Clear any existing timers first
    
    // Clear any existing timers
    animationTimersRef.current.forEach(t => clearTimeout(t));
    animationTimersRef.current = [];
    
    setQueryPipelineHighlighted(true);
    setPhase(0);

    // Animation timing - Green (Query Pipeline) and Yellow (RAG) animate together
    // Phase 1: Query → Web App
    animationTimersRef.current.push(setTimeout(() => setPhase(1), 0));
    
    // Phase 2: Web App → Retriever (vertical up)
    animationTimersRef.current.push(setTimeout(() => setPhase(2), 3000));
    
    // Phase 3: Retriever → VectorDB (cosine match - highlight VectorDB)
    animationTimersRef.current.push(setTimeout(() => setPhase(3), 4500));
    
    // Phase 4: VectorDB → Retriever (context retrieved)
    animationTimersRef.current.push(setTimeout(() => setPhase(4), 7000));
    
    // Phase 5: Retriever → LLM (L-shaped with prompt + context)
    animationTimersRef.current.push(setTimeout(() => setPhase(5), 9500));
    
    // Phase 6: LLM → Web App (answer)
    animationTimersRef.current.push(setTimeout(() => setPhase(6), 14000));
    
    // Reset after animation completes
    animationTimersRef.current.push(setTimeout(() => {
      if (continuousPlayback) {
        // Restart animation if continuous playback is enabled
        setPhase(0);
        setTimeout(() => startQueryAnimation(), 100);
      } else {
        setPhase(0);
        setQueryPipelineHighlighted(false);
        animationTimersRef.current = [];
      }
    }, 18500));
  };

  const ingestionSteps = [
    { icon: FileText, label: "Tax Docs", sublabel: "PDFs" },
    { icon: HardDrive, label: "S3 Store", sublabel: "Archive" },
    { icon: Zap, label: "Lambda", sublabel: "Trigger" },
    { icon: Scissors, label: "Chunking", sublabel: "Split" },
    { icon: Cpu, label: "Embed", sublabel: "Vectors" },
  ];

  const startIngestionAnimation = () => {
    // Always allow clicking to start/restart animation
    // Clear any existing timers first
    
    // Clear any existing timers
    ingestionTimersRef.current.forEach(t => clearTimeout(t));
    ingestionTimersRef.current = [];
    
    setIngestionPipelineHighlighted(true);
    setIngestionPhase(0);

    // Animation timing - one arrow at a time
    // Phase 1: Tax Docs → S3 Store
    ingestionTimersRef.current.push(setTimeout(() => setIngestionPhase(1), 0));
    
    // Phase 2: S3 Store → Lambda
    ingestionTimersRef.current.push(setTimeout(() => setIngestionPhase(2), 3000));
    
    // Phase 3: Lambda → Chunking
    ingestionTimersRef.current.push(setTimeout(() => setIngestionPhase(3), 6000));
    
    // Phase 4: Chunking → Embed
    ingestionTimersRef.current.push(setTimeout(() => setIngestionPhase(4), 9000));
    
    // Phase 5: Embed → VectorDB
    ingestionTimersRef.current.push(setTimeout(() => setIngestionPhase(5), 12000));
    
    // Reset after animation completes
    ingestionTimersRef.current.push(setTimeout(() => {
      if (continuousPlayback) {
        // Restart animation if continuous playback is enabled
        setIngestionPhase(0);
        setTimeout(() => startIngestionAnimation(), 100);
      } else {
        setIngestionPhase(0);
        setIngestionPipelineHighlighted(false);
        ingestionTimersRef.current = [];
      }
    }, 15000));
  };

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
            className="relative w-[min(920px,calc(100vw-3rem))] h-[min(720px,calc(100vh-3rem))] bg-card border border-border rounded-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Continuous playback toggle */}
            <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-lg">
              <Switch
                id="continuous-playback"
                checked={continuousPlayback}
                onCheckedChange={setContinuousPlayback}
              />
              <Label htmlFor="continuous-playback" className="text-xs cursor-pointer">
                Continuous Playback
              </Label>
            </div>

            {/* Background grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Main container */}
            <div className="relative w-full h-full flex flex-col items-center px-4 py-5 gap-1.5" style={{ minHeight: '100%' }}>

              {/* INGESTION PIPELINE */}
              <div 
                className={`border-2 border-sky-500/30 rounded-lg p-2 cursor-pointer transition-all w-fit ${
                  ingestionPipelineHighlighted 
                    ? 'border-sky-500 bg-sky-500/20 shadow-lg shadow-sky-500/20' 
                    : 'bg-sky-500/5 hover:bg-sky-500/10'
                }`}
                onClick={startIngestionAnimation}
              >
                <span className="text-[11px] text-sky-400 font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  Ingestion Pipeline
                </span>

                <div className="flex items-center justify-center">
                  {ingestionSteps.map((step, i) => (
                    <div key={i} className="flex items-center">
                      <div className={`flex flex-col items-center ${i === ingestionSteps.length - 1 ? 'relative' : ''}`}>
                        <div 
                          className={`w-12 h-12 rounded-lg bg-muted/40 flex items-center justify-center m-2 transition-colors ${
                            ingestionPipelineHighlighted && ingestionPhase > 0 && ((ingestionPhase === i + 1 || ingestionPhase === i) || (ingestionPhase === 5 && i === 4))
                              ? 'border-2 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                              : 'border-2 border-transparent'
                          }`}
                        >
                          <step.icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <span className="text-[11px] text-foreground font-medium mt-1">{step.label}</span>
                        <span className="text-[9px] text-muted-foreground">{step.sublabel}</span>
                        
                        {/* Arrow from Embed (right side) → VectorDB - always visible */}
                        {i === ingestionSteps.length - 1 && (
                          <div className="absolute right-[-300px] top-1/2 -translate-y-1/2" style={{ zIndex: 100, pointerEvents: 'none' }}>
                            <svg width="300" height="400" viewBox="0 0 300 400" style={{ overflow: 'visible' }}>
                              {/* Z-shaped path: horizontal right, then vertical down, then horizontal left to VectorDB - always visible */}
                              <path
                                d="M 0 190 L 70 190 L 70 360 L -200 360"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2.5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity={1}
                              />
                              {/* Arrowhead pointing left to VectorDB */}
                              <path
                                d="M -190 355 L -200 360 L -190 365"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2.5"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                opacity={1}
                              />
                              {/* Traveling dot - only during ingestion phase 5 (after Chunking → Embed completes) */}
                              {ingestionPipelineHighlighted && ingestionPhase === 5 && (
                                <motion.circle
                                  key="embed-vectordb-dot"
                                  r="3.5"
                                  fill="hsl(var(--primary))"
                                  initial={{ cx: 0, cy: 190, opacity: 0 }}
                                  animate={{
                                    cx: [0, 70, 70, -200, -200],
                                    cy: [190, 190, 360, 360, 360],
                                    opacity: [0, 1, 1, 1, 0]
                                  }}
                                  transition={{
                                    duration: 2,
                                    times: [0, 0.25, 0.5, 0.95, 1],
                                    repeat: 0,
                                    ease: "easeInOut"
                                  }}
                                />
                              )}
                              {/* "Vectorised" label - only when arrow is active (phase 5) */}
                              {ingestionPipelineHighlighted && ingestionPhase === 5 && (
                                <motion.text
                                  x="50"
                                  y="350"
                                  fill="hsl(38, 92%, 50%)"
                                  fontSize="11"
                                  fontFamily="inherit"
                                  textAnchor="end"
                                  fontWeight="500"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  Vectorised
                                </motion.text>
                              )}
                            </svg>
                          </div>
                        )}
                      </div>

                      {i < ingestionSteps.length - 1 && (
                        <div className="flex items-center justify-center px-2" style={{ height: '48px' }}>
                          <AnimatedArrow active={ingestionPipelineHighlighted && ingestionPhase === i + 1} delay={0} width={28} repeat={0} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow from Ingestion to RAG - Diagonal from Embed to VectorDB */}
              {!queryPipelineHighlighted && (
              <div className="flex justify-center relative h-6">
                <svg width="100%" height="100%" viewBox="0 0 920 24" className="absolute inset-0 overflow-visible" preserveAspectRatio="none">
                  {/* Diagonal path from Embed (right side, ~85% = 782px) to VectorDB (center, 50% = 460px) */}
                  <path
                    d="M782 0 L460 24"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity={1}
                  />
                  {/* Arrowhead pointing down to VectorDB */}
                  <path
                    d="M465 20 L460 24 L455 20"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={1}
                  />
                </svg>
              </div>
              )}

              {/* RAG KNOWLEDGE BASE */}
              <div className="border-2 border-primary/30 rounded-lg p-2 bg-primary/5 w-fit flex flex-col">
                <span className="text-[11px] text-primary font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-2 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  RAG Knowledge Base
                </span>

                <div className="flex-1 flex flex-col items-center justify-center">
                  {/* VectorDB */}
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-12 h-12 rounded-lg bg-muted/40 flex items-center justify-center m-2 transition-colors ${
                        queryPipelineHighlighted && (phase === 3 || phase === 4)
                          ? 'border-2 border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]'
                          : ingestionPipelineHighlighted && ingestionPhase === 5
                          ? 'border-2 border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]'
                          : 'border-2 border-transparent'
                      }`}
                    >
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground font-medium mt-1">VectorDB</span>
                    <span className="text-[9px] text-muted-foreground">Tax Knowledge</span>
                  </div>

                  {/* Bidirectional arrow Retriever ↔ VectorDB */}
                  <div className="my-1">
                    <svg width="20" height="40" viewBox="0 0 20 40">
                      {/* Vertical line connecting both */}
                      <path
                        d="M10 4 L10 36"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={1}
                      />
                      {/* Upward arrowhead (Retriever → VectorDB) */}
                      <path
                        d="M5 12 L10 4 L15 12"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={1}
                      />
                      {/* Downward arrowhead (VectorDB → Retriever) */}
                      <path
                        d="M5 28 L10 36 L15 28"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity={1}
                      />
                      {/* Traveling dot: Retriever → VectorDB (upward) */}
                      {queryPipelineHighlighted && phase >= 3 && phase < 4 && (
                        <motion.circle
                          key="retriever-vectordb-up"
                          r="2.5"
                          cx="10"
                          fill="hsl(var(--primary))"
                          initial={{ cy: 36, opacity: 0 }}
                          animate={{
                            cy: [36, 8],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: 0,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                      {/* Traveling dot: VectorDB → Retriever (downward) */}
                      {queryPipelineHighlighted && phase >= 4 && phase < 7 && (
                        <motion.circle
                          key="vectordb-retriever-down"
                          r="2.5"
                          cx="10"
                          fill="hsl(var(--primary))"
                          initial={{ cy: 4, opacity: 0 }}
                          animate={{
                            cy: [4, 32],
                            opacity: [0, 1, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: 0,
                            ease: "easeInOut"
                          }}
                        />
                      )}
                    </svg>
                  </div>

                  {/* Retriever */}
                  <div className="flex flex-col items-center relative">
                    <div 
                      className={`w-12 h-12 rounded-lg bg-muted/40 flex items-center justify-center m-2 transition-colors ${
                        queryPipelineHighlighted && (phase === 2 || phase === 3 || phase === 4 || phase === 5)
                          ? 'border-2 border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]'
                          : 'border-2 border-transparent'
                      }`}
                    >
                      <Filter className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground font-medium mt-1">Retriever</span>
                    <span className="text-[9px] text-muted-foreground">Semantic Search</span>
                    
                    {/* Arrow from Retriever right side → LLM - always visible */}
                    <div className="absolute right-[-300px] top-1/2 -translate-y-1/2" style={{ zIndex: 100, pointerEvents: 'none' }}>
                      <svg width="300" height="200" viewBox="0 0 300 200" style={{ overflow: 'visible' }}>
                        {/* L-shaped path: horizontal right, then vertical down - always visible */}
                        <path
                          d="M 0 80 L 70 80 L 70 220"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={1}
                        />
                        {/* Arrowhead pointing down - always visible */}
                        <path
                          d="M 65 210 L 70 220 L 75 210"
                          stroke="hsl(var(--primary))"
                          strokeWidth="2.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity={1}
                        />
                        {/* Traveling dot - only during phase 5-6 */}
                        {queryPipelineHighlighted && phase >= 5 && phase < 6 && (
                          <motion.circle
                            key="retriever-llm-dot"
                            r="3.5"
                            fill="hsl(var(--primary))"
                            initial={{ cx: 0, cy: 80, opacity: 0 }}
                            animate={{
                              cx: [0, 70, 70],
                              cy: [80, 80, 200],
                              opacity: [0, 1, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: 0,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                        {/* "Prompt + Context" label - only during phase 5-6 */}
                        {queryPipelineHighlighted && phase >= 5 && phase < 6 && (
                          <text
                            x="42"
                            y="75"
                            fill="hsl(var(--primary))"
                            fontSize="11"
                            fontFamily="inherit"
                            textAnchor="middle"
                            fontWeight="500"
                          >
                            Prompt + Context
                          </text>
                        )}
                      </svg>
                    </div>
                  </div>
                  </div>
                </div>

                {/* Connector area: Web App ↑ Retriever and Retriever → Web App → LLM */}
              <div className="flex justify-center items-center py-2 relative" style={{ minHeight: '64px' }}>
                {/* Vertical arrow: Web App → Retriever - centered and visible (bottom to top) */}
                <div className="flex flex-col items-center justify-center z-10">
                  <AnimatedReverseVerticalArrow 
                    active={queryPipelineHighlighted && phase >= 2 && phase < 3} 
                    height={40}
                    repeat={0}
                  />
                </div>
                
                {/* Arrow from Retriever → Web App (with Prompt + Context) */}
                <div className="absolute inset-0" style={{ zIndex: 50, pointerEvents: 'none', overflow: 'visible' }}>
                  <svg 
                    width="100%" 
                    height="100%" 
                    className="absolute"
                    style={{ top: 0, left: 0, overflow: 'visible' }}
                    viewBox="0 0 920 64"
                    preserveAspectRatio="none"
                  >
                    {/* Vertical arrow: Retriever → Web App (downward, centered) */}
                    <path
                      d="M 460 12 L 460 52"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Arrowhead pointing down to Web App */}
                    <path
                      d="M 455 47 L 460 52 L 465 47"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Traveling dot: Retriever → Web App */}
                    {queryPipelineHighlighted && phase >= 5 && phase < 6 && (
                      <motion.circle
                        key="retriever-webapp-dot"
                        r="3.5"
                        fill="hsl(var(--primary))"
                        initial={{ cx: 460, cy: 12, opacity: 0 }}
                        animate={{
                          cx: 460,
                          cy: [12, 52],
                          opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: 0,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </svg>
                </div>
              </div>

              {/* QUERY PIPELINE */}
              <div 
                className={`border-2 border-emerald-500/30 rounded-lg p-2 cursor-pointer transition-all w-fit ${
                  queryPipelineHighlighted 
                    ? 'border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/20' 
                    : 'bg-emerald-500/5 hover:bg-emerald-500/10'
                }`}
                onClick={startQueryAnimation}
              >
                <span className="text-[11px] text-emerald-400 font-semibold tracking-wider uppercase flex items-center gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Query Pipeline
                </span>

                <div className="flex items-center justify-center relative">
                  {/* Query → Web App → LLM - symmetric layout */}
                  <div className="flex items-center">
                    {/* Query */}
                    <div 
                      className="flex flex-col items-center"
                    >
                      <div 
                        className={`w-12 h-12 rounded-lg bg-muted/40 flex items-center justify-center m-2 transition-all ${
                          queryPipelineHighlighted && phase === 1 && phase < 5
                            ? 'border-2 border-emerald-500 shadow-[0_0_15px_hsl(var(--emerald-500)/0.4)]'
                            : 'border-2 border-transparent'
                        }`}
                      >
                        <PenLine className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <span className="text-[11px] text-foreground font-medium mt-1">Query</span>
                    </div>

                    {/* Arrow Query → Web App - centered between icons */}
                    <div className="flex items-center justify-center px-2" style={{ height: '48px' }}>
                      <AnimatedArrow active={queryPipelineHighlighted && phase === 1} width={28} repeat={0} />
                    </div>
                  </div>

                  {/* Web App - centered */}
                  <div 
                    className="flex flex-col items-center"
                  >
                    <div 
                      className={`w-12 h-12 rounded-lg bg-muted/40 flex items-center justify-center m-2 transition-all ${
                        queryPipelineHighlighted && ((phase === 1 || phase === 2) && phase < 5) || phase === 6
                          ? 'border-2 border-emerald-500 shadow-[0_0_15px_hsl(var(--emerald-500)/0.4)]'
                          : 'border-2 border-transparent'
                      }`}
                    >
                      <Monitor className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="text-[11px] text-foreground font-medium mt-1">Web App</span>
                  </div>

                  {/* LLM - symmetric with Query */}
                  <div className="flex items-center">
                    {/* Answer arrow (LLM → Web App) - centered between icons */}
                    <div className="flex items-center justify-center px-2" style={{ height: '48px' }}>
                      <AnimatedReverseArrow active={queryPipelineHighlighted && phase >= 6} width={28} repeat={0} />
                    </div>

                    {/* LLM */}
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-12 h-12 rounded-lg bg-muted/40 flex items-center justify-center m-2 transition-all ${
                          queryPipelineHighlighted && (phase >= 5 && phase < 7)
                            ? 'border-2 border-emerald-500 shadow-[0_0_15px_hsl(var(--emerald-500)/0.4)]'
                            : 'border-2 border-transparent'
                        }`}
                      >
                        <Brain className="w-5 h-5 text-emerald-500" />
                      </div>
                      <span className="text-[11px] text-foreground font-medium mt-1">LLM</span>
                    </div>
                  </div>
                </div>

                {/* Answer label */}
                {queryPipelineHighlighted && phase >= 6 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-emerald-400/70 text-center mt-2"
                  >
                    ← Cited Answer
                  </motion.div>
                )}
              </div>
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

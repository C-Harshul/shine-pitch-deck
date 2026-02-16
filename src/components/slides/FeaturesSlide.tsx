import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Flag, Search, X } from "lucide-react";
import { useState } from "react";
import Slide from "@/components/Slide";
import DocumentProcessingAnimation from "@/components/DocumentProcessingAnimation";
import ResearchAnimation from "@/components/ResearchAnimation";
import NuminaIntelligenceDiagram from "@/components/NuminaIntelligenceDiagram";
import FlaggingSimpleDiagram from "@/components/FlaggingSimpleDiagram";
import FlaggingAnimation from "@/components/FlaggingAnimation";

const features = [
  {
    icon: RefreshCw,
    title: "Reconcile",
    subtitle: "Invoices to ledger. Automatically.",
    description: "Extracts POs, invoices, and receipts from email, matches them to your ledger.",
    clickable: true,
    animationType: "reconcile"
  },
  {
    icon: Flag,
    title: "Flag",
    subtitle: "Your rules. Enforced in real-time.",
    description: "Define standards once. Numina catches issues before they become audit problems.",
    clickable: true,
    animationType: "flag"
  },
  {
    icon: Search,
    title: "Research",
    subtitle: "Compliance answers. Instantly.",
    description: "Ask tax and regulatory questions in plain English. Get cited answers.",
    clickable: true,
    animationType: "research"
  }
];

const FeaturesSlide = () => {
  const [showReconcileAnimation, setShowReconcileAnimation] = useState(false);
  const [researchView, setResearchView] = useState<"simple" | "detailed" | null>(null);
  const [flaggingView, setFlaggingView] = useState<"simple" | "detailed" | null>(null);

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (features[index].animationType === "reconcile") {
      setShowReconcileAnimation(true);
    } else if (features[index].animationType === "research") {
      setResearchView("simple");
    } else if (features[index].animationType === "flag") {
      setFlaggingView("simple");
    }
  };

  return (
    <Slide>
      <div className="max-w-6xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Capabilities
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-12 animate-fade-up delay-100">
          One platform. <span className="text-gradient">Three time-savers.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card p-10 animate-fade-up ${feature.clickable ? 'cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all' : ''}`}
              style={{ animationDelay: `${200 + index * 100}ms` }}
              onClick={(e) => handleCardClick(e, index)}
            >
              <div className="step-number mb-8 w-16 h-16">
                <feature.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-primary text-base font-medium mb-4">{feature.subtitle}</p>
              <p className="text-muted-foreground text-xl leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <DocumentProcessingAnimation 
        isOpen={showReconcileAnimation} 
        onClose={() => setShowReconcileAnimation(false)} 
      />

      {/* Single Research modal: default (Numina as one intelligence) and detailed (RAG/LLM plumbing) on the same card */}
      <AnimatePresence>
        {researchView !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
            onClick={() => setResearchView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] max-w-full max-h-full bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/80 backdrop-blur-sm shrink-0">
                <button onClick={() => setResearchView(null)} className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors shrink-0 relative z-[1]" title="Close">
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h3 className="text-xl font-semibold text-primary">Numina — Research</h3>
                </div>
                {researchView === "simple" ? (
                  <button
                    onClick={() => setResearchView("detailed")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-colors shrink-0 relative z-[1]"
                  >
                    Detailed explanation
                  </button>
                ) : (
                  <button
                    onClick={() => setResearchView("simple")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 border border-border transition-colors shrink-0 relative z-[1]"
                  >
                    Overview
                  </button>
                )}
              </div>
              <div className="flex-1 min-h-[280px] overflow-auto relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
                <div className="relative w-full h-full min-h-[240px] flex flex-col items-center justify-center overflow-auto pt-4 pb-6 px-4 md:px-8">
                  {researchView === "simple" && (
                    <div key="research-simple" className="w-full flex-1 min-h-0 flex items-center justify-center">
                      <NuminaIntelligenceDiagram embedded />
                    </div>
                  )}
                  {researchView === "detailed" && (
                    <ResearchAnimation key="research-detailed" isOpen={true} onClose={() => setResearchView(null)} embedded />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Single Flagging modal: default (simple) and detailed on the same card */}
      <AnimatePresence>
        {flaggingView !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
            onClick={() => setFlaggingView(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] max-w-full max-h-full bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: close left, title centre, toggle right */}
              <div className="relative flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/80 backdrop-blur-sm shrink-0">
                <button onClick={() => setFlaggingView(null)} className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors shrink-0 relative z-[1]" title="Close">
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h3 className="text-xl font-semibold text-primary">Numina — Automatic Flagging</h3>
                </div>
                {flaggingView === "simple" ? (
                  <button
                    onClick={() => setFlaggingView("detailed")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25 transition-colors shrink-0 relative z-[1]"
                  >
                    Detailed explanation
                  </button>
                ) : (
                  <button
                    onClick={() => setFlaggingView("simple")}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium bg-muted hover:bg-muted/80 border border-border transition-colors shrink-0 relative z-[1]"
                  >
                    Overview
                  </button>
                )}
              </div>
              {/* Body: same card layout (grid) for both; content replaces on toggle */}
              <div className="flex-1 min-h-[280px] overflow-auto relative">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
                <div className="relative w-full h-full min-h-[240px] flex flex-col items-center justify-center overflow-auto pt-4 pb-6 px-4 md:px-8">
                  {flaggingView === "simple" && (
                    <div key="flagging-simple" className="w-full flex-1 min-h-0 flex items-center justify-center">
                      <FlaggingSimpleDiagram isOpen={true} onClose={() => setFlaggingView(null)} embedded />
                    </div>
                  )}
                  {flaggingView === "detailed" && (
                    <FlaggingAnimation key="flagging-detailed" isOpen={true} onClose={() => setFlaggingView(null)} embedded />
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Slide>
  );
};

export default FeaturesSlide;

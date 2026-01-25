import { RefreshCw, Flag, Search } from "lucide-react";
import { useState } from "react";
import Slide from "@/components/Slide";
import DocumentProcessingAnimation from "@/components/DocumentProcessingAnimation";

const features = [
  {
    icon: RefreshCw,
    title: "Reconcile",
    subtitle: "Invoices to ledger. Automatically.",
    description: "Extracts POs, invoices, and receipts from email—matches them to your ledger.",
    clickable: true
  },
  {
    icon: Flag,
    title: "Flag",
    subtitle: "Your rules. Enforced in real-time.",
    description: "Define standards once. Numina catches issues before they become audit problems.",
    clickable: false
  },
  {
    icon: Search,
    title: "Research",
    subtitle: "Compliance answers. Instantly.",
    description: "Ask tax and regulatory questions in plain English. Get cited answers.",
    clickable: false
  }
];

const FeaturesSlide = () => {
  const [showReconcileAnimation, setShowReconcileAnimation] = useState(false);

  const handleCardClick = (index: number) => {
    if (features[index].clickable) {
      setShowReconcileAnimation(true);
    }
  };

  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Capabilities
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mb-12 animate-fade-up delay-100">
          One platform. <span className="text-gradient">Three time-savers.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`feature-card animate-fade-up ${feature.clickable ? 'cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all' : ''}`}
              style={{ animationDelay: `${200 + index * 100}ms` }}
              onClick={() => handleCardClick(index)}
            >
              <div className="step-number mb-6">
                <feature.icon className="w-5 h-5" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-primary text-sm font-medium mb-4">{feature.subtitle}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
              {feature.clickable && (
                <p className="text-primary/60 text-xs mt-4 font-medium">Click to see demo →</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <DocumentProcessingAnimation 
        isOpen={showReconcileAnimation} 
        onClose={() => setShowReconcileAnimation(false)} 
      />
    </Slide>
  );
};

export default FeaturesSlide;

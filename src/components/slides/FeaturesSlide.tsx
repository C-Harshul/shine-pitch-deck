import { useEffect } from "react";
import { RefreshCw, Flag, Search } from "lucide-react";
import Slide from "@/components/Slide";
import { useFeatureModals } from "@/contexts/FeatureModalsContext";
import { usePresentation } from "@/contexts/PresentationContext";

const features = [
  {
    icon: RefreshCw,
    title: "Reconcile",
    subtitle: "Invoices to ledger. Automatically.",
    description: "Extracts POs, invoices, and receipts from email, matches them to your ledger.",
    clickable: true,
    animationType: "reconcile" as const,
  },
  {
    icon: Flag,
    title: "Flag",
    subtitle: "Your rules. Enforced in real-time.",
    description: "Define standards once. Numina catches issues before they become audit problems.",
    clickable: true,
    animationType: "flag" as const,
  },
  {
    icon: Search,
    title: "Research",
    subtitle: "Compliance answers. Instantly.",
    description: "Ask tax and regulatory questions in plain English. Get cited answers.",
    clickable: true,
    animationType: "research" as const,
  },
];

const FeaturesSlide = () => {
  const { openReconcile, openResearch, openFlagging, advanceCapabilities, reverseCapabilities, resetCapabilitiesWalkthrough } = useFeatureModals();
  const { registerNavInterceptor, currentSlide, totalSlides } = usePresentation();

  // Find this slide's index by checking if it's currently active.
  // Since we can't know our index, we register on mount of currentSlide and let parent route based on visibility.
  // Simpler: since FeaturesSlide is only rendered once, we register/unregister based on whether it's the active slide.
  // We detect activeness by listening to a render check below.
  useEffect(() => {
    // Determine whether this slide is the active one by reading our DOM ancestor.
    // Easier: register always, but only intercept if our DOM is the visible slide.
    const check = () => {
      const el = document.querySelector('[data-slide="features"]');
      if (!el) return false;
      const wrapper = el.closest('.absolute.inset-0');
      return wrapper?.classList.contains('opacity-100') ?? false;
    };
    registerNavInterceptor((dir) => {
      if (!check()) return false;
      if (dir === "next") return advanceCapabilities();
      return reverseCapabilities();
    });
    return () => {
      registerNavInterceptor(null);
      resetCapabilitiesWalkthrough();
    };
  }, [registerNavInterceptor, advanceCapabilities, reverseCapabilities, resetCapabilitiesWalkthrough, currentSlide, totalSlides]);

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const type = features[index].animationType;
    if (type === "reconcile") openReconcile();
    else if (type === "research") openResearch();
    else if (type === "flag") openFlagging();
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
              className={`feature-card p-10 animate-fade-up ${feature.clickable ? "cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all" : ""}`}
              style={{ animationDelay: `${200 + index * 100}ms` }}
              onClick={(e) => handleCardClick(e, index)}
            >
              <div className="step-number mb-8 w-16 h-16">
                <feature.icon className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-primary text-base font-medium mb-4">{feature.subtitle}</p>
              <p className="text-muted-foreground text-xl leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default FeaturesSlide;

import { RefreshCw, Flag, Search, Play } from "lucide-react";
import Slide from "@/components/Slide";
import { useFeatureModals } from "@/contexts/FeatureModalsContext";
import { AppendixBackToTOC } from "./AppendixBackToTOC";

const DetailedAnimationsSlide = () => {
  const { openReconcile, openResearch, openFlagging } = useFeatureModals();

  const features = [
    {
      icon: RefreshCw,
      title: "Reconcile",
      description: "Invoices to ledger — full flow",
      onOpen: () => openReconcile(),
    },
    {
      icon: Flag,
      title: "Flag",
      description: "Rule-based transaction flagging — detailed",
      onOpen: () => openFlagging(true),
    },
    {
      icon: Search,
      title: "Research",
      description: "Regulatory knowledge base — detailed",
      onOpen: () => openResearch(true),
    },
  ];

  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4" onClick={(e) => e.stopPropagation()}>
          <AppendixBackToTOC />
        </div>
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">
          Appendix — Feature flows
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Detailed <span className="text-primary">animations</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Click a card to open the full flow. Reconcile, Flagging, and Research in detail.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                feature.onOpen();
              }}
              className="feature-card p-8 text-left cursor-pointer hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all group"
            >
              <div className="step-number mb-6 w-16 h-16 group-hover:scale-105 transition-transform">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <Play className="w-4 h-4" />
                Open animation
              </span>
            </button>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default DetailedAnimationsSlide;

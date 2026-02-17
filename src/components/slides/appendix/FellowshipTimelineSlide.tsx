import Slide from "@/components/Slide";
import { Calendar, CheckCircle } from "lucide-react";
import { AppendixBackToTOC } from "./AppendixBackToTOC";

const phases = [
  {
    title: "Phase 1: Market validation (Months 1–2)",
    items: ["Surveys and interviews with CPAs across geographies", "State CPA organizations, high-value industries", "Test positioning; create industry portfolio"],
    deliverable: "Market research report with target segment recommendation",
  },
  {
    title: "Phase 2: Pilot & GTM (Months 2–4)",
    items: ["Targeted outreach via LinkedIn, CPA associations, referrals", "30–60 day pilots with 2–3 CPAs", "Client-deployable version; measure time savings", "Dartmouth Anthropic/AWS partnership exploration"],
    deliverable: "Pilot results (10+ hours saved/CPA monthly, testimonials)",
  },
  {
    title: "Phase 3: Pricing (Months 4–6)",
    items: ["Token consumption by client type", "Revenue scenarios by firm size and vertical", "Value-based pricing tied to 20–50% throughput increase", "ROI-first messaging"],
    deliverable: "Pricing strategy document with model and sensitivity analysis",
  },
  {
    title: "Phase 4: Conversion & expansion (Months 6–8)",
    items: ["Pilots → $750/client/month (5–10 clients per CPA)", "Case studies with quantified ROI", "Referral program and self-service onboarding", "Sales playbook"],
    deliverable: "GTM playbook, 3–5 case studies, referral framework",
  },
  {
    title: "Phase 5: Final presentation (Month 9)",
    items: ["Validated problem, solution metrics", "Optimal segments, pricing model", "Conversion data and commercialization path"],
    deliverable: "Comprehensive presentation",
  },
];

const FellowshipTimelineSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4" onClick={(e) => e.stopPropagation()}>
          <AppendixBackToTOC />
        </div>
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">
          Appendix — Fellowship
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
          <Calendar className="w-9 h-9 text-primary" />
          Project plan: fellowship work program
        </h2>
        <p className="text-muted-foreground text-lg mb-4">
          Nine-month timeline and deliverables
        </p>

        <div className="space-y-4 max-h-[68vh] overflow-y-auto pr-2">
          {phases.map((phase, i) => (
            <div key={i} className="feature-card p-4">
              <h3 className="text-base font-bold mb-2 text-primary">{phase.title}</h3>
              <ul className="space-y-1 text-muted-foreground text-sm mb-2 list-none pl-0">
                {phase.items.map((item, j) => (
                  <li key={j} className="flex gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs font-medium text-foreground/90 border-t border-border/50 pt-1.5">
                Deliverable: {phase.deliverable}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default FellowshipTimelineSlide;

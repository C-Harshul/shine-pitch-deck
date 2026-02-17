import Slide from "@/components/Slide";
import { Handshake, Building2, Users, GraduationCap } from "lucide-react";
import { AppendixBackToTOC } from "./AppendixBackToTOC";

const resources = [
  {
    icon: Handshake,
    title: "Partner CPA",
    detail: "Edward Collins (CPA Board at Recbooks) — hands-on build and validation, accounting domain expertise, real-world testing.",
  },
  {
    icon: Building2,
    title: "Strategic partners",
    detail: "Mercury: banking infrastructure, startup resources (AWS credits, software licenses). Partnership targeted mid-Feb 2026 (Stripe Atlas, Mercury account).",
  },
  {
    icon: Users,
    title: "Industry advisors",
    detail: "Joseph McGee: T-shaped intelligence and selling through professionals shaped positioning and GTM.",
  },
  {
    icon: GraduationCap,
    title: "Dartmouth & fellowship",
    detail: "Magnuson Center for Entrepreneurship; Conrades Fellow community and Dartmouth alumni network for mentorship and introductions.",
  },
];

const ResourcesSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4" onClick={(e) => e.stopPropagation()}>
          <AppendixBackToTOC />
        </div>
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">
          Appendix — Support
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Resources and <span className="text-primary">support</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Partner CPA, strategic partners, advisors, and institutional support
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((r, i) => (
            <div key={i} className="feature-card p-6 flex gap-4 items-start">
              <r.icon className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default ResourcesSlide;

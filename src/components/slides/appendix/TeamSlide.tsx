import Slide from "@/components/Slide";
import { User, TrendingUp, Code } from "lucide-react";
import { AppendixBackToTOC } from "./AppendixBackToTOC";

const team = [
  {
    icon: User,
    name: "Harshul Chandrashekhar",
    role: "Product lead",
    text: "Software engineering background; leads product and bridges technical capabilities with market needs. Echo framework: rapid prototypes, user validation, technical requirements. MEM coursework in Pricing Strategy and Analytics.",
  },
  {
    icon: TrendingUp,
    name: "Manish Reddy",
    role: "Sales & client outreach",
    text: "Leads client acquisition and stakeholder engagement. Reached initial CPA stakeholders and guided pain-point discovery. Recognizes niche problems and leverages networks for rapid validation.",
  },
  {
    icon: Code,
    name: "Muhammad Aatiq",
    role: "Technical lead",
    text: "Builds production-ready solutions. Once demand is validated and requirements are clear, transforms prototypes into robust, scalable, client-deployable systems. Enterprise-grade reliability.",
  },
];

const TeamSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4" onClick={(e) => e.stopPropagation()}>
          <AppendixBackToTOC />
        </div>
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">
          Appendix — Team
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Numina <span className="text-primary">founding team</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Product strategy, sales & validation, and technical execution
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i} className="feature-card p-6 flex flex-col h-full">
              <div className="step-number w-14 h-14 mb-4 shrink-0">
                <member.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">{member.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default TeamSlide;

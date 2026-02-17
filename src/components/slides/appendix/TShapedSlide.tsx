import Slide from "@/components/Slide";
import { Layers, User } from "lucide-react";
import { AppendixBackToTOC } from "./AppendixBackToTOC";

const TShapedSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4" onClick={(e) => e.stopPropagation()}>
          <AppendixBackToTOC />
        </div>
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">
          Appendix — Positioning
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          T-shaped <span className="text-primary">intelligence</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Breadth from AI, depth from the accountant
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="feature-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">Horizontal (Breadth) — AI layer</h3>
            </div>
            <ul className="text-muted-foreground space-y-2 list-none pl-0">
              <li>Comprehensive knowledge across jurisdictions and regulations</li>
              <li>Automated processing of routine transactions</li>
              <li>Pattern recognition across thousands of cases</li>
              <li>Instant access to global accounting standards</li>
            </ul>
          </div>
          <div className="feature-card p-8">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-bold">Vertical (Depth) — Accountant expertise</h3>
            </div>
            <ul className="text-muted-foreground space-y-2 list-none pl-0">
              <li>Industry-specific knowledge</li>
              <li>Professional judgment on ambiguous situations</li>
              <li>Strategic advisory</li>
              <li>Compliance certification authority</li>
            </ul>
          </div>
        </div>

        <p className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-foreground">
          <strong>Result:</strong> Small businesses get enterprise-grade infrastructure with personalized oversight. Small accounting practices perform like firms 2–3× their size.
        </p>
      </div>
    </Slide>
  );
};

export default TShapedSlide;

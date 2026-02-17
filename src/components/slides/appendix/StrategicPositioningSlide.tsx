import Slide from "@/components/Slide";
import { Building2, Users } from "lucide-react";
import { AppendixBackToTOC } from "./AppendixBackToTOC";

const StrategicPositioningSlide = () => {
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
          Accountant <span className="text-primary">enablement</span>, not replacement
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          Numina flags issues and provides recommendations; the accountant reviews and approves all submissions. Human verification before client submission.
        </p>

        <div className="space-y-6">
          <div className="feature-card p-6 flex gap-4 items-start">
            <Building2 className="w-8 h-8 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-2">Primary user & buyer</h3>
              <p className="text-muted-foreground">
                Small and mid-sized accounting firms (CPAs) that find it unprofitable to serve SMBs under $5M in revenue due to fragmented data and manual reconciliation. CPAs own the workflow, make the purchase decision, and are responsible for accuracy and compliance.
              </p>
            </div>
          </div>
          <div className="feature-card p-6 flex gap-4 items-start">
            <Users className="w-8 h-8 text-primary shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-bold mb-2">End beneficiaries</h3>
              <p className="text-muted-foreground">
                Small business owners benefit indirectly through their accountants: real-time financial visibility, faster access to audits, financing, and strategic guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default StrategicPositioningSlide;

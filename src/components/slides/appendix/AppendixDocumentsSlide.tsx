import { FileText } from "lucide-react";
import Slide from "@/components/Slide";
import { AppendixBackToTOC } from "./AppendixBackToTOC";

const base = import.meta.env.BASE_URL;

const docs = [
  { title: "Market opportunity", file: "Numina_Market_Opportunity.pdf", href: `${base}Numina_Market_Opportunity.pdf` },
  { title: "Competitive analysis", file: "Numina_Competitive_Analysis.pdf", href: `${base}Numina_Competitive_Analysis.pdf` },
  { title: "Strategic positioning", file: "Numina_Strategic_Positioning.pdf", href: `${base}Numina_Strategic_Positioning.pdf` },
];

const AppendixDocumentsSlide = () => {
  return (
    <Slide variant="centered">
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex justify-end mb-6" onClick={(e) => e.stopPropagation()}>
          <AppendixBackToTOC />
        </div>
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
          Appendix — Documents
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Market, competitive &amp; <span className="text-primary">positioning</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Full analysis: market opportunity, competitive landscape, and strategic positioning in the documents below.
        </p>

        <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
          {docs.map((d) => (
            <a
              key={d.file}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-full rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 px-5 py-4 transition-colors group"
            >
              <FileText className="w-6 h-6 text-primary shrink-0" />
              <div className="min-w-0">
                <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {d.title}
                </div>
                <div className="text-sm text-muted-foreground truncate">{d.file}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default AppendixDocumentsSlide;

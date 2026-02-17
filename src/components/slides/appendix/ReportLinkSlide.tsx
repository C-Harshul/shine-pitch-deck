import { FileText } from "lucide-react";
import Slide from "@/components/Slide";
import { AppendixBackToTOC } from "./AppendixBackToTOC";

const reportUrl = `${import.meta.env.BASE_URL}Numina_Conrades_23Jan.pdf`;

const ReportLinkSlide = () => {
  return (
    <Slide variant="centered">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-end mb-6" onClick={(e) => e.stopPropagation()}>
          <AppendixBackToTOC />
        </div>
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">
          Appendix — Full report
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Conrades proposal <span className="text-primary">(full document)</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          AI-Powered Accounting Intelligence for Small Business — January 2026
        </p>
        <a
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          <FileText className="w-6 h-6" />
          Open PDF report
        </a>
        <p className="text-muted-foreground/70 text-sm mt-6">
          Numina Conrades Distinguished Fellowship Proposal
        </p>
      </div>
    </Slide>
  );
};

export default ReportLinkSlide;

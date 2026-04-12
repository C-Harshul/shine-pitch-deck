import { Settings, Handshake, TrendingUp } from "lucide-react";
import Slide from "@/components/Slide";

type Column = {
  icon?: typeof Settings;
  logo?: string;
  title: string;
  bullets: string[];
};

const columns: Column[] = [
  {
    icon: Settings,
    title: "Product Ready",
    bullets: [
      "Reconciliation & flagging tested with CPAs",
      "Knowledge base pipeline ready for deployment",
      "15–20 CPAs piloting in India",
    ],
  },
  {
    icon: Handshake,
    title: "Strategic Validation",
    bullets: [
      "Edward Collins (Recbooks) partnering to refine solution",
      "Mercury: Banking partner with perks for AWS, Quickbooks credits",
      "Network of advisors shaping GTM",
    ],
  },
  {
    icon: TrendingUp,
    title: "Market Validation",
    bullets: [
      "Regulatory Knowledgebase problem and solution validated",
      "Demand for decision support, not just automation",
      "User-centered from day one",
    ],
  },
];

const MomentumSlide = () => {
  return (
    <Slide>
      <div className="max-w-6xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block animate-fade-up">
          Momentum
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4 animate-fade-up delay-100">
          Validation from <span className="text-primary">users</span> and <span className="text-primary">industry partners</span>
        </h2>
        <p className="text-xl text-muted-foreground mb-10 animate-fade-up delay-200">
          We've validated the problem and proven the solution
        </p>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {columns.map((col, index) => (
            <div
              key={index}
              className="feature-card animate-fade-up p-6 md:p-7 flex flex-col h-full"
              style={{ animationDelay: `${150 + index * 100}ms` }}
            >
              {col.logo ? (
                <div className="w-14 h-14 mb-5 shrink-0 flex items-center justify-center rounded-full border border-primary/20 bg-white/10 backdrop-blur-sm">
                  <img src={col.logo} alt="Dartmouth" className="h-8 w-auto invert brightness-200" />
                </div>
              ) : col.icon ? (
                <div className="step-number w-14 h-14 mb-5 shrink-0">
                  <col.icon className="w-6 h-6" />
                </div>
              ) : null}
              <h3 className="text-xl md:text-2xl font-bold mb-4">{col.title}</h3>
              <ul className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed flex-1 list-none pl-0">
                {col.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm px-5 py-4 md:px-6 md:py-5 animate-fade-up delay-400 flex items-center justify-center gap-4">
          <img src="/dartmouth-logo.png" alt="Dartmouth" className="h-10 w-auto invert brightness-200" />
          <p className="text-base md:text-lg text-foreground font-semibold">
            Backed by Dartmouth's <span className="text-primary">Conrades Distinguished Fellowship</span>
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default MomentumSlide;

import { Settings, Handshake, TrendingUp } from "lucide-react";
import Slide from "@/components/Slide";

const columns = [
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
      "Mercury: Free banking partner with perks for AWS, Quickbooks credits",
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
              <div className="step-number w-14 h-14 mb-5 shrink-0">
                <col.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">{col.title}</h3>
              <ul className="space-y-2.5 text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                {col.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary shrink-0 mt-1.5">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-primary/20 bg-card/50 backdrop-blur-sm px-5 py-4 md:px-6 md:py-5 animate-fade-up delay-400">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
            With this momentum, the Conrades Fellowship will enable me to go all in on my entrepreneurial endeavor and work to incorporate, onboard paying clients, and finalize our pricing strategy.
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default MomentumSlide;

import { Target, Zap, TrendingUp } from "lucide-react";
import Slide from "@/components/Slide";

const points = [
  {
    icon: Target,
    title: "The Proven Problem",
    description: "A systemic market failure leaves small businesses underserved by CPAs"
  },
  {
    icon: Zap,
    title: "The Powerful Solution",
    description: "AI intelligence layer that eliminates 15-25 hours and doubles capacity"
  },
  {
    icon: TrendingUp,
    title: "The Clear Path",
    description: "Value-first GTM strategy with relationship-driven growth"
  }
];

const SummarySlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Summary
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mb-12 animate-fade-up delay-100">
          A proven problem, a powerful solution,
          <br />
          <span className="text-muted-foreground">and a clear path to scale</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <div 
              key={index} 
              className="feature-card animate-fade-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="step-number mb-6">
                <point.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-3">{point.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default SummarySlide;

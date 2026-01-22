import { TrendingDown, Clock, AlertTriangle } from "lucide-react";
import Slide from "@/components/Slide";

const painPoints = [
  {
    icon: TrendingDown,
    title: "Delayed Financial Visibility",
    description: "Business owners don't know their true financial position until weeks after month-end."
  },
  {
    icon: Clock,
    title: "Manual Reconciliation Overload",
    description: "CPAs spend the majority of their time on validation and error correction."
  },
  {
    icon: AlertTriangle,
    title: "Certification & Audit Delays",
    description: "Incomplete data triggers repeated back-and-forth with auditors."
  }
];

const PainPointsSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Pain Points
        </span>

        <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-up delay-100">
          This failure creates a vicious cycle
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div 
              key={index} 
              className="feature-card animate-fade-up"
              style={{ animationDelay: `${200 + index * 100}ms` }}
            >
              <div className="step-number mb-6">
                <point.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
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

export default PainPointsSlide;

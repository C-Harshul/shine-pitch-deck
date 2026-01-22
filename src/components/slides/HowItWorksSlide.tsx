import { Link, CheckCircle, Shield } from "lucide-react";
import Slide from "@/components/Slide";

const steps = [
  {
    number: "01",
    icon: Link,
    title: "Connect",
    description: "Emails, spreadsheets, invoices—wherever your clients' data lives."
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "Validate",
    description: "AI checks every entry against your rules. Incomplete? Flagged instantly."
  },
  {
    number: "03",
    icon: Shield,
    title: "Close",
    description: "You review and approve. Nothing hits the books without your sign-off."
  }
];

const HowItWorksSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          How It Works
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up delay-100">
          Connect. Validate. Close.
        </h2>
        <p className="text-xl text-muted-foreground mb-12 animate-fade-up delay-200">
          Three simple steps to cleaner books
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-fade-up"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              
              <div className="feature-card relative z-10 h-full text-center">
                <div className="step-number mx-auto mb-4">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-4xl font-bold text-muted-foreground/20">{step.number}</span>
                <h3 className="text-2xl font-bold mt-2 mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default HowItWorksSlide;

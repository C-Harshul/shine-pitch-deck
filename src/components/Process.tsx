import { Link, CheckCircle, Shield } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link,
    title: "Connect your data sources",
    description: "Emails, spreadsheets, files, invoices—wherever your clients' data lives. Numina ingests it automatically."
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "Numina validates & flags",
    description: "AI checks every entry against your rules. Incomplete? Flagged. Missing details? Flagged. Ready for review in real-time."
  },
  {
    number: "03",
    icon: Shield,
    title: "You review and approve",
    description: "Nothing hits the books without your sign-off. You see exactly what changed and why."
  }
];

const Process = () => {
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="headline text-3xl md:text-4xl lg:text-5xl">
            Connect. Validate. Close.
          </h2>
          <p className="subtitle mx-auto mt-4 text-center">
            Three simple steps to cleaner books
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-0" />
              )}
              
              <div className="feature-card relative z-10 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="step-number">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-bold text-muted-foreground/30">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;

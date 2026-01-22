import { RefreshCw, Flag, Search } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    title: "Reconcile",
    subtitle: "Invoices to ledger. Automatically.",
    description: "Numina extracts POs, invoices, and receipts from email—matches them to your ledger—surfaces discrepancies for review."
  },
  {
    icon: Flag,
    title: "Flag",
    subtitle: "Your rules. Enforced in real-time.",
    description: "Define your standards once: missing descriptions, amounts over threshold, incomplete entries. Numina catches them before they become audit problems."
  },
  {
    icon: Search,
    title: "Research",
    subtitle: "Compliance answers. Instantly.",
    description: "Ask tax and regulatory questions in plain English. Get cited answers without digging through PDFs."
  }
];

const Features = () => {
  return (
    <section className="section bg-radial">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Capabilities
          </span>
          <h2 className="headline text-3xl md:text-4xl lg:text-5xl">
            One platform.
            <br />
            <span className="text-gradient">Three time-savers.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="feature-card group">
              <div className="step-number mb-6 transition-all duration-300 group-hover:scale-110">
                <feature.icon className="w-5 h-5" />
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-primary text-sm font-medium mb-4">{feature.subtitle}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

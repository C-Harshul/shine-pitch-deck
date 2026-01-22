import { TrendingDown, Clock, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: TrendingDown,
    title: "Delayed Financial Visibility",
    description: "Business owners don't know their true financial position until weeks after month-end, making proactive decisions impossible."
  },
  {
    icon: Clock,
    title: "Manual Reconciliation Overload",
    description: "CPAs spend 60-70% of their time on validation and error correction, with 15-25 hours per month on reconciliation alone."
  },
  {
    icon: AlertTriangle,
    title: "Certification & Audit Delays",
    description: "Incomplete data triggers repeated back-and-forth with auditors, directly translating into missed opportunities."
  }
];

const Problem = () => {
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            The Problem
          </span>
          <h2 className="headline text-3xl md:text-4xl lg:text-5xl">
            A market failure: The businesses
            <br />
            <span className="text-muted-foreground">that need CPAs most can't be profitably served</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="feature-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="step-number mb-6">
                <problem.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12 max-w-2xl mx-auto">
          This failure creates a vicious cycle of delays, errors, and missed opportunities.
        </p>
      </div>
    </section>
  );
};

export default Problem;

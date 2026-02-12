import { Users, DollarSign, TrendingUp } from "lucide-react";

const metrics = [
  {
    icon: Users,
    before: "10-15",
    after: "20-30",
    label: "Clients per CPA",
    highlight: "2x"
  },
  {
    icon: DollarSign,
    before: "$30K-60K",
    after: "$60K-120K",
    label: "Revenue per month",
    highlight: "2x"
  },
  {
    icon: TrendingUp,
    before: "$10M+ only",
    after: "$5M and below",
    label: "Viable client type",
    highlight: "New market"
  }
];

const Impact = () => {
  return (
    <section className="section bg-radial">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
            Impact
          </span>
          <h2 className="headline text-3xl md:text-4xl lg:text-5xl">
            Transform firm economics
          </h2>
          <p className="subtitle mx-auto mt-4 text-center">
            Numina doesn't just save unprofitable clients, it expands your addressable market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="feature-card text-center">
              <div className="step-number mx-auto mb-6">
                <metric.icon className="w-5 h-5" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center items-center gap-4">
                  <div className="text-muted-foreground">
                    <span className="text-sm block">Before</span>
                    <span className="text-lg font-medium">{metric.before}</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">→</div>
                  <div className="text-foreground">
                    <span className="text-sm block text-primary">After</span>
                    <span className="text-lg font-bold">{metric.after}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <div className="text-2xl font-bold text-gradient mt-1">{metric.highlight}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;

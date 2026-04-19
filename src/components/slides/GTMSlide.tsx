import Slide from "@/components/Slide";
import { Rocket, FlaskConical, LineChart, PiggyBank } from "lucide-react";

type Item = {
  icon: typeof Rocket;
  category: string;
  amount: number;
  percent: number;
  purpose: string;
  barClass: string;
};

const TOTAL = 20000;

const items: Item[] = [
  {
    icon: Rocket,
    category: "Go-to-market engine",
    amount: 8500,
    percent: 42.5,
    purpose:
      "LinkedIn outreach tooling, CPA conference attendance, case study production. Each pilot converted = 5–10 clients at $750/month.",
    barClass: "bg-primary",
  },
  {
    icon: FlaskConical,
    category: "Pilot infrastructure",
    amount: 6500,
    percent: 32.5,
    purpose:
      "Cloud compute, LLM API costs, and QuickBooks integration to run 3 paid pilot programs at $750/client/month. Target: $2,250/month recurring within 6 months.",
    barClass: "bg-primary/80",
  },
  {
    icon: LineChart,
    category: "Product-market fit testing",
    amount: 2500,
    percent: 12.5,
    purpose:
      "A/B test pricing tiers ($500 vs $750 vs $1,000/client), measure willingness-to-pay across firm sizes. Feeds directly into pricing strategy.",
    barClass: "bg-primary/60",
  },
  {
    icon: PiggyBank,
    category: "Reserve",
    amount: 2500,
    percent: 12.5,
    purpose:
      "Buffer for extending successful pilots or onboarding an unexpected early adopter.",
    barClass: "bg-primary/40",
  },
];

const MAX_AMOUNT = Math.max(...items.map((i) => i.amount));

const GTMSlide = () => {
  return (
    <Slide>
      <div className="max-w-7xl mx-auto w-full">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-3 block animate-fade-up">
          Use of Funds
        </span>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-6 animate-fade-up delay-100 max-w-5xl">
          Focus to <span className="text-primary">accelerate adoption</span> with successful pilots and GTM pipelines
        </h2>

        <div className="space-y-3">
          {items.map((item, index) => {
            const Icon = item.icon;
            const widthPct = (item.amount / MAX_AMOUNT) * 100;
            return (
              <div
                key={item.category}
                className="feature-card p-4 md:p-5 animate-fade-up"
                style={{ animationDelay: `${150 + index * 100}ms` }}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-12 md:col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="step-number w-9 h-9 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-lg md:text-xl font-bold text-foreground leading-none">
                          ${item.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.percent}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-10">
                    <div className="relative h-9 w-full rounded-md bg-muted/30 border border-border/50 overflow-hidden">
                      <div
                        className={`h-full ${item.barClass} transition-all`}
                        style={{ width: `${widthPct}%` }}
                      />
                      <div className="absolute inset-0 flex items-center px-3">
                        <span className="text-sm md:text-base font-semibold text-foreground">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">
                      {item.purpose}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between animate-fade-up delay-500 border-t border-border/50 pt-4">
          <span className="text-sm md:text-base font-medium tracking-widest uppercase text-muted-foreground">
            Total Ask
          </span>
          <span className="text-2xl md:text-3xl font-bold text-primary">
            ${TOTAL.toLocaleString()}
          </span>
        </div>

        <div className="mt-8 animate-fade-up delay-600 border-t border-border/30 pt-6 text-center">
          <p className="text-lg md:text-xl text-muted-foreground italic">
            "The accounting industry is at the cusp of a revolution, and through Numina I aim to help enable it"
          </p>
        </div>
      </div>
    </Slide>
  );
};

export default GTMSlide;

import { FileSpreadsheet } from "lucide-react";
import Slide from "@/components/Slide";
import { AppendixBackToTOC } from "./AppendixBackToTOC";

const excelUrl = `${import.meta.env.BASE_URL}variance_reduction_analysis.xlsx`;

const VarianceEquationSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-end mb-4" onClick={(e) => e.stopPropagation()}>
          <AppendixBackToTOC />
        </div>
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">
          Appendix — Capacity equation
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Rigorous derivation: P–K → <span className="text-primary">capacity equation</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          All assumptions stated; derived formula used on the capacity slide (slide 9).
        </p>

        <div className="space-y-6 mb-8 max-h-[58vh] overflow-y-auto pr-2">
          <div className="feature-card p-6">
            <h3 className="text-lg font-bold mb-3 text-primary">Assumptions</h3>
            <ul className="text-muted-foreground text-sm space-y-1.5 list-none pl-0">
              <li><strong className="text-foreground">A1.</strong> Single-server queue (M/G/1): Poisson arrivals (rate λ), general service-time distribution, one server (the CPA).</li>
              <li><strong className="text-foreground">A2.</strong> Steady state: utilization ρ = λ E[S] &lt; 1.</li>
              <li><strong className="text-foreground">A3.</strong> Service times i.i.d. with mean E[S] and variance Var(S). Define C<sub>s</sub>² = Var(S) / (E[S])² (squared coefficient of variation).</li>
              <li><strong className="text-foreground">A4.</strong> Variance reduction: we reduce Var(S) by fraction r ∈ [0, 1], so Var(S)′ = (1−r) Var(S). Mean E[S] is unchanged. Hence C<sub>s</sub>²′ = (1−r) C<sub>s</sub>².</li>
              <li><strong className="text-foreground">A5.</strong> Utilization ρ is unchanged after variance reduction (same λ and E[S]; only variance changes).</li>
              <li><strong className="text-foreground">A6.</strong> Sustainable client count: capacity (clients per unit time) ∝ 1/T, where T = mean throughput time (sojourn time) per client. Baseline Y<sub>0</sub> at r = 0; after reduction r, capacity scales by T(0)/T(r).</li>
            </ul>
          </div>

          <div className="feature-card p-6">
            <h3 className="text-lg font-bold mb-3 text-primary">Step 1 — P–K formula (mean wait in queue)</h3>
            <p className="text-muted-foreground text-sm mb-2">
              For M/G/1, Pollaczek–Khintchine gives mean time in queue. Using E[S²] = Var(S) + (E[S])² = (E[S])²(1 + C<sub>s</sub>²) and ρ = λ E[S]:
            </p>
            <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              W<sub>q</sub> = ρ · E[S] · (1 + C<sub>s</sub>²) / (2(1 − ρ))
            </div>
          </div>

          <div className="feature-card p-6">
            <h3 className="text-lg font-bold mb-3 text-primary">Step 2 — Throughput time (sojourn time)</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Mean time per client (queue + service): T = W<sub>q</sub> + E[S]. Substitute W<sub>q</sub> and define α = ρ/(2(1−ρ)):
            </p>
            <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              T = E[S] · [1 + α(1 + C<sub>s</sub>²)]
            </div>
          </div>

          <div className="feature-card p-6">
            <h3 className="text-lg font-bold mb-3 text-primary">Step 3 — After variance reduction r</h3>
            <p className="text-muted-foreground text-sm mb-2">
              By A4, C<sub>s</sub>²′ = (1−r) C<sub>s</sub>²; E[S] and ρ unchanged. So:
            </p>
            <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              T(r) = E[S] · [1 + α(1 + (1−r)C<sub>s</sub>²)]
            </div>
          </div>

          <div className="feature-card p-6">
            <h3 className="text-lg font-bold mb-3 text-primary">Step 4 — Capacity multiplier</h3>
            <p className="text-muted-foreground text-sm mb-2">
              By A6, capacity ∝ 1/T, so multiplier M(r) = T(0)/T(r):
            </p>
            <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-2">
              M(r) = [1 + α(1 + C<sub>s</sub>²)] / [1 + α(1 + (1−r)C<sub>s</sub>²)]
            </div>
            <p className="text-muted-foreground text-xs">
              with α = ρ/(2(1−ρ)). For ρ = 0.9, α = 4.5.
            </p>
          </div>

          <div className="feature-card p-6">
            <h3 className="text-lg font-bold mb-3 text-primary">Step 5 — Derived capacity equation</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Sustainable client count with baseline Y<sub>0</sub>. Let x = variance reduction in percent, so r = x/100:
            </p>
            <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-2">
              <strong className="text-foreground">y(x) = Y<sub>0</sub> · M(x/100)</strong>
            </div>
            <p className="text-muted-foreground text-sm">
              This is the equation used on the capacity slide (slide 9). Parameters there: ρ = 0.9, C<sub>s</sub>² = 3, Y<sub>0</sub> = 15.
            </p>
          </div>

          <div className="feature-card p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold mb-2 text-primary">Variance reduction analysis (Excel)</h3>
              <p className="text-muted-foreground text-sm">
                Full derivation, sensitivity to ρ and C<sub>s</sub>², and numeric table.
              </p>
            </div>
            <a
              href={excelUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shrink-0"
            >
              <FileSpreadsheet className="w-5 h-5" />
              variance_reduction_analysis.xlsx
            </a>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default VarianceEquationSlide;

import { useState } from "react";
import Slide from "@/components/Slide";
import { ArrowRight, Banknote, Building2, Calculator, LineChart, Repeat2, TrendingUp, Users } from "lucide-react";

type DetailKey = "flow" | "edward" | "capacity" | "smb" | "unit" | "scale" | "expansion";

const detailBlocks = [
  { key: "flow" as const, icon: Banknote, title: "Money flow", metric: "$1K/mo", subtitle: "CPA passes surcharge to Numina" },
  { key: "edward" as const, icon: Calculator, title: "Edward economics", metric: "5.5x", subtitle: "Effective hourly rate uplift" },
  { key: "capacity" as const, icon: Users, title: "Capacity doubling", metric: "10 clients", subtitle: "Same CPA headcount" },
  { key: "smb" as const, icon: Building2, title: "SMB value", metric: "+23%", subtitle: "Faster financials, audit-ready" },
  { key: "unit" as const, icon: TrendingUp, title: "Unit economics", metric: "92–95%", subtitle: "Gross margin per client" },
  { key: "scale" as const, icon: LineChart, title: "Revenue scale", metric: "$2.4M ARR", subtitle: "At 25 CPA firms" },
  { key: "expansion" as const, icon: Repeat2, title: "Expansion", metric: "200% NRR", subtitle: "Client growth inside each firm" },
];

const scaleRows = [
  { firms: 5, clients: 25, mrr: "$25K", arr: "$300K", width: "13%" },
  { firms: 10, clients: 60, mrr: "$60K", arr: "$720K", width: "30%" },
  { firms: 15, clients: 105, mrr: "$105K", arr: "$1.26M", width: "53%" },
  { firms: 25, clients: 200, mrr: "$200K", arr: "$2.4M", width: "100%" },
];

const detailContent: Record<DetailKey, { title: string; body: string; graphic: JSX.Element }> = {
  flow: {
    title: "Accountants are the paying channel",
    body: "SMBs pay the CPA invoice. The CPA keeps the existing $4,400 fee and passes Numina a $1,000 technology surcharge per SMB client.",
    graphic: (
      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-3">
        {[
          ["SMB", "$5,400/mo", "Client invoice"],
          ["CPA", "Keeps $4,400", "2x capacity · +$22K top line"],
          ["NUMINA", "Receives $1,000", "Paid by accountant"],
        ].map(([label, value, note], index) => (
          <>
            <div key={label} className="rounded-xl border border-border/60 bg-card/70 p-4 text-center">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
              <div className="mt-2 text-xl font-bold text-primary">{value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{note}</div>
            </div>
            {index < 2 && (
              <div key={`${label}-arrow`} className="flex flex-col items-center gap-1">
                <ArrowRight className={`h-7 w-7 ${index === 1 ? "text-primary" : "text-muted-foreground"}`} strokeWidth={index === 1 ? 3 : 2} />
                {index === 1 && <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-wider text-primary">pays Numina</span>}
              </div>
            )}
          </>
        ))}
      </div>
    ),
  },
  edward: {
    title: "Edward earns more per hour without changing rates",
    body: "Reconciliation drops from 22 hours to 4 review hours. Billing stays $4,400, lifting effective hourly yield from $200 to $1,100.",
    graphic: (
      <div className="grid grid-cols-2 gap-4">
        <MetricCard label="Before Numina" value="$200/hr" note="22 hrs × $200 = $4,400" />
        <MetricCard label="After Numina" value="$1,100/hr" note="4 review hrs for same $4,400" active />
        <Bar label="Hours saved" value="18 hrs" width="82%" />
        <Bar label="Productivity" value="5.5x" width="100%" />
      </div>
    ),
  },
  capacity: {
    title: "The CPA practice doubles capacity",
    body: "Five clients used to consume 110 hours/month. With Numina, ten clients require 40 hours, freeing 70 hours for advisory work.",
    graphic: (
      <div className="space-y-3">
        <Bar label="Before: 5 clients" value="110 hrs/mo" width="100%" muted />
        <Bar label="After: 10 clients" value="40 hrs/mo" width="36%" />
        <Bar label="Freed advisory capacity" value="70 hrs" width="64%" active />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <MetricCard label="Net billing" value="$34K/mo" note="After Numina cost" active />
          <MetricCard label="Take-home" value="~$24K/mo" note="~60% increase" />
        </div>
      </div>
    ),
  },
  smb: {
    title: "SMBs pay slightly more for a materially better close",
    body: "The client sees a $1,000 technology surcharge, still below the cost of hiring an in-house bookkeeper, while receiving faster and cleaner financials.",
    graphic: (
      <div className="grid grid-cols-2 gap-4">
        <MetricCard label="Before" value="$4,400/mo" note="Bookkeeping + reconciliation" />
        <MetricCard label="After" value="$5,400/mo" note="$4,400 + $1,000 surcharge" active />
        <div className="col-span-2 grid grid-cols-3 gap-3 text-center text-sm">
          {['Days not weeks', 'Anomaly flagging', 'Audit-ready docs'].map((item) => (
            <div key={item} className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-primary font-medium">{item}</div>
          ))}
        </div>
      </div>
    ),
  },
  unit: {
    title: "High-margin recurring SaaS per SMB client",
    body: "Each SMB client produces $1,000 MRR with estimated $50–$80 COGS, creating $920–$950 gross profit and strong payback.",
    graphic: (
      <div className="space-y-3">
        <Bar label="Revenue per SMB" value="$1,000/mo" width="100%" active />
        <Bar label="LLM + cloud COGS" value="$50–$80/mo" width="8%" muted />
        <Bar label="Gross margin" value="92–95%" width="95%" />
        <div className="grid grid-cols-2 gap-3 pt-2">
          <MetricCard label="LTV" value="$20K" note="20-month avg life" />
          <MetricCard label="LTV/CAC" value="~40x" note="Founder-led CAC" active />
        </div>
      </div>
    ),
  },
  scale: {
    title: "ARR scales with CPA firms and their SMB books",
    body: "Revenue compounds as more CPA firms onboard and each firm brings more SMB clients onto Numina.",
    graphic: (
      <div className="space-y-3">
        {scaleRows.map((row) => (
          <div key={row.firms} className="grid grid-cols-[72px_1fr_88px] items-center gap-3 text-sm">
            <div className="text-muted-foreground">{row.firms} firms</div>
            <div className="h-8 rounded-md border border-border/50 bg-muted/30 overflow-hidden">
              <div className="h-full bg-primary/70" style={{ width: row.width }} />
            </div>
            <div className="text-right font-semibold text-primary">{row.arr}</div>
          </div>
        ))}
      </div>
    ),
  },
  expansion: {
    title: "Expansion happens inside the CPA account",
    body: "When Edward grows from 5 to 10 SMB clients, Numina revenue from the same firm doubles without a new sales motion.",
    graphic: (
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <MetricCard label="Start" value="$5K MRR" note="5 SMB clients" />
        <ArrowRight className="h-8 w-8 text-primary" />
        <MetricCard label="12 months" value="$10K MRR" note="10 SMB clients" active />
        <div className="col-span-3 rounded-xl border border-primary/30 bg-primary/10 p-4 text-center">
          <div className="text-3xl font-bold text-primary">200% NRR</div>
          <div className="text-sm text-muted-foreground">from one CPA firm expanding its own practice</div>
        </div>
      </div>
    ),
  },
};

function MetricCard({ label, value, note, active = false }: { label: string; value: string; note: string; active?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${active ? "border-primary/40 bg-primary/10" : "border-border/60 bg-card/70"}`}>
      <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{note}</div>
    </div>
  );
}

function Bar({ label, value, width, active = false, muted = false }: { label: string; value: string; width: string; active?: boolean; muted?: boolean }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="font-semibold text-foreground">{value}</span>
      </div>
      <div className="h-8 overflow-hidden rounded-md border border-border/50 bg-muted/30">
        <div className={`h-full ${active ? "bg-primary" : muted ? "bg-muted" : "bg-primary/70"}`} style={{ width }} />
      </div>
    </div>
  );
}

const ImpactSlide = () => {
  const [selected, setSelected] = useState<DetailKey>("flow");
  const selectedDetail = detailContent[selected];

  return (
    <Slide>
      <div className="max-w-7xl mx-auto w-full">
        <span className="text-primary text-base font-medium tracking-widest uppercase mb-4 block animate-fade-up">
          Business Model
        </span>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 animate-fade-up delay-100 max-w-6xl leading-tight">
          CPAs pass through <span className="text-primary">$1,000 per SMB client per month</span> to Numina
        </h2>

        <div className="grid grid-cols-12 gap-5 items-start mt-6">
          <div className="col-span-12 lg:col-span-5 animate-fade-up delay-200">
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
                <div className="rounded-xl border border-border/60 bg-card/70 p-4">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">SMB Client</div>
                  <div className="mt-2 text-2xl font-bold text-foreground">$5,400</div>
                  <div className="text-xs text-muted-foreground">monthly invoice</div>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="rounded-xl border border-primary/40 bg-card/90 p-4">
                  <div className="text-xs uppercase tracking-widest text-primary">CPA Firm</div>
                  <div className="mt-2 text-2xl font-bold text-foreground">$4,400</div>
                  <div className="text-xs text-muted-foreground">keeps same fee</div>
                </div>
                <ArrowRight className="h-6 w-6 text-primary" />
                <div className="rounded-xl border border-primary/50 bg-primary/10 p-4">
                  <div className="text-xs uppercase tracking-widest text-primary">NUMINA</div>
                  <div className="mt-2 text-2xl font-bold text-primary">$1,000</div>
                  <div className="text-xs text-muted-foreground">per SMB / mo</div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {detailBlocks.map(({ key, icon: Icon, title, metric, subtitle }) => (
                <button
                  key={key}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelected(key);
                  }}
                  className={`feature-card p-4 text-left ${selected === key ? "border-primary/60 bg-primary/10" : ""}`}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="step-number h-8 w-8 shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{title}</span>
                  </div>
                  <div className="text-xl font-bold text-primary">{metric}</div>
                  <div className="mt-1 text-xs leading-snug text-muted-foreground">{subtitle}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 animate-fade-up delay-300">
            <div className="feature-card min-h-[520px] p-6 md:p-7">
              <div className="mb-5 flex items-start justify-between gap-4 border-b border-border/50 pb-5">
                <div>
                  <div className="text-sm font-medium uppercase tracking-widest text-primary">{detailBlocks.find((block) => block.key === selected)?.title}</div>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold leading-tight text-foreground">{selectedDetail.title}</h3>
                </div>
                <div className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  {detailBlocks.find((block) => block.key === selected)?.metric}
                </div>
              </div>
              <p className="mb-6 max-w-3xl text-base leading-relaxed text-muted-foreground">{selectedDetail.body}</p>
              {selectedDetail.graphic}
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ImpactSlide;

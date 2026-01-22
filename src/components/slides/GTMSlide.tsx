import Slide from "@/components/Slide";

const stages = [
  {
    phase: "Stage 1",
    title: "Awareness",
    description: "Generate qualified CPA interest through targeted outreach"
  },
  {
    phase: "Stage 2",
    title: "Pilot Program",
    description: "Free 30-60 day pilot demonstrating 10+ hours saved"
  },
  {
    phase: "Stage 3",
    title: "Conversion",
    description: "$750/client/month, starting with 5-10 clients"
  },
  {
    phase: "Stage 4",
    title: "Expansion",
    description: "Organic growth through CPA referrals"
  }
];

const GTMSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Go-to-Market
        </span>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up delay-100">
          Value-first customer journey
        </h2>
        <p className="text-xl text-muted-foreground mb-12 animate-fade-up delay-200">
          Learn → Validate → Scale
        </p>

        <div className="grid md:grid-cols-4 gap-4">
          {stages.map((stage, index) => (
            <div 
              key={index}
              className="feature-card relative animate-fade-up"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {index < stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 left-full w-4 h-px bg-primary/50 z-10" />
              )}
              <span className="text-primary text-xs font-medium tracking-widest uppercase">
                {stage.phase}
              </span>
              <h3 className="text-xl font-bold mt-2 mb-3">{stage.title}</h3>
              <p className="text-muted-foreground text-sm">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default GTMSlide;

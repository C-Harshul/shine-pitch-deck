import { Settings, Eye, CheckSquare } from "lucide-react";

const controls = [
  {
    icon: Settings,
    title: "You set the rules",
    description: "Define what gets flagged, what gets auto-approved, what needs review"
  },
  {
    icon: Eye,
    title: "You see everything",
    description: "Full transparency on what the AI changed and why"
  },
  {
    icon: CheckSquare,
    title: "You approve before it posts",
    description: "Nothing touches the books without your sign-off"
  }
];

const Control = () => {
  return (
    <section className="section">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-4 block">
              Control
            </span>
            <h2 className="headline text-3xl md:text-4xl lg:text-5xl mb-6">
              AI does the work.
              <br />
              <span className="text-gradient">You make the decisions.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Accountants can't hand the books to a black box. Numina keeps you in control.
            </p>
          </div>

          <div className="space-y-4">
            {controls.map((control, index) => (
              <div 
                key={index} 
                className="feature-card flex items-start gap-4"
              >
                <div className="step-number shrink-0">
                  <control.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{control.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {control.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Control;

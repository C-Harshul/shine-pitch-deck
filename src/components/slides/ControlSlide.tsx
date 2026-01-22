import { Settings, Eye, CheckSquare } from "lucide-react";
import Slide from "@/components/Slide";

const controls = [
  {
    icon: Settings,
    title: "You set the rules",
    description: "Define what gets flagged, auto-approved, or needs review"
  },
  {
    icon: Eye,
    title: "You see everything",
    description: "Full transparency on what AI changed and why"
  },
  {
    icon: CheckSquare,
    title: "You approve first",
    description: "Nothing touches the books without your sign-off"
  }
];

const ControlSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
              Control
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold animate-fade-up delay-100">
              AI does the work.
              <br />
              <span className="text-gradient">You make the decisions.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mt-6 animate-fade-up delay-200">
              Accountants can't hand the books to a black box.
              <br />
              Numina keeps you in control.
            </p>
          </div>

          <div className="space-y-4">
            {controls.map((control, index) => (
              <div 
                key={index} 
                className="feature-card flex items-start gap-4 animate-fade-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="step-number shrink-0">
                  <control.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{control.title}</h3>
                  <p className="text-muted-foreground text-sm">{control.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};

export default ControlSlide;

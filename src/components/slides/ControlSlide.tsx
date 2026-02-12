import { ScrollText, Eye, CheckSquare } from "lucide-react";
import Slide from "@/components/Slide";

const controls = [
  {
    icon: ScrollText,
    title: "Accountants set the rules",
    description: "Define what gets flagged, auto-approved, or needs review"
  },
  {
    icon: Eye,
    title: "CPAs see everything",
    description: "Full transparency on what AI changed and why"
  },
  {
    icon: CheckSquare,
    title: "CPAs approve first",
    description: "Nothing touches the books without CPA sign-off"
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
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-fade-up delay-100">
              AI does the work.
              <br />
              <span className="text-gradient">Accountants make the decisions.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mt-6 animate-fade-up delay-200">
              Accountants can't hand the books to a black box.
              <br />
              Numina keeps CPAs in control.
            </p>
          </div>

          <div className="space-y-4">
            {controls.map((control, index) => (
              <div 
                key={index} 
                className="feature-card flex items-start gap-4 animate-fade-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="step-number shrink-0 w-16 h-16">
                  <control.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">{control.title}</h3>
                  <p className="text-muted-foreground text-xl leading-relaxed">{control.description}</p>
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

import { TrendingDown, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import Slide from "@/components/Slide";

const painPoints = [
  {
    icon: Clock,
    title: "Reconciliation Overload",
    description: "CPAs spend the majority of their time on validation and error correction."
  },
  {
    icon: AlertTriangle,
    title: "Compliance and audit delays",
    description: "Incomplete data, triggers repeated back and forth and delays because of compliance and tax rules create a bottleneck."
  },
  {
    icon: TrendingDown,
    title: "Delayed Financial Visibility",
    description: "Business owners don't know their true financial position until weeks after month-end."
  }
];

const PainPointsSlide = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto">
        <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block animate-fade-up">
          Pain Points
        </span>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-12 animate-fade-up delay-100">
          This failure creates a <span className="text-primary">vicious cycle</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              className="feature-card p-10 cursor-pointer"
              initial={{ 
                opacity: 0, 
                y: -100,
                rotateX: -90,
                transformOrigin: "top center"
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: 0
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.34, 1.56, 0.64, 1], // Custom easing for domino effect
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              style={{
                transformStyle: "preserve-3d"
              }}
            >
              <div className="step-number mb-8 w-16 h-16">
                <point.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{point.title}</h3>
              <p className="text-muted-foreground text-xl leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
};

export default PainPointsSlide;

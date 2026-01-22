import { cn } from "@/lib/utils";

interface SlideProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "centered" | "split";
}

const Slide = ({ children, className, variant = "default" }: SlideProps) => {
  return (
    <div 
      className={cn(
        "h-screen w-screen flex flex-col px-8 md:px-16 lg:px-24 py-16 overflow-hidden bg-background relative",
        variant === "centered" && "items-center justify-center text-center",
        variant === "split" && "lg:flex-row lg:items-center",
        className
      )}
    >
      <div className="bg-grid absolute inset-0 pointer-events-none opacity-50" />
      <div className="bg-radial absolute inset-0 pointer-events-none" />
      <div className="relative z-10 w-full h-full flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default Slide;

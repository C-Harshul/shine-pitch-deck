import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Process from "@/components/Process";
import Features from "@/components/Features";
import Control from "@/components/Control";
import Impact from "@/components/Impact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Process />
      <Features />
      <Control />
      <Impact />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;

import Presentation from "@/components/Presentation";
import { FeatureModalsProvider } from "@/contexts/FeatureModalsContext";
import FeatureModals from "@/components/FeatureModals";
import AthenaSlide from "@/components/slides/AthenaSlide";
import TitleSlide from "@/components/slides/TitleSlide";
import InsightSlide from "@/components/slides/InsightSlide";
import ProblemSlide from "@/components/slides/ProblemSlide";
import PainPointsSlide from "@/components/slides/PainPointsSlide";
import SolutionSlide from "@/components/slides/SolutionSlide";
import HowItWorksSlide from "@/components/slides/HowItWorksSlide";
import FeaturesSlide from "@/components/slides/FeaturesSlide";
import HockeyStickSlide from "@/components/slides/HockeyStickSlide";
import ControlSlide from "@/components/slides/ControlSlide";
import ImpactSlide from "@/components/slides/ImpactSlide";

import MomentumSlide from "@/components/slides/MomentumSlide";
import GTMSlide from "@/components/slides/GTMSlide";
import CTASlide from "@/components/slides/CTASlide";

import TeamSlide from "@/components/slides/appendix/TeamSlide";

const Index = () => {
    <FeatureModalsProvider>
      <Presentation contentSlideCount={14}>
        <AthenaSlide />
        <TitleSlide />
        <InsightSlide />
        <ProblemSlide />
        <PainPointsSlide />
        <SolutionSlide />
        <HowItWorksSlide />
        <FeaturesSlide />
        <ControlSlide />
        <HockeyStickSlide />
        
        <ImpactSlide />
        <MomentumSlide />
        <TeamSlide />
        <GTMSlide />
        <CTASlide />
      </Presentation>
      <FeatureModals />
    </FeatureModalsProvider>
  );
};

export default Index;

import HeroSection from "../components/section/HeroSection"
import ProcessSection from "../components/section/ProcessSection";
import ServiceSection from "../components/section/ServiceSection";
import PortfolioSection from "../components/section/PortfolioSection";
import ContactSection from "../components/section/ContactSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <ProcessSection />
      <PortfolioSection />
      <ContactSection />
    </>
  );
};

export default HomePage;
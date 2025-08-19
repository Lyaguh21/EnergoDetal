import { Box } from "@mantine/core";
import BuyersSection from "./components/BuyersSection";
import AboutCompanySection from "./components/AboutCompanySection";
import ProductionSection from "./components/ProductionSection";
import FirstSection from "./components/FirstSection";
import MapSection from "./components/MapSection";
import ProductionСapabilitiesSection from "./components/ProductionСapabilitiesSection";

export default function About() {
  return (
    <Box w="100%" style={{ overflow: "hidden" }}>
      <FirstSection />
      <ProductionSection />
      <AboutCompanySection />
      <BuyersSection />
      <ProductionСapabilitiesSection />
      <MapSection />
    </Box>
  );
}

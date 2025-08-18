import { Box } from "@mantine/core";
import BuyersSection from "./components/BuyersSection";
import AboutCompanySection from "./components/AboutCompanySection";
import ProductionSection from "./components/ProductionSection";
import FirstSection from "./components/FirstSection";
import ScrollRightSection from "./components/ScrollRightSection";
import MapSection from "./components/MapSection";

export default function About() {
  return (
    <Box w="100%" style={{ overflow: "hidden" }}>
      <FirstSection />
      <ProductionSection />
      <AboutCompanySection />
      <BuyersSection />
      <ScrollRightSection />
      <MapSection />
    </Box>
  );
}

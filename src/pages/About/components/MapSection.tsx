import { Box, Text } from "@mantine/core";
import MainBigText from "../../../widgets/Texts/MainBigText";

export default function MapSection() {
  return (
    <Box px={{ base: 20, md: 100 }} py={75} bg="black">
      <MainBigText c="white">География поставок</MainBigText>

      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae90456af2c9d3196f3ee0963092b836b992483532a55b8f35ec17d28457d41db&amp;source=constructor"
        style={{
          borderRadius: "30px",
          marginTop: "50px",
          height: "550px",
          width: "100%",
        }}
        height="569"
      ></iframe>
    </Box>
  );
}

import { Box, Text } from "@mantine/core";

export default function MapSection() {
  return (
    <Box px={100} py={75} bg="black">
      <Text ta="center" fz={90} fw="bold" lh="h1" c="white">
        География поставок
      </Text>

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

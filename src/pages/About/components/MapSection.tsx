import { Box, Text } from "@mantine/core";

export default function MapSection() {
  return (
    <Box px={100} py={75} bg="black" h={1000}>
      <Text ta="center" fz={90} fw="bold" lh="h1" c="white">
        География поставок
      </Text>
      <Box w="100%" h="80%" bg="blue" mt={50} bdrs={30} />
    </Box>
  );
}

import { Box, Text } from "@mantine/core";
export default function FirstSection() {
  return (
    <Box px={100} py={75}>
      <Text ta="center" fz={90} fw="bold" lh="h1" pb={10}>
        Производство опор трубопроводов
      </Text>
      <Text ta="center" c="#4E535D" fz={32} fw="normal">
        Профессиональное изготовление опор трубопроводов по чертежам и
        техническим требованиям. Высокое качество, соблюдение сроков,
        конкурентные цены.
      </Text>
    </Box>
  );
}

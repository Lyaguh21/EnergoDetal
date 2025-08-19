import { Box, Text } from "@mantine/core";
import MainBigText from "../../../widgets/Texts/MainBigText";
export default function FirstSection() {
  return (
    <Box px={{ base: 20, md: 100 }} py={75}>
      <MainBigText pt={0} pb={10} fz={{ base: 40, md: 90 }}>
        Производство опор трубопроводов
      </MainBigText>
      <Text ta="center" c="#4E535D" fz={{ base: 20, sm: 32 }} fw="normal">
        Профессиональное изготовление опор трубопроводов по чертежам и
        техническим требованиям. Высокое качество, соблюдение сроков,
        конкурентные цены.
      </Text>
    </Box>
  );
}

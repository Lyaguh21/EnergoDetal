import { Box, Flex, Text } from "@mantine/core";

export default function AboutCompanySection() {
  return (
    <Box px={100} py={60}>
      <Flex direction="column" gap={40} style={{ zIndex: 3 }} mb={60}>
        <Text ta="center" fz={90} fw="bold" lh="h1" c="black">
          О компании
        </Text>
        <Text ta="center" c="#4E535D" fz={32} fw="normal">
          Профессиональное изготовление опор трубопроводов по чертежам и
          техническим требованиям. Высокое качество, соблюдение сроков,
          конкурентные цены.
        </Text>
      </Flex>
      <Flex w="100%" justify="space-between">
        <Box>
          <Text ta="center" fz={80} fw="bold" lh="h1" c="black">
            15+
          </Text>
          <Text ta="center" c="#4E535D" fz={24} fw="normal">
            Лет на рынке
          </Text>
        </Box>
        <Box>
          <Text ta="center" fz={80} fw="bold" lh="h1" c="black">
            {">"}1000
          </Text>
          <Text ta="center" c="#4E535D" fz={24} fw="normal">
            Выполненных проектов
          </Text>
        </Box>
        <Box>
          <Text ta="center" fz={80} fw="bold" lh="h1" c="black">
            54
          </Text>
          <Text ta="center" c="#4E535D" fz={24} fw="normal">
            Постоянных клиента
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

import { Box, Flex, Text } from "@mantine/core";
import BlueprintTemplate from "./tempaltes/BlueprintTemplate";

export default function ListBlueprint() {
  const data = [
    { title: "ГОСТ 17379-2001", link: "GOST17379-2001" },
    { title: "ГОСТ 17379-2001", link: "GOST17379-2001" },
    { title: "ГОСТ 17379-2001", link: "GOST17379-2001" },
    { title: "ГОСТ 17379-2001", link: "GOST17379-2001" },
    { title: "ГОСТ 17379-2001", link: "GOST17379-2001" },
    { title: "ГОСТ 17379-2001", link: "GOST17379-2001" },
    { title: "ГОСТ 17379-2001", link: "GOST17379-2001" },
    { title: "ГОСТ 17379-2001", link: "GOST17379-2001" },
  ];

  return (
    <Box>
      <Text ta="center" py={30} fz={32} fw="bold" pb={10}>
        Поиск по чертежам
      </Text>

      <Flex direction="column" gap={20} pb={30}>
        {data.map((el) => (
          <BlueprintTemplate text={el.title} link={el.link} />
        ))}
      </Flex>
    </Box>
  );
}

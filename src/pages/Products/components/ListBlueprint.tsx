import { Box, Flex, Skeleton, Text } from "@mantine/core";
import BlueprintTemplate from "./tempaltes/BlueprintTemplate";
import { Blueprint } from "../../../entities/Blueprint.iterface";

export default function ListBlueprint({
  data,
  showSkeleton,
}: {
  data: Blueprint[];
  showSkeleton: boolean;
}) {
  return (
    <Box>
      <Text ta="center" py={30} fz={32} fw="bold" pb={10}>
        Поиск по чертежам
      </Text>

      <Flex direction="column" gap={20} pb={30}>
        {!showSkeleton &&
          data.map((el) => (
            <BlueprintTemplate name={el.name} key={data.indexOf(el)} />
          ))}

        {showSkeleton &&
          [1, 2, 3, 4, 5, 6].map((el) => (
            <Skeleton bdrs={8} w="100%" h={52} key={el} />
          ))}
      </Flex>
    </Box>
  );
}

import { Box, Text } from "@mantine/core";
import Search from "./components/Search";
import ListBlueprint from "./components/ListBlueprint";

export default function Products() {
  return (
    <Box w="100%" px={100} style={{ overflow: "hidden" }}>
      <Text ta="center" py={25} fz={90} fw="bold" lh="h1">
        Продукция
      </Text>

      <Search />

      <ListBlueprint />
    </Box>
  );
}

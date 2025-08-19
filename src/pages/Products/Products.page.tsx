import { Box } from "@mantine/core";
import Search from "./components/Search";
import ListBlueprint from "./components/ListBlueprint";
import MainBigText from "../../widgets/Texts/MainBigText";

export default function Products() {
  return (
    <Box w="100%" px={{ base: 20, md: 100 }} style={{ overflow: "hidden" }}>
      <MainBigText> Продукция</MainBigText>

      <Search />

      <ListBlueprint />
    </Box>
  );
}

import { Anchor, Box, Breadcrumbs, Flex } from "@mantine/core";
import { useParams } from "react-router";
import Model3d from "./components/Model3d";

export default function DetailedExecution() {
  const { BlueprintId, ExecutionId } = useParams();

  const items = [
    { title: "Продукция", href: "/products" },
    { title: BlueprintId, href: `/products/${BlueprintId}` },
    { title: ExecutionId, href: `/products/${BlueprintId}/${ExecutionId}` },
  ].map((item, index) => (
    <Anchor
      href={item.href}
      key={index}
      c={index === 2 ? "#000" : "#515661"}
      fz={20}
      fw="500"
    >
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Flex px={20} h={90} w="100%" align="center">
        <Breadcrumbs separatorMargin="sm">{items}</Breadcrumbs>
      </Flex>
      <Box px={20}>
        <Flex justify="space-between">
          <Model3d />
          <Box bg="blue" w="50%" />
        </Flex>
      </Box>
    </>
  );
}

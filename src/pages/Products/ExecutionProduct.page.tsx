import { Anchor, Box, Breadcrumbs, Flex } from "@mantine/core";
import { useParams } from "react-router";

export default function ExecutionProduct() {
  const { BlueprintId } = useParams();

  const data = {
    name: "ГОСТ 17379-2001",
    subtitle: "Опоры корпусные приварные",
    execution: [
      {
        photo: "",
        title: "КП-1",
        subtitle: "Корпусная приварная опора тип 1",
      },
    ],
  };

  const items = [
    { title: "Продукция", href: "/products" },
    { title: data.name, href: `/products/${BlueprintId}` },
  ].map((item, index) => (
    <Anchor
      href={item.href}
      key={index}
      c={index === 1 ? "#000" : "#515661"}
      fz={20}
      fw="500"
    >
      {item.title}
    </Anchor>
  ));
  return (
    <>
      <Flex px={30} h={90} w="100%" align="center">
        <Breadcrumbs separatorMargin="sm">{items}</Breadcrumbs>
      </Flex>
      <Box p={30}></Box>
    </>
  );
}

import { Button, Flex } from "@mantine/core";
import classes from "../classes/NavGallery.module.css";

interface navbar {
  select: string;
  set: any;
}
export default function NavGallery({ select, set }: navbar) {
  const buttons = [
    { title: "Продукция", type: "Products" },
    { title: "Станки", type: "Machines" },
    { title: "Производство", type: "Production" },
  ];
  return (
    <Flex className={classes.borderB} w="100%">
      {buttons.map((el) => (
        <Button
          key={buttons.indexOf(el)}
          fz={{ base: 14, xs: 20 }}
          h={60}
          radius={0}
          px={{ base: 1, xs: 18 }}
          variant="transparent"
          c={select === el.type ? "dark" : "#515661"}
          className={select === el.type ? classes.activeBorderB : ""}
          onClick={() => set(el.type)}
          w="33.33%"
        >
          {el.title}
        </Button>
      ))}
    </Flex>
  );
}

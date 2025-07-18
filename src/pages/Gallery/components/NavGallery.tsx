import { Button, Flex } from "@mantine/core";
import classes from "../classes/NavGallery.module.css";

interface navbar {
  select: string;
  set: any;
}
export default function NavGallery({ select, set }: navbar) {
  const buttons = [
    { title: "Продукция", type: "products" },
    { title: "Станки", type: "machines" },
    { title: "Производство", type: "productions" },
  ];
  return (
    <Flex className={classes.borderB} w="100%">
      {buttons.map((el) => (
        <Button
          key={buttons.indexOf(el)}
          fz={20}
          h={60}
          radius={0}
          variant="transparent"
          c={select === el.type ? "dark" : "#515661"}
          className={select === el.type ? classes.activeBorderB : ""}
          onClick={() => set(el.type)}
        >
          {el.title}
        </Button>
      ))}
    </Flex>
  );
}

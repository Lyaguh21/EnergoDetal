import { motion } from "motion/react";
import classes from "../classes/ScrollRightSection.module.css";
import { Flex, Box, Text } from "@mantine/core";

const CardTemplate = ({
  img,
  title,
  text,
}: {
  img: string;
  title: string;
  text: string;
}) => {
  return (
    <Box
      px={10}
      miw="50%"
      style={{ border: "1px solid black", borderRadius: "5px" }}
    >
      <Flex justify="center" py={25}>
        <img src={`/icons/${img}`} />
      </Flex>
      <Text fz={36} fw="bold" ta="center">
        {title}
      </Text>
      <Text fz={27} ta="center" py={25} c="#4D5765">
        {text}
      </Text>
    </Box>
  );
};

export default function ScrollRightSection() {
  return (
    <Box maw="76vw">
      <Text ta="center" mt={60} fz={60} fw="bold" lh="h1" c="black">
        Производственные возможности
      </Text>
      <Flex
        w="100%"
        px={50}
        py={112}
        gap={30}
        style={{
          overflowX: "scroll",
          overflowY: "hidden",
          scrollbarWidth: "none", // Для Firefox
          msOverflowStyle: "none", // Для Internet Explorer и Edge (старый)
        }}
      >
        {card.map((el) => (
          <CardTemplate text={el.text} title={el.title} img={el.img} />
        ))}
      </Flex>
    </Box>
  );
}

const card = [
  {
    id: 1,
    img: "SvarochnieRaboti.svg",
    title: "Сварочные работы",
    text: "Современное сварочное оборудование и квалифицированные специалисты",
  },
  {
    id: 2,
    img: "SvarochnieRaboti.svg",
    title: "Сварочные работы",
    text: "Современное сварочное оборудование и квалифицированные специалисты",
  },
  {
    id: 3,
    img: "SvarochnieRaboti.svg",
    title: "Сварочные работы",
    text: "Современное сварочное оборудование и квалифицированные специалисты",
  },
  {
    id: 4,
    img: "SvarochnieRaboti.svg",
    title: "Сварочные работы",
    text: "Современное сварочное оборудование и квалифицированные специалисты",
  },
  {
    id: 5,
    img: "SvarochnieRaboti.svg",
    title: "Сварочные работы",
    text: "Современное сварочное оборудование и квалифицированные специалисты",
  },
];

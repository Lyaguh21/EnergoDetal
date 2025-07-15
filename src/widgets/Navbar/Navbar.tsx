import { Box, Button, Flex, Text } from "@mantine/core";
import classes from "./classes/Navbar.module.css";
import { Link } from "../Link/Link";
import MainButton from "../MainButton/MainButton";

export default function Navbar() {
  const pages = [
    { title: "О компании", link: "/" },
    { title: "Продукция", link: "/" },
    { title: "Галерея", link: "/" },
    { title: "Контакты", link: "/" },
  ];

  return (
    <Box
      w={320}
      className={classes.borderR}
      style={{ position: "fixed", height: "100vh" }}
    >
      <Flex p={20} gap={24} align="center" className={classes.borderB}>
        <img src="/LogoEnergoDetal.svg" />
        <Text fw="bold" fz={28}>
          ООО “ТРУБЫ”
        </Text>
      </Flex>

      <Flex
        p={20}
        justify="center"
        align="center"
        direction="column"
        className={classes.borderB}
        gap={5}
      >
        <Link to="/" style={{ textDecoration: "underline" }}>
          trubi@contact.ru
        </Link>
        <Link to="/" style={{ textDecoration: "underline" }}>
          +7 (918) 123-45-67
        </Link>
        <MainButton style={{ marginTop: "5px" }} color="white">
          Оставить заявку
        </MainButton>
      </Flex>

      <Flex
        p={20}
        justify="center"
        align="center"
        direction="column"
        className={classes.borderB}
        gap={10}
      >
        {pages.map((el) => (
          <Link to={el.link}>{el.title}</Link>
        ))}
      </Flex>

      <Flex p={20} direction="column" align="center">
        <Text ta="center" fz={24} fw={500} mb={20}>
          Прямой эфир
        </Text>

        <Box bg="blue" w="280px" h="280px"></Box>
      </Flex>
    </Box>
  );
}

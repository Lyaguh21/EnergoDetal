import { Box, Button, Flex, Text } from "@mantine/core";
import classes from "./classes/Navbar.module.css";
import { Link } from "../Link/Link";
import MainButton from "../MainButton/MainButton";
import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();

  const pages = [
    { title: "О компании", link: "/" },
    { title: "Продукция", link: "/products" },
    { title: "Галерея", link: "/gallery" },
    { title: "Контакты", link: "/contacts" },
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
        direction="column"
        className={classes.borderB}
        gap={10}
      >
        <AnimatePresence>
          {pages.map((el) => (
            <Flex align="center" gap={10} key={pages.indexOf(el)}>
              {location.pathname === el.link && (
                <motion.div
                  style={{
                    height: "22px",
                    width: "2px",
                    backgroundColor: "black",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
              <Link
                to={el.link}
                style={{
                  color: location.pathname === el.link ? "black" : "#515661",
                }}
              >
                {el.title}
              </Link>
            </Flex>
          ))}
        </AnimatePresence>
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

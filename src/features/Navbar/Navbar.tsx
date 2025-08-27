import { Box, Text, Flex } from "@mantine/core";
import classes from "./classes/Navbar.module.css";

import { AnimatePresence, motion } from "motion/react";
import { useLocation } from "react-router";
import { Link } from "./components/Link";
import MainButton from "../../widgets/MainButton/MainButton";

export default function Navbar({ ref }: { ref: any }) {
  const location = useLocation();

  const pages = [
    { title: "О компании", link: "/" },
    { title: "Продукция", link: "/products" },
    { title: "Галерея", link: "/gallery" },
    { title: "Контакты", link: "/contacts" },
  ];

  return (
    <motion.div
      initial={{ x: -400 }}
      animate={{ x: 0 }}
      exit={{ x: -400 }}
      transition={{ type: "tween", duration: 0.3 }}
      style={{
        position: "fixed",
        height: "100vh",
        zIndex: "10",
        backgroundColor: "white",
      }}
    >
      <Box w={320} h="100vh" className={classes.borderR} ref={ref}>
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
          <a
            href="mailto:trubi@gmai.ru?Subject=Оформление заказа&Body=Здравствуйте, заинтересовали ваши услуги. "
            style={{
              textDecoration: "underline",
              color: "#4e535d",
              fontSize: "22px",
            }}
          >
            trubi@contact.ru
          </a>
          <a
            href="tel: +79181234567"
            style={{
              textDecoration: "underline",
              color: "#4e535d",
              fontSize: "22px",
            }}
          >
            +7 (918) 123-45-67
          </a>

          <a href="mailto:trubi@gmai.ru?Subject=Оформление заказа&Body=Здравствуйте, заинтересовали ваши услуги. ">
            <MainButton style={{ marginTop: "5px" }} color="white">
              Оставить заявку
            </MainButton>
          </a>
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
          <Text ta="center" fz={24} fw={500} mb={10}>
            Прямой эфир
          </Text>

          <Box bg="blue" w="100%" style={{ aspectRatio: "1 / 1" }}></Box>
        </Flex>
      </Box>
    </motion.div>
  );
}

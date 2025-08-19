import { Box, Flex } from "@mantine/core";
import Navbar from "../widgets/Navbar/Navbar";
import { Outlet } from "react-router";
import Header from "../widgets/Header/Header";
import { useState } from "react";
import { useClickOutside, useMediaQuery } from "@mantine/hooks";
import { AnimatePresence } from "motion/react";

export default function MainLayout() {
  const isLargeScreen = useMediaQuery("(min-width: 990px)");
  const [isVisible, setVisible] = useState(false);
  const ref = useClickOutside(() => setVisible(false));

  return (
    <Flex>
      <AnimatePresence>
        {isVisible || isLargeScreen ? <Navbar ref={ref} /> : null}
      </AnimatePresence>

      <Box mih="100vh" pl={{ base: 0, md: 320 }} style={{ flexGrow: 1 }}>
        <Header setVisible={setVisible} isVisible={isVisible} />
        <Box pt={{ base: 90, md: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}

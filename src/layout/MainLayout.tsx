import { Box, Flex } from "@mantine/core";
import Navbar from "../widgets/Navbar/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <Flex>
      <Navbar />

      <Box mih="100vh" pl={320} style={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Flex>
  );
}

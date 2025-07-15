import { Box, Flex } from "@mantine/core";
import Navbar from "../widgets/Navbar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <Flex>
      <Navbar />
      <Box mih="100vh">
        <Outlet />
      </Box>
    </Flex>
  );
}

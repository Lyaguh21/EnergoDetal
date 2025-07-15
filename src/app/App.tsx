import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Router } from "./providers/Router";

export default function App() {
  return (
    <MantineProvider forceColorScheme="light">
      <Router />
    </MantineProvider>
  );
}

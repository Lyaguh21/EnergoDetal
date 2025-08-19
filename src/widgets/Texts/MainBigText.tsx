import { Text } from "@mantine/core";
import { ReactNode } from "react";

export default function MainBigText({
  children,
  ...props
}: {
  children: ReactNode;
}) {
  return (
    <Text ta="center" fz={{ base: 60, md: 90 }} fw="bold" py={25} {...props}>
      {children}
    </Text>
  );
}

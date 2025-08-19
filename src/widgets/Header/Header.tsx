import { CloseIcon, Flex, Text } from "@mantine/core";
import classes from "./classes/Header.module.css";
import { IconMenu2 } from "@tabler/icons-react";

export default function Header({
  setVisible,
  isVisible,
}: {
  setVisible: (value: boolean) => void;
  isVisible: boolean;
}) {
  return (
    <Flex
      w="100%"
      justify="space-between"
      align="center"
      pos="fixed"
      hiddenFrom="md"
      bg="white"
      className={classes.borderB}
      p={20}
      style={{ zIndex: 9 }}
    >
      <Flex gap={24} align="center">
        <img src="/LogoEnergoDetal.svg" />
        <Text fw="bold" fz={28}>
          ООО “ТРУБЫ”
        </Text>
      </Flex>

      {isVisible ? (
        <CloseIcon
          size={"43"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setVisible(false);
          }}
        />
      ) : (
        <IconMenu2
          size={43}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setVisible(true);
          }}
        />
      )}
    </Flex>
  );
}

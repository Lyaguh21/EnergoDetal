import { Box, Flex, Text, Modal, Image, UnstyledButton } from "@mantine/core";
import {
  IconChevronCompactLeft,
  IconChevronCompactRight,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";
import { Photo } from "../../entities/Photo.interface";

interface ModalTypes {
  opened: boolean;
  close: () => void;
  selectPosImage: number;
  setSelectPosImage: Dispatch<SetStateAction<number>>;
  data: Photo[];
}  

export default function ImageViewerModal({
  opened,
  close,
  selectPosImage,
  setSelectPosImage,
  data,
}: ModalTypes) {
  return (
    <Modal
      shadow="none"
      opened={opened}
      onClose={close}
      size="auto"
      styles={{
        content: { backgroundColor: "#00000000", boxShadow: "none" },
        header: { backgroundColor: "#00000000" },
        close: {
          backgroundColor: "#6C6C6C",
          color: "white",
        },
        overlay: { backgroundColor: "var(--overlay-bg, rgba(0, 0, 0, 0.8))" },
      }}
    >
      <Box>
        <Flex>
          <UnstyledButton
            c="white"
            disabled={selectPosImage === 0}
            w={40}
            onClick={() => setSelectPosImage(selectPosImage - 1)}
          >
            <Flex align="center" w="100%">
              <IconChevronCompactLeft
                size="sm"
                color={selectPosImage === 0 ? "gray" : "white"}
              />
            </Flex>
          </UnstyledButton>
          <Image src={data[selectPosImage].link} h={600} radius="md" />
          <UnstyledButton
            c="white"
            disabled={selectPosImage === data.length - 1}
            w={40}
            onClick={() => setSelectPosImage(selectPosImage + 1)}
          >
            <Flex align="center" w="100%">
              <IconChevronCompactRight
                size="sm"
                color={selectPosImage === data.length - 1 ? "gray" : "white"}
              />
            </Flex>
          </UnstyledButton>
        </Flex>
        <Flex justify="center" align="center" direction="column" c="white">
          <Text pt={16} fw="bold" fz={22}>
            {data[selectPosImage].title}
          </Text>
          <Text>
            {selectPosImage + 1} из {data.length}
          </Text>
        </Flex>
      </Box>
    </Modal>
  );
}

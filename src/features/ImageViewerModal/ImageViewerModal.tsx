import { Box, Flex, Text, Modal, Image, UnstyledButton } from "@mantine/core";
import {
  IconChevronCompactLeft,
  IconChevronCompactRight,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Photo } from "../../entities/Photo.interface";
import { useMediaQuery } from "@mantine/hooks";
import styles from "./classes/ImageViewerModal.module.css";

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
  const isMobile = useMediaQuery("(max-width: 1300px)");

  useEffect(() => {
    if (opened && isMobile) {
      if (screen.orientation?.lock) {
        screen.orientation.lock("landscape").catch((error) => {
          console.log("Orientation lock not supported or failed:", error);
        });
      }
    }

    return () => {
      if (screen.orientation?.unlock) {
        screen.orientation.unlock();
      }
    };
  }, [opened, isMobile]);

  const handlePrev = () => {
    if (selectPosImage > 0) {
      setSelectPosImage(selectPosImage - 1);
    }
  };

  const handleNext = () => {
    if (selectPosImage < data.length - 1) {
      setSelectPosImage(selectPosImage + 1);
    }
  };

  const mobileContentStyle = isMobile
    ? {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        maxWidth: "none",
        padding: 0,
      }
    : {};

  const mobileBodyStyle = isMobile
    ? {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
      }
    : {};

  const mobileHeaderStyle = isMobile
    ? {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
      }
    : {};

  const mobileCloseStyle = isMobile
    ? {
        width: 40,
        height: 40,
        borderRadius: "50%",
      }
    : {};

  return (
    <Modal
      shadow="none"
      opened={opened}
      onClose={close}
      size="auto"
      fullScreen={isMobile}
      styles={{
        content: {
          backgroundColor: "#00000000",
          boxShadow: "none",
          ...mobileContentStyle,
        },
        header: {
          backgroundColor: "#00000000",
          ...mobileHeaderStyle,
        },
        close: {
          backgroundColor: "#6C6C6C",
          color: "white",
          ...mobileCloseStyle,
        },
        body: mobileBodyStyle,
        overlay: {
          backgroundColor: "var(--overlay-bg, rgba(0, 0, 0, 0.8))",
        },
      }}
      withCloseButton={!isMobile}
    >
      <Box
        className={isMobile ? styles.mobileContainer : styles.desktopContainer}
      >
        <Flex
          align="center"
          justify="center"
          className={isMobile ? styles.mobileFlex : styles.desktopFlex}
        >
          {/* Кнопка "Назад" */}
          <UnstyledButton
            c="white"
            disabled={selectPosImage === 0}
            onClick={handlePrev}
            style={
              isMobile
                ? {
                    position: "absolute",
                    left: 30,
                    zIndex: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    borderRadius: "50%",
                    width: 50,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: selectPosImage === 0 ? 0.8 : 1,
                    cursor: selectPosImage === 0 ? "not-allowed" : "pointer",
                  }
                : {}
            }
          >
            <IconChevronCompactLeft
              size={isMobile ? 30 : "sm"}
              color={selectPosImage === 0 ? "gray" : "white"}
            />
          </UnstyledButton>

          {/* Изображение */}
          <Image
            src={data[selectPosImage]?.link}
            height={isMobile ? "auto" : 600}
            width={isMobile ? "100%" : "auto"}
            fit="contain"
            radius="md"
            style={
              isMobile
                ? {
                    maxHeight: "100vh",
                    maxWidth: "100vw",
                    objectFit: "contain",
                    padding: "0 20px",
                  }
                : {}
            }
            alt={data[selectPosImage]?.title || "Image"}
          />

          {/* Кнопка "Вперед" */}
          <UnstyledButton
            c="white"
            disabled={selectPosImage === data.length - 1}
            onClick={handleNext}
            style={
              isMobile
                ? {
                    position: "absolute",
                    right: 30,
                    zIndex: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    borderRadius: "50%",
                    width: 50,
                    height: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: selectPosImage === data.length - 1 ? 0.8 : 1,
                    cursor:
                      selectPosImage === data.length - 1
                        ? "not-allowed"
                        : "pointer",
                  }
                : {}
            }
          >
            <IconChevronCompactRight
              size={isMobile ? 30 : "sm"}
              color={selectPosImage === data.length - 1 ? "gray" : "white"}
            />
          </UnstyledButton>
        </Flex>

        {/* Информация об изображении */}
        <Flex
          justify="center"
          align="center"
          direction="column"
          c="white"
          style={
            isMobile
              ? {
                  position: "absolute",
                  bottom: 20,
                  left: 0,
                  right: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  margin: "0 20px",
                }
              : {}
          }
        >
          <Text pt={16} fw="bold" fz={isMobile ? 18 : 22}>
            {data[selectPosImage]?.title}
          </Text>
          <Text fz={isMobile ? 14 : 16}>
            {selectPosImage + 1} из {data.length}
          </Text>
        </Flex>

        {/* Кнопка закрытия для мобильных */}
        {isMobile && (
          <UnstyledButton
            onClick={close}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 1000,
              backgroundColor: "#6C6C6C",
              color: "white",
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            ×
          </UnstyledButton>
        )}
      </Box>
    </Modal>
  );
}

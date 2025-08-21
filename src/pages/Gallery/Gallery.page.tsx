import { Box, Center, Flex, Skeleton, Text } from "@mantine/core";
import NavGallery from "./components/NavGallery";
import { useEffect, useState } from "react";
import PhotoTemplate from "./components/PhotoTemplate";
import axios from "axios";
import { useDisclosure } from "@mantine/hooks";
import { Photo } from "../../entities/Photo.interface";
import MainBigText from "../../widgets/Texts/MainBigText";
import ImageViewerModal from "../../features/ImageViewerModal/ImageViewerModal";
import { API } from "../../app/helpers";

export default function Gallery() {
  const [responseTypePhoto, setResponseTypePhoto] = useState<
    "Products" | "Machines" | " Production"
  >("Products");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectPosImage, setSelectPosImage] = useState<number>(0);
  const [data, setData] = useState<Photo[]>([]);

  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [minDisplayTimePassed, setMinDisplayTimePassed] = useState(false);

  useEffect(() => {
    // Сбрасываем флаг минимального времени при смене типа
    setMinDisplayTimePassed(false);
    setShowSkeleton(true);

    const startTime = Date.now();
    setLoading(true);

    axios
      .get(`${API}/gallery/${responseTypePhoto}`)
      .then((res) => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1000 - elapsedTime, 0);

        // Ждем минимум 1 секунду перед скрытием скелетона
        setTimeout(() => {
          setData(res.data || []);
          setLoading(false);
          setMinDisplayTimePassed(true);
        }, remainingTime);
      })
      .catch((err) => {
        console.error(err);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1000 - elapsedTime, 0);

        setTimeout(() => {
          setLoading(false);
          setMinDisplayTimePassed(true);
          setData([]);
        }, remainingTime);
      });
  }, [responseTypePhoto]);

  // Скрываем скелетон только когда данные загружены И прошло минимальное время
  useEffect(() => {
    if (minDisplayTimePassed && !loading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 100); // Небольшая задержка для плавности
      return () => clearTimeout(timer);
    }
  }, [minDisplayTimePassed, loading]);

  const handleOpenViewImage = (el: Photo) => {
    open();
    setSelectPosImage(data.indexOf(el));
  };

  return (
    <>
      <ImageViewerModal
        close={close}
        opened={opened}
        selectPosImage={selectPosImage}
        setSelectPosImage={setSelectPosImage}
        data={data}
      />

      <Box w="100%" px={{ base: 20, md: 100 }}>
        <MainBigText>Галерея</MainBigText>
        <NavGallery set={setResponseTypePhoto} select={responseTypePhoto} />

        <Flex
          gap={{ base: 20, md: 40 }}
          p={{ base: 0, md: 40 }}
          py={{ base: 10, md: 40 }}
          wrap="wrap"
        >
          {showSkeleton &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
              <Skeleton
                key={el}
                style={{
                  flexGrow: 1,
                  width: 175,
                  height: 175,
                }}
              />
            ))}

          {!showSkeleton && data.length === 0 && (
            <Text w="100%" h="100%" ta="center">
              Тут пока пусто :/
            </Text>
          )}

          {!showSkeleton &&
            data.map((el) => (
              <PhotoTemplate
                key={data.indexOf(el)}
                link={el.url}
                onClick={() => handleOpenViewImage(el)}
              />
            ))}
        </Flex>
      </Box>
    </>
  );
}

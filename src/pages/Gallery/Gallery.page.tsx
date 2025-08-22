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
    let isMounted = true;

    const fetchData = async () => {
      const startTime = Date.now();
      setLoading(true);
      setShowSkeleton(true);

      try {
        const response = await axios.get(`${API}/gallery/${responseTypePhoto}`);

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const minDisplayTime = 1000;
        const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

        setTimeout(() => {
          setData(response.data || []);
          setLoading(false);
          setShowSkeleton(false);
        }, remainingTime);
      } catch (err) {
        console.error(err);

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1000 - elapsedTime, 0);

        setTimeout(() => {
          setData([]);
          setLoading(false);
          setShowSkeleton(false);
        }, remainingTime);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [responseTypePhoto]);

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

        {!showSkeleton && data.length === 0 && (
          <Center w="100%" h={200}>
            <Text>Тут пока пусто :/</Text>
          </Center>
        )}
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))",
            gap: "20px",
            width: "100%",
          }}
          p={{ base: 0, md: 40 }}
          py={{ base: 10, md: 40 }}
        >
          {showSkeleton &&
            [1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
              <Skeleton
                key={el}
                style={{
                  width: "100%",
                  height: 175,
                  borderRadius: 20,
                }}
              />
            ))}

          {!showSkeleton &&
            data.map((el: Photo) => (
              <PhotoTemplate
                data={data}
                key={el.id}
                link={el.url}
                onClick={() => handleOpenViewImage(el)}
              />
            ))}
        </Box>
      </Box>
    </>
  );
}

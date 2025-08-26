import { Anchor, Box, Breadcrumbs, Flex, Skeleton, Text } from "@mantine/core";
import { useParams } from "react-router";
import Model3d from "./components/Model3d";
import { useEffect, useState } from "react";
import PhotoTemplate from "../../features/PhotoTemplate/PhotoTemplate";
import { Carousel } from "@mantine/carousel";
import { useDisclosure } from "@mantine/hooks";
import "@mantine/carousel/styles.css";
import axios from "axios";
import { API } from "../../app/helpers";
import ImageViewerModal from "../../features/ImageViewerModal/ImageViewerModal";
import { Photo } from "../../entities/Photo.interface";
import TableSection from "./components/TableSection";

interface dataRequest {
  name: string;
  description: string;
  modelurl: string;
  certificate: string;
  imageurls: string[];
}
export default function DetailedExecution() {
  const { BlueprintId, ExecutionId } = useParams();
  const [opened, { open, close }] = useDisclosure(false);

  const [transformedPhotos, setTransformedPhotos] = useState<Photo[]>();
  const [data, setData] = useState<dataRequest | null>(null);

  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [minDisplayTimePassed, setMinDisplayTimePassed] = useState(false);

  const [viewerPhoto, setViewerPhoto] = useState([]);
  const [selectPosImage, setSelectPosImage] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const startTime = Date.now();
      setLoading(true);
      setShowSkeleton(true);

      try {
        const response = await axios.get<dataRequest>(
          `${API}/products/${BlueprintId}/${ExecutionId}`
        );

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const minDisplayTime = 1000;
        const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

        setTimeout(() => {
          setData(response.data);
          setLoading(false);
          setShowSkeleton(false);
        }, remainingTime);
      } catch (err) {
        console.error(err);

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1000 - elapsedTime, 0);

        setTimeout(() => {
          setData(null);
          setLoading(false);
          setShowSkeleton(false);
        }, remainingTime);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (data?.imageurls) {
      const transformedPhotos: Photo[] = data.imageurls.map((url, index) => ({
        id: index + 1,
        url: url,
      }));
      setTransformedPhotos(transformedPhotos);
      setViewerPhoto(transformedPhotos);
    }
  }, [data?.imageurls]);

  const items = [
    { title: "Продукция", href: "/products" },
    { title: BlueprintId, href: `/products/${BlueprintId}` },
    { title: ExecutionId, href: `/products/${BlueprintId}/${ExecutionId}` },
  ].map((item, index) =>
    !showSkeleton ? (
      <Anchor
        href={item.href}
        key={index}
        c={index === 2 ? "#000" : "#515661"}
        fz={20}
        fw="500"
      >
        {item.title}
      </Anchor>
    ) : (
      <Skeleton w={150} h={25} />
    )
  );

  return (
    <>
      <ImageViewerModal
        close={close}
        opened={opened}
        selectPosImage={selectPosImage}
        setSelectPosImage={setSelectPosImage}
        data={viewerPhoto}
      />

      <Flex px={20} h={90} w="100%" align="center">
        <Breadcrumbs separatorMargin="sm">{items}</Breadcrumbs>
      </Flex>
      <Box px={20}>
        <Flex justify="space-between" wrap={"wrap"}>
          {showSkeleton ? (
            <Skeleton
              w={{ base: "100%", xs: "45%" }}
              mb={{ base: 20, xs: "0" }}
              style={{ aspectRatio: "1/1", borderRadius: "8px" }}
            />
          ) : (
            <Model3d modelUrl={data?.modelurl} />
          )}
          <Box w={{ base: "100%", xs: "50%" }}>
            {!showSkeleton ? (
              <>
                <Text fz={64} fw="bold">
                  {data?.name}
                </Text>
                <Text fz={28} c="#515661" mb={30}>
                  {data?.description}
                </Text>
              </>
            ) : (
              <>
                <Skeleton w={400} h={80} />
                <Skeleton w={500} h={40} mb={5} mt={10} />
                <Skeleton w={500} h={40} mb={5} />
                <Skeleton w={500} h={40} mb={5} />
                <Skeleton w={500} h={40} mb={5} />
                <Skeleton w={500} h={40} mb={5} />
                <Skeleton w={500} h={40} mb={5} />
                <Skeleton w={500} h={40} mb={5} />
              </>
            )}
          </Box>
        </Flex>
      </Box>

      <Flex
        w="100%"
        align="center"
        justify="space-between"
        wrap={"wrap"}
        py={20}
        px={20}
      >
        {!showSkeleton ? (
          <Box w={175} h={175}>
            <PhotoTemplate
              onClick={() => {
                setSelectPosImage(0);
                setViewerPhoto([{ id: 1, url: data?.certificate }]);
                open();
              }}
              link={data?.certificate}
            />
          </Box>
        ) : (
          <Skeleton bdrs={8} w={175} h={175} />
        )}

        <Carousel
          w={{ base: "195px", xs: "402px", sm: "609px" }}
          slideSize="175px"
          slideGap="sm"
          controlSize={35}
        >
          {!showSkeleton &&
            data?.imageurls.map((el) => (
              <Carousel.Slide key={data?.imageurls.indexOf(el)}>
                <Flex align="center" justify="center" p={10}>
                  <PhotoTemplate
                    onClick={() => {
                      setSelectPosImage(data?.imageurls.indexOf(el));
                      setViewerPhoto(transformedPhotos);
                      open();
                    }}
                    link={el}
                    w={175}
                  />
                </Flex>
              </Carousel.Slide>
            ))}

          {showSkeleton &&
            [1, 2, 3].map((el) => (
              <Carousel.Slide key={el}>
                <Flex align="center" justify="center" p={10}>
                  <Skeleton w={175} h={175} bdrs={8} />
                </Flex>
              </Carousel.Slide>
            ))}
        </Carousel>
      </Flex>

      <TableSection />
    </>
  );
}

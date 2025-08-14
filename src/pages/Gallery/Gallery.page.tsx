import { Box, Flex, Text } from "@mantine/core";
import NavGallery from "./components/NavGallery";
import { useState } from "react";
import PhotoTemplate from "./components/PhotoTemplate";
import { useDisclosure } from "@mantine/hooks";
import ImageViewerModal from "../../widgets/ImageViewerModal/ImageViewerModal";
import { Photo } from "../../entities/Photo.interface";

export default function Gallery() {
  const [responseTypePhoto, setResponseTypePhoto] =
    useState<string>("products");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectPosImage, setSelectPosImage] = useState<number>(0);

  const data = [
    {
      link: "https://avatars.mds.yandex.net/i?id=db775e2c262998b7bb5d5759da2c64df466aa5a2-5749428-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=884edb525425300d10ba53dd8b1ee02ecad7bc4c-4902542-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=d2bccfd53a465a4dbcd3ad6cd4d70730368d2a5d-5887963-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=0ac7ba5d05bf93401510fec9e5389ec287b66480-12715410-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=97203da10fc54ae2eded06dd0d1857c201ed044d-2856395-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=7e26008924b8ed9498e5785bd7596d25fe3b78d5-5396308-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=7e26008924b8ed9498e5785bd7596d25fe3b78d5-5396308-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=7e26008924b8ed9498e5785bd7596d25fe3b78d5-5396308-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=7e26008924b8ed9498e5785bd7596d25fe3b78d5-5396308-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=7e26008924b8ed9498e5785bd7596d25fe3b78d5-5396308-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=7e26008924b8ed9498e5785bd7596d25fe3b78d5-5396308-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=7e26008924b8ed9498e5785bd7596d25fe3b78d5-5396308-images-thumbs&n=13",
      title: "Опора Трубопровода 1",
    },
  ];

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

      
      <Box w="100%" px={100}>
        <Text ta="center" fz={90} fw="bold" py={25}>
          Галерея
        </Text>

        <NavGallery set={setResponseTypePhoto} select={responseTypePhoto} />

        <Flex gap={40} p={40} wrap="wrap">
          {data.map((el) => (
            <PhotoTemplate
              key={data.indexOf(el)}
              link={el.link}
              onClick={() => handleOpenViewImage(el)}
            />
          ))}
        </Flex>
      </Box>
    </>
  );
}

import { Box, Flex, Text } from "@mantine/core";
import NavGallery from "./components/NavGallery";
import { useState } from "react";
import PhotoTemplate from "./components/PhotoTemplate";

export default function Gallery() {
  const [responseTypePhoto, setResponseTypePhoto] =
    useState<string>("products");

  const data = [
    {
      link: "https://avatars.mds.yandex.net/i?id=db775e2c262998b7bb5d5759da2c64df466aa5a2-5749428-images-thumbs&n=13",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=db775e2c262998b7bb5d5759da2c64df466aa5a2-5749428-images-thumbs&n=13",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=db775e2c262998b7bb5d5759da2c64df466aa5a2-5749428-images-thumbs&n=13",
    },
    {
      link: "https://avatars.mds.yandex.net/i?id=db775e2c262998b7bb5d5759da2c64df466aa5a2-5749428-images-thumbs&n=13",
    },
    { link: null },
    { link: null },
    { link: null },
    { link: null },
    { link: null },
    { link: null },
    { link: null },
    { link: null },
  ];

  return (
    <Box w="100%" px={100}>
      <Text ta="center" fz={90} fw="bold" py={25}>
        Галерея
      </Text>

      <NavGallery set={setResponseTypePhoto} select={responseTypePhoto} />

      <Flex gap={40} p={40} wrap="wrap">
        {data.map((el) => (
          <PhotoTemplate link={el.link} />
        ))}
      </Flex>
    </Box>
  );
}

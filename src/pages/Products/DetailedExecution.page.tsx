import { Anchor, Box, Breadcrumbs, Flex, Skeleton, Text } from "@mantine/core";
import { useParams } from "react-router";
import Model3d from "./components/Model3d";
import { useState } from "react";
import PhotoTemplate from "../../features/PhotoTemplate/PhotoTemplate";
import ImageViewerModal from "../../features/ImageViewerModal/ImageViewerModal";
import { useDisclosure } from "@mantine/hooks";

interface dataRequest {
  name: string; //имя по которому будет идти request к таблице
  description: string;

  model: string; //3д модель
  certificate: string; //сертификат закрепленный
  photos: string[]; //// фотки
}
export default function DetailedExecution() {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectPosImage, setSelectPosImage] = useState<number>(0);
  const { BlueprintId, ExecutionId } = useParams();
  const [data, setData] = useState<dataRequest | null>({
    name: "КП-1",
    description: "Описание для КП",
    model:
      "https://storage.yandexcloud.net/energodetal/Models/%D0%9C%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C.glb",
    certificate:
      "https://i.pinimg.com/originals/8c/0f/c7/8c0fc7535a6602398207975b9e5f481c.jpg",
    photos: [
      "https://i.pinimg.com/originals/8c/0f/c7/8c0fc7535a6602398207975b9e5f481c.jpg",
      "https://i.pinimg.com/originals/8c/0f/c7/8c0fc7535a6602398207975b9e5f481c.jpg",
      "https://i.pinimg.com/originals/8c/0f/c7/8c0fc7535a6602398207975b9e5f481c.jpg",
      "https://i.pinimg.com/originals/8c/0f/c7/8c0fc7535a6602398207975b9e5f481c.jpg",
    ],
  });
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [minDisplayTimePassed, setMinDisplayTimePassed] = useState(false);

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
      <Flex px={20} h={90} w="100%" align="center">
        <Breadcrumbs separatorMargin="sm">{items}</Breadcrumbs>
      </Flex>
      <Box px={20}>
        <Flex justify="space-between">
          <Model3d />
          <Box w="50%">
            <Text fz={64} fw="bold">
              {data?.name}
            </Text>
            <Text fz={28} c="#515661" mb={30}>
              {data?.description}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Flex w="100%" justify="space-between" py={45} px={20}>
        <Box w={175} h={175}>
          <PhotoTemplate onClick={open} link={data?.certificate} />
        </Box>
      </Flex>
    </>
  );
}

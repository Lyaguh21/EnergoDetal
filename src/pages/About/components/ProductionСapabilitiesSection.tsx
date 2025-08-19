import { Flex, Box, Text } from "@mantine/core";
import MainBigText from "../../../widgets/Texts/MainBigText";

const CardTemplate = ({
  img,
  title,
  text,
}: {
  img: string;
  title: string;
  text: string;
}) => {
  return (
    <Box
      px={10}
      w={{ base: "100%", sm: "calc(50% - 30px)" }}
      style={{ border: "1px solid black", borderRadius: "5px" }}
    >
      <Flex justify="center" py={25}>
        <img src={`/icons/${img}`} />
      </Flex>
      <Text fz={36} fw="bold" ta="center">
        {title}
      </Text>
      <Text fz={27} ta="center" py={25} c="#4D5765">
        {text}
      </Text>
    </Box>
  );
};

export default function ProductionСapabilitiesSection() {
  return (
    <Box>
      <MainBigText fz={{ base: 40, md: 90 }}>
        Производственные возможности
      </MainBigText>
      <Flex
        w="100%"
        px={{ base: 20, md: 50 }}
        py={40}
        gap={30}
        justify="center"
        style={{ flexWrap: "wrap" }}
      >
        {card.map((el) => (
          <CardTemplate text={el.text} title={el.title} img={el.img} />
        ))}
      </Flex>
    </Box>
  );
}

const card = [
  {
    id: 1,
    img: "SvarochnieRaboti.svg",
    title: "Сварочные работы",
    text: "Современное сварочное оборудование и квалифицированные специалисты",
  },
  {
    id: 2,
    img: "Mehanoobrabotka.svg",
    title: "Механообработка",
    text: "Токарные и фрезерные станки с ЧПУ",
  },
  {
    id: 3,
    img: "Controll.svg",
    title: "Контроль качества",
    text: "Многоступенчатый контроль качества производства и транспортировки",
  },
  {
    id: 4,
    img: "Logistika.svg",
    title: "Логистика",
    text: "Собственный автопарк и налаженные маршруты для быстрой доставки",
  },
];

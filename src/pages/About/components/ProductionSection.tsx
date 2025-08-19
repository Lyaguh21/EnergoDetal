import { Center, Flex, Text } from "@mantine/core";
import MainBigText from "../../../widgets/Texts/MainBigText";
export default function ProductionSection() {
  return (
    <Center
      px={{ base: 20, md: 100 }}
      style={{
        position: "relative",
        height: "950px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(BackLine.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          zIndex: 1,
        }}
      />

      <img
        src="/Nacovalna.svg"
        style={{
          position: "absolute",
          zIndex: 2,
          maxHeight: "664px",
          maxWidth: "664px",
        }}
      />
      <Flex direction="column" gap={{ base: 20, md: 80 }} style={{ zIndex: 3 }}>
        <MainBigText c="white" fz={{ base: 40, md: 90 }}>
          Производство
        </MainBigText>
        <Text ta="center" c="white" fz={{ base: 30, sm: 42 }} fw="normal">
          Выполнение работы проходит несколько этапов проверки
          <span
            style={{
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              marginLeft: "5px",
              padding: "0px 10px 0px 10px",
              transform: "rotate(-3deg)",
              display: "inline-block",
            }}
          >
            качества
          </span>{" "}
          а на выходе - соблюдение сроков и наилучший результат.
        </Text>
      </Flex>
    </Center>
  );
}

import { Center, Flex, Text } from "@mantine/core";
export default function ProductionSection() {
  return (
    <Center
      style={{
        position: "relative",
        height: "950px",
        overflow: "hidden",
        paddingLeft: 100,
        paddingRight: 100,
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
      <Flex direction="column" gap={80} style={{ zIndex: 3 }}>
        <Text ta="center" fz={90} fw="bold" lh="h1" c="white">
          Производство
        </Text>
        <Text ta="center" c="white" fz={42} fw="normal">
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

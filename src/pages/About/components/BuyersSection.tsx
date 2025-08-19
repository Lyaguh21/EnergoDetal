import { useEffect, useRef } from "react";
import { Center, Flex, Text } from "@mantine/core";
import MainBigText from "../../../widgets/Texts/MainBigText";

const BuyersSection = () => {
  const logos = [
    { id: 1, name: "Adidas", logo: "/buyers/Adidas.jpg" },
    { id: 2, name: "Coca Cola", logo: "/buyers/Cola.jpg" },
    { id: 3, name: "Pepsi", logo: "/buyers/Pepsi.jpg" },
    { id: 4, name: "StarBucks", logo: "/buyers/Starbucks.jpg" },
  ];

  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;

    if (!container || !track) return;

    // Клонируем элементы для бесшовного повтора
    const clone = track.cloneNode(true);
    container.appendChild(clone);

    let animationFrame;
    let position = 0;
    const speed = 0.4; // Скорость движения (пикселей за кадр)

    const animate = () => {
      position -= speed;

      // Когда первая копия полностью ушла влево, сбрасываем позицию
      if (position <= -track.offsetWidth) {
        position = 0;
      }

      track.style.transform = `translateX(${position}px)`;
      clone.style.transform = `translateX(${position + track.offsetWidth}px)`;

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <Center
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
          transform: "scaleX(-1)",
        }}
      />

      <Flex
        direction="column"
        w="100%"
        gap={{ base: 20, md: 80 }}
        style={{ zIndex: 3 }}
      >
        <MainBigText c="white">Нас выбирают</MainBigText>

        {/* Контейнер для бегущей строки */}
        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: "264px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Дорожка с логотипами */}
          <div
            ref={trackRef}
            style={{
              display: "flex",
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              alignItems: "center",
              gap: "100px",
              padding: "0 30px",
              willChange: "transform",
            }}
          >
            {logos.map((company) => (
              <div
                key={company.id}
                style={{
                  display: "flex",
                  gap: "50px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  style={{
                    height: "176px",
                    width: "176px",
                    borderRadius: "20px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
                <Text
                  c="white"
                  fz={64}
                  fw="bold"
                  style={{ textWrap: "nowrap" }}
                >
                  {company.name}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </Flex>
    </Center>
  );
};

export default BuyersSection;

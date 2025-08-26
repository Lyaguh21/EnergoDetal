import { Box, Slider } from "@mantine/core";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const perToRad = (percent: number) => percent * 3.6 * (Math.PI / 180);
const degToRad = (percent: number) => percent * (Math.PI / 180);

function Model({
  percentRotation,
  modelUrl,
}: {
  percentRotation: number;
  modelUrl: string;
}) {
  // const { scene } = useGLTF(modelUrl);
  const { scene } = useGLTF("/models/Опоры КХ ОСТ 36-146-88.glb");

  return (
    <mesh
      rotation={[perToRad(180), 0, perToRad(-13 - percentRotation)]}
      position={[-1, 0, 1]}
      scale={5}
    >
      <primitive object={scene} />
    </mesh>
  );
}

export default function Model3d({
  modelUrl,
}: {
  modelUrl: string | undefined;
}) {
  const [value, setValue] = useState(0);

  if (!modelUrl) {
    return (
      <Box
        w="calc(45%)"
        style={{
          position: "relative",
          border: "1px solid black",
          borderRadius: 8,
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        Модель не загружена
      </Box>
    );
  }

  return (
    <Box
      w="calc(45%)"
      style={{
        position: "relative",
        border: "1px solid black",
        borderRadius: 8,
        aspectRatio: "1 / 1",
      }}
    >
      <Canvas
        style={{
          height: "100%",
          width: "100%",
          background: "#f5f5f5",
          borderRadius: 8,
          zIndex: 2,
        }}
        camera={{
          position: [0, 2, 5],
          rotation: [degToRad(-15), 0, 0],
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

        {/* Передаем modelUrl в компонент Model */}
        <Model percentRotation={value} modelUrl={modelUrl} />
      </Canvas>

      <Box
        w="100%"
        h="80px"
        px={20}
        pt={20}
        style={{ zIndex: 3 }}
        pos="absolute"
        bottom={10}
      >
        <Slider
          size="xl"
          color="indigo"
          value={value}
          onChange={setValue}
          marks={[
            { value: 25, label: "90°" },
            { value: 50, label: "180°" },
            { value: 75, label: "270°" },
          ]}
        />
      </Box>
    </Box>
  );
}

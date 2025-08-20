import { Box, Slider } from "@mantine/core";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";

const url =
  "https://storage.yandexcloud.net/energodetal/Models/%D0%9C%D0%BE%D0%B4%D0%B5%D0%BB%D1%8C.glb";

const perToRad = (percent: number) => percent * 3.6 * (Math.PI / 180);
const degToRad = (percent: number) => percent * (Math.PI / 180);

function Cube({ percentRotation }: { percentRotation: number }) {
  const { scene } = useGLTF("/models/industrial_electrical_box.glb");

  return (
    <mesh
      rotation={[0, perToRad(-percentRotation), 0]}
      position={[-0.5, 0, 0]}
      scale={6}
    >
      <primitive object={scene} />
    </mesh>
  );
}

export default function Model3d() {
  const [value, setValue] = useState(0);
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
          background: "#dddddd",
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

        <Cube percentRotation={value} />
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

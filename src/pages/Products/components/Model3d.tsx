import { Box, Button, Flex, Slider } from "@mantine/core";
import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { IconEye } from "@tabler/icons-react";
import ModelViewerModal from "../../../features/ModelViewerModal/ModelViewerModal";
import { useDisclosure } from "@mantine/hooks";
import { perToRad, degToRad } from "../../../entities/MathFunctions";

function Model({
  percentRotation,
  modelUrl,
}: {
  percentRotation: number;
  modelUrl: string;
}) {
  const { scene } = useGLTF("/models/Опоры КХ ОСТ 36-146-88 Restailed.glb");

  const clonedScene = useMemo(() => scene.clone(), [scene]);
  return (
    <mesh
      rotation={[0, perToRad(-13 - percentRotation), 0]}
      position={[0, 0, 0]}
      scale={6}
    >
      <primitive object={clonedScene} />
    </mesh>
  );
}

export default function Model3d({
  modelUrl,
}: {
  modelUrl: string | undefined;
}) {
  const [value, setValue] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

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
    <>
      <ModelViewerModal
        close={close}
        opened={opened}
        modelUrl={"/models/Опоры КХ ОСТ 36-146-88 Restailed.glb"}
      />

      <Box
        w={{ base: "100%", xs: "45%" }}
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
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />

          <Model percentRotation={value} modelUrl={modelUrl} />
        </Canvas>

        <Box style={{ zIndex: 3 }} pos="absolute" top={10} right={10}>
          <Button color="indigo" p={0} w={40} h={40} onClick={open}>
            <IconEye size={24} />
          </Button>
        </Box>

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
            label={null}
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
    </>
  );
}

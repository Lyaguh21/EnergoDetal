import { Modal, Box, Popover, Text, Button } from "@mantine/core";
import { perToRad, degToRad } from "../../entities/MathFunctions";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

interface ModalTypes {
  opened: boolean;
  close: () => void;
  modelUrl: string;
}

function Model({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);

  const clonedScene = useMemo(() => scene.clone(), [scene]);
  return (
    <mesh
      rotation={[perToRad(180), 0, perToRad(-13)]}
      position={[-1, -0.5, 1]}
      scale={4.5}
    >
      <primitive object={clonedScene} />
    </mesh>
  );
}

export default function ModelViewerModal({
  opened,
  close,
  modelUrl,
}: ModalTypes) {
  return (
    <Modal
      size="auto"
      onClose={close}
      title="Подробный просмотр"
      opened={opened}
    >
      <Box w={{ base: "1000px" }}>
        <Canvas
          style={{
            width: "100%",
            height: "100%",
            background: "#f5f5f5",
            borderRadius: 8,
            zIndex: 2,
            aspectRatio: "16/9",
            cursor: "grab",
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

          <Model modelUrl={modelUrl} />

          <OrbitControls
            enablePan={false} // Включить перемещение
            enableZoom={true} // Включить приближение/отдаление
            enableRotate={true} // Включить вращение
            zoomSpeed={0.6} // Скорость зума
            rotateSpeed={0.7} // Скорость вращения
            minDistance={2} // Минимальное расстояние камеры
            maxDistance={7} // Максимальное расстояние камеры
          />
        </Canvas>
      </Box>

      <Box style={{ zIndex: 3 }} pos="absolute" bottom={25} left={25}>
        <Popover width={200} position="top-start" withArrow shadow="md">
          <Popover.Target>
            <Button color="indigo" p={0} w={40} h={40}>
              <IconInfoCircle size={24} />
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="xs">
              Вращайте объект удерживая левую кнопку мыши и меняйте размер
              вращая колесико мыши
            </Text>
          </Popover.Dropdown>
        </Popover>
      </Box>
    </Modal>
  );
}

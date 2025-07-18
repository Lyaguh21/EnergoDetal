import { Image } from "@mantine/core";
import { motion } from "motion/react";

interface photo {
  link?: string | null;
  onClick: () => void;
}
export default function PhotoTemplate({ link, onClick }: photo) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.1, filter: "brightness(0.7)" }}
      whileTap={{ scale: 0.98 }}
      style={{
        flexGrow: 1,
        width: 175,
        height: 175,
      }}
    >
      <Image src={link} radius={20} bg="blue" w="100%" h="100%"></Image>
    </motion.div>
  );
}

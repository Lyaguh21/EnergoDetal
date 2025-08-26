import { Image } from "@mantine/core";
import { motion } from "motion/react";
import { Photo } from "../../entities/Photo.interface";

interface photo {
  link?: string | null;
  onClick?: () => void;
  w?: number;
}
export default function PhotoTemplate({ link, onClick, w }: photo) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.1, filter: "brightness(0.7)" }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: w || "100%",
        height: 175,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      <Image src={link} w="100%" h="100%" style={{ objectFit: "cover" }} />
    </motion.div>
  );
}

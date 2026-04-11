import { Button, ButtonProps } from "@mantine/core";
import { ReactNode } from "react";
import styles from "./MainButton.module.css";

interface MainButtonProps extends ButtonProps {
  children: ReactNode;
}

export default function MainButton({ children, ...props }: MainButtonProps) {
  return (
    <Button {...props} className={styles.MainButton}>
      {children}
    </Button>
  );
}
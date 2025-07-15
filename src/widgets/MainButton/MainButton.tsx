import { Button } from "@mantine/core";
import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./MainButton.module.css";

interface MainButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function MainButton({ children, ...props }: MainButton) {
  return (
    <Button {...props} className={styles.MainButton}>
      {children}
    </Button>
  );
}

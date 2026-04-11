import { useEffect } from "react";
import { Modal } from "@mantine/core";

interface ModalTypes {
  opened: boolean;
  close: () => void;
}

export default function DeliveryModal({ close, opened }: ModalTypes) {
  useEffect(() => {
    if (opened) {
      const existingScript = document.getElementById("dcsbl");
      
      if (existingScript) {
        return;
      }

      const script = document.createElement("script");
      script.id = "dcsbl";
      
      script.src = "https://dostavka.sbl.su/api/delivery.js?comp=0&startCt=Шахты&startCntr=RU&btn=no&innerDeliv=1&autoEnd=1&door=0&dopInsure=0";
      script.async = true;
      
      document.body.appendChild(script);
    }
  }, [opened]);

  return (
    <Modal opened={opened} onClose={close} size="lg" title="Расчет стоимости доставки">
      <div className="ec-delivery" />
    </Modal>
  );
}
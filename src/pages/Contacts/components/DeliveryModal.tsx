import { Modal } from "@mantine/core";

interface ModalTypes {
  opened: boolean;
  close: () => void;
}

export default function DeliveryModal({ close, opened }: ModalTypes) {
  return (
    <Modal opened={opened} onClose={close} size="auto" title="Реквизиты">
      Тут будет кто доставит
    </Modal>
  );
}

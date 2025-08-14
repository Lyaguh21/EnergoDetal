import { Flex, Modal, Text } from "@mantine/core";
import MainButton from "../../../widgets/MainButton/MainButton";

interface ModalTypes {
  opened: boolean;
  close: () => void;
}

export default function RequisitesModal({ close, opened }: ModalTypes) {
  const requisites = [
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
    { title: "ИНН", value: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
  ];

  return (
    <Modal opened={opened} onClose={close} size="auto" title="Реквизиты">
      {requisites.map((el) => (
        <Flex
          c="#515661"
          fz={24}
          w={600}
          justify="space-between"
          style={{ borderBottom: "1px solid #515661" }}
        >
          <Text c="#515661">{el.title}</Text>
          <Text c="#515661">{el.value}</Text>
        </Flex>
      ))}
      <MainButton mt={45} fullWidth>
        Скачать
      </MainButton>
    </Modal>
  );
}

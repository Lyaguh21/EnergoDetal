import { Flex, Modal, Text, Box } from "@mantine/core";
import MainButton from "../../../widgets/MainButton/MainButton";

interface ModalTypes {
  opened: boolean;
  close: () => void;
}

export default function RequisitesModal({ close, opened }: ModalTypes) {
  const requisites = [
    { label: "Полное наименование", value: "Общество с ограниченной ответственностью «Энергодеталь»" },
    { label: "Сокращённое наименование", value: "ООО «Энергодеталь»" },
    { label: "ОГРН", value: "1096195000747" },
    { label: "Дата регистрации", value: "26 мая 2009 года" },
    { label: "ИНН / КПП", value: "6167029079 / 616701001" },
    { label: "ОКПО / ОКАТО", value: "89241819 / 60401380000" },
    { label: "ОКВЭД-2", value: "25.11, 25.29, 25.62" },
    { label: "Банк", value: "ФИЛИАЛ \"РОСТОВСКИЙ\" АО \"АЛЬФА-БАНК\"" },
    { label: "Расчётный счёт", value: "40702810026000005260" },
    { label: "Корр. счёт", value: "30101810500000000207" },
    { label: "БИК", value: "046015207" },
    { label: "Идентификатор ЭДО", value: "2ВМ-6167029079-616701001-201401100103513558463 (Диадок/Контур)" },
    { label: "Юридический адрес", value: "344111, Россия, Ростовская обл., г. Ростов-на-Дону, пр-кт 40-летия Победы, дом 75" },
    { label: "Почтовый адрес", value: "344111, г. Ростов-на-Дону, пр-кт 40-летия Победы, дом 75, ООО «Энергодеталь»" },
    { label: "Телефон / Факс", value: "(863) 279-81-15 / (863) 279-81-55" },
    { label: "Электронная почта", value: "zakaz@shmze.ru" },
    { label: "Грузополучатель", value: "ОП «Энергодеталь-Шахты», 346506, Ростовская обл., г. Шахты, ул. Неглинская, дом 5" },
    { label: "ИНН/КПП Покупателя", value: "6167029079 / 615545001" },
    { label: "Генеральный директор", value: "Ткаличева Юлия Михайловна (действует на основании Устава)" },
  ];

  return (
    <Modal opened={opened} onClose={close} size="lg" title="Реквизиты компании" padding="lg">
      <Box style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {requisites.map((item, index) => (
          <Flex
            key={index}
            justify="space-between"
            align="flex-start"
            py={12}
            wrap="wrap"
            gap={8}
            style={{ borderBottom: index !== requisites.length - 1 ? "1px solid #e5e7eb" : "none" }}
          >
            <Text fw={600} w={{ base: "100%", sm: "35%" }} c="#515661" fz="sm">
              {item.label}
            </Text>
            <Text w={{ base: "100%", sm: "60%" }} c="#1f2937" fz="sm" style={{ overflowWrap: "break-word" }}>
              {item.value}
            </Text>
          </Flex>
        ))}
      </Box>

      <Box mt="xl" pt="md" style={{ borderTop: "1px solid #e5e7eb" }}>
        <a download href="/АНКЕТА КОНТРАГЕНТА.docx" style={{ textDecoration: "none" }}>
          <MainButton fullWidth>
            Скачать оригинал (.docx)
          </MainButton>
        </a>
      </Box>
    </Modal>
  );
}
import { Box, Text, Flex, Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import classes from "./classes/OutlineButton.module.css";
import { useDisclosure } from "@mantine/hooks";
import RequisitesModal from "./components/RequisitesModal";
import DeliveryModal from "./components/DeliveryModal";
import MainBigText from "../../widgets/Texts/MainBigText";
export default function Contacts() {
  const [openedRequisites, { open: openRequisites, close: closeRequisites }] =
    useDisclosure(false);
  const [openedDelivery, { open: openDelivery, close: closeDelivery }] =
    useDisclosure(false);
  return (
    <>
      <RequisitesModal opened={openedRequisites} close={closeRequisites} />
      <DeliveryModal opened={openedDelivery} close={closeDelivery} />
      <Box w="100%" px={{ base: 20, md: 100 }}>
        <MainBigText>Контакты</MainBigText>
        <Flex
          wrap={{ base: "wrap", xl: "nowrap" }}
          gap={{ base: "24px", xl: 0 }}
          pb={25}
        >
          <Flex direction="column" w={{ base: "100%", md: "50%" }} gap={24}>
            <Flex direction="column">
              <Text fz={32} fw="bold">
                Адрес
              </Text>
              <Text fz={24}>г. Шахты, ул. Промышленная, д. 1</Text>
            </Flex>

            <Flex direction="column">
              <Text fz={32} fw="bold">
                Номер телефона
              </Text>
              <Text fz={24}>+7 (918) 123-45-67</Text>
            </Flex>

            <Flex direction="column">
              <Text fz={32} fw="bold">
                Почта
              </Text>
              <Text fz={24}>trubi@contact.ru</Text>
            </Flex>

            <Flex direction="column">
              <Text fz={32} fw="bold">
                График работы
              </Text>
              <Text fz={24}>Ежедневно: 8:00 - 22:00</Text>
            </Flex>

            <Flex pr={20} gap={12} direction="column">
              <Button
                variant="outline"
                onClick={openDelivery}
                className={classes.OutlineButton}
              >
                Рассчитать доставку
              </Button>
              <Flex gap={12} w="100%">
                <Button
                  style={{ flexGrow: 1 }}
                  onClick={openRequisites}
                  className={classes.OutlineButton}
                >
                  Реквизиты
                </Button>
                <Button
                  style={{ aspectRatio: "1 / 1" }}
                  className={classes.OutlineButton}
                >
                  <IconDownload size={30} />
                </Button>
              </Flex>
            </Flex>
          </Flex>

          <Box
            w={{ base: "100%", xl: "50%" }}
            style={{ aspectRatio: "1 / 1", border: "none" }}
          >
            <iframe
              height="100%"
              width="100%"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A9ab915425113695f4860978090a102200cee02a358eac7fba119c63c05e94bd1&amp;source=constructor"
            ></iframe>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

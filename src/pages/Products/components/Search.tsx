import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function Search() {
  return (
    <Input
      w="100%"
      rightSection={<IconSearch />}
      size="xl"
      radius={8}
      placeholder="Введите название или номер чертежа..."
    />
  );
}

import { Input, Box, Text, Stack, Flex, CloseButton } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import classes from "../classes/Search.module.css";
import axios from "axios";
import { API } from "../../../app/helpers";

type data = {
  type: string;
  id: number;
  name: string;
  url: string;
};

function SearchItemTemplate({ el }: { el: data }) {
  return (
    <NavLink
      to={el.url}
      style={{
        width: "100%",
        padding: "10px 20px 10px 20px",
        color: "black",
        textDecoration: "none",
        borderBottom: "1px solid #b1b3b8",
      }}
    >
      <Flex justify="space-between" w="100%" align="center">
        <Text fz={24}>{el.name}</Text>
        <IconArrowRight />
      </Flex>
    </NavLink>
  );
}

export default function Search() {
  const [data, setData] = useState<data[]>([]);
  const [active, setActive] = useState(false);
  const [searchRequest, setSearchRequest] = useState<string>("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API}/search?qu=${searchRequest}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [searchRequest]);

  return (
    <Box pos="relative" w="100%">
      <Input
        onFocus={() => setActive(true)}
        onBlur={(e) => {
          setTimeout(() => {
            if (!dropdownRef.current?.contains(document.activeElement)) {
              setActive(false);
            }
          }, 0);
        }}
        value={searchRequest}
        onChange={(e) => setSearchRequest(e.target.value)}
        w="100%"
        radius={searchRequest && active ? "8px 8px 0 0" : "8px"}
        size="xl"
        placeholder="Введите название или номер чертежа..."
        rightSectionPointerEvents="all"
        rightSection={
          searchRequest ? (
            <CloseButton
              aria-label="Clear input"
              onClick={() => setSearchRequest("")}
              style={{ display: searchRequest ? undefined : "none" }}
            />
          ) : (
            <IconSearch />
          )
        }
      />
      {searchRequest && active && (
        <Stack
          w="100%"
          bg="white"
          style={{
            zIndex: 3,
            border: "1px solid #b1b3b8",
            borderTop: "none",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
          className={classes.boxSearch}
          pos="absolute"
          align="flex-start"
          justify="flex-start"
          gap="0"
          ref={dropdownRef}
        >
          {data.map((el, index) => (
            <SearchItemTemplate el={el} key={index} />
          ))}

          {searchRequest && data.length === 0 && (
            <Flex px="10px" h="60" w="100%" align="center">
              <Text>Ничего не найдено...</Text>
            </Flex>
          )}
        </Stack>
      )}
    </Box>
  );
}

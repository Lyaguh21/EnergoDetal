import {
  Box,
  CloseButton,
  Input,
  LoadingOverlay,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { API } from "../../../app/helpers";
import { TableProducts } from "../../../entities/TableProducts.interface";
import classes from "../classes/Table.module.css";

export default function TableSection() {
  const { BlueprintId, ExecutionId } = useParams();

  const [data, setData] = useState<TableProducts[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const [searchRequest, setSearchRequest] = useState("");
  const limit = 10;

  const fetchData = async (pageNum: number, append = false) => {
    if ((pageNum === 1 && loading) || (pageNum > 1 && loadingMore)) return;

    const isInitial = pageNum === 1;

    if (isInitial) {
      setLoading(true);
      setShowSkeleton(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const startTime = Date.now();

      const response = await axios.post(
        `${API}/products/${BlueprintId}/${ExecutionId}?page=${pageNum}&limit=${limit}&qu=${searchRequest}`
      );

      const { data: newData, meta } = response.data;

      const elapsedTime = Date.now() - startTime;
      const minDisplayTime = 1000;
      const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

      setTimeout(() => {
        if (isInitial) {
          setData(newData);
          setLoading(false);
          setShowSkeleton(false);
        } else {
          setData((prev) => [...prev, ...newData]);
        }

        if (meta.currentPage >= meta.totalPages) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (!isInitial) setLoadingMore(false);
      }, remainingTime);
    } catch (err) {
      console.error("Ошибка при загрузке данных:", err);
      if (!isInitial) setLoadingMore(false);

      if (isInitial) {
        setData([]);
        setLoading(false);
        setShowSkeleton(false);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchData(1, false);
  }, [BlueprintId, ExecutionId, searchRequest]);

  const handleScroll = (container: HTMLDivElement) => {
    if (loadingMore || !hasMore) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < 20) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, true);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchRequest(value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchRequest("");
    setPage(1);
  };

  const rows = data.map((element: TableProducts, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <Text ta="center" c="#515661" fw="regular">
          {element.name}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text ta="center" c="#515661" fw="regular">
          {element.mass}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text ta="center" c="#515661" fw="regular">
          {element.price1}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text ta="center" c="#515661" fw="regular">
          {element.price2}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Text fz={{ base: 20, sm: 40 }} fw="bold" px="20">
        Технические характеристики
      </Text>

      <Box px={20} py={20}>
        <>
          <Box
            p={20}
            style={{
              border: "1px solid #D2D3D6",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            <Input
              size="sm"
              w="100%"
              bdrs={10}
              value={searchRequest}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Поиск по обозначению"
              rightSectionPointerEvents="all"
              rightSection={
                <CloseButton
                  aria-label="Clear input"
                  onClick={handleClearSearch}
                  style={{ display: searchRequest ? undefined : "none" }}
                />
              }
            />
          </Box>
          {!showSkeleton && (
            <Box
              style={{
                overflowY: "scroll",
                borderRadius: "0 0 8px 8px",
                border: "1px solid #D2D3D6",
                borderTop: "0",
              }}
              h={395}
              onScrollCapture={(event) => handleScroll(event.currentTarget)}
              ref={scrollAreaRef}
            >
              <Table classNames={{ table: classes.table }}>
                <Table.Thead bg="#FBFBFB">
                  <Table.Tr>
                    <Table.Th>
                      <Text ta="center" c="#515661" fw="regular">
                        ОБОЗНАЧЕНИЕ
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text ta="center" c="#515661" fw="regular">
                        МАССА, КГ
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text ta="center" c="#515661" fw="regular">
                        ЦЕНА СТАЛЬ 3, ₽
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text ta="center" c="#515661" fw="regular">
                        ЦЕНА 09Г2С, ₽
                      </Text>
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {rows}
                  {loadingMore && (
                    <Table.Tr>
                      <Table.Td colSpan={4} ta="center" py="xs">
                        <Text c="dimmed" size="sm">
                          Загрузка...
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}

                  {data.length === 0 && (
                    <Table.Tr h="355px">
                      <Table.Td colSpan={4} ta="center" py="xs">
                        <Text c="dimmed" size="sm">
                          Ничего не найдено
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  )}
                </Table.Tbody>
              </Table>
            </Box>
          )}
        </>

        {showSkeleton && (
          <Skeleton style={{ borderRadius: "0 0 8px 8px" }} h="395px" w="100%">
            <LoadingOverlay
              color="indigo"
              visible={showSkeleton}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
          </Skeleton>
        )}
      </Box>
    </>
  );
}

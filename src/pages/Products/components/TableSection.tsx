import { Box, Input, ScrollArea, Skeleton, Table, Text } from "@mantine/core";
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
        `${API}/products/${BlueprintId}/${ExecutionId}?page=${pageNum}&limit=${limit}`
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

        // Обновляем флаг hasMore
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
    fetchData(1, false);
  }, [BlueprintId, ExecutionId]);

  const handleScroll = (container: HTMLDivElement) => {
    if (loadingMore || !hasMore) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    console.log(
      scrollTop,
      scrollHeight,
      clientHeight,
      scrollHeight - scrollTop - clientHeight
    );
    if (scrollHeight - scrollTop - clientHeight < 20) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, true);
    }
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
        {!showSkeleton && (
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
                placeholder="Поиск по обозначению"
              />
            </Box>

            <Box
              style={{ overflowY: "scroll" }}
              h={395}
              onScrollCapture={(event) => handleScroll(event.currentTarget)}
              ref={scrollAreaRef}
            >
              <Table withTableBorder classNames={{ table: classes.table }}>
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
                </Table.Tbody>
              </Table>
            </Box>
          </>
        )}

        {showSkeleton && <Skeleton bdrs={8} h="395px" w="100%" />}
      </Box>
    </>
  );
}

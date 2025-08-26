import { Box, Input, Skeleton, Table, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API } from "../../../../app/helpers";

export default function TableSection() {
  const { BlueprintId, ExecutionId } = useParams();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [minDisplayTimePassed, setMinDisplayTimePassed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const startTime = Date.now();
      setLoading(true);
      setShowSkeleton(true);

      try {
        const response = await axios.post(
          `${API}/products/${BlueprintId}/${ExecutionId}?page=1&limit=10`
        );

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const minDisplayTime = 1000;
        const remainingTime = Math.max(minDisplayTime - elapsedTime, 0);

        setTimeout(() => {
          setData(response.data.data);
          setLoading(false);
          setShowSkeleton(false);
        }, remainingTime);
      } catch (err) {
        console.error(err);

        if (!isMounted) return;

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(1000 - elapsedTime, 0);

        setTimeout(() => {
          setData(null);
          setLoading(false);
          setShowSkeleton(false);
        }, remainingTime);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const rows = data?.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>{element.price1}</Table.Td>
      <Table.Td>{element.price2}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Text fz={40} fw="bold" px="20">
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
            <Table style={{}}>
              <Table.Thead bg="#FBFBFB" style={{ border: "1px solid #D2D3D6" }}>
                <Table.Tr>
                  <Table.Th>ОБОЗНАЧЕНИЕ</Table.Th>
                  <Table.Th>МАССА, КГ</Table.Th>
                  <Table.Th>ЦЕНА СТАЛЬ 3, ₽</Table.Th>
                  <Table.Th>ЦЕНА 09Г2С, ₽</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody
                style={{
                  border: "1px solid #D2D3D6",
                  borderBottomLeftRadius: "8px",
                }}
              >
                {rows}
              </Table.Tbody>
            </Table>
          </>
        )}

        {showSkeleton && <Skeleton bdrs={8} h="100px" w="100%" />}
      </Box>
    </>
  );
}
